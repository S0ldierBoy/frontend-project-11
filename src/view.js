const render = (elements, state, i18n) => {
  const { form, input, errorField } = elements;

  if (!state.isValid) {
    input.classList.add('is-invalid');
    errorField.textContent = i18n.t('errors.err1');
    errorField.classList.remove('text-success');
    errorField.classList.add('text-danger');
  } else if (state.isValid) {
    input.classList.remove('is-invalid');
    errorField.textContent = '';
    errorField.classList.remove('text-danger');
    errorField.classList.add('text-success');
    // form.reset();
    // input.focus();
  }
};

export default render;
