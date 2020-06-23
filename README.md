# Rosetta
Traductor / Translator App from Processing to OpenFrameworks

This is an app for translating Processing code into OpenFrameworks code, with syntax highlighting in real-time. Good support for Processing static and active modes. Made it in TypeScript, with Angular 2 and Electron.

P5 Version Supported:
  * Any stable version (no alpha or beta) can be used
  * Autodetect of versions

OF Version Supported:
  * 0.8.x
  * 0.9.x

**Note:** This software is not intended for the translation of large Processing projects to OpenFrameworks. It is recommended to use it like a support tool, and not like a precise translator.

---

## How use it

In order to use or edit the software you need to install the [npm](https://www.npmjs.com/) and [nodejs](https://nodejs.org/es/) packages. After that it is necessary to install Angular-CLI global:

```
npm install -g @angular/cli
```

First clone this repository:

```
git clone https://github.com/ibuioli/rosetta
cd rosetta
```

Install the packages with this script:

```
npm install
```

Then you can run the app with:

```
npm start
```

---

## Scripts Commands

For run in a localhost use it:

```
ng serve
```
**Note:** Please use Chrome or Firefox for Serve.

For build a dist use it:

```
npm run build
```

---
Contact: ibuioli@gmail.com
