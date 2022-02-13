<h1 align="center">Git View</h1>
<p align="center"> 
<img src="public/favicon.ico" alt="Git View Logo" height="64" />
<br>
Git View is an educational open source project developed by the web development students at ECV Digital.
<br>
Using VueJs and ElectronJs
<br>
<img src="https://vuejs.org/logo.svg" alt="VueJs Logo" height="32" />
<img src="https://www.electronjs.org/images/electron-logo.svg" alt="Electronjs Logo" height="32" />
</p>

## Table of content

1. [Getting Started](#getting-started)
2. [Release Guide](#release-guide)
3. [Architecture](./documentation/project-structure.md)
4. [Contributing Guide](CONTRIBUTING.md)

## Getting Started

### Installation

`npm install`

### Start development server

`npm run electron:serve`

### Build for production

`npm run electron:build`

## Release Guide

> ⚠️ Every new release published will notify users and update there electron app

### Github token

Create a `.env` file at the root of your local project. Copy the content of `.env.example` and put your [Github token](https://github.com/settings/tokens/new) in.

### Release process

1. Update app version in the `package.json` following the [Semantic Versioning](https://semver.org/) guidelines.
2. Commit and push the app version update on a dedicated branch using this pattern: `"release/: {version_number}"`.
3. When the branch is **ready and merged**, run the following command on the `main` branch: `npm run gh-publish`.
4. A **pre-release** should be created in the github repo and can be release.
