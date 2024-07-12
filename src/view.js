const renderError = (elements, error, i18n) => {
  const { input, feedback } = elements;
  input.classList.add('is-invalid');
  feedback.textContent = i18n.t(error);
  feedback.classList.remove('text-success');
  feedback.classList.add('text-danger');
};

const renderSuccess = (elements, i18n) => {
  const { input, feedback } = elements;
  input.classList.remove('is-invalid');
  feedback.textContent = i18n.t('successful.success1');
  feedback.classList.remove('text-danger');
  feedback.classList.add('text-success');
};

const render = (elements, state, i18n) => {
  const { error } = state;
  if (error) {
    renderError(elements, error, i18n);
  } else {
    renderSuccess(elements, i18n);
  }
};

export default render;
