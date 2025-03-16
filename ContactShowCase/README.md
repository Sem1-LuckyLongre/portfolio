# Message Showcase Panel

A beautiful and interactive message showcase panel with animations and "new message" indicators. This panel is designed to display messages from users that come from an API.

## Features

- Beautiful card-based UI for displaying messages with dark theme
- "New" badge for messages that weren't seen before (using localStorage)
- Smooth animations for new messages
- Responsive design that works on all devices
- Sound notifications for new messages
- Search functionality to filter messages
- Total messages counter
- Real API integration with automatic polling

## How to Use

1. Clone this repository
2. Open `index.html` in your browser
3. The showcase will connect to the API and display messages
4. New messages will be automatically detected and marked with a "NEW" badge
5. Use the search bar to filter messages by name, email, or message content
6. Press Escape key to clear the search

## How New Message Detection Works

The application uses localStorage to keep track of which messages have been seen:

1. When the app loads, it stores the current message IDs and count in localStorage
2. Every 30 seconds, it checks the API for new messages
3. If the message count has increased, it compares the new messages with the previously seen IDs
4. Any message with an ID not in the previously seen list is marked as "new"
5. The localStorage is then updated with the current message IDs

## API Integration

The application connects to a real API endpoint:
```
https://portfolio-lucky-io1t.onrender.com/api/contact/getcontacts
```

The API is expected to return data in this format:

```json
{
  "_id": "67d6b608ba78ffadc12899d3",
  "name": "Lucky Longre",
  "email": "sem1luckylongre@gmail.com",
  "message": "Hello 👋 I want some collaboration with you",
  "createdAt": "2025-03-16T11:29:12.087Z",
  "__v": 0
}
```

## Customization

You can customize the appearance by modifying the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #6c5ce7;
    --secondary-color: #a29bfe;
    --accent-color: #00cec9;
    --text-color: #f5f6fa;
    --light-text: #dfe6e9;
    --background-color: #1e272e;
    --card-bg: #2d3436;
    --card-hover: #34495e;
    --shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    --border-radius: 12px;
    --search-bg: #2d3436;
    --search-border: #6c5ce7;
    --header-bg: #2d3436;
    --stats-bg: #2d3436;
}
```

## Real-time Updates

The application checks for new messages every 30 seconds. In a production environment, you might want to use WebSockets or Server-Sent Events for more efficient real-time message notifications.

## License

MIT 