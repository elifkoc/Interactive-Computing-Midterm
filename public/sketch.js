// Credit to Daniel Shiffman
// A p5 sketch that searches twitter

// User input fields
var searchInput;
var postInput;
var tweetsArray = [];
var position = 0;
var nextButton;
function setup() {
  noCanvas();

  // Get all the HTML elements
  searchInput = select('#searchInput');
  var button1 = select('#searchButton');
  // Assign the callbacks to the functions
  button1.mousePressed(getTweets);
}

// Execute an API call to our own API
function getTweets() {
  loadJSON(/tweets/ + searchInput.value(), gotTweets);
}

// We got the tweets
function gotTweets(tweets) {
  //Add the tweets to an array
  for (var i = 0; i < tweets.length; i++) {
    tweetsArray.push(tweets[i]);
  }
  
  var next = createButton("next");
  next.id('next');
  nextButton = select('#next');
  
  displayTweet();
  
}



// Display Tweet
function displayTweet() {
  var par = createDiv(tweetsArray[position].text);
    var par2 = createDiv(tweetsArray[position].user.screenName);
    par.class('text');
    par2.class('id');
    par2.parent(par);
  nextButton.mousePressed(nextTweet);
  //console.log(tweetsArray[position]);

  
}


function nextTweet() {
  console.log(tweetsArray);
  
    position++;

}



