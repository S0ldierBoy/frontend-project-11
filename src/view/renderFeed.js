const renderFeed = (data) => {
  const mainDiv = document.querySelector('.feeds');
  let feedsContainer = mainDiv.querySelector('.card');
  

  if (!feedsContainer) {
    // Создаем новый контейнер, если его нет
    feedsContainer = document.createElement('div');
    feedsContainer.className = 'card border-0';

    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.className = 'card-body';

    const h2 = document.createElement('h2');
    h2.className = 'card-title h4';
    h2.textContent = 'Фиды';

    const ul = document.createElement('ul');
    ul.className = 'list-group border-0 rounded-0';

    cardBodyDiv.append(h2);
    feedsContainer.append(cardBodyDiv);
    feedsContainer.append(ul);

    mainDiv.append(feedsContainer);
  } else {
    // Добавляем новые данные

    const ul = feedsContainer.querySelector('ul');
    ul.innerHTML = ''

    data.forEach(({ title, description }) => {
      const li = document.createElement('li');
      li.className = 'list-group-item border-0 border-end-0';

      const h3 = document.createElement('h3');
      h3.className = 'h6 m-0';
      li.append(h3);

      const p = document.createElement('p');
      p.className = 'm-0 small text-black-50';
      li.append(p);

      h3.textContent = title;
      p.textContent = description;

      ul.append(li);
    });
  }
};

export default renderFeed;
