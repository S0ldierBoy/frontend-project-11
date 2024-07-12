//npx webpack serve
import './styles.css';
import i18n from 'i18next';
import onChange from 'on-change';
import validateUrl from './validator.js';
import render from './view.js';
import resources from './locales/index.js';

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
  };

  const state = {
    url: '',
    error: null,
  };

  const watchedState = onChange(state, (path, value) => {
    render(elements, state, i18nextInstance);
  });

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const url = formData.get('url');

    validateUrl(url).then((error) => {
      watchedState.error = error;
      if (!error) {
        console.log('URL валиден:', url);
        e.target.reset();
        elements.input.focus();
      }
    });
  });
};

runApp();
