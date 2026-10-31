# Pocket money dashboard

A read-only pocket-money dashboard built with Next.js and exported as a static site for GitHub Pages.

## Update the dashboard

Edit [`src/data/dashboard.json`](./src/data/dashboard.json) in GitHub and commit the change to `main`. The Pages workflow will build and publish the update. The data file is public, so only put information here that you are comfortable making public.

- `initialBalanceCents`: opening balance, in euro cents.
- `savingsTargetCents`: savings goal, in euro cents.
- `freezeEnabled`: whether the savings freeze is on.
- `earnings`: earnings with a unique `id`, ISO date (`YYYY-MM-DD`), title, description, and amount in cents.

Amounts are stored as integer cents to avoid floating-point rounding. An earning is automatically marked complete on or after its date, based on the visitor's local date; it is then included in the balance. “Future planned total” adds up only earnings with dates after today. The dashboard updates these totals daily without needing a new deployment. Completion is calculated from the date, so do not add a `completed` field.

## Deploy to GitHub Pages

Push this project to a GitHub repository on the `main` branch. In the repository's **Settings → Pages**, select **GitHub Actions** as the build and deployment source. The included workflow builds the static site and deploys it, including the correct path for project pages and user/organization pages.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). Run `npm run lint` and `npm run build` to validate the site.
