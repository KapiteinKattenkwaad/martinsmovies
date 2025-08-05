import type { Dispatch, SetStateAction } from "react";

type FilterProps = {
  query?: string;
  setQuery: Dispatch<SetStateAction<string>>;
};

export default function Filter({ query, setQuery }: FilterProps) {
  return (
    <div className="row mb50">
      <div className="col-md-2">
        {/* Layout Switcher */}
        <div className="layout-switcher" role="radiogroup" aria-label="Layout options">
          <a href="/movie-list" className="list" role="radio" aria-checked="false" tabIndex={0}>
            <i className="fa fa-align-justify" aria-hidden="true"></i>
            <span className="sr-only">List view</span>
          </a>
          <a href="/movie-grid" className="grid active" role="radio" aria-checked="true" tabIndex={0}>
            <i className="fa fa-th" aria-hidden="true"></i>
            <span className="sr-only">Grid view</span>
          </a>
        </div>
      </div>
      <div className="col-md-6">
        <label htmlFor="search" className="sr-only">Search movies by keyword</label>
        <input
          id="search"
          name="keyword-search"
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by keyword..."
          className="form-control"
          aria-label="Search movies by keyword"
        />
      </div>
      <div className="col-md-4">
        {/* Sort by */}
        <div className="sort-by">
          <label htmlFor="sort-select" className="sr-only">Sort movies by</label>
          <div className="sort-by-select">
            <select 
              id="sort-select"
              className="chosen-select-no-single" 
              defaultValue="Default Order"
              aria-label="Sort movies by"
            >
              <option value="default">Default Order</option>
              <option value="featured">Featured</option>
              <option value="top-viewed">Top Viewed</option>
              <option value="top-rated">Top Rated</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
          </div>
        </div>
        {/* Sort by / End */}
      </div>
    </div>
  );
}