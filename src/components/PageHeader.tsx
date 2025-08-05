import "../styles/index.css";
import HeaderMovie from "../assets/HeaderMovie.jpg";

export default function PageHeader() {
  return (
    <section
      className="page-header overlay-gradient"
      style={{
        backgroundImage: `url(${HeaderMovie})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      role="banner"
      aria-label="Page header with breadcrumb navigation"
    >
      <div className="container">
        <div className="inner">
          <h2 className="title">Movie Grid 3</h2>
          <nav aria-label="Breadcrumb">
            <ol className="breadcrumb">
              <li>
                <a href="/">Home</a>
              </li>
              <li aria-current="page">Movie Grid 3</li>
            </ol>
          </nav>
        </div>
      </div>
    </section>
  );
}