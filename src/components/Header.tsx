import MovifyLogo from "../assets/MovifyLogo.svg";
import "../styles/index.css"

export default function Header() {
  return (
    <header className="header" role="banner">
      <div className="container-fluid">
        <nav className="navbar navbar-expand-lg" role="navigation" aria-label="Main navigation">
          <a className="navbar-brand" href="/" aria-label="Movify home page">
            <img src={MovifyLogo} alt="logo" width={150} className="logo" />
          </a>

          <button id="mobile-nav-toggler" className="hamburger hamburger--collapse" type="button" aria-label="Open main menu" aria-expanded="false" aria-controls="main-nav">
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>

          <div className="navbar-collapse" id="main-nav" role="menubar">
            <ul className="navbar-nav mx-auto" id="main-menu" role="menu">
              <li className="nav-item dropdown" role="none">
                <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="menuitem">
                  Home
                </a>
                <ul className="dropdown-menu" role="menu">
                  <li role="none"><a className="dropdown-item" href="/" role="menuitem">Home Version 1</a></li>
                  <li role="none"><a className="dropdown-item" href="/index2" role="menuitem">Home Version 2</a></li>
                  <li role="none"><a className="dropdown-item" href="/index3" role="menuitem">Home Version 3</a></li>
                  <li role="none"><a className="dropdown-item" href="/index4" role="menuitem">Home Version 4</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown" role="none">
                <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="menuitem">
                  Pages
                </a>
                <ul className="dropdown-menu" role="menu">
                  <li role="none"><a className="dropdown-item" href="/404" role="menuitem">404 Page</a></li>
                  <li className="divider" role="separator"></li>
                  <li role="none"><a className="dropdown-item" href="/celebrities-list" role="menuitem">Celebrities List</a></li>
                  <li role="none"><a className="dropdown-item" href="/celebrities-grid" role="menuitem">Celebrities Grid</a></li>
                  <li role="none"><a className="dropdown-item" href="/celebrity-detail" role="menuitem">Celebrity Detail</a></li>
                  <li className="divider" role="separator"></li>
                  <li role="none"><a className="dropdown-item" href="/contact-us" role="menuitem">Contact Us</a></li>
                  <li role="none"><a className="dropdown-item" href="/coming-soon" role="menuitem">Coming Soon</a></li>
                  <li role="none"><a className="dropdown-item" href="/pricing" role="menuitem">Pricing Plan</a></li>
                  <li role="none"><a className="dropdown-item" href="/login-register" role="menuitem">Login - Register</a></li>
                  <li role="none"><a className="dropdown-item" href="/testimonials" role="menuitem">Testimonials</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown" role="none">
                <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="menuitem">
                  Movies &amp; TV Shows
                </a>
                <ul className="dropdown-menu" role="menu">
                  <li role="none"><a className="dropdown-item" href="/movie-list" role="menuitem">Movie List 1</a></li>
                  <li role="none"><a className="dropdown-item" href="/movie-list2" role="menuitem">Movie List 2</a></li>
                  <li role="none"><a className="dropdown-item" href="/movie-grid" role="menuitem">Movie Grid 1</a></li>
                  <li role="none"><a className="dropdown-item" href="/movie-grid2" role="menuitem">Movie Grid 2</a></li>
                  <li role="none"><a className="dropdown-item" href="/movie-grid3" role="menuitem">Movie Grid 3</a></li>
                  <li role="none"><a className="dropdown-item" href="/movie-grid4" role="menuitem">Movie Grid 4</a></li>
                  <li role="none"><a className="dropdown-item" href="/movie-detail" role="menuitem">Movie Detail</a></li>
                  <li role="none"><a className="dropdown-item" href="/movie-detail2" role="menuitem">Movie Detail 2</a></li>
                  <li role="none"><a className="dropdown-item" href="/watch-later" role="menuitem">Watch Later</a></li>
                </ul>
              </li>
              <li className="nav-item dropdown" role="none">
                <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" role="menuitem">
                  Blog
                </a>
                <ul className="dropdown-menu" role="menu">
                  <li role="none"><a className="dropdown-item" href="/blog-list" role="menuitem">Blog List</a></li>
                  <li role="none"><a className="dropdown-item" href="/blog-list-fullwidth" role="menuitem">Blog List Fullwidth</a></li>
                  <li role="none"><a className="dropdown-item" href="/blog-post-detail" role="menuitem">Blog Detail</a></li>
                  <li role="none"><a className="dropdown-item" href="/blog-post-detail-fullwidth" role="menuitem">Blog Detail Fullwidth</a></li>
                </ul>
              </li>
              <li className="nav-item" role="none">
                <a className="nav-link" href="/contact-us" role="menuitem">Contact Us</a>
              </li>
            </ul>

            <ul className="navbar-nav extra-nav">
              <li className="nav-item">
                <a className="nav-link toggle-search" href="#" aria-label="Open search">
                  <i className="fa fa-search"></i>
                </a>
              </li>
              <li className="nav-item notification-wrapper">
                <a className="nav-link notification" href="#" aria-label="Notifications">
                  <i className="fa fa-globe"></i>
                  <span className="notification-count">2</span>
                </a>
              </li>
              <li className="nav-item m-auto">
                <a href="#login-register-popup" className="btn btn-main btn-effect login-btn popup-with-zoom-anim" aria-label="Login">
                  <i className="icon-user"></i>login
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
}