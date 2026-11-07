# JARVIS conversational AI setup

The browser app now sends chat messages to `/api/chat`. The API key is kept on the server and is never placed in `index.html`.

## Important

GitHub Pages only hosts static files; it cannot run the `api/chat.js` server function. To enable natural AI conversation, deploy this repository to Vercel (which supports the included serverless function) or another host that supports the same Node serverless API.

Because API keys and billing are involved, a parent or guardian should handle the provider account, deployment, and secret configuration.

## Vercel deployment

1. A parent/guardian signs in to Vercel and imports `godwinjoby16-web/Grrrrr` from GitHub.
2. Deploy the project using the repository root. Vercel automatically detects `api/chat.js`.
3. In the Vercel project settings, add the environment variable `OPENAI_API_KEY` with the API key. Do not put this key in GitHub or the app.
4. Optionally set `OPENAI_MODEL` to a model available to that API account. The default in the function is `gpt-4o-mini`.
5. Redeploy after adding the environment variable.
6. Open the Vercel app URL on the Android phone, test typed chat first, then test the microphone. Add that deployed site to the home screen if you want its icon.

The existing GitHub Pages icon will continue to open the static version and will not have AI chat until it is replaced with the deployed Vercel site.

## Privacy and cost

Chat messages are sent to the configured AI provider for replies. The app keeps a short recent conversation history in that browser's local storage and sends up to 12 messages for context. API usage may incur charges; set usage limits and monitor billing. Never share the API key.
