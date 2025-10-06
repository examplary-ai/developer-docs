---
sidebar_label: API and file uploads
sidebar_position: 5
---

# Calling the API and uploading files

In your components, you might want to call the [Examplary REST API](https://developers.examplary.ai/rest-api).

## API prop

All of your components will receive an `api` prop, which is an authenticated instance of [Axios](https://axios-http.com/docs/intro). You can use this prop to make API calls directly from your components.

In `settings-area` and `results` components, this is authenticated against the currently signed-in user (teacher). In `question` components, it is authenticated against the student who is currently taking the assessment. Students usually only have access to public endpoints.

### Basic usage

```jsx
export default function MyQuestionSettingsArea = ({ api }) => {
  const fetchData = async () => {
    try {
      const response = await api.get("/question-types");
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return <div>Check the console for data.</div>;
};
```

### Using the AI conversations API

In public question components, you can use the AI conversations API to generate content or interact with the AI. For example, you can create a chat view that generates a story based on the question description, and displays it to the student.

```jsx
import { useState } from "react";
import { ChatView } from "@examplary/ui";

export default function MyQuestionAssessmentComponent({ question, api }) {
  const [messages, setMessages] = useState([]);

  const generateStory = async () => {
    const response = await api.post("/public/exams/conversation", {
      chat: [
        {
          role: "system",
          content:
            "You are a teacher telling the student a story about a subject.",
        },
        {
          role: "user",
          content: `Tell me a story about ${question.description}.`,
        },
      ],
    });
    setMessages(response.data.chat);
  };

  useEffect(() => {
    generateStory();
  }, []);

  return <ChatView messages={messages} />;
}
```

## File uploads

In teacher environments, it's also possible to prompt the user to upload files, which will be stored in the Examplary cloud storage. You can use the `api.uploadFile` method to handle file uploads.

That method optionally takes a `accepts` parameter, which is a string that specifies the file types to accept (e.g., `"image/*"` for all image types).

```jsx
import { useState } from "react";

export default function MyQuestionSettingsArea({ api }) {
  const [fileUrl, setFileUrl] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const { url } = await api.uploadFile("image/*");
    setFileUrl(url);
  };

  return (
    <div>
      <button onClick={handleUpload}>Upload an image</button>
      {fileUrl && <img src={fileUrl} alt="Uploaded" className="max-w-full" />}
    </div>
  );
}
```
