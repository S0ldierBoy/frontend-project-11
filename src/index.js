//npx webpack serve
import './styles.css';
import i18n from 'i18next';
import onChange from 'on-change';
import validateUrl from './validator.js';
import renderInput from './view/renderInput.js';
import resources from './locales/index.js';
import fetchRss from './utils.js';
import domParser from './domParser.js';
import feedView from './view/index.js';

const runApp = async () => {
  const i18nextInstance = i18n.createInstance();
  await i18nextInstance.init({
    lng: 'ru',
    resources,
  });

  const elements = {
    form: document.querySelector('.rss-form'),
    input: document.querySelector('#url-input'),
    feedback: document.querySelector('.feedback'),
    modal: document.querySelector('modal-footer'),
  };

  const state = {
    error: null,
    feeds: [], // Добавляем массив для хранения фидов
    posts: [], // Добавляем массив для хранения постов
  };

  const watchedState = onChange(state, (path, value) => {
    if (path === 'feeds' || path === 'posts') {
      feedView(state, i18nextInstance); // Передаем state и i18nextInstance в feedView
    } else {
      renderInput(elements, state, i18nextInstance);
    }
  });

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');

    validateUrl(url).then((error) => {
      watchedState.error = error;

      if (!error) {
        e.target.reset();
        elements.input.focus();

        fetchRss(url)
          .then((data) => domParser(data.contents))
          .then((parsedData) => {
            watchedState.feeds = parsedData.feed; // Обновляем состояние фидов
            watchedState.posts = parsedData.posts; // Обновляем состояние постов
          });
      }
    });
  });
};

runApp();
