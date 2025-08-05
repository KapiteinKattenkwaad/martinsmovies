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
        <div className="layout-switcher">
          <a href="/movie-list" className="list">
            <i className="fa fa-align-justify"></i>
          </a>
          <a href="/movie-grid" className="grid active">
            <i className="fa fa-th"></i>
          </a>
        </div>
      </div>
      <div className="col-md-6">
        <input
        id="search"
          name='keyword search'
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Search by keyword..."
          className="form-control"
        />
      </div>
      <div className="col-md-4">
        {/* Sort by */}
        <div className="sort-by">
          <div className="sort-by-select">
            <select className="chosen-select-no-single" defaultValue="Default Order">
              <option>Default Order</option>
              <option>Featured</option>
              <option>Top Viewed</option>
              <option>Top Rated</option>
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div>
        </div>
        {/* Sort by / End */}
      </div>
    </div>

  );
}