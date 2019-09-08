module.exports = function (controller) {
  controller.hears('To invite a friend', 'message', async (bot, message) => {
    bot.reply(message, {
      text: `Share you referal link  with 2 friends and get 1 product for free \nhttp://m.me/botshopik?ref=${message.sender.id}`,
      quick_replies: [
        {
          content_type: 'text',
          title: 'Menu',
          payload: 'MENU',
        },
      ],
    });
  });
};