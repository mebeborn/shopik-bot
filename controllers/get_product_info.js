const bby = require('bestbuy')('TGp7jkZIbKOzfRTDzkofjo2O');
const User = require('../models/User');
const createProduct = require('../helpers/create_product_info');

module.exports = function (controller) {
  controller.hears(async message => message.text.includes('INFO_'), 'facebook_postback', async (bot, message) => {
    const sku = message.text.substring(5);
    try {
      await bby.products(`sku=${sku}`, { show: 'sku,name,salePrice,image,url,description' }).then(async (data) => {
        const user = await User.findOne({ id: message.sender.id, favoriteProducts: sku });

        await bot.reply(message, {
          attachment: {
            type: 'template',
            payload: {
              template_type: 'generic',
              elements: [createProduct(data, user)],
            },
          },
          quick_replies: [
            {
              content_type: 'text',
              title: 'Menu',
              payload: 'Menu',
            },
          ],
        });
      });
    } catch (error) {
      bot.reply(message, { text: 'Ooops. Try again later.' });
    }
  });
};