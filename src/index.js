import './styles.css';
import i18n from 'i18next';
import validateUrl from './validator.js';
import resources from './locales/index.js';
import domParser from './domParser.js';
import { checkForUpdates, fetchRss, assignIdsToPosts } from './utils.js';
import createWatchState from './view/watchState.js';

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
        feeds: {}, // Пустой объект, который будет заполняться фидами, каждый фид будет объектом
        error: null, // Ошибка изначально отсутствует
        load: null, // Состояние загрузки изначально неопределено
        viewedPosts: new Set(), // Храним кликнутые посты
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
          .then((data) => domParser(data.contents, url))
          .then((dataWithoutId) => {
            const parsedData = assignIdsToPosts(dataWithoutId, url);
            watchedState.load = 'process';
            elements.submitButton.disabled = false;
            watchedState.feeds[parsedData.id] = parsedData;

            e.target.reset();
            elements.input.focus();
          })
          .catch((error) => {
            watchedState.error = error.message; // Записываем текст ошибки для отображения
            elements.submitButton.disabled = false;
            watchedState.load = 'error';
          });
      });

      checkForUpdates(state, watchedState);
    })
    .catch((error) => {
      console.error('errors.i18nInitError', error);
    });
}

runApp();
