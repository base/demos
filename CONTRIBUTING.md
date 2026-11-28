# Contributing to Base Demos

Thanks for helping improve the Base demo applications. Contributions should make a demo easier to run, safer to use, or more useful as a reference for developers building on Base.

## Before you start

1. Browse the existing demos and choose the one that matches your change.
2. Check the [open issues](https://github.com/base/demos/issues) and [pull requests](https://github.com/base/demos/pulls) for related work.
3. For a substantial change, open or comment on an issue first so the scope can be discussed before implementation.
4. Keep each pull request focused on one demo or one clearly related improvement.

## Working on a demo

Each demo is intended to be independently runnable. Start by reading the README in the demo directory you plan to change.

- Follow that demo's documented runtime and package-manager requirements.
- Install dependencies using the lockfile and package manager already used by the project.
- Use the scripts defined in that demo's `package.json`; do not assume scripts from another demo apply.
- Keep demo-specific setup and configuration in that demo's directory unless a shared repository change is necessary.
- Update the demo README when setup steps, environment variables, supported networks, or behavior change.

## Security and funds

Base demos are educational examples. Treat keys, credentials, and funds carefully.

- Never commit private keys, seed phrases, API tokens, cookies, or populated `.env` files.
- Add new environment variables to the relevant example environment file with placeholder values and document what they do.
- Prefer test networks and faucet-funded assets for demonstrations and automated checks.
- Clearly identify any flow that sends a real transaction or spends real funds. Do not silently change a demo from a test flow to a mainnet flow.
- Validate chain IDs, contract addresses, token decimals, and transaction parameters before signing or submitting transactions.
- Do not describe a demo as production-ready unless its security, operational, and failure-handling requirements have actually been addressed.

## Testing

Run the checks relevant to the files you changed. Depending on the demo, these may include:

- dependency installation from the existing lockfile;
- linting and formatting;
- type checking and production builds;
- unit or integration tests;
- manual verification of the documented setup and user flow.

In your pull request, list the exact commands you ran and whether they passed. If a check could not be run, say why. Never report a test as passing if it was not executed.

For changes involving onchain behavior, explain the network and test conditions. Do not use real funds merely to demonstrate that a code path works.

## Pull request checklist

Before opening a pull request:

- [ ] The change is focused and does not include unrelated formatting or generated files.
- [ ] Documentation reflects the current behavior and setup.
- [ ] No secrets, local state, build output, or dependency directories are included.
- [ ] Relevant tests and checks have been run, with results recorded below.
- [ ] Any network, contract, token, or funding assumptions are explicit.

Use a descriptive title, summarize the problem and solution, link the related issue, and include a concise test plan. Screenshots or a short recording are helpful for visible UI changes.

## Scope and review

Please avoid broad refactors or new dependencies when a smaller change solves the problem. Keep examples readable and explain Base-specific behavior where it may not be obvious to someone learning from the demo.

All contributions are subject to review by the repository maintainers. Opening a pull request does not guarantee acceptance or merge.
