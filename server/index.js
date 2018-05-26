const express = require('express');
const bodyParser = require('body-parser')
const getReposByUsername = require('../helpers/github.js')
const databaseHandler = require('../database/index.js')
let app = express();


app.use(express.static(__dirname + '/../client/dist'));

app.use(bodyParser.json())

app.post('/repos', function (req, res) {
  let username = 'octocat';
  let data = getReposByUsername(username, function(data){
    //console.log('got data in server. data.length ', JSON.parse(data).length)
    iterateData(data)
  });
  //NOTE!!!!!! research insert many instead of for loop 
  res.send('received!!!!!')

});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
 databaseHandler.filterData(function(data){

 })

});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});


let iterateData = function(data1){

  let data = JSON.parse(data1)

  //console.log('data length', data.length)

  for(let i = 0; i < data.length; i++){

    let repoData = {}
    repoData.name = data[i]["name"]
    repoData.repo_id = data[i]["id"]
    repoData.html_url = data[i]["html_url"]
    repoData.description = data[i]["description"]
    repoData.watchers_count = data[i]["watchers_count"]
    repoData.forks_count = data[i]["forks_count"]

    //console.log('repoData', repoData)

    databaseHandler.save(repoData)
  }  
}







