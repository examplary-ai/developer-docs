---
sidebar_label: Introduction
sidebar_position: 1
---

# Embed Sessions

Our platform makes it possible for other service providers to integrate parts of the Examplary experience within their products.
To make this possible, we offer the **Embed Sessions** API, which allows the service provider to get a unique link
to a part of the Examplary UI that can be embedded in their UI.

This makes it possible to integrate flows such as exam generation or question generation directly into your own application,
while still leveraging the full power of the Examplary platform.

## Supported flows

**Currently supported flows:**

- Exam generation flow (`generate-exam`)

**Coming soon:**

- Question generation flow (`generate-question`)

## Example flow

Example flow for exam generation using embed sessions:

```mermaid
sequenceDiagram
    participant Dev as Service provider
    participant API as Examplary API
    participant UI as Examplary hosted UI

    Note over Dev: User triggers<br/>test creation

    Dev->>API: Call POST /users to create a user if not exists
    API-->>Dev: Returns user ID

    Dev->>API: Call POST /embed-sessions to create session
    API-->>Dev: Returns session ID and URL

    Dev->>UI: Open modal or iframe with<br/>session URL

    Note over UI: User configures exam settings,<br/>tweaks exam outline, etc.
    Note over UI: Exam is generated

    UI-->>Dev: Redirect or postMessage() event<br/>with created exam ID

    Dev->>API: Call POST /exams/{id}/export/qti3-zip
    API-->>Dev: Returns created questions in QTI 3 package
```

## Getting started

To get started testing this flow, first create a free account on [app.examplary.ai](https://app.examplary.ai/register).

Find your API key in the [Developer settings](https://app.examplary.ai/account/developer) page.

Then, follow the instructions in the [exam generation flow](./exam-generation) document to create your first embed session.

Or have a look at the [live code example](https://examplary-ai.github.io/embed-sessions-demo/).