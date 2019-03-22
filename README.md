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

```
npm i -D typescript
```