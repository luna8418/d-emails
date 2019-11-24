## :Different Email Management Service

With basic functionalities as below:
- All RESTful endpoint are implemented as required
- Send email via SendGrid Api
- Swagger YAML file for both api docs & validations http://localhost:2010/api-docs/
- Health check endpoint at http://localhost:2010/healthcheck

## Decisions made

After reading through the requirement, I made the below decisions:

- Use NodeJS / Express / TypeScript / Jest as the tech stacks
- All configs are in `.env`, later on could be easily set as the env variables
- Use Swagger YAML file for both the api docs and validations
- No database layer, just store the email records into the memory
- No queued feature, all emails are always sent straight away (The reason is deciding when to send or queue email is quite a simple enhancement on the top of current code base)
- Tradeoff I made is to use a well formed and good practise to build the endpoints rather than finish all the requirements. The missing part could be easily added. 


## Known Issues & TODO

- Fields includ `from`, `to`, `cc` and `bcc` only allow one single email address at the moment
- I put a temporary sendgrid free api key, so the send email should be working, will delete the key later on
- `npm lint` config has issues and does not work at the moment


## Requirements

- npm >= 6
- I am using Node 10.13.0 & npm 6.4.1 for your references

## How to start local server

Change SENDGRID_API_KEY in `.env` before running the following commands

```
npm i
DOTENV=.env npm run dev
```

## More Commands

1. `npm run jest` - start the test runner for both unit test and integration test

2. `npm run jest:coverage` - run test with coverage reports
