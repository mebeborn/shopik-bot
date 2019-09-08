const bby = require('bestbuy')('TGp7jkZIbKOzfRTDzkofjo2O');
const Purchase = require('../models/Purchase');
const createPurchaseButtons = require('../helpers/get_purchase_buttons');
module.exports = function (controller) {
 
  controller.hears(async message => message.text && message.text.includes('PURCHASE_'), 'facebook_postback', async (bot, message) => {
    const id = message.text.slice(9, message.text.length);
    try {
      const purchase = await Purchase.findById(id);
      await bby.products(`sku=${purchase.sku}`, { show: 'sku,name,salePrice,image,url,shortDescription' }).then(async (data) => {
        bot.reply(message, {
          attachment: {
            type: 'template',
            payload: {
              template_type: 'generic',
              elements: [createPurchaseButtons(data)],
            },
          },
          quick_replies: [
            {
              content_type: 'text',
              title: 'My purchases',
              payload: 'true',
            },
          ],
        });
      });
    } catch (error) {
      bot.reply(message, { text: 'Oooops. Try again later.' });
    }
  });
};