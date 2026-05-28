<p align="center">
  <img src="https://yeshello.app/logo.svg" alt="YesHello" width="200" />
</p>

<h1 align="center">yeshello-mcp</h1>

<p align="center">
  <strong>MCP server for YesHello - digital business cards, lead capture forms, and service listings</strong>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/yeshello-mcp"><img src="https://img.shields.io/npm/v/yeshello-mcp" alt="npm" /></a>
  <img src="https://img.shields.io/badge/tools-63-orange" alt="63 tools" />
  <img src="https://img.shields.io/badge/transport-stdio-blue" alt="stdio" />
  <a href="https://glama.ai/mcp/servers/yeshello-app/mcp"><img src="https://glama.ai/mcp/servers/yeshello-app/mcp/badges/score.svg" alt="Glama score" /></a>
</p>

## Install

```bash
npm install -g yeshello-mcp
```

## Setup

Get your API key from [yeshello.app/dashboard/settings/ai-api](https://yeshello.app/dashboard/settings/ai-api).

Free account available - no credit card required.

### Claude Desktop / Claude Code

Add to your MCP config (`~/.claude/claude_desktop_config.json`):

```json
{
  "mcpServers": {
    "yeshello": {
      "command": "yeshello-mcp",
      "args": ["--api-key", "yh_key_YOUR_KEY"]
    }
  }
}
```

### Cursor

Add to `.cursor/mcp.json`:

```json
{
  "mcpServers": {
    "yeshello": {
      "command": "yeshello-mcp",
      "args": ["--api-key", "yh_key_YOUR_KEY"]
    }
  }
}
```

### VS Code / Windsurf / Cline

Same config format - add to your MCP settings.

### Environment variable

```bash
export YESHELLO_API_KEY=yh_key_YOUR_KEY
yeshello-mcp
```

## What it does

Give AI a website URL, and it builds your complete digital business card in under 2 minutes.

- **63 tools** - cards, forms, listings, media, browser control, guided tours
- **Build from URL** - AI scrapes your website and creates a card with your real content
- **Live editing** - watch the AI build your card in real-time in the browser
- **Stock photos** - search and import from Pexels
- **3 themes** - Professional, Cinematic, Wave
- **20+ field types** - hero, about, gallery, FAQ, social links, action buttons, video, services, and more

## Example

After setup, just ask your AI:

```
"Build me a digital business card from https://mywebsite.com"
```

The AI will scrape your website, find images, and create a published card with your name, bio, services, contact info, and social links.

## How it works

This CLI starts a local MCP server that proxies all tool calls to `https://yeshello.app/api/mcp`. Your API key authenticates each request. The 63 tools are fetched dynamically from the hosted server, so you always get the latest capabilities.

## Links

- [Website](https://yeshello.app)
- [Documentation](https://yeshello.app/docs/mcp-connector)
- [Get API Key](https://yeshello.app/dashboard/settings/ai-api)
- [GitHub](https://github.com/yeshello-app/yeshello-mcp)
- [Privacy Policy](https://yeshello.app/page/privacy-policy)

## License

MIT
