const clickedPosts = new Set();

// Функция для открытия модального окна
const openModal = (post) => {
  const { body } = document;
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

  if (!document.querySelector('.modal-backdrop')) {
    const backdrop = document.createElement('div');
    backdrop.classList.add('modal-backdrop', 'fade', 'show');
    document.body.appendChild(backdrop);
  }
};

// Функция для закрытия модального окна
const closeModal = () => {
  const { body } = document;
  const modalFade = document.querySelector('#modal');

  body.classList.remove('modal-open');
  body.style.overflow = '';
  body.style.paddingRight = '';

  modalFade.classList.remove('show');
  modalFade.style.display = 'none';

  const backdrop = document.querySelector('.modal-backdrop');
  if (backdrop) {
    backdrop.remove();
  }
};

const renderPosts = (posts) => {
  const mainDiv = document.querySelector('.posts');
  let cardDiv = mainDiv.querySelector('.card');

  if (!cardDiv) {
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

  const ul = cardDiv.querySelector('ul');
  ul.innerHTML = '';

  posts.forEach((post) => {
    const li = document.createElement('li');
    li.className =
      'list-group-item d-flex justify-content-between align-items-start border-0 border-end-0';

    const a = document.createElement('a');
    a.href = post.link;
    a.className = clickedPosts.has(post.id) ? 'fw-normal' : 'fw-bold';
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

  document
    .querySelectorAll('.list-group a.fw-bold, .list-group button')
    .forEach((element) => {
      element.addEventListener('click', (event) => {
        const clickedElement = event.currentTarget;
        const parentLi = clickedElement.closest('li');
        const relatedLink = parentLi.querySelector('a.fw-bold, a.fw-normal');

        if (relatedLink) {
          clickedPosts.add(relatedLink.getAttribute('data-id'));
          relatedLink.classList.replace('fw-bold', 'fw-normal');
        }
      });
    });

  document
    .querySelectorAll('[data-bs-dismiss="modal"]')
    .forEach((button) => button.addEventListener('click', closeModal));

  document.addEventListener('click', (event) => {
    const modalFade = document.querySelector('#modal');
    if (event.target === modalFade) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeModal();
    }
  });
};

export default renderPosts;
