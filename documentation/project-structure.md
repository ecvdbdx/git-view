# Project structure

## Introduction

We chose to use a module driven architecture to regroup specific components used only in specific parts of the app in the same area. All the project is built around this mindset to better separate everything.

Like this we can have a clearer view of what is in the global scope of the project or what is used only in a specific scope. It also allows us to have smaller `components/` and `composables/` folders that are only meant for globally used components and composables.

Here you will find informations about the main principles we are following in our architecture.

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
5. [Mocks](#the-mocks-directory)
6. [Modules](#the-modules-directory)
7. [Services](#the-services-directory)
8. [Utils](#the-utils-directory)
