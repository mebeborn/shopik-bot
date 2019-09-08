const User = require('../models/User');
const  getPurchases = require('../helpers/get_purchases');

module.exports = function (controller) {
  controller.hears('My purchases', 'message', async (bot, message) => {
    try {
      const user = await User.findOne({ id: message.sender.id }).populate({ path: 'purchases' });

      if (user.purchases.length) {
        bot.reply(message, {
          attachment: {
            type: 'template',
            payload: {
              template_type: 'generic',
              elements: getPurchases(user.purchases),
            },
          },
          quick_replies: [
            {
              content_type: 'text',
              title: 'Menu',
              payload: 'MENU',
            },
          ],
        });
      } else {
        bot.reply(message, {
          text: 'Please purchase first.',
          quick_replies: [
            {
              content_type: 'text',
              title: 'Menu',
              payload: 'Menu',
            }]
        })
      }
    } catch (error) {
      bot.reply(message, { text: 'Ooops. Try again laster.' });
    }
  });
};