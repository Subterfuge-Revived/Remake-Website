[![languages](https://img.shields.io/github/languages/top/Subterfuge-Revived/Remake-Website)]()
[![code-size](https://img.shields.io/github/languages/code-size/Subterfuge-Revived/Remake-Website)]()
[![commit-activity](https://img.shields.io/github/commit-activity/y/Subterfuge-Revived/Remake-Website)](https://github.com/Subterfuge-Revived/Remake-Website/pulse/yearly)
[![license](https://img.shields.io/github/license/Subterfuge-Revived/Remake-Website)](LICENSE)
[![discord](https://img.shields.io/discord/617149385196961792)](https://discord.gg/GNk7Xw4)
[![issues](https://img.shields.io/github/issues/Subterfuge-Revived/Remake-Website)](https://github.com/Subterfuge-Revived/Remake-Website/issues?q=is%3Aopen)
[![issues-closed-raw](https://img.shields.io/github/issues-closed/Subterfuge-Revived/Remake-Website)](https://github.com/Subterfuge-Revived/Remake-Website/issues?q=is%3Aclosed+)
[![Banner](banner.png)]()

# Remake-Website

This repository contains the website files for hosting the new game's website. The website is used for advertising the game, providing a dev-log, and allowing users to interact with various details about their user accounts. It also provides contact information and support details.

## Setup

#### With docker

Setting up with docker is the easiest way to get started.

1. If not installed, [install Docker](https://docs.docker.com/get-docker/) for your operating system.
2. Start the container with `docker-compose up -d`. (NOTE: If you are running for production, see info below.)
3. Access the website at `http://localhost`

If you are deploying to a production environment, modify step 2:
`docker-compose up -d -f Dockerfile.production`

#### Without Docker

If you would prefer to not use docker, the environment can be setup locally.

1. Install [Node.js](https://nodejs.org/en/download/)
2. Clone this repository to the location of your choice.
3. Install the javascript dependencies with `npm install`
4. Run the development server with `npm run dev`

## Scripts

Once the container has started, it might be required for you to need to execute one of the scripts found in the [package.json](/package.json) file.
In order to open the command line for the container, type `docker-compose exec web /bin/ash` to open the command line.

Once you are in the container, the following scripts are avaliable:

`npm run dev` - This command is run automatically when the container is started. This will start the development server on port `80` of the container and enable hot reloading. This means that when changes within the files are made, the website is automatically updated.

`npm run docs` - Generates the Vue component reference and hosts the component reference files on port `5000`. Once the command is executed you can view the component reference for Vue components. This documents all custom component props, slots, events, and more to provide a reference on how to use them.

`npm run test` - Runs the automated tests on the components.


To exit the command line, exit with `ctrl-Z`

## Installed Libraries and guides

The following libraries have been installed. These links are references to the developer docs for each library so that you may make use of them.

#### Development

[Bootstrap-Vue](https://bootstrap-vue.org/docs/components) - CSS famework
[Lodash](https://lodash.com/docs/) - Utility library
[Moment](https://momentjs.com/docs/) - 100x easier dates
[Sass](https://sass-lang.com/guide) - Dynamic CSS styles
[Vue](https://vuejs.org/v2/guide/) - The main javascript framework
[Vue-Awesome](https://github.com/Justineo/vue-awesome) - Vue font-awesome icon library
[Vue-Router](https://router.vuejs.org/) - Self explanitory for SPA
[Vuese](https://vuese.org/cli/#quick-start) - Automatic Vue component references 
[Vuex](https://vuex.vuejs.org/) - Vue state manager


#### Testing

[Chai](https://www.chaijs.com/api/bdd/) - Assertion library
[Istanbul](https://github.com/istanbuljs/nyc) - Test coverage tool
[Mocha](https://mochajs.org/) - Test runner
[Sinon](https://sinonjs.org/releases/v9.0.2/) - Mocks/Fakes/Stubs