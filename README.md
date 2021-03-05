# Cards

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

A deck of cards to be played virtually over the internet. There are two roles:
1. A dealer - the dealer controls the game and the deck of cards, but cannot see which player has which cards.
2. Four players - players can view their own cards, but not those of others.

The first user to connect is given the role of dealer, subsequent users are allocated the role of player.

## TODO

* Force play in a clockwise direction.
* Enable the dealer to specify which player should play first in the next round.
* Enable the dealer to keep track of player scores.

## Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the `killport` and `server` scripts to start the backend Node/Express server on port 8080.
Concurrently runs the `start` script to run the React app in the development mode on port 3000.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`
Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.

### `npm run start`
Starts the front-end React application in development mode with hot reloading of changes. Used by the `dev` script above.

### `npm run server`
Starts the back-end Node/Express server. Used by the `dev` script above.
### `npm run killport`
Mac-only. Kills any process currently using port 8080. Used to clear previously-running servers that haven't shut down correctly.\ 
Used by the `dev` script above.

### `npm run deploy`
Deploys the app to Heroku by pushing the code to the origin/heroku branch
