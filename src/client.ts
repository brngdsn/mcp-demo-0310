import 'dotenv/config';
import { pathToFileURL } from 'url';
import chalk from "chalk";
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import ollama, { Ollama, Message, Tool, ChatRequest } from 'ollama';
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

  constructor(config: MCPClientConfig = {}) {
    this.ollama = ollama;
  }

  async connectToServer(serverScriptPath: string): Promise<void> {
    this.transport = new StdioClientTransport({
      command: "node",
      args: [serverScriptPath],
    });
    this.client = new Client(
      { name: "mcp-weather-client", version: "0.2.0" },
      {
        capabilities: {
          tools: {},
        },
      }
    );
    await this.client.connect(this.transport);
    const response = await this.client.request(
      { method: "tools/list" },
      ListToolsResultSchema
    );
    console.log(
      chalk.green(
        `\nConnected to server with tools:\n\n${response.tools
          .map((t: any) => t.name)
          .join(", ")}`
      )
    );
  }

  async processQuery(messages: Message[]): Promise<Message[]> {
    if (!this.client) {
      throw new Error("Client not connected");
    }
    const toolsResponse = await this.client.request(
      { method: "tools/list" },
      ListToolsResultSchema
    );
    const availableTools = toolsResponse.tools.map((tool: any): Tool => tool);
    while (true) {
        const currentResponse = await this.ollama.chat({
            model: "llama3.2:latest",
            messages,
            tools: availableTools,
          });
          // Process the response and tool calls
          const {
            message: { tool_calls, content },
          } = currentResponse;
          if (content) {
            messages.push({ role: `assistant`, content, });
          }
          if (!tool_calls) {
            break;
          }
          for (const tool of tool_calls) {
            const {
              function: { name, arguments: $arguments },
            } = tool;
            console.log(
                chalk.cyan(
                    `[Calling tool ${name} with args ${JSON.stringify($arguments)}]`
                )
            );
            const toolResponse = await this.client.request(
              {
                method: "tools/call",
                params: { name, arguments: $arguments },
              },
              CallToolResultSchema
            );
            console.log(
                chalk.cyan(
                    `[Tool response ${JSON.stringify(toolResponse)}]`
                )
            );
            messages.push({ role: `tool`, content: JSON.stringify(toolResponse), });
          }
    }
    return messages;
  }

  async chatLoop(messages: Message[]): Promise<void> {
    console.log(chalk.bold.green("\nMCP Client Started!"));
    console.log(chalk.blue("Type your queries or 'quit' to exit."));

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const askQuestion = () => {
      rl.question(chalk.yellow("\nQuery: "), async (query: string) => {
        try {
          if (query.toLowerCase() === "quit") {
            await this.cleanup();
            rl.close();
            return;
          }
          messages.push({
            role: "user",
            content: query,
          });
          const response = await this.processQuery(messages);
          askQuestion();
        } catch (error) {
          console.error(chalk.red("\nError:"), error);
          askQuestion();
        }
      });
    };

    askQuestion();
  }

  async cleanup(): Promise<void> {
    console.log(chalk.gray("\nCleaning up resources..."));
    if (this.transport) {
      await this.transport.close();
    }
  }
}

async function main() {
  if (process.argv.length < 3) {
    console.log(
      chalk.red(`Usage: ts-node client.ts <path_to_server_script>`)
    );
    process.exit(1);
  }
  const client = new MCPClient();
  let messages: Message[] = [];
  try {
    await client.connectToServer(process.argv[2]);
    await client.chatLoop(messages);
  } catch (error) {
    console.log(chalk.red("Error:"), error);
    await client.cleanup();
    process.exit(1);
  }
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main();
}

export default MCPClient;
