const request = require('request');
const config = require('../config.js');

let getReposByUsername = function(userName, callback){
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out, 
  // but you'll have to fill in the URL

  console.log('invoked')
  let options = {
    url: `https://api.github.com/users/${userName}/repos`,
    headers: {
      'User-Agent': 'request',
      'Authorization': `token ${config.TOKEN}`
    }
  };

  request(options, function(err, response, body){
      if(err){
        console.log('api request err:', err);
        return;
      } 
      console.log('github api request success!');
      callback(body);
  })
}

module.exports = getReposByUsername;