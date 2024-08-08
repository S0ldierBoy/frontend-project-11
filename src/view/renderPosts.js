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
      const modalFade = document.querySelector('#modal'); // вся страница когда открыто всп окно
      const modalContent = document.querySelector('.modal-content'); // всплывающее окно

      const modalTitle = modalContent.querySelector('.modal-title'); // строка заголовка
      const modalBody = modalContent.querySelector('.modal-body'); // строка описания
      const mainBox = document.querySelector('.d-flex'); // вся страница

      modalFade.classList.add('show');
      modalFade.setAttribute('style', 'display: block');

      const linkButton = modalContent.querySelector('.btn-primary');
      const closeButton = modalContent.querySelector('.btn-secondary');

      modalTitle.textContent = post.title;
      modalBody.textContent = post.description;
      linkButton.href = post.link;

      closeButton.addEventListener('click', (e) => {
        modalFade.classList.remove('show');
        modalFade.removeAttribute('style');
        modalFade.style.display = 'none';
      });
    });

    li.appendChild(a);
    li.appendChild(button);
    ul.appendChild(li);
  });
};

export default renderPosts;
// const doc = document.querySelector('.list-group-item');
//const targetId = e.target.dataset.id;
//       const element = document.querySelector(`a[data-id="${targetId}"]`);
//       console.log(element);
//       console.log(element.href);
//       console.log(element.textContent);

// class="d-flex flex-column min-vh-100 modal-open" style="overflow: hidden; padding-right: 14px;"><div class="modal fade show" id="modal" tabindex="-1" role="dialog" aria-labelledby="modal" aria-modal="true" style="display: block;"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Lorem ipsum 2024-08-09T13:57:00Z</h5><button type="button" class="btn-close close" data-bs-dismiss="modal" aria-label="Close"></button></div><div class="modal-body text-break">Esse id id irure proident officia nulla ad occaecat nulla aliquip nostrud sunt.</div><div class="modal-footer"><a class="btn btn-primary full-article" href="http://example.com/test/1723211820" role="button" target="_blank" rel="noopener noreferrer">Читать полностью </a><button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button></div></div></div></div><main class="flex-grow-1"><section class="container-fluid bg-dark p-5"><div class="row"><div class="col-md-10 col-lg-8 mx-auto text-white"><h1 class="display-3 mb-0">RSS агрегатор</h1><p class="lead">Начните читать RSS сегодня! Это легко, это красиво.</p><form action="" class="rss-form text-body"><div class="row"><div class="col"><div class="form-floating"><input id="url-input" autofocus="" required="" name="url" aria-label="url" class="form-control w-100" placeholder="ссылка RSS" autocomplete="off"> <label for="url-input">Ссылка RSS</label></div></div><div class="col-auto"><button type="submit" aria-label="add" class="h-100 btn btn-lg btn-primary px-sm-5">Добавить</button></div></div></form><p class="mt-2 mb-0 text-muted">Пример: https://lorem-rss.hexlet.app/feed</p><p class="feedback m-0 position-absolute small text-success">RSS успешно загружен</p></div></div></section><section class="container-fluid container-xxl p-5"><div class="row"><div class="col-md-10 col-lg-8 order-1 mx-auto posts"><div class="card border-0">
//       <div class="card-body"><h2 class="card-title h4">Посты</h2></div>

//const div = '<div class="modal-backdrop fade show"></div>';

// modal-open"
//     style="overflow: hidden; padding-right: 14px"
