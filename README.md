<div align="center">
<h1 align="center">
<img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" />
<br>MCP-DEMO-0310</h1>
<h3>◦ A powerful Weather API client using Model Context Protocol!</h3>
<h3>◦ Developed with the software and tools below.</h3>

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

This project showcases a simple yet powerful client-server interaction for obtaining weather data. Built using the Model Context Protocol, it exemplifies how easy it can be to integrate AI-driven functionalities with a traditional client-server architecture.

🎯 **Features**
- Connect to a weather API server.
- Retrieve the current weather based on user inputs.
- Access location data with dynamic tools.
- Interactive command-line interface for real-time querying.

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
4. Run the server first:
   ```bash
   node build/server.js
   ```
5. In a new terminal, run the client:
   ```bash
   npm start build/client.js
   ```

🛠️ **Tech Stack**
- Node.js
- TypeScript
- Model Context Protocol SDK
- Chalk for terminal text styling
- Zod for schema validation

📂 **Folder Structure**
```
mcp-demo-0310/
├── build/               # Compiled files
├── src/                 # Source files
│   ├── client.ts         # Client implementation for querying
│   └── server.ts         # Server setup for handling requests
├── .gitignore           # Ignore files for git
├── .nvmrc               # Node version management
├── package.json         # Project dependencies and scripts
└── tsconfig.json        # TypeScript configuration
```

📜 **License & Credits**
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

For contributions or questions, please open an issue or submit a pull request on the GitHub repository. Happy coding!