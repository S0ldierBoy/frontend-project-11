//npx webpack serve
import '../src/styles.css';
import i18n from 'i18next';
import render from './view.js';
import onChange from 'on-change';
import validateUrl from './validator.js';
import resources from './locales/index.js';

const state = {
  url: '',
  isValid: 'process',
  errors: {},
  lang: 'ru',
};

const runApp = async () => {
  const i18nextInstance = i18n.createInstance();

  await i18nextInstance.init({
    resources: {
      ru: { translation: resources.ru.translation },
    },
    lng: 'ru',
    fallbackLng: 'ru',
  });

  const elements = {
    form: document.querySelector('.rss-form'),
    button: document.querySelector('[type="submit"]'),
    input: document.querySelector('#url-input'),
    errorField: document.querySelector('.feedback'),
  };

  const watchedState = onChange(state, (path, value) => {
    if (path === 'url') {
      validateUrl(value, state);
    }
    render(elements, state, i18nextInstance);
  });

  // elements.form.addEventListener('submit', (e) => {
  //   e.preventDefault();
  //   if (e.input.value !== '') {
  //     elements.input.setCustomValidy('');
  //     watchedState.url = elements.input.value;
  //     elements.form.reset();
  //     elements.input.focus();
  //   } else {
  //     elements.input.setCustomValidity(i18nextInstance.t('сообщение'));
  //     elements.input.reportValidity();
  //   }
  // });

  elements.form.addEventListener('submit', (e) => {
    e.preventDefault();
    watchedState.url = e.target
    const formData = new FormData(e.target);
    console.log(formData.get('url'))
  });

  elements.input.addEventListener('input', (e) => {});
  // Инициализация начального рендеринга
  render(elements, state, i18nextInstance);
};
runApp();
