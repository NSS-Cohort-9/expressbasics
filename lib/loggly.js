var loggly = require('loggly');

function logger(tag) {
  return loggly.createClient({
    token: process.env.LOGGLY_TOKEN,
    subdomain: 'g8167010',
    tags: ['NodeJS', tag],
    json: true
  });
}

module.exports = logger;
