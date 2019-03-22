# Setup Node Package with TypeScript

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
        "declaration": true,
        "sourceMap": true,
        "outDir": "../dist",
        "rootDir": "./",
        "moduleResolution": "node",
        "baseUrl": "./"
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

