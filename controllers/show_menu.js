module.exports = function (controller) {

  controller.hears(['Menu', 'Cancel'], 'message', async (bot, message) => {
    await bot.reply(message, {
      text: 'Menu',
      quick_replies: [
        {
          content_type: 'text',
          title: 'My purchases',
          payload: 'MY_PURCHASES',
        },
        {
          content_type: 'text',
          title: 'Shop',
          payload: 'SHOP',
        },
        {
          content_type: 'text',
          title: 'Favorites',
          payload: 'FAVORITES',
        },
        {
          content_type: 'text',
          title: 'To invite a friend',
          payload: 'INVITE',
        },
      ],
    });
  })
}