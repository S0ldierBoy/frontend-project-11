import '../src/styles.css';
import * as yup from 'yup';

const button = document.querySelector('[type="submit"]');
button.addEventListener('click', () => {
  alert('Кнопка была нажата!');
});

// const schema = yup.object().shape({
//   name: yup.string().trim().required(),
//   email: yup.string().required('email must be a valid email').email(),
//   password: yup.string().required().min(6),
//   passwordConfirmation: yup
//     .string()
//     .required('password confirmation is a required field')
//     .oneOf(
//       [yup.ref('password'), null],
//       'password confirmation does not match to password'
//     ),
// });
