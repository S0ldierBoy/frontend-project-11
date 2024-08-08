const renderPosts = (posts) => {
  const mainDiv = document.querySelector('.posts');
  let cardDiv = mainDiv.querySelector('.card');

  if (!cardDiv) {
    // Создаем новый контейнер, если его нет
    cardDiv = document.createElement('div');
    cardDiv.className = 'card border-0';

    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.className = 'card-body';

    const h2 = document.createElement('h2');
    h2.className = 'card-title h4';
    h2.textContent = 'Посты';

    const ul = document.createElement('ul');
    ul.className = 'list-group border-0 rounded-0';

    cardBodyDiv.appendChild(h2);
    cardDiv.appendChild(cardBodyDiv);
    cardDiv.appendChild(ul);

    mainDiv.appendChild(cardDiv);
  }

  // Очищаем существующий список постов
  const ul = cardDiv.querySelector('ul');
  ul.innerHTML = '';

  // Функция для открытия модального окна
  const openModal = (post) => {
    const body = document.body;
    const modalFade = document.querySelector('#modal');
    const modalContent = modalFade.querySelector('.modal-content');
    const modalTitle = modalContent.querySelector('.modal-title');
    const modalBody = modalContent.querySelector('.modal-body');
    const linkButton = modalContent.querySelector('.btn-primary');

    body.classList.add('modal-open');
    body.style.overflow = 'hidden';
    body.style.paddingRight = '14px';

    modalFade.classList.add('show');
    modalFade.style.display = 'block';

    modalTitle.textContent = post.title;
    modalBody.textContent = post.description;
    linkButton.href = post.link;

    // Добавляем backdrop, если его еще нет
    if (!document.querySelector('.modal-backdrop')) {
      const backdrop = document.createElement('div');
      backdrop.classList.add('modal-backdrop', 'fade', 'show');
      document.body.appendChild(backdrop);
    }
  };

  // Функция для закрытия модального окна
  const closeModal = () => {
    const body = document.body;
    const modalFade = document.querySelector('#modal');

    body.classList.remove('modal-open');
    body.style.overflow = '';
    body.style.paddingRight = '';

    modalFade.classList.remove('show');
    modalFade.style.display = 'none';

    // Удаляем backdrop
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.remove();
    }
  };

  // Наполняем список новыми данными
  posts.forEach((post) => {
    const li = document.createElement('li');
    li.className =
      'list-group-item d-flex justify-content-between align-items-start border-0 border-end-0';

    const a = document.createElement('a');
    a.href = post.link;
    a.className = 'fw-normal link-secondary';
    a.setAttribute('data-id', post.id);
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = post.title;

    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'btn btn-outline-primary btn-sm';
    button.setAttribute('data-id', post.id);
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    button.textContent = 'Просмотр';

    button.addEventListener('click', () => openModal(post));

    li.appendChild(a);
    li.appendChild(button);
    ul.appendChild(li);
  });

  // Добавляем обработчик для закрытия модального окна
  const closeButtons = document.querySelectorAll('[data-bs-dismiss="modal"]');
  closeButtons.forEach((button) => {
    button.addEventListener('click', closeModal);
  });

  // Закрытие при клике вне модального окна
  document.addEventListener('click', (event) => {
    const modalFade = document.querySelector('#modal');
    if (event.target === modalFade) {
      closeModal();
    }
  });

  // Закрытие по нажатию клавиши Escape
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
};

export default renderPosts;
