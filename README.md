# Description

I am creating this as a personal task management system. Feel free to use it if you like it.

# Setup

## Installation

Create local `.env` file by copying `.env.example` file:

```bash
$ cp .env.example .env
$ nvm use
$ npm install
```

> Note: _If you do not have node version manager installed, make sure to user proper node version from_ **.nvmrc** _file_

## Docker

For running postgres database

Navigate to the app directory and run:

```sh
$ docker-compose up
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Swagger documentation

After running the app and checking the `.env` file for the path, you can find the API documentation by opening `localhost`.

> Note: _http://localhost:3000/api/documentation_ is default for accesing documentation.

## Endpoints

Here you can find the **endpoints** for different modules:

- Health-check module that verifies that the app is running
- User-auth module for user authentication and authorization
- User-management module for basic CRUD endpoints
- Task-management module for managing tasks and


  > Note: _In order to manage tasks, after authorizing the specific user you will need to take that JWT token and use it to authorize actions for tasks-management. You can see_ **AUTHORIZE** _button at the top of the page containing the api documentation._
