import * as yup from 'yup';

const schema = yup.object().shape({
  url: yup.string().url().required(),
});

const validateUrl = (url, state) => {
  schema
    .validate({ url })
    .then(() => {
      state.errors = {};
      state.isValid = true;
    })
    .catch((err) => {
      state.errors = { url: err.message };
      state.isValid = false;
    });
};

export default validateUrl;
