import './styles.css';
import 'bootstrap';
import _ from 'lodash';
import i18n from 'i18next';
import validateUrl from './validator.js';
import resources from './locales/index.js';
import domParser from './domParser.js';
import { checkForUpdates, fetchRss } from './utils.js';
import createWatchState from './view/watchState.js';

async function runApp() {
  try {
    const i18nextInstance = i18n.createInstance();
    await i18nextInstance.init({
      lng: 'ru',
      resources,
    });

    const elements = {
      form: document.querySelector('.rss-form'),
      input: document.querySelector('#url-input'),
      feedback: document.querySelector('.feedback'),
      modal: document.querySelector('.modal-footer'),
      submitButton: document.querySelector('button[type="submit"]'),
      postsContainer: document.querySelector('.posts'),
      feedsContainer: document.querySelector('.feeds'),
    };

    const state = {
      feeds: [],
      posts: [],
      error: null,
      feedback: null,
      viewedPosts: new Set(),
      isSubmitting: false,
      selectedPostId: null,
    };

    const watchedState = createWatchState(state, elements, i18nextInstance);

    // Обработчик отправки формы
    elements.form.addEventListener('submit', async (e) => {
      e.preventDefault();
      watchedState.isSubmitting = true;
      watchedState.error = null; // Сброс ошибки перед новым запросом

      try {
        const formData = new FormData(e.target);
        const url = formData.get('url').trim();

        // Валидация URL
        validateUrl(url, state);

        // Получение RSS данных
        const data = await fetchRss(url);

        const dataWithoutId = domParser(data.contents);
        const feedId = _.uniqueId('feed-');

        const feed = {
          id: feedId,
          title: dataWithoutId.title,
          description: dataWithoutId.description,
          url,
        };

        const posts = dataWithoutId.posts.map((post) => ({
          ...post,
          id: _.uniqueId('post-'),
          feedId,
        }));

        watchedState.feeds.unshift(feed);
        watchedState.posts.unshift(...posts);

        watchedState.feedback = 'success';
        watchedState.error = null; // Успешная обработка, очищаем ошибку

        e.target.reset();
        elements.input.focus();
      } catch (error) {
        watchedState.error = error.message;
      } finally {
        watchedState.isSubmitting = false; // Сбрасываем состояние отправки в любом случае
      }
    });

    // Обработчик кликов по постам
    elements.postsContainer.addEventListener('click', (event) => {
      const { target } = event;

      if (target.tagName === 'A') {
        const postId = target.getAttribute('data-id');
        watchedState.viewedPosts.add(postId);
      }

      if (target.tagName === 'BUTTON') {
        const postId = target.getAttribute('data-id');
        watchedState.selectedPostId = postId;
        watchedState.viewedPosts.add(postId);
      }
    });

    // Запуск проверки обновлений
    checkForUpdates(watchedState);
  } catch (error) {
    console.error('errors.i18nInitError', error);
  }
}

runApp();
