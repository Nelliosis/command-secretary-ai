import { MCPClient } from "@mastra/mcp";
import { configDotenv } from "dotenv";

configDotenv();

export const mcp = new MCPClient({
    servers: {
        "github": {
            "url": new URL("https://api.githubcopilot.com/mcp/"),
            requestInit: {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${process.env.GITHUB_MCP_PAT}`
                }
            }
        },
        "atlassian": {
            "command": "npx",
            "args": ["-y", "mcp-remote", "https://mcp.atlassian.com/v1/sse"]
        },
        "supabase": {
            "command": "npx",
            "args": [
                "-y",
                "@supabase/mcp-server-supabase@latest",
                "--read-only",
                `--project-ref=${process.env.SUPABASE_PROJECT_REF}`
            ],
            env: {
                "SUPABASE_ACCESS_TOKEN": process.env.SUPABASE_ACCESS_TOKEN || ""
            }
        },
        "asana": {
            "command": "npx",
            "args": ["mcp-remote", "https://mcp.asana.com/sse"]
        },
        "google_workspace": {
            "command": "npx",
            "args": ["mcp-remote", "http://localhost:8000/mcp"],
            "env": {
                "GOOGLE_OAUTH_CLIENT_ID": process.env.GOOGLE_OAUTH_CLIENT_ID || "",
                "GOOGLE_OAUTH_CLIENT_SECRET": process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
                "OAUTHLIB_INSECURE_TRANSPORT": "1"
            }
        }
    }
});