---
sidebar_title: Import Intent URL
sidebar_position: 9
---

# Import intent URL

To offer users an option to import a test from your application into Examplary, you can use the import intent URL.

The import intent URL has the following format:

```
https://app.examplary.ai/intent/import?url={url}&name={name}
```

Where:
- `url`: The URL where the test file can be downloaded from
  - This file should be in a supported format (e.g., Moodle XML, QTI)
- `name`: Optional parameter to specify the name of the exam in Examplary

When a user clicks on this URL, they will be redirected to Examplary, where they can import the test from the provided URL.