// ## Tweet Controller
const mongoose = require('mongoose');
const Tweet = mongoose.model('Tweet');
const Analytics = mongoose.model('Analytics');
const _ = require('underscore');

function logAnalytics(req) {
  var url = req.protocol + '://' + req.get('host') + req.originalUrl;
  var crudeIpArray = req.ip.split(':');
  var ipArrayLength = crudeIpArray.length;
  // cleanup IP to remove unwanted characters
  var cleanIp = crudeIpArray[ipArrayLength - 1];
  if (req.get('host').split(':')[0] !== 'localhost') {
    var analytics = new Analytics(
      {
        ip: cleanIp,
        user: req.user,
        url: url
      });
    analytics.save(function(err) {
      if (err) {
        console.log(err);
      }
    });
  }
}

exports.tweet = function(req, res, next, id) {
  logAnalytics(req);
  Tweet.load(id, function(err, tweet) {
    if (err) {
      return next(err);
    }
    if (!tweet) {
      return next(new Error('Failed to load tweet' + id));
    }
    req.tweet = tweet;
    next();
  });
};

// ### New Tweet
exports.new = function(req, res) {
  logAnalytics(req);
  res.render('tweets/new', {
    title: 'New Tweet',
    tweet: new Tweet({})
  });
};

// ### Create a Tweet
exports.create = function(req, res) {
  logAnalytics(req);
  var tweet = new Tweet(req.body);
  tweet.user = req.user;
  tweet.uploadAndSave(req.files.image, function(err) {
    if (err) {
      res.render('tweets/new', {
        title: 'New Tweet',
        tweet: tweet,
        error: err.errors
      });
    } else {
      res.redirect('/');
    }
  });
};

// ### Edit Tweet
exports.edit = function(req, res) {
  logAnalytics(req);
  res.render('tweets/edit', {
    title: 'Edit' + req.tweet.title,
    tweet: req.tweet
  });
};

// ### Show Tweet
exports.show = function(req, res) {
  logAnalytics(req);
  res.render('tweets/show', {
    title: req.tweet.title,
    tweet: req.tweet
  });
};

// ### Update a tweet
exports.update = function(req, res) {
  logAnalytics(req);
  var tweet = req.tweet;
  tweet = _.extend(tweet, req.body);
  tweet.uploadAndSave(req.files.image, function(err) {
    if (err) {
      res.render('tweets/edit', {
        title: 'Edit Tweet',
        tweet: tweet,
        error: err.errors
      });
    } else {
      res.redirect('/');
    }
  });
};

// ### Delete a tweet
exports.destroy = function(req, res) {
  logAnalytics(req);
  var tweet = req.tweet;
  tweet.remove(function(err) {
    if (err) {
      return res.render('500');
    }
    res.redirect('/');
  });
};

exports.index = function(req, res) {
  logAnalytics(req);
  var page = (req.param('page') > 0 ? req.param('page') : 1) - 1;
  var perPage = 15;
  var options = {
    perPage: perPage,
    page: page
  };

  Tweet.list(options, function(err, tweets) {
    if (err) {
      return res.render('500');
    }
    Tweet.count().exec(function(err, count) {
      if (err) {
        return res.render('500');
      }
      Analytics.list({perPage: 15}, function (err, analytics) {
        res.render('tweets/index', {
          title: 'List of Tweets',
          tweets: tweets,
          analytics: analytics,
          page: page + 1,
          pages: Math.ceil(count / perPage)
        });
      });
    });
  });
};
