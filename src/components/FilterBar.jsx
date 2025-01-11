export const FilterBar = ({ setSearchFilter }) => (
  <div className="">
    <input
      type="text"
      placeholder="filter by title"
      className="bg-cyan-800 px-3 h-9 text-sky-400 rounded-2xl"
      onChange={({ target: { value } }) => setSearchFilter(value)}
    />
  </div>
)
export const FilterDropDown = ({ topics, setTopicFilter }) => (
  <div className="bg-cyan-800 px-3 h-9 text-sky-400 rounded-2xl ">
    <select
      name="topics"
      id="topics"
      className="bg-cyan-800 px-3 h-9 text-sky-400"
      onChange={({ target: { value } }) => {
        setTopicFilter(value)
      }}
    >
      <option key={0} id="0" name="all">All</option>
      {
        topics.map(
          ({ topic, id }) => (<option key={id} id={id} name={topic}>{topic}</option>))
      }
    </select>
  </div>
) 
