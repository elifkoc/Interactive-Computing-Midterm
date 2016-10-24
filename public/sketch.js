// Credit to Daniel Shiffman
// A p5 sketch that searches twitter

// User input fields
var searchInput;
var postInput;
var tweetsArray = [];
var position = 0;

var leftSwipeButton;
var rightSwipeButton;

var prof;
var tweet, link, text;
var outOfTweets;

function preload() {
  //img = loadImage();
}
function setup() {
  createCanvas(800, 800);
  
  //Create Left Swipe Button
  leftSwipeButton = createButton('x');
  leftSwipeButton.position(50, 220);
  leftSwipeButton.mousePressed(leftSwipe);  
  
  //Create right Swipe Button
  rightSwipeButton = createButton('♡');
  rightSwipeButton.position(560, 220);
  rightSwipeButton.mousePressed(rightSwipe);
  
  
  // Get all the HTML elements
  searchInput = select('#searchInput');
  var searchButton = select('#searchButton');

  // Assign the callbacks to the functions
  searchButton.mousePressed(getTweets);  
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
  tweet = createDiv("");
  tweet.class('tweet');
  
  text = createP(tweetsArray[position].text);
  link = createA('https://www.twitter.com/' + tweetsArray[position].user.screen_name, tweetsArray[position].user.screen_name);
  //text.html(link + tweetsArray[position].text)
  link.parent(tweet);
  text.parent(tweet);
  tweet.position(50, 250);
  
  
  
}

//Go to the next tweet
function leftSwipe() {
  if ((position+2) <= tweetsArray.length) {
    position++;
    displayTweet();
  }
  else {
    tweet = createDiv("Sorry -- that's all we've got! Wanna try again?  ");
    tweet.position(50, 250);
    tweet.class('tweet');

  }

}

function rightSwipe() {
  var choice = tweetsArray[position];
}

