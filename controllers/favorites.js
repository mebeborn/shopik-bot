
const bby = require('bestbuy')('TGp7jkZIbKOzfRTDzkofjo2O');
const User = require('../models/User');
const { getItems, createSkuQuery } = require('../helpers/favorites');

module.exports = function (controller) {

  controller.hears('Favorites', 'message', async (bot, message) => {
    try {
      const user = await User.findOne({ id: message.sender.id });
      if (user.favoriteProducts.length !== 0) {
        await bby.products(createSkuQuery(user.favoriteProducts), { show: 'sku,name,salePrice,image,url,shortDescription' }).then(async (data) => {
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
          text: 'Favorile list is empty.',
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