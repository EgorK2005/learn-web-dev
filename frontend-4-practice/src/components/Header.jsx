import logoWide from '../assets/logo-wide.png';

const NAV_ITEMS = ['Услуги', 'Галерея', 'Команда', 'Отзывы', 'Контакты'];

function Header() {
  return (
    <header className="header">
      <a className="header__logo" href="#">
        <img className="header__logo-img" src={logoWide} alt="Barbershop" />
      </a>
      <nav className="nav">
        <ul className="nav__list">
          {NAV_ITEMS.map((item) => (
            <li className="nav__item" key={item}>
              <a className="nav__link" href="#">{item}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;