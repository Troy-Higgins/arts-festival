/*Troy - small module that can provide the mongoDB atlas mongo API Key to
other modules as required. the contents of the API key are kept secret
in the .env file */
require('dotenv').config();
module.exports = {
  //Troy - .env.mongo refers to the API key variable name which is "MONGO"
mongoKey: process.env.mogno;
}
