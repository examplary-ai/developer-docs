---
id: examplary-api
title: "REST API"
sidebar_label: Introduction
sidebar_position: 0
hide_title: true
custom_edit_url: null
---

# Examplary REST API

Integrate with the Examplary AI testing platform through the REST API, allowing you to manage exams,
questions, results and users programmatically.

## Base URL

All endpoints are available through the HTTP API at:

```plain
https://api.examplary.ai
```

## Authentication

To authenticate with the Examplary API, you need to include your API key in the `Authorization` header of each request.
The API key can be obtained from your Examplary account settings.

API keys are always scoped to a specific user and workspace.

```http
Authorization: Bearer YOUR_API_KEY
```

## Payloads

All request bodies and response payloads are JSON-encoded.

## Example request

```http
PATCH https://api.examplary.ai/me
Content-Type: application/json
Authorization: Bearer YOUR_API_KEY

{
    "name": "My new name"
}
```
