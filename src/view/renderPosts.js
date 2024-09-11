import 'bootstrap';

const openModal = (post, i18n) => {
  const modalElement = document.getElementById('modal');

  const modalTitle = modalElement.querySelector('.modal-title');
  const modalBody = modalElement.querySelector('.modal-body');
  const linkButton = modalElement.querySelector('.btn-primary');

  modalTitle.textContent = post.title;
  modalBody.textContent = post.description;
  linkButton.href = post.link;
  linkButton.textContent = i18n.t('buttons.read');
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
    li.className = 'list-group-item d-flex justify-content-between align-items-start border-0 border-end-0';
    
    const a = document.createElement('a');
    a.href = post.link;
    a.className = state.viewedPosts.has(post.id) ? 'fw-normal' : 'fw-bold';
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
    const closeButton = document.querySelector('.btn.btn-secondary');
    closeButton.textContent = i18n.t('buttons.close');

    // Открываем модальное окно при нажатии на кнопку
    button.addEventListener('click', () => openModal(post, i18n));

    li.appendChild(a);
    li.appendChild(button);
    ul.appendChild(li);
  });

  document.querySelector('.list-group').addEventListener('click', (event) => {
    const listItem = event.target.closest('li');

    if (!listItem) return;

    updateListItemState(listItem);
  });

  function updateListItemState(listItem) {
    const linkElement = listItem.querySelector('a.fw-bold, a.fw-normal');
    if (!linkElement) return;

    linkElement.classList.replace('fw-bold', 'fw-normal');
    state.viewedPosts.add(linkElement.dataset.id);
  }
};

export default renderPosts;
