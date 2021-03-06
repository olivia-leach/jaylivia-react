/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */
import 'babel-polyfill';

/* eslint-disable import/no-unresolved, import/extensions */
// Load the manifest.json file and the .htaccess file
import '!file?name=[name].[ext]!./manifest.json';
import 'file?name=[name].[ext]!./.htaccess';
/* eslint-enable import/no-unresolved, import/extensions */

import '!file-loader?name=[name].[ext]!./assets/images/hotel.jpg';
import '!file-loader?name=[name].[ext]!./assets/images/woodstock.jpg';
import '!file-loader?name=[name].[ext]!./assets/images/camping.jpg';
import '!file-loader?name=[name].[ext]!./assets/images/emerson.jpg';
import '!file-loader?name=[name].[ext]!./assets/images/bestwestern.jpeg';
import '!file-loader?name=[name].[ext]!./assets/images/kates.jpg';
// import '!file-loader?name=[name].[ext]!./assets/images/rsvp.png';
import '!file-loader?name=[name].[ext]!./assets/images/rosie.jpg';
import '!file-loader?name=[name].[ext]!./assets/images/rosie2.jpg';
import '!file-loader?name=[name].[ext]!./assets/images/proposal.jpg';
import '!file-loader?name=[name].[ext]!./assets/images/thelodge.jpg';
import '!file-loader?name=[name].[ext]!./assets/images/woods.jpg';
import '!file-loader?name=[name].[ext]!./assets/theLodge.pdf';
import '!file-loader?name=[name].[ext]!./assets/images/paper.jpg';

// Import all the third party stuff
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import FontFaceObserver from 'fontfaceobserver';
import { useScroll } from 'react-router-scroll';
import LanguageProvider from 'containers/LanguageProvider';
import configureStore from './store';

// Import i18n messages
import { translationMessages } from './i18n';

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
import 'sanitize.css/sanitize.css';
import './global-styles';

// import styles
import 'stylesheets/style.scss';

// Observe loading of Open Sans (to remove open sans, remove the <link> tag in
// the index.html file and this observer)
const ralewayObserver = new FontFaceObserver('Raleway', {});

// When Open Sans is loaded, add a font-family using Open Sans to the body
ralewayObserver.load().then(() => {
  document.body.classList.add('fontLoaded');
}, () => {
  document.body.classList.remove('fontLoaded');
});

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {};
const store = configureStore(initialState, browserHistory);

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
import { selectLocationState } from 'containers/App/selectors';
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: selectLocationState(),
});

// Set up the router, wrapping all Routes in the App component
import App from 'containers/App';
import createRoutes from './routes';
const rootRoute = {
  component: App,
  childRoutes: createRoutes(store),
};


const render = (translatedMessages) => {
  ReactDOM.render(
    <Provider store={store}>
      <LanguageProvider messages={translatedMessages}>
        <Router
          history={history}
          routes={rootRoute}
          render={
            // Scroll to top when going to a new page, imitating default browser
            // behaviour
            applyRouterMiddleware(useScroll())
          }
        />
      </LanguageProvider>
    </Provider>,
    document.getElementById('app')
  );
};


// Hot reloadable translation json files
if (module.hot) {
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept('./i18n', () => {
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  (new Promise((resolve) => {
    resolve(System.import('intl'));
  }))
    .then(() => Promise.all([
      System.import('intl/locale-data/jsonp/de.js'),
    ]))
    .then(() => render(translationMessages))
    .catch((err) => {
      throw err;
    });
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
import { install } from 'offline-plugin/runtime';
install();
