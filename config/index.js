require('dotenv').config();

const config = {
    dev: (process.env.NODE_ENV) ? (process.env.NODE_ENV.trim() !== 'production') : true,
    port: process.env.PORT || 3000,
    basePath: process.env.BASE_PATH
};

module.exports = {  config  };
