export const FilterBar = ({ setSearchFilter }) => (
  <div className="border-4 border-green-800 border-solid">
    <input
      type="text"
      placeholder="filter by title"
      className="post-search"
      onChange={({ target: { value } }) => setSearchFilter(value)}
    />
  </div>
)
export const FilterDropDown = ({ topics, setTopicFilter }) => (
  <div className="border-4 border-green-800 border-solid">
    <select
      name="topics"
      id="topics"
      onChange={({ target: { value } }) => setTopicFilter(value)}
    >
      {
        topics.map(
          ({ topic, id }) => (<option key={id} id={id} name={topic}>{topic}</option>))
      }
    </select>
  </div>
) 
