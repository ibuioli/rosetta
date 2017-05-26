# Rosetta
Traductor App from Processing to OpenFrameworks

This is an App for transtale Processing code into OpenFrameworks code, with syntaxis highlight in real-time. Good support for Processing static and active mode. Made it in TypeScript, with Angular 2 and Electron.

P5 Version Supported:
  * Any stable version (no alpha or beta) can be used
  * Autodetect of Versions

OF Version Supported:
  * 0.8.x
  * 0.9.x

This software is not intended for the translation of large Processing projects to OpenFrameworks. It is recommended to use it like a support tool, and not like a precise traductor.

---

## How use it

In order to use or edit the software you need install npm and node packages and it's necessary install Angular-CLI global:

```
npm install -g @angular/cli
```

First clone this repository:

```
git clone https://github.com/ibuioli/rosetta
cd rosetta
```

Install the packages with (don't use ```npm install```):

```
npm run install_all
```

Then you can run the App with:

```
npm start
```

---

## Scripts Commands

For run in a localhost use it:

```
npm run serve
```
Note: Please use Chrome or Firefox for Serve.

For build a dist use it:

```
npm run build
```

For run only Electron-app without build (faster for testing):

```
npm run electron
```

---
Contact: ibuioli@gmail.com
