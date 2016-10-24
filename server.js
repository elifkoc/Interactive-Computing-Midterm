   
        

// Using express: http://expressjs.com/
var express = require('express');
// Create the app
var app = express();

// Set up the server
// process.env.PORT is related to deploying on heroku
var server = app.listen(process.env.PORT || 8000, listen);

// This call back just tells us that the server has started
function listen() {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://' + host + ':' + port);
  
}

// This is for hosting files
// Anything in the public directory will be served
// This is just like python -m SimpleHTTPServer
// We could also add routes, but aren't doing so here
app.use(express.static('public'));

// Create a Twitter object to connect to Twitter API
var Twit = require('twit');

// Pulling all my twitter account info from another file
var config = require('./config.js');
// Making a Twit object for connection to the API
var T = new Twit(config);


// This route searches twitter
app.get('/tweets/:query', getTweets);

function getTweets(req, res) {
  // Here's the string we are seraching for
  var query = req.params.query;

  // Execute a Twitter API call
  T.get('search/tweets', { q: query, count: 10 }, gotData);

  // Callback
  function gotData(err, data) {

    // Get the tweets
    var tweets = data.statuses;
    
    //Selected tweets
    var bestTweets = [];

    for (var tweet in tweets) {
      var tweetObj = tweets[tweet];
      if (!(tweetObj.text.includes("RT")) && !(tweetObj.text.includes("http"))) {
        bestTweets.push(tweetObj);
        console.log(tweetObj);
      }
   }
    // Spit it back out so that p5 can load it!
    //console.log(best_tweets);
    res.send(bestTweets);
  };
}

