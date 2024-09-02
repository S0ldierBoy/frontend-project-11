import onChange from 'on-change';
import renderInput from './renderInput.js';
import feedView from './index.js';

const createWatchState = (state, elements, i18nextInstance) =>
  onChange(state, () => {
    switch (state.load) {
      case 'process':
        renderInput(elements, state, i18nextInstance);
        feedView(state);
        break;
      case 'error':
        renderInput(elements, state, i18nextInstance);
        break;
    }
  });

export default createWatchState;
