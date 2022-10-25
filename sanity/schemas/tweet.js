export default {
  name: "tweet",
  title: "Tweet",
  type: "document",
  fields: [
    {
      name: "text",
      title: "Text in Tweet",
      type: "string",
    },
    {
      name: "blockTweet",
      title: "Block Tweet",
      description: "ADMIN: Toggle if tweet is inappropriate.",
      type: "boolean",
    },
    {
      name: "username",
      title: "Username",
      type: "string",
    },
    {
      name: "profileImage",
      title: "Main image",
      type: "string",
    },
    {
      name: "image",
      title: "Tweet Image",
      type: "string",
    },
  ],
};
