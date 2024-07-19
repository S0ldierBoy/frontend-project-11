const renderFeed = (data) => {
  data.forEach(({ title, description }) => {
    const mainDiv = document.querySelector('.feeds');

    const cardDiv = document.createElement('div');
    cardDiv.className = 'card border-0';

    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.className = 'card-body';

    const h2 = document.createElement('h2');
    h2.className = 'card-title h4';
    h2.textContent = 'Фиды';

    cardBodyDiv.appendChild(h2);

    const ul = document.createElement('ul');
    ul.className = 'list-group border-0 rounded-0';

    const li = document.createElement('li');
    li.className = 'list-group-item border-0 border-end-0';

    const h3 = document.createElement('h3');
    h3.className = 'h6 m-0';
    h3.textContent = title;

    const p = document.createElement('p');
    p.className = 'm-0 small text-black-50';
    p.textContent = description;

    li.appendChild(h3);
    li.appendChild(p);

    ul.appendChild(li);

    cardDiv.appendChild(cardBodyDiv);
    cardDiv.appendChild(ul);
    mainDiv.appendChild(cardDiv);

    return mainDiv;
  });
};

export default renderFeed;
