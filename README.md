# Chord progression comparison
## About
This project is a little webapp that compares given chord progressions to
standard ones, like [I vi ii V](https://www.youtube.com/watch?v=MrTz5xjmso4)
or [I V iv IV](https://www.youtube.com/watch?v=0mPAO0R8uuQ). It is meant to be
used at class by my students, to facilitate harmonic analysis of popular songs.
I will be adding a 'transpose' function so that they get a chord progression in
a key given by them, and then use it for composing songs of their own.

## Setup
To set it up clone this repo to your computer
`git clone https://github.com/pablomartan/chord_progression_comparison`

You will need [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/).
Once you have them installed navigate to the repo you cloned this repo on and
run the following command to install dependencies (Webpack and some plugins for
it):
`npm i`

Once you have it set up you can run `npm run build-prod` and `npm start` to get
a working example on `http://localhost:8081`. You can then access it on your
web browser and start using it.

If you would like to change the chord
progressions, add examples, or simply play with the code, you can run `npm run
build-dev` to get a dev server that reloads when you change the code for the
project. If your browser doesn't navigate automatically to
`http://localhost:8080` you can go manually. You'll need to run the server also
with `npm start`.

## License
All the code in this repo is licensed under the [GPLv3](./LICENSE) license.
