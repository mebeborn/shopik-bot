const bby = require('bestbuy')('TGp7jkZIbKOzfRTDzkofjo2O');
const getItems = require('../helpers/get_products');

module.exports = function (controller) {
  controller.hears('Shop', ['message', 'facebook_postback'], async (bot, message) => {
    await bby.products('onlineAvailability=true', { show: 'sku,name,description,shortDescription,longDescription,image' })
      .then(async (data) => {
        await bot.reply(message, {
          attachment: {
            type: 'template',
            payload: {
              template_type: 'generic',
              elements: getItems(data),
            },
          },
        });
      })
      .catch(async (error) => {
        console.log(error);
        await bot.reply(message, 'Something went wrong');
      })
  });
}
