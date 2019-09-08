const Purchase = require('../models/Purchase');
const createDialog = require('../helpers/phone_create_dialog')

module.exports = function (controller) {
  const MY_DIALOG_ID = 'zik:botkit-wrapper';

  createDialog(MY_DIALOG_ID, controller);
  controller.hears(async message => message.text.match(/[+][0-9]+$/), 'message', async (bot, message) => {
    try {
      if (await Purchase.findOne({ userID: message.sender.id, succeeded: false })) {
        await Purchase.findOneAndUpdate(
          { userID: message.sender.id, succeeded: false },
          { phoneNumber: message.text },
        );

        bot.beginDialog('zik');
      } else {
        bot.reply(message, {
          text: 'Please chose product!',
          quick_replies: [
            {
              content_type: 'text',
              title: 'Menu',
              payload: 'Menu',
            }]
        })
      }
    } catch (error) {
      bot.reply(message, { text: 'Ooops. Try again.' });
    }
  });
};