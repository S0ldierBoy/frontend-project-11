const renderDefault = (elements) => {
  elements.feedback.textContent = '';
  elements.input.classList.remove('is-invalid');
  elements.feedback.classList.remove('text-success', 'text-danger');
};

const renderError = (elements, error, i18n) => {
  const { input, feedback } = elements;
  input.classList.add('is-invalid');
  const errorMessage = error.code
    ? i18n.t(`errors.${error.code}`)
    : error.message;
  feedback.textContent = errorMessage;
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

const renderInput = (elements, state, i18n) => {
  const { error } = state;

  if (error) {
    renderError(elements, error, i18n);
  } else if (state.urls.length > 0) {
    renderSuccess(elements, i18n);
  } else {
    renderDefault(elements);
  }
};

export default renderInput;
