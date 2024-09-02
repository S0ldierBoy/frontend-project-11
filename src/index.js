import './styles.css';
import i18n from 'i18next';
import onChange from 'on-change';
import validateUrl from './validator.js';
import renderInput from './view/renderInput.js';
import resources from './locales/index.js';
import domParser from './domParser.js';
import feedView from './view/index.js';
import { checkForUpdates, fetchRss, assignIdsToPosts } from './utils.js';

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
        modal: document.querySelector('modal-footer'),
        submitButton: document.querySelector('button[type="submit"]'),
      };

      const state = {
        feeds: {}, // Пустой объект, который будет заполняться фидами, каждый фид будет объектом
        error: null, // Ошибка изначально отсутствует
        load: null, // Состояние загрузки изначально неопределено
      };

      const watchedState = onChange(state, (path) => {
        console.log(state);
        switch (path) {
          case 'feeds':
          case 'posts':
            feedView(state, i18nextInstance);
            break;
          default:
            renderInput(elements, state, i18nextInstance);
        }
      });

      elements.form.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const url = formData.get('url').trim(); // +

        validateUrl(url, state) // +
          .then(() => {
            elements.submitButton.disabled = true;
            watchedState.error = null;
            return fetchRss(url);
          })
          .then((data) => domParser(data.contents, url)) // +

          .then((dataWithoutId) => assignIdsToPosts(dataWithoutId, url)) // +
          .then((parsedData) => {
            watchedState.feeds[parsedData.id] = parsedData; // + стейт копит фиды по отдельности фид1 = {}

            elements.submitButton.disabled = false;
            watchedState.load = 'process';
            e.target.reset();
            elements.input.focus();
          })
          .catch((error) => {
            watchedState.error = error.message; // Записываем текст ошибки для отображения
            elements.submitButton.disabled = false;
            watchedState.load = 'error';
          });
      });

      // Запускаем начальную проверку после загрузки приложения
      checkForUpdates(state, watchedState);
    })
    .catch((error) => {
      console.error('Ошибка инициализации i18', error);
    });
}

runApp();

