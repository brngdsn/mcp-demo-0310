import 'dotenv/config';
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import ollama, { Ollama, Message, Tool, ChatRequest, } from 'ollama';
import {
    CallToolResultSchema,
    ListToolsResultSchema,
} from "@modelcontextprotocol/sdk/types.js";
import * as readline from "node:readline";

interface MCPClientConfig {
    name?: string;
    version?: string;
}

class MCPClient {
    private client: Client | null = null;
    private ollama: Ollama;
    private transport: StdioClientTransport | null = null;

    constructor (config: MCPClientConfig = {}) {
        this.ollama = ollama;
    }

    async connectToServer (serverScriptPath: string): Promise<void> {
        this.transport = new StdioClientTransport({
            command: "node",
            args: [serverScriptPath],
        });
        this.client = new Client(
            { name: "mcp-client", version: "0.2.0", },
            { capabilities: {}, },
        );
        await this.client.connect(this.transport);
        const response = await this.client.request(
            { method: "tools/list", },
            ListToolsResultSchema,
        );
        console.log(`\nConnected to server with tools:\n\n${
            response.tools.map((t: any) => t.name)
        }`);
    }

    async processQuery(query: string): Promise<string> {
        if (!this.client) {
            throw new Error("Client not connected");
        }
        let messages: Message[] = [{
            role: "user",
            content: query,
        }];
        const toolsResponse = await this.client.request(
            { method: "tools/list" },
            ListToolsResultSchema,
        );
        const availableTools = toolsResponse.tools.map((tool: any): Tool => tool);
        const finalText: string[] = [];
        let currentResponse = await this.ollama.chat({
            model: "llama3.2:latest",
            messages,
            tools: availableTools,
        });
        // Process the response and tool calls
        const { message: { tool_calls, content, } } = currentResponse;
        if (content) {
            return content;
        }
        if (!tool_calls) {
            return finalText.join(`\n`);
        }
        for (const tool of tool_calls) {
            const { function: { name, arguments: $arguments, }, } = tool;
            this.client.request(
                {
                    method: "tools/call",
                    params: { name, arguments: $arguments, },
                },
                CallToolResultSchema
            );
            finalText.push(
                `[Calling tool ${name} with args ${JSON.stringify($arguments)}]`
            );

        }
        return finalText.join(`\n`);
    }

    async chatLoop(): Promise<void> {
        console.log(`\nMCP Client Started!`);
        console.log(`Type your queries or 'quit' to exit.`);

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
        });

        const askQuestion = () => {
            rl.question(`\nQuery: `, async (query: string) => {
                try {
                    if (query.toLowerCase() == `quit`) {
                        await this.cleanup();
                        rl.close();
                        return;
                    }
                    const response = await this.processQuery(query);
                    console.log(`\n${response}`);
                    askQuestion();
                } catch (error) {
                    console.error(`\nError:`, error);
                    askQuestion();
                }
            })
        };

        askQuestion();
    }

    async cleanup(): Promise<void> {
        if (this.transport) {
            await this.transport.close();
        }
    }

}

async function main () {
    if (process.argv.length < 3) {
        console.log(`Usage: ts-node client.ts <path_to_server_script>`);
        process.exit(1);
    }
    const client = new MCPClient();
    try {
        await client.connectToServer(process.argv[2]);
        await client.chatLoop();
    } catch (error) {
        console.log(`Error:`, error);
        await client.cleanup();
        process.exit(1);
    }
}