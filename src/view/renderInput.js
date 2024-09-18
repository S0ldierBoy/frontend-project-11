const renderInput = (elements, state, i18n) => {
  const { input, feedback, submitButton } = elements;
  const { error, isSubmitting } = state;

  feedback.classList.remove('text-success', 'text-danger');
  input.classList.remove('is-invalid');

  if (error) {
    input.classList.add('is-invalid');
    feedback.textContent = i18n.t(error);
    feedback.classList.add('text-danger');
  } else if (state.feedback === 'success') {
    feedback.textContent = i18n.t('successful.rssLoadSuccess');
    feedback.classList.add('text-success');
  } else {
    feedback.textContent = '';
  }

  // Управляем кнопкой отправки
  submitButton.disabled = isSubmitting;
};

export default renderInput;
