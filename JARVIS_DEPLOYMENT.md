# Deploying JARVIS conversational AI

The app's browser interface is static, but natural AI replies need the server-side endpoint in `api/chat.js`. GitHub Pages cannot run that endpoint. Deploy this repository to Vercel (or another host that supports Node serverless functions).

## Vercel setup

1. Sign in to Vercel and import `godwinjoby16-web/Grrrrr` from GitHub.
2. Use the repository root as the project root. No build command is required for the static HTML app.
3. In the Vercel project settings, add an environment variable named `OPENAI_API_KEY`. Its value must be a valid API key created by the account owner. Keep it private: never paste it into `index.html`, GitHub files, a chat message, or the phone.
4. Optionally set `OPENAI_MODEL` to a model enabled for that API account. If omitted, the endpoint uses its configured default.
5. Deploy, then open the Vercel deployment URL and test a typed JARVIS conversation followed by a spoken one.

## Important

- A Vercel deployment and a valid server-side API key are both required. Committing these files to GitHub alone does not activate AI.
- API usage may incur charges. The account owner should approve and manage the API account, spending limits, and billing.
- The existing GitHub Pages address cannot execute `api/chat.js`; use the Vercel deployment URL for the installed app if GitHub Pages is currently hosting it.
- Never share the API key with anyone or commit it to the repository.
