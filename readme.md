# Node Twitter

[![Build Status](https://travis-ci.org/vinitkumar/node-twitter.svg?branch=master)](https://travis-ci.org/vinitkumar/node-twitter)

Node twitter is an effort to rewrite some of Twitter functionality using modern
javascript based toolchain. It was mostly an effort to learn Node.js and trying to reverse
engineer some of twitter's feature.

![screenshot](https://cldup.com/QCN3J88rC5-3000x3000.png)

## Prerequisites

You would require Node, NPM and MongoDB installed:

- [Node.js](http://nodejs.org)
- [Mongodb](http://docs.mongodb.org/manual/installation/)

The configuration is in `config/config.js`. Please create your own
github application [Github Developer Settings](https://github.com/settings/applications) and replace the token and keys.

```js
var path = require('path'),
    rootPath = path.normalize(__dirname + '/..');
module.exports = {
  production: {
    db: '',
    root: rootPath,
    app: {
      name: 'Node Twitter'
    },
    github: {
      clientID: '',
      clientSecret: '',
      callbackURL: ''
    }
  }
};
```

### Usage

```sh
# First install all the requirements.
λ npm install
# Now run the project
λ ~/projects/js/node-twitter/ master npm start

> nwitter@0.0.1-59 start /Users/vinitkumar/projects/js/node-twitter
> node server.js

Express app started on port 3000
```

## Authors

[![Vinit Kumar](https://avatars0.githubusercontent.com/u/537678?v=3&s=144)](https://vinitkumar.me)
[![Robert Cooper](https://avatars0.githubusercontent.com/u/16786990?v=3&s=144)](http://www.robertcooper.me/)

[Say Thanks](https://saythanks.io/to/vinitkumar)

### Support:
If you enjoy node-twitter, you can support the development here. https://gratipay.com/vinitkme/. :)

## LICENSE
MIT


<a target='_blank' rel='nofollow' href='https://app.codesponsor.io/link/uyhQ2YHmpDTZbNRraFXJEvTa/vinitkumar/node-twitter'>  <img alt='Sponsor' width='888' height='68' src='https://app.codesponsor.io/embed/uyhQ2YHmpDTZbNRraFXJEvTa/vinitkumar/node-twitter.svg' /></a>
