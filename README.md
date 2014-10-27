# LiveBand [![Build Status](https://secure.travis-ci.org/liveband/liveband.svg?branch=master)](http://travis-ci.org/liveband/liveband) [![Code Climate](https://codeclimate.com/github/liveband/liveband/badges/gpa.svg)](https://codeclimate.com/github/liveband/liveband) [![Issues in ready state](https://badge.waffle.io/liveband/liveband.png?label=ready&title=Ready)](https://waffle.io/liveband/liveband)

LiveBand is intended to be a collaborative digital audio workstation (DAW) web application for creating music in the cloud with other musicians.

Most of the popular desktop DAWs do not have any built-in collaborative features. Now that the Web Audio API and Web MIDI API allow you do things like plug a guitar, keyboard, microphone, etc. directly into your browser (without the need for downloads/plugins), it is possible for a single web app to enable high quality music recording and real-time collaboration over the Web.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](http://git-scm.com/)
* [Node.js](http://nodejs.org/) (with NPM)
* [Bower](http://bower.io/): `sudo npm install -g bower`
* [Ember CLI](http://ember-cli.com): `sudo npm install -g ember-cli`

## Installation

* `git clone https://github.com/liveband/liveband.git` this repository
* `cd liveband` into the new directory
* `npm install`
* `bower install`

## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200)

### Code Generators

To see available code generators, run `ember help generate`. In addition to common generators like `ember generate route foo` and `ember generate template foo`, this project adds `ember generate style foo`.

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

## Further Reading / Useful Links

* ember: http://emberjs.com/
* ember-cli: http://www.ember-cli.com/
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

