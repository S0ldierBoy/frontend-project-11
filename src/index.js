//npx webpack serve
import '../src/styles.css';
import render from './view.js';
import validateUrl from './validator.js';
import onChange from 'on-change';

const form = document.querySelector('.rss-form');
const button = document.querySelector('[type="submit"]');
const input = document.querySelector('#url-input');

const state = {
  url: '',
  isValid: false,
  errors: {},
};

const watchedState = onChange(state, (path, value) => {
  if (path === 'url') {
    validateUrl(value, state);
  }
});

button.addEventListener('click', (e) => {
  e.preventDefault();
  if (input.value !== '') {
    input.setCustomValidity('');
    render(form, state);
  } else {
    input.setCustomValidity('Это поле обязательно для заполнения');
    input.reportValidity();
  }
});

form.addEventListener('input', (e) => {
  input.setCustomValidity('');
  const url = e.target.value;
  watchedState.url = url;
});
