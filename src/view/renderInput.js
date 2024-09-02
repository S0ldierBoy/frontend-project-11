const renderDefault = (elements) => {
  elements.feedback.textContent = '';
  elements.input.classList.remove('is-invalid');
  elements.feedback.classList.remove('text-success', 'text-danger');
};

const updateInputState = (elements, error, i18n) => {
  const { input, feedback } = elements;

  if (error) {
    input.classList.add('is-invalid');
    feedback.textContent = i18n.t(error);
    feedback.classList.remove('text-success');
    feedback.classList.add('text-danger');
  } else {
    input.classList.remove('is-invalid');
    feedback.textContent = i18n.t('successful.success1');
    feedback.classList.remove('text-danger');
    feedback.classList.add('text-success');
  }
};

const renderInput = (elements, state, i18n) => {
  const { error, load } = state;

  if (error || load === 'process') {
    updateInputState(elements, error, i18n);
  } else {
    renderDefault(elements);
  }
};

export default renderInput;
