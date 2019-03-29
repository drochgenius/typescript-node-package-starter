# Setup Node Package with TypeScript

This repository demonstrate how to setup a Node project with Typescript, and how to publish the code as an NPM package on HMH private NPM registry.

## What is TypeScript

* You don't need to learn another programming language: TypeScript is a superset of JavaScript, it's just JS + static type safety.
* Typescript catches type-related bugs in your IDE, and at compilation time.
* TypeScript compiles to readable, standards-based JavaScript. 

## Why should I use it?

* Improve the quality of your JavaScript codebases.
* Like Babel, it lets you write you code with ESnext syntax compiled to the target you want: ES5, ES6, ESnext.
* Provides Enhanced IntelliSense in Visual Studio Code
* Gives you refactoring superpowers.
* Helps you enforce contracts by sharing type definitions between the client and the server.

For more details and full documentation, see the [TypeScript website](https://www.typescriptlang.org/).

## TL;DR;

* All source code in `src/` folder.
* `src/` must contain a `tsconfig.json` file.
* Compile to `dist/` folder.
* You need an empty `.npmignore` file, to make sure both `src` and `dist` files are distributed over NPM.
* In your `package.json`:
  * Make sure your module name is prefixed by `@hmh/` scope.
  * Add `main` that points to you module's generated `.js` entry point.
  * Add `types` to point to your module's generated type definitions `.d.ts` file.
  * Add a `build` script to compile your source: `tsc -p src`.
  * Add a `watch` script to compile your source: `tsc -p src -w`.
  * Add a `prepublishOnly` script to auto-compile your source on publish.


## Step 1 - initialize your package

```bash
npm init -y
```

Then edit the `package.json`.

* `name`: prepend with `@hmh` scope.
* `version`: you can decide what is a proper initial package version, e.g. `0.1.0`
* Add a `description`.


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

* Initialize your `tsconfig.json` file. 

```
npx typescript --init
```

* And edit the `tsconfig.json`.

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

* Add a file `src/index.ts` with some basic Typescript code.

* Add a `build` script to your `package.json`: 

```javascript
  "scripts": {
    "build": "tsc -p src",
  },
```

* Run the script to test compilation:

```
npm run build
```

This should have create a `dist/` directory with you compiled `.js` code along with type definition `.d.ts` files and sourcemaps.

* Add `dist/` to your `.gitignore` so it's not tracked by version control.

## Step 4 - prepare your code for publishing

* Make sure you are setup to publish on [HMH NPM Registry](https://github.com/hmhco/uie-wg/blob/master/arb/npm-registry.md).

Edit the `package.json`.

* Setup the `main` and `types` entry points for your module:

```javascript
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
```

* Add a `prepublishOnly` npm script to make sure our code gets compiled prior to publishing.

```javascript
  "scripts": {
    "build": "tsc -p src",
    "prepublishOnly": "npm run build"
  },
```

* Create an empty `.npmignore` to make sure you `dist/` files will be published even if they are ignore from source control.

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