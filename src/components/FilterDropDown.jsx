export const FilterDropDown = ({ topics, setTopicFilter }) => (
  <>
    <select
      name="topics"
      id="topics"
      onChange={({ target: { value } }) => setTopicFilter(value)}
    >
      {
        topics.map(
          ({ name, id }) => (<option key={name} id={id} name={name}>{name}</option>))
      }
    </select>
  </>
) 
