import { Modal } from 'bootstrap';

const openModal = (post, i18n) => {
  const modalElement = document.getElementById('modal');
  const modalInstance = new Modal(modalElement);

  const modalTitle = modalElement.querySelector('.modal-title');
  const modalBody = modalElement.querySelector('.modal-body');
  const linkButton = modalElement.querySelector('.btn-primary');

  modalTitle.textContent = post.title;
  modalBody.textContent = post.description;
  linkButton.href = post.link;
  linkButton.textContent = i18n.t('buttons.read');

  modalInstance.show(); // Показываем модальное окно
};

const closeModal = () => {
  const modalElement = document.getElementById('modal');
  const modalInstance = Modal.getInstance(modalElement);
  const backdrop = document.querySelector('.modal-backdrop');

  if (modalInstance) {
    modalInstance.hide(); // Закрываем модальное окно
    backdrop.remove();

    modalElement.classList.remove('show');
    modalElement.style.display = 'none';
  }
};

const renderPosts = (posts, state, i18n) => {
  const mainDiv = document.querySelector('.posts');
  let cardDiv = mainDiv.querySelector('.card');

  if (!cardDiv) {
    cardDiv = document.createElement('div');
    cardDiv.className = 'card border-0';

    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.className = 'card-body';

    const h2 = document.createElement('h2');
    h2.className = 'card-title h4';
    h2.textContent = i18n.t('headers.posts');

    const ul = document.createElement('ul');
    ul.className = 'list-group border-0 rounded-0';

    cardBodyDiv.appendChild(h2);
    cardDiv.appendChild(cardBodyDiv);
    cardDiv.appendChild(ul);

    mainDiv.appendChild(cardDiv);
  }

  const ul = cardDiv.querySelector('ul');
  ul.innerHTML = '';

  posts.forEach((post) => {
    const li = document.createElement('li');
    li.className =
      'list-group-item d-flex justify-content-between align-items-start border-0 border-end-0';

    const a = document.createElement('a');
    a.href = post.link;
    a.className = state.clickedPosts.has(post.id) ? 'fw-normal' : 'fw-bold';
    a.setAttribute('data-id', post.id);
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = post.title;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn-outline-primary btn-sm';
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    button.textContent = i18n.t('buttons.viewing');

    // Открываем модальное окно при нажатии на кнопку
    button.addEventListener('click', () => openModal(post, i18n));

    li.appendChild(a);
    li.appendChild(button);
    ul.appendChild(li);
  });

  document
    .querySelectorAll('.list-group a.fw-bold, .list-group button')
    .forEach((element) => {
      element.addEventListener('click', (event) => {
        const clickedElement = event.currentTarget;
        const parentLi = clickedElement.closest('li');
        const relatedLink = parentLi.querySelector('a.fw-bold, a.fw-normal');

        if (relatedLink) {
          state.clickedPosts.add(relatedLink.getAttribute('data-id'));
          relatedLink.classList.replace('fw-bold', 'fw-normal');
        }
      });
    });

  // Закрытие модального окна при клике на кнопку с атрибутом data-bs-dismiss
  document.querySelectorAll('[data-bs-dismiss="modal"]').forEach((button) => {
    button.addEventListener('click', closeModal);
  });

  // Закрытие модального окна при клике на фон (backdrop)
  document.addEventListener('click', (event) => {
    const modalElement = document.getElementById('modal');
    if (event.target === modalElement) {
      closeModal();
    }
  });

  // Закрытие модального окна при нажатии клавиши Escape
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
};

export default renderPosts;
