import logoSquare from '../assets/logo-square.png';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <img className="footer__logo" src={logoSquare} alt="Barbershop — Cuts, Shaves, Style" />

        <div className="footer__contacts">
          <h2 className="footer__title">Контакты</h2>
          <p className="footer__item">
            <svg className="icon icon--pin" width="16" height="18" viewBox="0 0 24 24">
              <path className="icon__path" d="M12 22s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12z" />
              <circle className="icon__path" cx="12" cy="10" r="2.5" />
            </svg>
            <span className="footer__text">ул. Садовая, 15, Москва</span>
          </p>
          <p className="footer__item">
            <svg className="icon icon--phone" width="16" height="18" viewBox="0 0 24 24">
              <path className="icon__path" d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
            </svg>
            <a className="footer__phone" href="#">+7 (495) 123-45-67</a>
          </p>
        </div>

        <div className="footer__hours">
          <h3 className="footer__hours-title">Режим работы</h3>
          <p className="footer__hours-text">Пн–Пт: 9:00 – 21:00</p>
          <p className="footer__hours-text">Сб–Вс: 10:00 – 19:00</p>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__copy">© 2026. Все права защищены.</p>
        <a className="footer__policy" href="#">Политика конфиденциальности</a>
      </div>
    </footer>
  );
}

export default Footer;