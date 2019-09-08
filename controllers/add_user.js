const User = require('../models/User');

module.exports = function (controller) {
  controller.hears(async message => message.text.includes('ADD_USER'), 'facebook_postback', async (bot, message) => {
    try {
      if (!(await User.findOne({ id: message.sender.id }))) {
        await User.create({ id: message.sender.id, freeProducts: 0, referals: 0 });
        if (message.postback.referral) {
          const user = await User.findOne({ id: message.postback.referral.ref });
          if (user.referals < 2) {
            await User.findOneAndUpdate(
              { id: message.postback.referral.ref },
              { referals: user.referals + 1 },
            );
          } else {
            await User.findOneAndUpdate(
              { id: message.postback.referral.ref },
              { freeProducts: user.freeProducts + 1, referals: 0 },
            );
          }
          const botWorker = await controller.spawn(message.postback.referral.ref);
          await botWorker.startConversationWithUser(message.postback.referral.ref);
          await botWorker.say('Link is activated!');
          await bot.reply(message, { text: 'Activated!' });
        }
      }
    } catch (error) {
      await bot.reply(message, { text: 'Ooops... Something went wrong.' });
    }
    await bot.reply(message, {
      text: 'Menu',
      quick_replies: [
        {
          content_type: 'text',
          title: 'Menu',
          payload: 'Menu',
        }
      ],
    });
  });
};