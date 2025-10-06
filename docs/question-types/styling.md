---
sidebar_label: Styling and UI kit
sidebar_position: 3
---

# Styling your components

There are a few tools to style your components in Examplary. The platform uses [Tailwind CSS](https://tailwindcss.com)
for utility-first styling, and you can also use the [Examplary UI kit](https://www.npmjs.com/package/@examplary/ui)
for pre-built components and styles.

## Using Tailwind CSS

When you use Tailwind CSS utility classes, these will automatically be bundled in with your code.

```jsx
import React from "react";

export default function MyComponent() {
  return <div className="p-4 bg-blue-500 text-white">Hello, Tailwind!</div>;
}
```

Read more about [Tailwind CSS](https://tailwindcss.com/docs/styling-with-utility-classes) to learn how to
use its utility classes effectively.

## Examplary UI kit

The package `@examplary/ui` provides a set of pre-built components and styles that you can use in your
components. When building question types, this package is available at runtime and can be imported directly; you don't need to install it separately in your question type folder.

You can use the components from the UI kit like this:

```jsx
import React from "react";
import { RichTextField } from "@examplary/ui";

export default function MyComponent() {
  return <RichTextField />;
}
```

Common components from the UI kit include:

### `<Input />`

Styled HTML input field.

```jsx
import { Input } from "@examplary/ui";

export default function MyComponent() {
  return <Input type="email" placeholder="Email" />;
}
```

### `<Select />`

Styled HTML select dropdown.

```jsx
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@examplary/ui";

export default function MyComponent() {
  return (
    <Select>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
```

### `<AnswerBox />`

Component that displays print answer boxes.

```jsx
import { AnswerBox, FrontendPrintComponent } from "@examplary/ui";

const PrintComponent: FrontendPrintComponent = ({ answerBoxes }) => {
  if (!answerBoxes) return null;

  return <AnswerBox />;
};

export default PrintComponent;
```

### `<RichTextField />`

Component that displays a rich text field for user input. Allows HTML formatting and
is useful for text-based questions.

Props:

- `value`: The current value of the rich text field.
- `onChange`: Callback function to handle changes in the rich text field.
- `placeholder`: Placeholder text for the field.
- `className`: Additional CSS classes for styling.
- `slotBefore`: any React node to render before the field.

Example:

```jsx
import { useState } from "react";
import { RichTextField, RichTextToolbar } from "@examplary/ui";

export default function MyComponent() {
  const [value, setValue] = useState("");

  return (
    <RichTextField
      value={value}
      onChange={(value) => setValue(value)}
      placeholder="Type your answer here..."
      className="border p-2 rounded"
      slotBefore={(editor) => <RichTextToolbar editor={editor} />}
    />
  );
}
```

### `<RichTextDisplay />`

Component that displays rich text content. It is useful for showing formatted HTML in a read-only format,
with the appropriate styles, similar to how it would appear in a rich text editor.

Props:

- `children`: The rich text content to display, which should be a string containing HTML.
- `as`: The HTML element to render (default is `div`).

```jsx
import { RichTextDisplay } from "@examplary/ui";

export default function MyComponent() {
  const content = "<p>This is <strong>rich text</strong> content.</p>";

  return <RichTextDisplay>{content}</RichTextDisplay>;
}
```
