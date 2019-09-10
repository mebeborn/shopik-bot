const User = require('../models/User');
const { getItems } = require('../helpers/favorites');
const { getFavorites } = require('../best_buy/bby_get');

module.exports = function (controller) {
  controller.hears('Favorites', 'message', async (bot, message) => {
    try {
      const user = await User.findOne({ id: message.sender.id });
      if (user.favoriteProducts.length !== 0) {
        await getFavorites(user.favoriteProducts).then((data) => {
          bot.reply(message, {
            attachment: {
              type: 'template',
              payload: {
                template_type: 'generic',
                elements: getItems(data),
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
        });
      } else {
        bot.reply(message, {
          text: 'Favorite list is empty.',
          quick_replies: [
            {
              content_type: 'text',
              title: 'Menu',
              payload: 'Menu',
            }]
        })
      }
    } catch (error) {
      bot.reply(message, { text: 'Try again later.' });
    }
  });
};