const Purchase = require('../models/Purchase');
const User = require('../models/User');
const getReplies = require('../helpers/get_location_replies');

module.exports = function (controller) {
  controller.hears(async message => message.text == 'Send ZIP code' && message.quick_reply.payload.includes('ZIP_'), 'message', async (bot, message) => {
    try {
      if (await Purchase.findOne({ userID: message.sender.id, succeeded: false })) {
        const zip = message.quick_reply.payload.substring(4);

        await Purchase.findOneAndUpdate(
          { userID: message.sender.id, succeeded: false },
          { zipCode: zip },
        );
        const user = await User.findOne({ id: message.sender.id });

        bot.reply(message, {
          text: 'Almost the end =)',
          quick_replies: getReplies(user.referals),
        });

      } else {
        bot.reply(message, {
          text: 'Chose product first.',
          quick_replies: [
            {
              content_type: 'text',
              title: 'Menu',
              payload: 'Menu',
            }]
        })
      }
    } catch (error) {
      bot.reply(message, { text: 'Ooops. Try again later.' });
    }
  });
};