const User = require('../models/User');

module.exports = function (controller) {
  controller.hears(async message => message.text.includes('ADD_TO_FAVORITES_'), 'facebook_postback', async (bot, message) => {
    const sku = message.text.substring(17);

    try {
      const user = await User.findOne({ id: message.sender.id, favoriteProducts: sku });

      if (!user) {
        await User.findOneAndUpdate(
          { id: message.sender.id },
          { $push: { favoriteProducts: { $each: [sku] } } },
        );
      }
    } catch (error) {
      bot.reply(message, { text: 'Oooops. Try again later.' });
    }
    bot.reply(message, {
      text: 'Product added successfully!',
      quick_replies: [
        {
          content_type: 'text',
          title: 'Menu',
          payload: 'Menu',
        }]
    })
  });
};