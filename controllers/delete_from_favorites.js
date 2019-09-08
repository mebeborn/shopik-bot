const User = require('../models/User');

module.exports = function (controller) {
  controller.hears(async message => message.text.includes('DELETE_FROM_FAVORITES_'), 'facebook_postback', async (bot, message) => {
    const sku = message.text.substring(22);

    try {
      await User.findOneAndUpdate(
        { id: message.sender.id },
        { $pull: { favoriteProducts: sku } },
      );
    } catch (error) {
      bot.reply(message, { text: 'Oooopps. Try again later.' });
    }
    bot.reply(message, { text: 'Product successfully deleted from favorites.' });
  });
};