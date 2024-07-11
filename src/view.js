const inputMessages = {
  err1: 'Ссылка должна быть валидным URL',
  err2: 'Ресурс не содержит валидный RSS',
  sucs: 'RSS успешно загружен',
};

const render = (form, state) => {
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
    form.reset();
    formField.focus();
  }
};

export default render;
