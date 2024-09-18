const createContainer = (containerClass, headerText, i18n) => {
  const container = document.createElement('div');
  container.className = 'card border-0';

  const cardBodyDiv = document.createElement('div');
  cardBodyDiv.className = 'card-body';

  const h2 = document.createElement('h2');
  h2.className = 'card-title h4';
  h2.textContent = i18n.t(headerText); // текст заголовка

  const ul = document.createElement('ul');
  ul.className = `${containerClass} list-group border-0 rounded-0`; // имя группы

  cardBodyDiv.appendChild(h2);
  container.appendChild(cardBodyDiv);
  container.appendChild(ul);
  return container;
};

export default createContainer;

