<p align="center">
    <img alt="Byefive Etiquetas" height="128" src="https://cdn.byefive.com.br/images/byefive-icon-min-purple.png">
    <h1 align="center">Byefive Authentication API</h1>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">Byefive's Authentication Serverless API is a business resource for creating and validating JWT TOKENs. </p>

<br />

## Dependencies Installation

```bash
$ yarn
```

## Running the app

```bash
# development
$ yarn start

# watch mode
$ yarn start:dev

# production mode
$ yarn start:prod
```

## Running local LAMBDA MODE

```bash
# development
$ yarn off:dev

# homologation mode
$ yarn off:hml

# production mode
$ yarn off:prod
```

## Build and Deploy app

```bash
# AWS key and secret is required for deploys

# for Homologation
$ yarn deploy:hml

# for Production
$ yarn deploy:prod
```

## Unit Test

```bash
# test all files
$ yarn test

# or 

$ yarn test:watch # for watching mode


# test a single file
$ yarn test <file_name.spec.ts>

# or 

$ yarn test:watch <file_name.spec.ts> # for watching mode
```
## Commit Flow Rules (with Commitzen and Husky)

```bash
# Add All  files
$ git add .

# Add especic files
git add <file1> <file2>

# Note: "Commiting with "Commitzen" 
# Do not commit by git default command line. 
# Use this command below:
yarn commit
```
