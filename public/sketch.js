// Credit to Daniel Shiffman
// A p5 sketch that searches twitter

// User input fields
var searchInput;
var postInput;
var tweetsArray = [];
var position = 0;
var par;
var par2;

function setup() {
  noCanvas();

  // Get all the HTML elements
  searchInput = select('#searchInput');
  var button1 = select('#searchButton');
  var nextButton = select('#next');
  var likeButton = select('#like');
  // Assign the callbacks to the functions
  button1.mousePressed(getTweets);
  nextButton.mousePressed(nextTweet);
  likeButton.mousePressed(chosenTweet);
  
}

// Execute an API call to our own API
function getTweets() {
  loadJSON(/tweets/ + searchInput.value(), gotTweets);
}

// We got the tweets
function gotTweets(tweets, position) {
  //Add the tweets to an array
  for (var i = 0; i < tweets.length; i++) {
    tweetsArray.push(tweets[i]);
  }  
  displayTweet();
  
}



// Display Tweet
function displayTweet() {

   par = createDiv(tweetsArray[position].text);
     par2 = createDiv(tweetsArray[position].user.screen_name);
    par.class('text');
    par2.class('id');
    par2.parent(par);
  
}

//Go to the next tweet
function nextTweet() {  
  position++;
  displayTweet();

}

function chosenTweet() {
  var choice = tweetsArray[position];
}

