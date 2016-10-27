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
var tweet, link, body, response;
var outOfTweets;

function preload() {
  //img = loadImage();
}
function setup() {
  createCanvas(1000, 1000);
  background(230, 250, 250);
  
  //Create Left Swipe Button
  leftSwipeButton = createButton('x');
  leftSwipeButton.position(100, 220);
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
  
  body = createP(tweetsArray[position].text);
  link = createA('https://www.twitter.com/' + tweetsArray[position].user.screen_name, tweetsArray[position].user.screen_name);
  //text.html(link + tweetsArray[position].text)
  link.parent(tweet);
  body.parent(tweet);
  tweet.position(200, 250);
  
  
  
}

//Go to the next tweet
function leftSwipe() {
  if ((position+2) <= tweetsArray.length)     {
      tweet.remove();
      position++;
      displayTweet();
    }
  else {
    tweet.remove();
    tweet = createDiv("Sorry -- that's all the tweets we've got in this batch! Click search again to see more!");
    tweet.position(200, 250);
    tweet.class('tweet');
  }

}

function rightSwipe() {
  var choice = tweetsArray[position];
  
  response = createP("Here's what we know about " + choice.user.screen_name +  " so far: They've got " + choice.user.followers_count + " followers, and they follow " + choice.user.friends_count + " people."); 
  response.class('response');
  response.position(100, 400);  
  
  if (choice.user.description) {
    desc = createP(choice.user.description); 
    desc.class('desc');
    desc.position(100, 440);
  
  }
  
}

