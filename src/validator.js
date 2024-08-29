import * as yup from 'yup';

const createSchema = (urls) =>
  yup.object().shape({
    url: yup.string().url('errors.err1').notOneOf(urls, 'errors.duplicate'),
  });

const validateUrl = (url, state) => {
  const existingUrls = Object.values(state.feeds).map((feed) => feed.url);
  const schema = createSchema(existingUrls);

  return schema.validate({ url }).catch((error) => {
    throw new Error(error.message);
  });
};

export default validateUrl;
