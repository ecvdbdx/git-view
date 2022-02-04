# git-view

## Installation

`npm install`

## Start development server

`npm run electron:serve`

## Build for production

`npm run electron:build`

# Releases

> ⚠️ Every new release published will notify users and update there electron app

1. Update app version in the `package.json` following the [Semantic Versioning](https://semver.org/) guidelines.
2. Commit and push the app version update on a dedicated branch using this pattern: `"release/: {version_number}"`.
3. When the branch is **ready and merged**, run the following command on the `main` branch: `npm run gh-publish`.
4. A **pre-release** should be created in the github repo and can be release.
