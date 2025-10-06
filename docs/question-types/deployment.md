---
sidebar_label: Continuous deployment
sidebar_position: 9
---

# Continuous deployment

You might decide to set up a GitHub repository for your question type and automate the deployment process using GitHub Actions or another CI/CD tool. This allows you to automatically publish new versions of your question type whenever you push changes to the main branch.

Below is an example of a GitHub Actions workflow that builds and publishes your question type whenever you push changes to the `main` branch.

```yaml title=".github/workflows/publish.yml"
name: Publish to Examplary

on:
  push:
    branches:
      - main

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - name: Check out repository code
        uses: actions/checkout@v4

      - name: Setup node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: yarn

      - name: Install dependencies
        run: yarn install

      - name: Publish
        run: npx @examplary/cli@latest upload
        env:
          EXAMPLARY_API_KEY: ${{ secrets.EXAMPLARY_API_KEY }}
```

## Multiple question types in one repository

If you have multiple question types in a single repository, you can modify the workflow to build and publish each question type individually. You can either loop through subfolders (example below) or use a true matrix strategy to run jobs in parallel for each question type.

```yaml title=".github/workflows/publish.yml"
name: Publish to Examplary

on:
  push:
    branches:
      - main

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - name: Check out repository code
        uses: actions/checkout@v4

      - name: Setup node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: yarn

      - name: Install dependencies
        run: yarn install

      - name: Publish
        env:
          EXAMPLARY_API_KEY: ${{ secrets.EXAMPLARY_API_KEY }}
        run: |
          # Loop through each subfolder in the current directory
          for dir in */; do
            # Skip if the directory does not contain a question-type.json file
            if [ ! -f "$dir/question-type.json" ]; then
              continue
            fi

            # Bundle and upload to Examplary
            cd $dir
            npx @examplary/cli upload
            cd ..
          done
```
