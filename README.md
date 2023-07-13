# FacebookChatbot

A chatbot that automatically responds to messages, and retrieves information for the NES club. The chatbot also integrates several APIs to send memes, and quotes, and search for 
documents, as well as an admin dashboard to efficiently manage club activities.

## Features

- Automated messaging: The chatbot can automatically respond to user messages.
- Information retrieval: It can retrieve information for the NES club based on user queries.
- Integration of external APIs: The chatbot integrates APIs to send memes, quotes, and search for documents.
- Admin dashboard: There is an admin dashboard for efficient management of club activities.

## Demo

![image](https://github.com/aleister1102/FacebookChatbot/assets/78531303/db183468-7b05-4d41-a9d2-3787385dab1f)

## Tech Stack

**Client:** Bootstrap

**Server:** Node, Express, MongoDB, Handlebars


## Installation

Install FacebookChatbot with yarn:

```bash
yarn
yarn start
```

And follow the documentation of Facebook: https://developers.facebook.com/docs/
    
## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file:
- `APP_DOMAIN`: the domain of the deployed application.
- `DATABASE_CONNECTION_STRING`: connection string of MongoDB.
- `FANPAGE_URL`: url of your fanpage.
- `PAGE_ACCESS_TOKEN`: following Facebook documents.
- `PAGE_ID`: following Facebook documents.
- `VERIFY_TOKEN`: can be anything.


## Authors

- [@aleister1102](https://github.com/aleister1102)

