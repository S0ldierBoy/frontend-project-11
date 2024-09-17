const openModal = (post, i18n) => {
  const modalElement = document.getElementById('modal');

  const modalTitle = modalElement.querySelector('.modal-title');
  const modalBody = modalElement.querySelector('.modal-body');
  const linkButton = modalElement.querySelector('.btn-primary');
  const closeButton = modalElement.querySelector('.btn.btn-secondary');

  modalTitle.textContent = post.title;
  modalBody.textContent = post.description;
  linkButton.href = post.link;
  linkButton.textContent = i18n.t('buttons.read');
  closeButton.textContent = i18n.t('buttons.close');
};

export default openModal;
