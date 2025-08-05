

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

export default function Pagination
  ({ page, setPage, totalPages }: PaginationProps) {

  const pages = [];
  for (let i = Math.max(1, page - 1); i <= Math.min(totalPages, page + 2); i++) {
    pages.push(i);
  }

  const scrollToMainSection = () => {
    const element = document.getElementById('main');
    console.log('test', element)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <nav className="pagination">
            <ul >
              {page !== 1 && (
                <li >
                  <button
                    aria-label="Previous page"
                    className="page-link" onClick={() => {
                      scrollToMainSection()
                      setPage(page - 1)
                    }} disabled={page === 1}>
                    <i className="fa fa-chevron-left"></i>
                  </button>
                </li>
              )}
              {pages.map(p => (
                <li key={p}>
                  <button
                    onClick={() => {
                      setPage(p)
                      scrollToMainSection()
                    }}
                    style={{
                      background: p === page ? "#8246af" : "transparent",
                      color: p === page ? "#fff" : "#333",
                      fontWeight: p === page ? "bold" : "normal",
                      cursor: p === page ? "default" : "pointer",
                      boxShadow: p === page ? "0 2px 8px rgba(130,70,175,0.15)" : "none"
                    }}
                    disabled={p === page}
                    aria-current={p === page ? "page" : undefined}
                  >
                    {p}
                  </button>
                </li>
              ))}

              {page < totalPages && (
                <li>
                  <button
                    className="page-link"
                    onClick={() => {
                      scrollToMainSection()
                      setPage(page + 1)
                    }}
                    aria-label="Next page"
                  >
                    <i className="fa fa-chevron-right"></i>
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>

    </>
  )
}
