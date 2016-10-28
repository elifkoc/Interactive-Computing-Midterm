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
var tweet, link, body, response, emojis, scale;
var outOfTweets;

function preload() {
  //img = loadImage();
}
function setup() {
  createCanvas(1000, 1000);
  
  
  
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
  tweet.position(250, 400);
  
  //Create Left Swipe Button
  leftSwipeButton = createButton('x');
  leftSwipeButton.position(250, 600);
  leftSwipeButton.mousePressed(leftSwipe);  
  
  //Create right Swipe Button
  rightSwipeButton = createButton('♡');
  rightSwipeButton.position(870, 600);
  rightSwipeButton.mousePressed(rightSwipe);
  
  
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
    tweet.position(250, 400);
    tweet.class('tweet');
  }

}

function rightSwipe() {
  var choice = tweetsArray[position];
  
  //make bullet points
  response = createP("So. " + choice.user.screen_name +  ". so far: They've got " + choice.user.followers_count + " followers, and they follow " + choice.user.friends_count + " people."); 
  response.class('response');
  response.position(200, 700); 
  
  emotionScale();
  
  if (choice.user.description) {
    desc = createP(choice.user.description); 
    desc.class('desc');
    desc.position(200, 740);
  
  }
  
  
}

function emotionScale() {
  
  scale = createDiv("This tweeter seems...");
  
  emojis = createRadio();
  emojis.option("😡"); //angry
  emojis.option("😔"); //sad
  emojis.option("👹"); //trolling
  emojis.option("🤔"); //thoughtful
  emojis.option("😍"); //loving trump
  emojis.option("😐"); //jaded
  
  scale.class('scale');
  emojis.parent(scale);
  scale.position(120, 820);
}

