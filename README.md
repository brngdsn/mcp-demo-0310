<div align="center">
<h1 align="center">
<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
<br>MCP-DEMO-0310</h1>
<h3>Model Context Protocol with Ollama</h3>
<h3>Built with the latest tools and technologies</h3>

<p align="center">
<img src="https://img.shields.io/github/license/brngdsn/mcp-demo-0310?style=flat-square&color=5D6D7E" alt="GitHub license" />
<img src="https://img.shields.io/github/last-commit/brngdsn/mcp-demo-0310?style=flat-square&color=5D6D7E" alt="git-last-commit" />
<img src="https://img.shields.io/github/languages/top/brngdsn/mcp-demo-0310?style=flat-square&color=5D6D7E" alt="GitHub top language" />
<img src="https://img.shields.io/github/languages/count/brngdsn/mcp-demo-0310?style=flat-square&color=5D6D7E" alt="GitHub language count" />
<img src="https://img.shields.io/github/repo-size/brngdsn/mcp-demo-0310?style=flat-square&color=5D6D7E" alt="GitHub repo size" />
</p>

<p align="center">
<img src="https://img.shields.io/badge/Node.js-8CC84B.svg?style=flat-square&logo=Node.js&logoColor=black" alt="Node.js" />
<img src="https://img.shields.io/badge/TypeScript-3178C6.svg?style=flat-square&logo=TypeScript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Chalk-5C6BC0.svg?style=flat-square&logo=Chalk&logoColor=white" alt="Chalk" />
<img src="https://img.shields.io/badge/Dotenv-7B7B7B.svg?style=flat-square&logo=dotenv&logoColor=white" alt="Dotenv" />
<img src="https://img.shields.io/badge/Zod-1D9BF0.svg?style=flat-square&logo=Zod&logoColor=white" alt="Zod" />
<img src="https://img.shields.io/badge/Ollama-42B883.svg?style=flat-square&logo=Ollama&logoColor=white" alt="Ollama" />
<img src="https://img.shields.io/badge/@modelcontextprotocol/sdk-FF3D00.svg?style=flat-square&logo=modelcontextprotocol&logoColor=white" alt="@modelcontextprotocol/sdk" />
</p>
</div>

---

📖 **About the Project**

MCP-DEMO-0310 is a sophisticated client-server application that leverages AI-powered autonomous decision-making to retrieve weather data dynamically. Utilizing the **Model Context Protocol (MCP)**, this project showcases how an AI agent can intelligently select tools and process queries in real-time, demonstrating a new paradigm in API interactions.

🎯 **Features**
- AI-driven **agentic query processing** powered by an LLM.
- Autonomous **tool selection** for dynamic responses.
- Real-time **weather data retrieval** from an API.
- Interactive **command-line interface** for seamless user interaction.

🚀 **Quick Start**
1. Clone the repository:
   ```bash
   git clone https://github.com/brngdsn/mcp-demo-0310.git
   ```
2. Navigate to the project directory:
   ```bash
   cd mcp-demo-0310
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the server:
   ```bash
   node build/server.js
   ```
5. Run the client in a new terminal:
   ```bash
   npm start build/client.js
   ```

🛠️ **Tech Stack**
- **Node.js** – Backend runtime
- **TypeScript** – Statically typed JavaScript
- **Model Context Protocol SDK** – AI-driven tool selection
- **Chalk** – Terminal text styling
- **Zod** – Schema validation

📂 **Folder Structure**
```
mcp-demo-0310/
├── build/               # Compiled files
├── src/                 # Source files
│   ├── client.ts        # AI-powered client processing queries
│   └── server.ts        # Handles API interactions
├── .gitignore           # Git ignore rules
├── .nvmrc               # Node.js version management
├── package.json         # Project dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

📜 **License & Contributions**
This project is open-source under the MIT License - see the [LICENSE](LICENSE) file for details.

Contributions and feedback are welcome! Submit issues or pull requests via GitHub. Happy coding! 🚀

