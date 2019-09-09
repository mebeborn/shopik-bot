/* eslint-disable no-console */
//  __   __  ___        ___
// |__) /  \  |  |__/ |  |
// |__) \__/  |  |  \ |  |

// This is the main file for the chatbot bot.

// Import Botkit's core features
const { Botkit } = require('botkit');
const { BotkitCMSHelper } = require('botkit-plugin-cms');
// const { MongoDbStorage } = require('botbuilder-storage-mongodb');
const mongoose = require('mongoose');


// Import a platform-specific adapter for facebook.

const { FacebookAdapter, FacebookEventTypeMiddleware } = require('botbuilder-adapter-facebook');

// Load process.env values from .env file
require('dotenv').config();

const storage = null;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Mongoose: Connected');
});


const adapter = new FacebookAdapter({

  // REMOVE THIS OPTION AFTER YOU HAVE CONFIGURED YOUR APP!
  // enable_incomplete: true,

  verify_token: process.env.FACEBOOK_VERIFY_TOKEN,
  access_token: process.env.FACEBOOK_ACCESS_TOKEN,
  app_secret: process.env.FACEBOOK_APP_SECRET,
});

// emit events based on the type of facebook event being received
adapter.use(new FacebookEventTypeMiddleware());


const controller = new Botkit({
  webhook_uri: '/webhook',

  adapter,

  storage,
});

if (process.env.cms_uri) {
  controller.usePlugin(new BotkitCMSHelper({
    uri: process.env.cms_uri,
    token: process.env.cms_token,
  }));
}

// Once the bot has booted up its internal services, you can use them to do stuff.
controller.ready(() => {
  // load traditional developer-created local custom feature modules
  controller.loadModules(`${__dirname}/controllers`);

  /* catch-all that uses the CMS to trigger dialogs */
  if (controller.plugins.cms) {
    // eslint-disable-next-line consistent-return
    controller.on('message,direct_message', async (bot, message) => {
      let results = false;
      results = await controller.plugins.cms.testTrigger(bot, message);

      if (results !== false) {
        // do not continue middleware!
        return false;
      }
    });
  }
});


controller.webserver.get('/', (req, res) => {
  res.send(`This app is running Botkit ${controller.version}.`);
});
