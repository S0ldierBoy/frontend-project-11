//npx webpack serve
import '../src/styles.css';
import render from './view.js';
import validateUrl from './validator.js';
import onChange from 'on-change';

const button = document.querySelector('[type="submit"]');
const form = document.querySelector('.form-control');

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
  render(state);
});

form.addEventListener('input', (e) => {
  const url = e.target.value;
  watchedState.url = url;
});
