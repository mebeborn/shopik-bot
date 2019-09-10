const bby = require('bestbuy')('TGp7jkZIbKOzfRTDzkofjo2O');
const getItems = require('../helpers/get_products');
const getProducts = require('../best_buy/get_products');

module.exports = function (controller) {
  controller.hears('Shop', ['message', 'facebook_postback'], async (bot, message) => {
    await getProducts('onlineAvailability=true')
      .then((data) => {
        bot.reply(message, {
          attachment: {
            type: 'template',
            payload: {
              template_type: 'generic',
              elements: getItems(data),
            },
          },
        });
      })
      .catch(error => {
        bot.reply(message, 'Something went wrong');
      })
  });
}
