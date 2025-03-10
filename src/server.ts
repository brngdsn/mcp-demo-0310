import chalk from "chalk";
import { McpServer, ResourceTemplate } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "Weatherly",
  version: "0.2.0",
});

server.resource(
  "getLocation",
  new ResourceTemplate(`getLocation://{message}`, { list: undefined }),
  async (uri, { message }) => {
    console.log(chalk.blue(`Resource 'getLocation' accessed with message: ${message}`));
    return {
      contents: [
        {
          uri: uri.href,
          text: chalk.blue(`Resource getLocation: ${message}`),
        },
      ],
    };
  }
);

server.tool(
  "getLocation",
  "Get the location of the user",
  { },
  async () => {
    console.log(chalk.yellow(`Tool 'getLocation' invoked`));
    return {
      content: [
        {
          type: `text`,
          text: `Boston`,
        },
      ],
    };
  }
);

server.tool(
    "getWeather",
    "Get the weather for a given city",
    { city: z.string() },
    async ({ city }) => {
      console.log(chalk.yellow(`Tool 'getWeather' invoked with ${city}`));
      return {
        content: [
          {
            type: `text`,
            text: `75°F, Sunny`
          },
        ],
      };
    }
);

server.prompt(
  "getLocation",
  { message: z.string() },
  ({ message }) => {
    console.log(chalk.magenta(`Prompt 'getLocation' created for message: ${message}`));
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: chalk.magenta(`Please process this message: ${message}`),
          },
        },
      ],
    };
  }
);

const transport = new StdioServerTransport();

try {
  await server.connect(transport);
  console.log(chalk.green("Server connected successfully using stdio transport."));
} catch (error) {
  console.error(chalk.red("Error connecting the server:"), error);
}
