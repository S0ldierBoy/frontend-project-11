import './styles.css';
import i18n from 'i18next';
import validateUrl from './validator.js';
import resources from './locales/index.js';
import domParser from './domParser.js';
import { checkForUpdates, fetchRss } from './utils.js';
import createWatchState from './view/watchState.js';
import _ from 'lodash';

function runApp() {
  const i18nextInstance = i18n.createInstance();

  i18nextInstance
    .init({
      lng: 'ru',
      resources,
    })
    .then(() => {
      const elements = {
        form: document.querySelector('.rss-form'),
        input: document.querySelector('#url-input'),
        feedback: document.querySelector('.feedback'),
        modal: document.querySelector('.modal-footer'),
        submitButton: document.querySelector('button[type="submit"]'),
      };

      const state = {
        feeds: [],
        posts: [],
        error: null,
        load: null,
        viewedPosts: new Set(),
      };

      const watchedState = createWatchState(state, elements, i18nextInstance);

      elements.form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const url = formData.get('url').trim();

        validateUrl(url, state)
          .then(() => {
            elements.submitButton.disabled = true;
            watchedState.error = null;
            return fetchRss(url);
          })
          .then((data) => {
            const dataWithoutId = domParser(data.contents);
            const feedId = _.uniqueId('feed-');

            const feed = {
              id: feedId,
              title: dataWithoutId.title,
              description: dataWithoutId.description,
              url,
            };

            

            const posts = dataWithoutId.posts.map((post) => ({
              ...post,
              id: _.uniqueId('post-'),
              feedId,
            }));

            console.log(feed)
            console.log(posts)

            watchedState.feeds.unshift(feed);
            watchedState.posts = [...posts, ...watchedState.posts];

            watchedState.load = 'process';
            elements.submitButton.disabled = false;

            e.target.reset();
            elements.input.focus();
          })
          .catch((error) => {
            watchedState.error = error.message;
            elements.submitButton.disabled = false;
            watchedState.load = 'error';
          });
      });

      checkForUpdates(watchedState);
    })
    .catch((error) => {
      console.error('errors.i18nInitError', error);
    });
}

runApp();
