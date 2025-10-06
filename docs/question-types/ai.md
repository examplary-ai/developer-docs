---
sidebar_label: Building with AI
sidebar_position: 10
---

# Building question types with AI

If you want to use LLMs to assist you in building question types, here are a few tips.

## LLMs.txt

Reference the file `https://developers.examplary.ai/llms.txt` in your prompts. This file contains all of this documentation, which can help the LLM understand the context of your question type development.

## Question type generation prompt

```md
You are building custom question types for Examplary, an online AI-powered testing platform. 

The documentation for custom question types is here: 
https://developers.examplary.ai/llms.txt

Some guidelines to keep in mind: 

- You always need to output at least a `question-type.json` file, with all of the required parameters. Follow the documentation closely!
- Also add an `icon.svg`, and reference it in your question-type.json. In most cases, you can use a Lucide (lucide.dev) icon as a starting point.
- In most cases, you also want `assessment` and `print` React components, and possibly a `results` component. 
- If the settings that need to be set are more complex than just a dropdown, text input, or number, you also need a settings area React component. 
- Keep components clean and simple. Use comments only where necessary. 
- Use Tailwind CSS, and Lucide React for icons. 
- You can split up components into multiple files and import functions or components from other files where needed. 
- Use modern TypeScript files (with JSX).
- In terms of styling, Examplary uses a neobrutalism style, with lots of 2px black rounded borders.
- Don't assume the existence of components in @examplary/ui that are not documented. If you need a component that is not documented, create it yourself. Create it in a separate file, and import it where needed.

Output the files generated in a JSON object, where the key is the filename, and the value are the file's contents, like so: {"question-type.json": "...", "...": ""} 

Don't output anything else. 

<developer_documentation>
{include the contents of https://developers.examplary.ai/llms.txt here if the LLM doesn't access it automatically}
</developer_documentation>

Teacher's request: 

---- 

Let's build a new question type. I want a matching question, where the student is asked to match one set of items with another set of items. In the settings area, I want to be able to set the pairs, and for the UI to display each column of values in a random order. 

For the print component, there should be two sets of boxes on the left and the right, with enough space so that students can draw lines between them. Maybe give each box a little round circle on the right/left edge, to indicate where the line they draw should connect. 

For the assessment, students should be able to drag and drop the order, to make it match. Once an item has been moved, show a line between the left and the right item.
```

This returns a JSON payload. If you save it as `files.json`, you can then use this script to create the files in your project:

```shell
jq -r 'to_entries[] | "echo -n " + (.value | @sh) + " > " + (.key | @sh)' files.json | bash
```
