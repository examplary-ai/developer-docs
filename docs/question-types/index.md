---
sidebar_label: Introduction
sidebar_position: 1
---

# Creating custom question types

Examplary comes by default with a set of question types that can be used to create interactive tests.

You can also create your own custom question types to extend the platform's capabilities. This documentation will guide you through the process of creating and bundling custom question types.

## Process

Building custom question types involves the following steps:

1. Create a folder with a [metadata file](./metadata) and icon
2. Implement [components](./components) for various views (assessment, print, etc.)
3. Test them locally using the CLI preview tool
4. [Upload](./publishing) the question type to the Examplary platform
5. Optionally, set up a GitHub repository and CI pipeline for [automated deployment](./deployment)

## Directory structure

Each question type is a folder with a few files. The two that are required are:

- `question-type.json`: This file contains the metadata for the question type, such as its name, description, and any specific settings it requires.
- `icon.svg`: This is the icon that will be displayed in the UI for this question type.

You can also include additional files, resulting in a structure like this:

```
my-custom-question-type/
├── question-type.json
├── icon.svg
├── component-assessment.jsx
└── component-print.jsx
```

## Examples

You can find the source code for the default question types in the [`default-questions-pack` repository](https://github.com/examplary-ai/default-questions-pack). These are the ones that come pre-installed with Examplary.

They serve as a great reference for how to structure your own question types and what components you might need to implement, and are a good starting point for your own custom question types.
