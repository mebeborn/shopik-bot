const User = require('../models/User');
const Purchase = require('../models/Purchase');

module.exports = function (controller) {

  controller.hears(async message => message.text && message.text.includes('BUY_'), 'facebook_postback', async (bot, message) => {
    const sku = message.text.substring(4);

    try {
      const user = await User.findOne({ id: message.sender.id });
      if (!(await Purchase.findOne({ userID: message.sender.id, succeeded: false }))) {
        await Purchase.create({
          userDB: user._id, userID: message.sender.id, succeeded: false, sku, timestamps: true, phoneNumber: '+99999999'
        });
      } else {
        await Purchase.findOneAndUpdate(
          { userID: message.sender.id, succeeded: false },
          { sku: sku },
        );
      }
    } catch (error) {
      bot.reply(message, { text: 'Oooopps. Try again later.' });
    }
    bot.reply(message, {
      text: 'Type your number please.',
      quick_replies: [
        {
          content_type: 'user_phone_number',
        },
      ],
    });
  });
};