//npx webpack serve
import '../src/styles.css';
import * as yup from 'yup';
import onChange from 'on-change';

const button = document.querySelector('[type="submit"]');
const form = document.querySelector('.form-control');

const schema = yup.object().shape({
  url: yup.string().url().required(),
});

const inputMessages = {
  err1: 'Ссылка должна быть валидным URL',
  err2: 'Ресурс не содержит валидный RSS',
  sucs: 'RSS успешно загружен',
};

const state = {
  url: '',
  isValid: false,
  errors: {},
};

const validateUrl = (url) => {
  schema
    .validate({ url })
    .then(() => {
      state.errors = {};
      state.isValid = true;
    })
    .catch((err) => {
      state.errors = { url: err.message };
      state.isValid = false;
    });
};

const watchedState = onChange(state, (path, value) => {
  validateUrl(value);
});

const render = () => {
  const errorField = document.querySelector('.feedback');
  const formField = document.querySelector('#url-input');

  if (!state.isValid) {
    formField.classList.add('is-invalid');
    errorField.textContent = inputMessages.err1;
    errorField.classList.remove('text-success');
    errorField.classList.add('text-danger');
  } else if (state.isValid) {
    formField.classList.remove('is-invalid');
    errorField.textContent = '';
    errorField.classList.remove('text-danger');
    errorField.classList.add('text-success');
  }
};

button.addEventListener('click', (e) => {
  e.preventDefault();
  render();
});

form.addEventListener('input', (e) => {
  const url = e.target.value;
  watchedState.url = url;
});
