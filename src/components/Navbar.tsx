const menu = [
  {
    label: "Home",
    items: [
      { label: "Home Version 1", href: "/index" },
      { label: "Home Version 2", href: "/index2" },
      { label: "Home Version 3", href: "/index3" },
      { label: "Home Version 4", href: "/index4" },
    ],
  },
  {
    label: "Pages",
    items: [
      { label: "404 Page", href: "/404" },
      { divider: true },
      { label: "Celebrities List", href: "/celebrities-list" },
      { label: "Celebrities Grid", href: "/celebrities-grid" },
      { label: "Celebrity Detail", href: "/celebrity-detail" },
      { divider: true },
      { label: "Contact Us", href: "/contact-us" },
      { label: "Coming Soon", href: "/coming-soon" },
      { label: "Pricing Plan", href: "/pricing" },
      { label: "Login - Register", href: "/login-register" },
      { label: "Testimonials", href: "/testimonials" },
    ],
  },
  {
    label: "Movies & TV Shows",
    items: [
      { label: "Movie List 1", href: "/movie-list" },
      { label: "Movie List 2", href: "/movie-list2" },
      { label: "Movie Grid 1", href: "/movie-grid" },
      { label: "Movie Grid 2", href: "/movie-grid2" },
      { label: "Movie Grid 3", href: "/movie-grid3" },
      { label: "Movie Grid 4", href: "/movie-grid4" },
      { label: "Movie Detail", href: "/movie-detail" },
      { label: "Movie Detail 2", href: "/movie-detail2" },
      { label: "Watch Later", href: "/watch-later" },
    ],
  },
  {
    label: "Blog",
    items: [
      { label: "Blog List", href: "/blog-list" },
      { label: "Blog List Fullwidth", href: "/blog-list-fullwidth" },
      { label: "Blog Detail", href: "/blog-post-detail" },
      { label: "Blog Detail Fullwidth", href: "/blog-post-detail-fullwidth" },
    ],
  },
  {
    label: "Contact Us",
    href: "/contact-us",
  },
];

export default function Navbar() {
  return (
    <nav
      id="main-mobile-nav"
      className="mobile-nav-hidden"
      aria-label="Main navigation menu"
      role="navigation"
    >
      <ul className="mmenu-init" role="menubar">
        {menu.map((menuItem) =>
          menuItem.items ? (
            <li key={menuItem.label} role="none">
              <a href="#" role="menuitem" aria-haspopup="true" aria-expanded="false">
                {menuItem.label}
              </a>
              <ul role="menu">
                {menuItem.items.map((item, subIdx) =>
                  item.divider ? (
                    <li key={subIdx} role="separator" />
                  ) : (
                    <li key={item.label} role="none">
                      <a href={item.href} role="menuitem">
                        {item.label}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </li>
          ) : (
            <li key={menuItem.label} role="none">
              <a href={menuItem.href} role="menuitem">
                {menuItem.label}
              </a>
            </li>
          )
        )}
      </ul>
    </nav>
  );
}