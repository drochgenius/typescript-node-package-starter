# Setup Node Package with TypeScript

This repository demonstrate how to setup a Node project with Typescript, and how to publish the code as an NPM package on HMH private NPM registry.

## What is TypeScript

-   Not another language: JavaScript + Static type checking.
-   Typescript catches type-related bugs in your IDE, and at compilation time.
-   TypeScript compiles to readable, standards-based JavaScript.

## Why should I use it?

-   Improve the quality of your JavaScript codebases
-   Replaces Babel
-   Provides Enhanced IntelliSense in Visual Studio Code
-   Gives you refactoring superpowers
-   Helps you enforce contracts by sharing type definitions between the client and the server

For more details and full documentation, see the [TypeScript website](https://www.typescriptlang.org/).

## TL;DR;

-   Install TypeScript: `npm i -D typescript`.
-   Write source code in `src/` folder.
    -   `src/` must contain a `tsconfig.json` file.
-   Compile to `dist/` folder.
-   Add empty `.npmignore` file to distribute `src` + `dist`.
-   In your `package.json`:
    -   `name` prefixed with `@hmh/`.
    -   `main`: generated `.js` entry point.
    -   `types`: generated type definitions `.d.ts`.
    -   `build` script: `tsc -p src`.
    -   `watch` script: `tsc -p src -w`.
    -   `prepublishOnly` script to compile on publish.
-   Install missing type definitions for external dependencies: `npm i -D @types/<package-name>`.

Join **[#typescript](https://hmhco.slack.com/messages/CHG9T3Q8P)** channel on HMHCO slack if you have further questions or need help with TypeScript.


## Step 1 - initialize your package

```bash
npm init -y
```

Then edit the `package.json`.

-   `name`: prepend with `@hmh` scope.
-   `version`: you can decide what is a proper initial package version, e.g. `0.1.0`
-   Add a `description`.

Then create a `.gitignore` file, with a single line to start with:

```
node_modules/
```

## Step 2 - install TypeScript

```bash
npm i -D typescript
```

## Step 3 - initialize your source directory

The source directory will contain your package source code written with TypeScript.

```bash
mkdir src
cd src
```

-   Initialize your `tsconfig.json` file.

```
npx typescript --init
```

-   And edit the `tsconfig.json`.

```javascript
{
    "compilerOptions": {
        "target": "esnext",
        "module": "commonjs",
        "moduleResolution": "node",
        "declaration": true,
        "sourceMap": true,
        "outDir": "../dist",
        "rootDir": "./"
    }
}
```

-   Add a file `src/index.ts` with some basic Typescript code.

-   Add a `build` script to your `package.json`:

```javascript
  "scripts": {
    "build": "tsc -p src",
  },
```

-   Run the script to test compilation:

```
npm run build
```

This should have create a `dist/` directory with you compiled `.js` code along with type definition `.d.ts` files and sourcemaps.

-   Add `dist/` to your `.gitignore` so it's not tracked by version control.

## Step 4 - prepare your code for publishing

-   Make sure you are setup to publish on [HMH NPM Registry](https://github.com/hmhco/uie-wg/blob/master/arb/npm-registry.md).

Edit the `package.json`.

-   Setup the `main` and `types` entry points for your module:

```javascript
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
```

-   Add a `prepublishOnly` npm script to make sure our code gets compiled prior to publishing.

```javascript
  "scripts": {
    "build": "tsc -p src",
    "prepublishOnly": "npm run build"
  },
```

-   Create an empty `.npmignore` to make sure you `dist/` files will be published even if they are ignore from source control.

```bash
touch .npmignore
```

## Step 5 - publish your package

```bash
npm publish
```

Confirm that your package have been published:

```bash
npm show @hmh/typescript-node-package-starter
```

## Step 6 - add external type definitions

When you project have dependencies, you must provide type definitions for them.

* Today, popular packages ship with their own type definitions: this means there nothing to do.
* If the package you want does not provide its own definitions, chances are they are available as standalone definitions you can install separately: `npm install @type/<dependency-name>`.
* If none of the above is available, you can simply tell TypeScript to ignore by providing the following stub definition: `declare module "<dependency-name>"`;
