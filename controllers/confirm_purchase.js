const Purchase = require('../models/Purchase');
const User = require('../models/User');

module.exports = function (controller) {
  controller.hears(['Confirm', 'Get it free'], 'message', async (bot, message) => {
    try {
      const user = await User.findOne({ id: message.sender.id });
      if (user.referals < 2 && message.text === 'Get it free') {
        await bot.reply(message, `Invite ${2 - user.referals} friends!`);
      } else {
        let { referals } = user;
        let isFree = false;
        if (user.referals >= 2 && message.text === 'Get it free') {
          isFree = true;
          referals -= 2;
        }
        const purchase = await Purchase.findOne({ userID: message.sender.id, succeeded: false });
        await User.findOneAndUpdate(
          { id: message.sender.id },
          { $push: { purchases: { $each: [purchase._id] } }, referals: referals },
        );
        await Purchase.findOneAndUpdate(
          { userID: message.sender.id, succeeded: false },
          { succeeded: true, isFree: isFree },
        );
        bot.reply(message, 'Congratulations! Our courier will contact you!');
        bot.reply(message, {
          text: 'Congratulations! Our courier will contact you!',
          quick_replies: [
            {
              content_type: 'text',
              title: 'Menu',
              payload: 'Menu',
            }]
        })
        
      }
    } catch (error) {
      bot.reply(message, { text: 'Oooopps. Try again later.' });
    }
  });
};