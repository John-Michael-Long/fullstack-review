const mongoose = require('mongoose');


let repoSchema = mongoose.Schema({
  name: String,
  repo_id: Number,
  html_url: String,
  description: String,
  watchers_count: Number,
  forks_count: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (data) => {

  mongoose.connect('mongodb://localhost/fetcher');
  var db = mongoose.connection;

  db.on('error', () => console.log('error connecting to DB'));
  db.once('open', function(){
   console.log('connected to DB');

    var repo = new Repo(data);

    repo.save(function(err) {
      if(err){
        return console.log(err);
      }
      db.close();
    });

  });

}

let filterData = (callback) => {
  mongoose.connect('mongodb://localhost/fetcher');
  var db = mongoose.connection;

  db.on('error', () => console.log('error connecting to DB on filter'));
  db.once('open', function(){

    Repo.find({}).sort({'forks_count': -1}).limit(5).exec(function(err, data){
      if(err) {
        console.log('filter err', err)
        return;
      }
      console.log('filter data', data)
      db.close();
    })
  })

}

module.exports.filterData = filterData;
module.exports.save = save;



/*
When a user types in a GitHub username and submits the form, your app should:
[] - Send a POST request to your express server
[] - Your server should GET that user's repos from GitHub's API
[] - Your server should then save the repos to the database
[] - When a user visits / refreshes your page, your app should:
[] - GET the top (how will you determine top?) 25 repos in your express server's database
[] - Take those repos and display them on the page

*/
