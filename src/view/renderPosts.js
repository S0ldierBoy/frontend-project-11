const renderPosts = (posts) => {
  const mainDiv = document.querySelector('.posts');
  const modalWindow = document.querySelector('modal-footer');

  const cardDiv = document.createElement('div');
  const cardBodyDiv = document.createElement('div');
  const h2 = document.createElement('h2');
  const ul = document.createElement('ul');

  cardDiv.className = 'card border-0';
  cardBodyDiv.className = 'card-body';
  h2.className = 'card-title h4';
  h2.textContent = 'Посты';
  ul.className = 'list-group border-0 rounded-0';

  cardBodyDiv.appendChild(h2);
  cardDiv.appendChild(cardBodyDiv);
  cardDiv.appendChild(ul);

  const fragment = document.createDocumentFragment();

  posts.forEach((post) => {
    const li = document.createElement('li');
    const a = document.createElement('a');
    const button = document.createElement('button');

    li.className =
      'list-group-item d-flex justify-content-between align-items-start border-0 border-end-0';
    a.href = post.link;
    a.className = 'fw-normal link-secondary';
    a.setAttribute('data-id', post.id);
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    a.textContent = post.title;
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
    fragment.appendChild(li);
  });

  ul.appendChild(fragment);
  mainDiv.appendChild(cardDiv);
};

export default renderPosts;
