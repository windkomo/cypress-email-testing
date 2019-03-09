# Cypress Email Testing

Blog post: https://humble.dev/testing-an-email-workflow-from-end-to-end-with-cypress

Code sample demonstrating how to test an email based workflow with Cypress.
Mails are sent to Mailhog and exposed through its API.

## Installation

```
yarn
yarn start
```

Launches small express backend and mailhog server.
You need <a href="https://docs.docker.com/compose/install/">docker compose</a> installed to run mailhog.

## Running the tests

After the servers are running, run `yarn test` to launch the cypress tests in headless mode.
You can also run `yarn cypress open` to run tests within the Cypress UI.
