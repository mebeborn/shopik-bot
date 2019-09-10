const Purchase = require('../models/Purchase');
const getProduct = require('../best_buy/bby_get');
const createPurchaseButtons = require('../helpers/get_purchase_buttons');

module.exports = function (controller) { 
  controller.hears(async message => message.text && message.text.includes('PURCHASE_'), 'facebook_postback', async (bot, message) => {
    const id = message.text.slice(9, message.text.length);
    try {
      const purchase = await Purchase.findById(id);
      await getProduct(purchase.sku).then((data) => {
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