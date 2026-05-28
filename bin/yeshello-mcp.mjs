#!/usr/bin/env node

/**
 * YesHello MCP Server - CLI proxy
 *
 * Starts a local stdio MCP server that proxies all tool calls
 * to the hosted YesHello API at https://yeshello.app/api/mcp.
 *
 * Usage:
 *   yeshello-mcp --api-key yh_key_abc123
 *   yeshello-mcp --api-key $YESHELLO_API_KEY
 *
 * Or set env var:
 *   YESHELLO_API_KEY=yh_key_abc123 yeshello-mcp
 */

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'

const API_BASE = process.env.YESHELLO_API_URL || 'https://yeshello.app'

// Parse --api-key from args or env
function getApiKey() {
  const args = process.argv.slice(2)
  const keyIndex = args.indexOf('--api-key')
  if (keyIndex !== -1 && args[keyIndex + 1]) {
    return args[keyIndex + 1]
  }
  if (process.env.YESHELLO_API_KEY) {
    return process.env.YESHELLO_API_KEY
  }
  console.error('Error: API key required.')
  console.error('')
  console.error('Usage:')
  console.error('  yeshello-mcp --api-key yh_key_YOUR_KEY')
  console.error('')
  console.error('Or set environment variable:')
  console.error('  export YESHELLO_API_KEY=yh_key_YOUR_KEY')
  console.error('')
  console.error('Get your API key at: https://yeshello.app/dashboard/settings/ai-api')
  process.exit(1)
}

const apiKey = getApiKey()

// Fetch tool definitions from the live server
async function fetchToolDefinitions() {
  const res = await fetch(`${API_BASE}/api/mcp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/list',
      params: {},
    }),
  })

  if (!res.ok) {
    if (res.status === 401) {
      console.error('Error: Invalid API key. Check your key at https://yeshello.app/dashboard/settings/ai-api')
      process.exit(1)
    }
    throw new Error(`Failed to fetch tools: ${res.status}`)
  }

  const data = await res.json()

  // Handle JSON-RPC response
  if (data.result && data.result.tools) {
    return data.result.tools
  }

  // Handle streaming response - might need to parse differently
  if (Array.isArray(data)) {
    const toolsMsg = data.find(m => m.result?.tools)
    if (toolsMsg) return toolsMsg.result.tools
  }

  throw new Error('Unexpected response format from server')
}

// Proxy a tool call to the hosted server
async function proxyToolCall(toolName, args) {
  const res = await fetch(`${API_BASE}/api/mcp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 2,
      method: 'tools/call',
      params: {
        name: toolName,
        arguments: args || {},
      },
    }),
  })

  if (!res.ok) {
    return {
      content: [{ type: 'text', text: `Error: ${res.status} ${res.statusText}` }],
      isError: true,
    }
  }

  const data = await res.json()

  if (data.result) {
    return data.result
  }

  if (data.error) {
    return {
      content: [{ type: 'text', text: `Error: ${data.error.message || JSON.stringify(data.error)}` }],
      isError: true,
    }
  }

  return {
    content: [{ type: 'text', text: JSON.stringify(data) }],
  }
}

// Main
async function main() {
  // First, initialize with the remote server to get server info
  const initRes = await fetch(`${API_BASE}/api/mcp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      jsonrpc: '2.0',
      id: 0,
      method: 'initialize',
      params: {
        protocolVersion: '2025-11-25',
        capabilities: {},
        clientInfo: { name: 'yeshello-mcp-cli', version: '1.0.0' },
      },
    }),
  })

  if (!initRes.ok) {
    if (initRes.status === 401) {
      console.error('Error: Invalid API key. Get yours at https://yeshello.app/dashboard/settings/ai-api')
      process.exit(1)
    }
    console.error(`Error: Could not connect to YesHello server (${initRes.status})`)
    process.exit(1)
  }

  const initData = await initRes.json()
  const serverInfo = initData.result?.serverInfo || { name: 'yeshello', version: '1.0.0' }
  const instructions = initData.result?.instructions || ''

  // Create local MCP server
  const server = new McpServer(
    { name: serverInfo.name, version: serverInfo.version },
    { instructions },
  )

  // Fetch all tool definitions from remote
  let tools
  try {
    tools = await fetchToolDefinitions()
  } catch (err) {
    console.error(`Error fetching tools: ${err.message}`)
    process.exit(1)
  }

  // Register each tool as a proxy
  for (const tool of tools) {
    // Build a simple schema that accepts any object
    // The real validation happens on the server side
    const inputSchema = tool.inputSchema || { type: 'object', properties: {} }

    server.registerTool(tool.name, {
      title: tool.title || tool.name,
      description: tool.description || '',
      annotations: tool.annotations || {},
      inputSchema: {
        // Pass through the schema shape but use z.object with passthrough
        // to accept whatever the client sends
        type: 'object',
        properties: inputSchema.properties || {},
        required: inputSchema.required || [],
      },
    }, async (args) => {
      return proxyToolCall(tool.name, args)
    })
  }

  // Connect via stdio
  const transport = new StdioServerTransport()
  await server.connect(transport)

  console.error(`YesHello MCP server running (${tools.length} tools)`)
}

main().catch((err) => {
  console.error('Fatal error:', err.message)
  process.exit(1)
})
