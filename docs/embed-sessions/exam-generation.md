---
sidebar_label: Exam generation
sidebar_position: 2
---

# Exam generation flow

Using the Examplary AI question generation flow, you can let users of your application use AI to generate questions on a specific subject or a set of source materials.

### 1. Create an Examplary user for your user

To make sure we can save personal preferences and source materials uploaded by the user to their specific account,
and can later allow them to reference these personal details, we require creating a user account in your workspace for each of your users.

```json title="POST /users"
{
  "email": "my-user@example.com",
  "name": "My User"
}
```

Store the returned user ID in your system to use with any future embed sessions for that user.

### 2. Create an embed session

Call the Examplary API to create a new embed session. You can configure presets for the exam, as well as theme options.

The `actor` field should contain the ID of the Examplary user account you created for this customer.

You can either specify a `returnUrl` or an `allowedOrigin`, based on how you want to be notified when generation is completed.

```json title="POST /embed-sessions"
{
  "flow": "generate-exam",
  "actor": "user_423r9j3r0jeddJA...",
  "presets": {
    "subject": "Mathematics"
  },
  "theme": {
    "primaryColor": "#4f46e5",
    "locale": "en"
  },
  "metadata": {
    "myUniqueIdentifier": "abc1234"
  },
  "returnUrl": "https://example.com",
  "allowedOrigin": "http://localhost:3000"
}
```

This returns a response that looks like this:

```json
{
  "id": "embed_session_55S843D7HfNfs9RY48PoTprXnRcz2Vw8Crst64UYrBnz...",
  "status": "pending",
  "embedUrl": "https://app.examplary.ai/embeds/55S843D7HfNf...",
  "flow": "generate-exam",
  "actor": "user_423r9j3r0jeddJA...",
  "enabledResponseModes": ["return_url", "post_message"],
  "createdAt": "2025-12-09T16:52:52.120Z",
  "expiresAt": "2025-12-16T16:52:52.120Z",
  "presets": {
    "subject": "Mathematics"
  },
  "outputs": {},
  "theme": {
    "primaryColor": "#4f46e5",
    "locale": "en"
  },
  "metadata": {
    "myUniqueIdentifier": "abc1234"
  }
}
```

### 3. Lead the user to the embed URL

You can either redirect the user directly to the URL, or display it in an `iframe`.

The latter might be better for the user experience, especially when displayed as a modal. This also allows you to listen to status updates in real time,
through the `postMessage()` API.

```ts
const embedUrl = "https://app.examplary.ai/embeds/55S843D7HfNf...";

iframe.src = embedUrl;

window.addEventListener("message", (event) => {
  // Make sure the message is coming from a trusted origin
  if (event.origin !== new URL(embedUrl).origin) return;

  // Handle the message
  const { type, status, outputs } = event.data;
  if (type === "examplary:embed-status-update") {
    if (status === "completed") {
      const examId = outputs.examId;
      console.log("Exam generation completed! Exam ID:", examId);
    } else if (status === "cancelled") {
      console.log("Exam generation was cancelled by the user.");
    }
  }
});
```

If you're using redirects, you can expect a redirect to your specified `returnUrl` with one of two query string parameters values:

- On success: `?status=completed&examId=exam_dj8948hf98hf43`
- On failure: `?status=cancelled`

If neither of these options work for you, you may also poll the Examplary API for status updates:

```json title="GET /embed-sessions/{id}"
{
  "id": "embed_session_55S843D7HfNfs9RY48PoTprXnRcz2...",
  "flow": "generate-questions",
  "status": "completed",
  "outputs": {
    "examId": "exam_dj8948hf98hf43"
  }
  // ...
}
```

### 4. Get exam contents

Once the question generation has completed, you can use the API to retrieve your generated questions.

In Examplary's normal format:

```
GET /exams/{examId}
```

Or as a QTI package:

```
POST /exams/{examId}/export/qti3-zip
```

### 5. Cleanup

The embed session will expire automatically after 7 days, but because it gives some limited access to your account, you might want to remove it manually:

```
DELETE /embed-sessions/{embedSessionId}
```

You can also delete the generated exam once you don't need it anymore:

```
DELETE /exams/{examId}
```
