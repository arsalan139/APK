const { Expo } = require("expo-server-sdk");
module.exports = async function (tokens, data) {
  let expo = new Expo();
  let messages = [];
  console.log(tokens);
  // tokens = tokens.filter((i) => i.user !== post.user);
  if (tokens) {
    for (let pushToken of tokens) {
      // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]

      // Check that all your push tokens appear to be valid Expo push tokens
      if (!Expo.isExpoPushToken(pushToken)) {
        console.error(`Push token ${pushToken} is not a valid Expo push token`);
        continue;
      }

      // Construct a message (see https://docs.expo.io/push-notifications/sending-notifications/)
      messages.push({
        to: pushToken,
        sound: "default",
        title: data.title,
        body: data.body,
        subtitle: data.subtitle,
        data: { withSome: "data" },
        channelId: "new-post",
      });
    }
    let chunks = expo.chunkPushNotifications(messages);
    let tickets = [];
    (async () => {
      for (let chunk of chunks) {
        try {
          let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
          tickets.push(...ticketChunk);
        } catch (error) {
          console.error(error);
        }
      }
    })();
  }
};
