import MovifyLogo from "../assets/MovifyLogo.svg";
import "../styles/index.css"

export default function Header() {
  return (
    <header className="header">
      <div className="container-fluid">
        {/* ====== Start of Navbar ====== */}
        <nav className="navbar navbar-expand-lg">
          <a className="navbar-brand" href="/">
            {/* INSERT YOUR LOGO HERE */}
            <img src={MovifyLogo} alt="logo" width={150} className="logo" />
            {/* If you have a white logo, import and use it here */}
            {/* <img src={MovifyLogoWhite} alt="white logo" width={150} className="logo-white" /> */}
          </a>

          <button id="mobile-nav-toggler" className="hamburger hamburger--collapse" type="button">
            <span className="hamburger-box">
              <span className="hamburger-inner"></span>
            </span>
          </button>

          {/* ====== Start of #main-nav ====== */}
          <div className="navbar-collapse" id="main-nav">
            {/* ====== Start of Main Menu ====== */}
            <ul className="navbar-nav mx-auto" id="main-menu">
              {/* Home Dropdown */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Home
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/">Home Version 1</a></li>
                  <li><a className="dropdown-item" href="/index2">Home Version 2</a></li>
                  <li><a className="dropdown-item" href="/index3">Home Version 3</a></li>
                  <li><a className="dropdown-item" href="/index4">Home Version 4</a></li>
                </ul>
              </li>
              {/* Pages Dropdown */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Pages
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/404">404 Page</a></li>
                  <li className="divider" role="separator"></li>
                  <li><a className="dropdown-item" href="/celebrities-list">Celebrities List</a></li>
                  <li><a className="dropdown-item" href="/celebrities-grid">Celebrities Grid</a></li>
                  <li><a className="dropdown-item" href="/celebrity-detail">Celebrity Detail</a></li>
                  <li className="divider" role="separator"></li>
                  <li><a className="dropdown-item" href="/contact-us">Contact Us</a></li>
                  <li><a className="dropdown-item" href="/coming-soon">Coming Soon</a></li>
                  <li><a className="dropdown-item" href="/pricing">Pricing Plan</a></li>
                  <li><a className="dropdown-item" href="/login-register">Login - Register</a></li>
                  <li><a className="dropdown-item" href="/testimonials">Testimonials</a></li>
                </ul>
              </li>
              {/* Movies & TV Shows Dropdown */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Movies &amp; TV Shows
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/movie-list">Movie List 1</a></li>
                  <li><a className="dropdown-item" href="/movie-list2">Movie List 2</a></li>
                  <li><a className="dropdown-item" href="/movie-grid">Movie Grid 1</a></li>
                  <li><a className="dropdown-item" href="/movie-grid2">Movie Grid 2</a></li>
                  <li><a className="dropdown-item" href="/movie-grid3">Movie Grid 3</a></li>
                  <li><a className="dropdown-item" href="/movie-grid4">Movie Grid 4</a></li>
                  <li><a className="dropdown-item" href="/movie-detail">Movie Detail</a></li>
                  <li><a className="dropdown-item" href="/movie-detail2">Movie Detail 2</a></li>
                  <li><a className="dropdown-item" href="/watch-later">Watch Later</a></li>
                </ul>
              </li>
              {/* Blog Dropdown */}
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Blog
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="/blog-list">Blog List</a></li>
                  <li><a className="dropdown-item" href="/blog-list-fullwidth">Blog List Fullwidth</a></li>
                  <li><a className="dropdown-item" href="/blog-post-detail">Blog Detail</a></li>
                  <li><a className="dropdown-item" href="/blog-post-detail-fullwidth">Blog Detail Fullwidth</a></li>
                </ul>
              </li>
              {/* Contact Us */}
              <li className="nav-item">
                <a className="nav-link" href="/contact-us">Contact Us</a>
              </li>
            </ul>
            {/* ====== End of Main Menu ====== */}

            {/* ====== Start of Extra Nav ====== */}
            <ul className="navbar-nav extra-nav">
              <li className="nav-item">
                <a className="nav-link toggle-search" href="#">
                  <i className="fa fa-search"></i>
                </a>
              </li>
              <li className="nav-item notification-wrapper">
                <a className="nav-link notification" href="#">
                  <i className="fa fa-globe"></i>
                  <span className="notification-count">2</span>
                </a>
              </li>
              <li className="nav-item m-auto">
                <a href="#login-register-popup" className="btn btn-main btn-effect login-btn popup-with-zoom-anim">
                  <i className="icon-user"></i>login
                </a>
              </li>
            </ul>
            {/* ====== End of Extra Nav ====== */}
          </div>
          {/* ====== End of #main-nav ====== */}
        </nav>
        {/* ====== End of Navbar ====== */}
      </div>
    </header>
  );
}