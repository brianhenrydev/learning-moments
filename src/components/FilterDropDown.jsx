export const FilterDropDown = ({ topics, setTopicFilter }) => (
  <>
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
  </>
) 
