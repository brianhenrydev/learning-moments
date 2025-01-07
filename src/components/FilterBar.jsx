export const FilterBar = ({ setSearchFilter }) => (
  <div className="filter-bar">
    <input
      type="text"
      placeholder="filter by title"
      className="post-search"
      onChange={({ target: { value } }) => setSearchFilter(value)}
    />
  </div>
)
