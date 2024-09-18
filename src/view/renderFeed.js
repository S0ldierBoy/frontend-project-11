import createContainer from './createContainer.js';

const renderFeed = (feeds, i18n, elements) => {
  const mainDiv = elements.feedsContainer;
  let feedsContainer = mainDiv.querySelector('.card');

  if (!feedsContainer) {
    feedsContainer = createContainer('feeds-group', 'headers.feeds', i18n);
    mainDiv.appendChild(feedsContainer);
  }

  const ul = feedsContainer.querySelector('ul');
  ul.innerHTML = '';

  feeds.forEach(({ title, description }) => {
    const li = document.createElement('li');
    li.className = 'feeds-group-item border-0 border-end-0';

    const h3 = document.createElement('h3');
    h3.className = 'h6 m-0';
    h3.textContent = title;
    li.append(h3);

    const p = document.createElement('p');
    p.className = 'm-0 small text-black-50';
    p.textContent = description;
    li.append(p);

    ul.append(li);
  });
};

export default renderFeed;
