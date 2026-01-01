Weekend Project: AI-Assisted Collection Builder (React + TypeScript)

This is a feature slice of an AI-powered collection creation flow. Built it over the weekend to demonstrate a production-quality react app.

## Setup

First run `npm install` to grab the dependencies.

Then simple start the dev server:
```bash
npm run dev
```
It runs on port 5173 usually.

To run the e2e tests (playwright):
```bash
npm run test:e2e
```

## Architecture decisions

### Stack: Vite + React + TS
Went with Vite because its fast and easy to setup. Typescript is non-negotiable for me, need those safety checks especially when dealing with api responses.

### State Management
Used React Context + useReducer.
Didnt want to pull in Redux or Zustand for a single wizard flow. The `WizardContext` basically handles the state machine (idle -> loading -> success). Its simple and keeps things clean without boilerplates.

### Styling
I extracted the design tokens from Figma (colors, spacing etc) into a `tokens.css` file.
For components i used CSS Modules. It helps avoids class name collisions and keeps the styles next to the component code.

### The "AI"
Since there's no real backend here, I simulated the AI.
`api.ts` has a `simulateAiRequest` function. It waits a bit (latency) and then returns some mock data based on keywords.
like if you type "wedding", it gives you wedding templates. simplicity wins here.

## Known limitations / Tradeoffs

- **Session persistence**: I'm saving state to `sessionStorage` so if you refresh it stays, but if you close the tab its gone. For a real app i'd probably use a DB draft or localstorage.
- **The AI is mocked**: Its just a heuristic mock, not calling OpenAI realy.
- **Mobile**: It works on mobile but the perview card is kinda tight. Optimized it mostly for desktop users as per the design.

## Design stuff
Tried to be pixel perfect with the Figma.
- Font is Glamour Absolute and Avenir (matches the real site).
- Spacing and shadows should match the specs exacty.
- Added some nice hover states so it doesnt feel dead.

---
