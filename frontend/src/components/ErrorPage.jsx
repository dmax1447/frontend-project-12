import {
  Link,
} from 'react-router-dom';

const ErrorPage = () => (
  <div className="text-center">
    <img
      alt="Страница не найдена"
      className="img-fluid h-25"
      width="310"
      src="https://cdn2.hexlet.io/assets/error-pages/404-4b6ef16aba4c494d8101c104236304e640683fa9abdb3dd7a46cab7ad05d46e9.svg"
    />
    <h1 className="h4 text-muted">Страница не найдена</h1>
    <p className="text-muted">
      <span>Но вы можете перейти </span>
      <Link to="/">на главную страницу</Link>
    </p>
  </div>
);

export default ErrorPage;
