# Project structure

Here you will find informations about the main principles we are following in our architecture.

## Introduction

We chose to use a module driven architecture to regroup specific components used only in specific parts of the app in the same area. All the project is built around this mindset to better separate everything.

Like this we can have a clearer view of what is in the global scope of the project or what is used only in a specific scope. It also allows us to have smaller `components/` and `composables/` folders that are only meant for globally used components and composables.

## Project architecture

```
.github/
.husky/
docs/
documentation/
public/
src/
├─ assets/
├─ components/
├─ composables/
├─ events/
├─ mocks/
├─ modules/
├─ router/
├─ services/
├─ utils/
├─ App.vue
├─ background.js
├─ main.js

```

## Table of Contents

1. [Assets](#the-assets-directory)
2. [Components](#the-root-components-directory)
3. [Composables](#the-composables-directory)
4. [Events](#the-events-directory)
5. [Modules](#the-modules-directory)
6. [Services](#the-services-directory)
7. [Utils](#the-utils-directory)

## The `assets/` directory

As other projects, this folder is meant to receive images, icons, or any assets the app could need. Just like `components/` or `composables/` directories, it's only for globally scoped assets that are used in multiple part of the app.

Any other asset that is only used in a specific scope must be placed on its module's `assets/` folder. (cf: [modules section](#the-module-directory))

Every type of asset needs to be placed in its dedicated folder type.

### Example:

```
assets/
├─ icons/
│  ├─ my-icon.svg
├─ images/
│  ├─ my-image.png
...
```

## The root `components/` directory

This is where you'll find every components that are global to the app. It's mainly meant to contain the components like Buttons, Inputs or everything that can be used in multiple part of the app.

As soon as a component is imported in at-least two parts of the project (or will be) it must be placed in the root `components/` folder.

If a component is only scoped to one module, place it into its module's `component/` directory. (cf: [modules section](#the-module-directory))

## The `composables/` directory

Composables are pieces of vueJs code that can be used in vue components. They allow you to externalize and segment logic for a more readable codebase.

Just like root `components/` or `assets/` this root `composables/` folder is here to contain global composbales that are used multiple times in the project.

Following vueJs standards a composable must be named with the `use` keyword, ex: `useMyComposable.js` and export a `useMyComposable` method.

If a specific module needs a specific and scoped composable, place it inside its own `composable/` directory. (cf: [modules section](#the-module-directory))

## The `events/` directory

Here you will find the list of events that are used by the Electron events listener. They are separated according to the services files that are defined in the `services/` folder and are imported in `background.js` to be initialized.

## The `module/` directory

This folder contains the main parts of the app. Every module can be defined as a feature with its own components, composables or anything it needs. A module can use another module as long as it helps the project readability.

### Structure example:

```
HomeModule/
├─ assets/
├─ components/
├─ composables/
├─ HomeModule.vue
├─ index.js
```

## The `services/` directory

## The `utils/` directory
