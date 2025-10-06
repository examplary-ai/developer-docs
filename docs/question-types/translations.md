---
sidebar_label: Translations
sidebar_position: 4
---

# Translations management

Examplary uses [i18next](https://www.i18next.com) for translations, which allows you to easily manage and extend the platform's language support. This documentation will guide you through the process of adding and managing translations for custom question types.

## Adding translations

In addition to providing support for multiple languages for the main metadata fields in `question-type.json`, you can also add translations for the components of your custom question types. This is done by including a `translations` object in your `question-type.json` file.

```json
{
  "translations": {
    "placeholder": {
      "en": "Enter your answer here",
      "nl": "Typ je antwoord hier"
    }
  }
}
```

## Using translations in components

Each component gets passed in the `t` function as a prop, which you can use to access the translations defined in your `question-type.json`. For example, if you have a translation for a placeholder text, you can use it like this:

```jsx
import React from "react";

export default function MyComponent({ t }) {
  return <input type="text" placeholder={t("placeholder")} />;
}
```

## Interpolation and pluralization

Examplary supports i18next's interpolation and pluralization features. You can use these features to create dynamic translations that adapt based on the context.

For example, if you want to display a message that includes a count, you can define your translation like this:

```json
{
  "translations": {
    "itemCount_one": {
      "en": "{{count}} item",
      "nl": "{{count}} item"
    },
    "itemCount_other": {
      "en": "{{count}} items",
      "nl": "{{count}} items"
    },
    "welcomeMessage": {
      "en": "Welcome, {{name}}!",
      "nl": "Welkom, {{name}}!"
    }
  }
}
```

```jsx
import React from "react";

export default function MyComponent({ t }) {
  const itemCount = 5;
  return (
    <div>
      <p>{t("itemCount", { count: itemCount })}</p>
      <p>{t("welcomeMessage", { name: "John" })}</p>
    </div>
  );
}
```

## Learn more

To learn more about using i18next for translations, check out the i18next documentation:

- [Interpolation](https://www.i18next.com/translation-function/interpolation)
- [Pluralization](https://www.i18next.com/translation-function/plurals)
- [Formatting](https://www.i18next.com/translation-function/formatting)
