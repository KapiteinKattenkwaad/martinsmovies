interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  totalPages: number;
}

export default function Pagination({ page, setPage, totalPages }: PaginationProps) {
  const pages = [];
  for (let i = Math.max(1, page - 1); i <= Math.min(totalPages, page + 2); i++) {
    pages.push(i);
  }

  const scrollToMainSection = () => {
    const element = document.getElementById('main');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePageKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, pageNumber: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setPage(pageNumber);
      scrollToMainSection();
    }
  };

  const handleNavKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>, direction: 'prev' | 'next') => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (direction === 'prev' && page > 1) {
        setPage(page - 1);
        scrollToMainSection();
      } else if (direction === 'next' && page < totalPages) {
        setPage(page + 1);
        scrollToMainSection();
      }
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12 col-sm-12">
          <nav className="pagination" role="navigation" aria-label="Pagination Navigation">
            <ul>
              {page !== 1 && (
                <li>
                  <button
                    aria-label="Go to previous page"
                    className="page-link"
                    onClick={() => {
                      scrollToMainSection();
                      setPage(page - 1);
                    }}
                    onKeyDown={(e) => handleNavKeyDown(e, 'prev')}
                    disabled={page === 1}
                    role="link"
                    tabIndex={page === 1 ? -1 : 0}
                  >
                    <i className="fa fa-chevron-left" aria-hidden="true"></i>
                  </button>
                </li>
              )}
              {pages.map(p => (
                <li key={p}>
                  <button
                    onClick={() => {
                      setPage(p);
                      // Scroll to main section after rerender
                      setTimeout(() => scrollToMainSection(), 0);
                    }}
                    onKeyDown={(e) => handlePageKeyDown(e, p)}
                    style={{
                      background: p === page ? "#8246af" : "transparent",
                      color: p === page ? "#fff" : "#333",
                      fontWeight: p === page ? "bold" : "normal",
                      cursor: p === page ? "default" : "pointer",
                      boxShadow: p === page ? "0 2px 8px rgba(130,70,175,0.15)" : "none"
                    }}
                    disabled={p === page}
                    aria-current={p === page ? "page" : undefined}
                    aria-label={p === page ? `Current page, page ${p}` : `Go to page ${p}`}
                    role="link"
                    tabIndex={p === page ? -1 : 0}
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
                      scrollToMainSection();
                      setPage(page + 1);
                    }}
                    onKeyDown={(e) => handleNavKeyDown(e, 'next')}
                    aria-label="Go to next page"
                    role="link"
                    tabIndex={page >= totalPages ? -1 : 0}
                  >
                    <i className="fa fa-chevron-right" aria-hidden="true"></i>
                  </button>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
