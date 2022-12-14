export default {
  name: "comment",
  title: "Comment",
  type: "document",
  fields: [
    {
      name: "comment",
      title: "Comment",
      type: "string",
    },
    {
      name: "userName",
      title: "User Name",
      type: "string",
    },
    {
      name: "profileImage",
      title: "Profile Image",
      type: "string",
    },
    {
      name: "tweet",
      title: "Tweet",
      description: "Reference to the tweet.",
      type: "reference",
      to: {
        type: "tweet",
      },
    },
  ],
};
