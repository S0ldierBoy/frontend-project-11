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

    button.addEventListener('click', (e) => {
      alert('нажал');
    });

    li.appendChild(a);
    li.appendChild(button);
    ul.appendChild(li);
  });
};

export default renderPosts;
