import onChange from 'on-change';
import renderInput from './renderInput.js';
import feedView from './index.js';

const createWatchState = (state, elements, i18nextInstance) => (
  onChange(state, () => {
    renderInput(elements, state, i18nextInstance);
    feedView(state, i18nextInstance);
  })
);

export default createWatchState;
