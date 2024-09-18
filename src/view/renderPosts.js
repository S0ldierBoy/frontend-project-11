import createContainer from './createContainer.js';

const renderPosts = (posts, state, i18n, elements) => {
  const mainDiv = elements.postsContainer;
  let postsContainer = mainDiv.querySelector('.card');

  if (!postsContainer) {
    postsContainer = createContainer('posts-list', 'headers.posts', i18n);
    mainDiv.appendChild(postsContainer);
  }

  const ul = postsContainer.querySelector('ul');
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
    button.setAttribute('data-id', post.id);
    button.setAttribute('data-bs-toggle', 'modal');
    button.setAttribute('data-bs-target', '#modal');
    button.textContent = i18n.t('buttons.viewing');

    li.appendChild(a);
    li.appendChild(button);
    ul.appendChild(li);
  });
};

export default renderPosts;
