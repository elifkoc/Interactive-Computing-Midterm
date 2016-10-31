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

//Emoji Scale
var emojis, emScale, emChange, emoText, emVal, jaded, angry, sad, emoPicked;

//About the tweeter 
var about;

//Topics
var  list, item1, item2, item3, item4;
var outOfTweets;

var topics, topic, topicText, topicList, topicDesc, topicPicked;

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
    console.log("this is working");
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
  about = createDiv("");
  about.class('about');
  response = createP("Here's what we know about " + choice.user.screen_name +  " so far:"); 
  response.class('response');
  response.parent(about);
  list = createElement('ul', "");
  item1 = createElement('li', choice.user.followers_count + " followers");
  item2 = createElement('li', "Follows " + choice.user.friends_count);
  if (choice.user.description) {
      item3 = createElement('li', "Twitter bio: " + choice.user.description); 
  }
  list.class('list');
  item1.parent(list);
  item2.parent(list);
  item3.parent(list);
  list.parent(about);
  about.position(80, 720);
  emotionScale();
  topics();
  

  
  
}

function emotionScale() {
  
  emScale = createDiv("This tweeter seems...");
  emScale.class('emScale');
  emScale.position(80, 1020);
  
  emojis = createRadio();
  emojis.option("😡", "Proceed with caution! What may seem like anger to you could be passion for them. If you disagree, make sure your passion comes with logic and facts. Also remember this is meant to be a friendly, intelligent conversation, do not take anything as a personal attack, instead ask for clarification. "); //angry
  emojis.option("😔", "Stay positive!  Address that many citizens are feeling the same way and then attempt to lighten the mood with cheerful content about your prefered candidate to stimulate a sense of hope. "); //sad
  emojis.option("😍", "Dive in! This person is ready to have a conversation so you won’t have to devote time getting them out of their shell. Listen to what they have to say and respond responsibly. Agree or disagree you’re bound to learn something! "); //loving trump
  emojis.option("😐", "Amp them up! Begin the conversation with questions about their interests to figure out what gets them excited. This election has seemed long but remind them it’s almost over and their voice IS important! "); //jaded

  emojis.parent(emScale);
  
  emoText = createP("");
  emoText.parent(emScale);
  
  emojis.changed(emChange);
  
  function emChange() {
    var item = emojis.value();
    emoText.html(item);        
  }
}

function topics() {
  topic = createDiv("We're talking about...");
  topic.class('topic');
  topic.position(700, 700);
  
  topicList = createSelect();
  topicList.parent(topic);
  topicList.option("Abortion", "A Texas Law requiring clinics that perform abortions to have hospital-like (read: expensive) conditions was determined unconstitutional by the Supreme Court in June saying this made getting an abortion too difficult. This topic remains controversial, emotional and political with pro-choicers and pro-lifers being very passionate. ");
  topicList.option("Civil Rights", "With Black Lives Matter in the spotlight, civil rights has been a hot topic this election. Hillary calls for changing and equalizing the system. Trump wants you to know that All Lives Matter. ");
  topicList.option("Climate Change", "Is it getting warmer? Hillary wants the US to be a green energy superpower. Trump doesn’t believe the climate changing. ");
  topicList.option("Economy","US debt is increasing by the millions every day. Hillary want to cut taxes for the middle class. Trump wants to create new trade deals and have major tax cuts. ");
  topicList.option("Education","Not all US schools are giving their students a proper education and the majority of Americans who attended college are in lot of debt. Hillary is pro Common Core and making college more affordable. Trump is anti-Common Core and the US government making money off student loans");
  topicList.option("Gun Control","The Second Amendment gives Americans the right to bear arms to what extent is up for debate. Hillary calls for stricter background checks. Trump wants to keep the laws as they are.  ");
  topicList.option("Immigration","There are about 11 million undocumented immigrants in the US today. Hillary wants an immigration reform that paves a pathway to full citizenship. Trump calls stricter border patrol (a.k.a the wall).");
  topicList.option("ISIS","This terrorists group called dibs on huge parts of Iraq and Syria in 2014, since then they’ve spread their reign of terror throughout the Middle East and beyond. Hillary wants to continue with Obama’s Policy, keeping our troops out and sending special forces in. Trump wants to eliminate their ability to recruit and get other countries to join the US’ force. ");
  
  topicList.changed(topicPicked);
  
  topicDesc = createP("A Texas Law requiring clinics that perform abortions to have hospital-like (read: expensive) conditions was determined unconstitutional by the Supreme Court in June saying this made getting an abortion too difficult. This topic remains controversial, emotional and political with pro-choicers and pro-lifers being very passionate.");
  topicDesc.parent(topic);
  
  function topicPicked() {
    var item = topicList.value();
    topicDesc.html(item);
  }

}



