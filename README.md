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

## What is YesHello?

More than a card. Simpler than a website. YesHello replaces the website, the link-in-bio, the form builder, the reviews widget, and the NFC card - all in one platform.

**The problem:** You need a professional online presence but a website costs thousands, takes weeks, and needs a developer for every update. Link-in-bio tools look cheap and have zero SEO, no lead capture, no services.

**The solution:** Tell AI to build it from your website URL. In 2 minutes you get a mobile-first page with your services, portfolio, reviews, lead capture forms, booking, contact buttons, and a custom domain - ranking on Google from day one.

## What your AI can do with 63 tools

**Build your presence from scratch:**
- Scrape your website and extract your name, bio, services, contact info, social links
- Search and import professional stock photos from Pexels
- Create a published digital business card with one conversation
- Set up lead capture forms with webhook delivery to your CRM
- Create service listings with pricing and call-to-action buttons

**Live editing - the killer feature:**
- Open the builder in your browser, split screen with your AI chat
- Watch every field appear, every image load, every piece of text type itself in
- The AI builds your card live in front of your eyes - like watching a designer work

**Guide you through the platform:**
- AI highlights elements on your screen with tooltips
- Clicks through tabs and menus to show you features
- Fills input fields and navigates pages for you

## How to use

After setup, just talk to your AI like normal. No special commands. No syntax. Just say what you want:

1. Open **Claude Desktop**, **Cursor**, **VS Code**, or any MCP client you configured
2. Start a new conversation
3. Ask for what you need in plain English

That's it. The AI knows YesHello is connected and will use the right tools automatically. You don't need to mention "YesHello" or "MCP" - just describe what you want.

## Try these

```
"Build me a digital business card from https://mywebsite.com"
```
```
"Create a contact form with name, email, phone, and message"
```
```
"Add a services listing for my photography business with 3 packages"
```
```
"Show me around the card builder"
```

## Who it's for

Freelancers, consultants, photographers, realtors, plumbers, coaches, agencies, restaurants, salons - anyone who needs a professional online presence without a developer or agency.

**Free plan available.** No credit card required.

## How it works

This CLI starts a local MCP server that proxies all tool calls to `https://yeshello.app/api/mcp`. Your API key authenticates each request. The 63 tools are fetched dynamically from the hosted server, so you always get the latest capabilities.

## Links

- [Website](https://yeshello.app)
- [Documentation](https://yeshello.app/docs/mcp-connector)
- [Get API Key](https://yeshello.app/dashboard/settings/ai-api)
- [GitHub](https://github.com/yeshello-app/yeshello-mcp-npm)
- [Privacy Policy](https://yeshello.app/page/privacy-policy)

## License

MIT
