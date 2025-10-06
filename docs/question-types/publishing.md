---
sidebar_label: Publishing
sidebar_position: 6
---

# Publishing question types

Once you've implemented your custom question type and its components, you can publish it to make it available for use in assessments. This involves packaging your question type and making it accessible within the Examplary platform.

## Acquire an API key

To publish your question type, you need an API key. You can create an API key on the settings page of your Examplary account.

Note that API keys are scoped against your workspace, so any question types you publish will be available to all users in your workspace.

## Setting `public`

Choose whether you want your question type to only be available to your workspace or to all Examplary users.

If you set `public` to `true`, your question type will be listed in the public question type library, making it available to all users. If it's not set, or set to `false`, it will only be available within your workspace.

```json
{
  "public": true
}
```

## Publishing your question type

Make sure you have a recent version of Node and NPM installed, then run the following command in your question type folder:

```shell
npx @examplary/cli upload --key YOUR_API_KEY
```

Your question type will be uploaded to the Examplary platform, and if successful, it will immediately be available for use in assessments.

You can also provide the API key via environment variable (useful in CI): set `EXAMPLARY_API_KEY` and run `npx @examplary/cli upload` without the `--key` flag.

:::warning
Once a question type has ever been used in a test, it cannot be deleted. This is to ensure that assessments remain consistent and that we don't break any existing tests.

Upload a new version with `public` set to `false` if you want to remove it from the public library.
:::
