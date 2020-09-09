# Scheduler
A React app that allows users to book, edit and cancel interviews. Data is persisted by the API server using a PostgreSQL database hosted on Heroku, jest tests are used through the development of the project. The client application communicates with a WebSocket server, when a user books or cancels an interview, all connected users see the update in their browser. The site is deployed here! (https://interview-scheduling-app.netlify.app/) 
## Screenshots
!["Screenshot of Interview Scheduler"]()
!["Screenshot of Interview Scheduler New Interview"]()
!["Screenshot of Interview Scheduler Deleting Interview"]()
## Dependencies
- Axios
- Classnames
- Normalize.css
- React
- React-dom
- React-scripts
## DEV Dependencies
- @babel/core
- @storybook/addon-actions
- @storybook/addon-backgrounds
- @storybook/addon-links
- @storybook/addons
- @storybook/react
- @testing-library/jest-dom
- @testing-library/react
- @testing-library/react-hooks
- babel-loader
- node-sass
- react-test-renderer
## Setup
1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
## Running Webpack Development Server
```sh
npm start
```
## Running Jest Test Framework
```sh
npm test
```
## Running Storybook Visual Testbed
```sh
npm run storybook
```