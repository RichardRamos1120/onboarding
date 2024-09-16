# Eirene Onboarding Project

## Getting Started

Make sure node and npm are installed on your machine.

Run `npm install` to install node dependencies.

Run `npm run test` to run unit tests.

Run `npm run build` to transpile typescript.

Run `npm run start` to execute transpiled typescript.

## Goals

This project is designed to introduce the following:

1) advanced typescript usage
2) functional programming tactics such as partial application, immutability and closure
3) the concept of projections (aka materialized views)
4) event driven architecture
5) eventual consistency

## Overview

This is a distributed todo app - three seperate services come together to create a mock version of a system that might be 
deployed to the cloud. No extenal libraries are used so everything will be implemented using vanilla typescript. 

These services are the three services implemented in the `src/apps` folder:

1) Web UI: Allow users to view a list of all todos in the browser; periodically (re)renders a webpage based on all todos saved in the system
2) Web API: Allow users to add, update and remove todos by sending requests to an API 
3) Newsletter: Increases engagement by periodically sending an email that lists the titles of recently added todos 

These three services will communicate asynchronously via an event bus. The web API will publish events to the bus and the other two services must update their own states in response. To see how these services are wired together, see `src/main.ts`.

## Requirements

To complete this project, fill in the gaps in implementation of this system. Anywhere you see a throw `NotImplemented` statement, provide an implementation. Typescript type definitions, code comments, and unit tests are provided for every function you need to implement. 

The longest block of code you will need to write should be around 20 lines, but many functions will only require you to write a few lines, if not a single line. Focus on understanding the concepts introduced and use the type definitions and unit tests to guide you.

Here are the recommended steps for completing the project:

1) Run unit tests with `npm run test` - run these frequently to measure your progress
2) Learn about immutablity and pure functions by implementing utility functions for structures in `src/data/struct.ts`
3) Learn to use closures by implementing the Observable data type in `src/data/observable.ts`
4) Learn about TS generics, and partial function application by implementing EventCreator in `src/core/event.ts`
5) Learn about reducers and projections by implementing Projection in `src/core/projection.ts`
6) Learn about entities by implementing a Todo constructor in `src/todos/entities.ts`
6) Solidify your understanding of reducers and projections by implementing the two projections described in `src/todos/projections.ts`
7) When all tests pass, run the complete application with `npm run build && npm run start` and watch the system go! 

## Conclusion

Once youre done, take a moment to observe the interactions between the different services by watching the console. Notice how sometimes the the webpage isnt in sync with its database because it hasnt been updated yet? This is called eventual consistency and its an important concept to understand when working with event driven systems. 

## Submission

To submit your work, delete the node modules folder, create a .zip archive of the project root directory and email it to your interviewer.

Project bootstrapped using [NodeJS Starter ToolKit](https://github.com/vitorsalgado/create-nodejs-ts).  
Visit the repository for more details.
