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
    urls: [],
    error: null,
    feeds: [],
    posts: [],
    uiState: {
      loading: false,
    },
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
    const url = formData.get('url').trim();

    validateUrl(url, state)
      .then(() => {
        watchedState.error = null; // Сбрасываем ошибку
        watchedState.urls.unshift(url); // Добавляем URL
        return fetchRss(url);
      })
      .then((data) => domParser(data.contents))
      .then((parsedData) => {
        watchedState.feeds.unshift(...parsedData.feed);
        watchedState.posts.unshift(...parsedData.posts);
        watchedState.loading = true;

        e.target.reset();
        elements.input.focus();
      })
      .catch((error) => {
        watchedState.error = error.message; // Записываем текст ошибки для отображения
        //watchedState.urls.shift(url);
      });
  });
};

runApp();
