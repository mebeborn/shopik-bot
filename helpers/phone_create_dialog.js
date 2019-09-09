const { BotkitConversation } = require('botkit');

const createDialog = (id, controller) => {
  const convo = new BotkitConversation(id, controller);

  // eslint-disable-next-line no-shadow
  convo.ask('Please, enter your ZIP code.', async (answer, convo, bot) => {
    await bot.say({
      text: 'ZIP code',
      quick_replies: [
        {
          content_type: 'text',
          title: 'Send ZIP code',
          payload: `ZIP_${answer}`,
        },
      ],
    });
  }, 'zip');

  controller.dialogSet.add(convo);
};

module.exports = createDialog;
