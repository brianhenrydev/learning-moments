import { useEffect, useState } from "react"
import { getAllPosts } from "../services/posts/getAllPosts"
import { Post } from "./Post"
import { FilterBar } from "./FilterBar"
import { FilterDropDown } from "./FilterDropDown"
import { getPostTopics } from "../services/topics/getPostTopics"

export const AllPostsList = () => {
  const [posts, setPosts] = useState([])
  const [filterdPosts, setFilteredPosts] = useState([])
  const [topicFilter, setTopicFilter] = useState([])
  const [searchFilter, setSearchFilter] = useState("")
  const [topics, setTopics] = useState([])

  useEffect(() => {
    getAllPosts().then((posts) => {
      setPosts(posts)
      setFilteredPosts(posts)
    })
    getPostTopics().then(topics => setTopics(topics))
  }, [])

  useEffect(() => {
    setFilteredPosts(posts.filter(({ topic: { name } }) => name === topicFilter))
  }, [topicFilter])

  useEffect(() => {
    setFilteredPosts(posts.filter(({ title }) => title.toLowerCase().includes(searchFilter.toLowerCase())))
  }, [searchFilter])

  return (<>
    <div className="filters">
      <FilterDropDown className="filter" topics={topics} setTopicFilter={setTopicFilter} />
      <FilterBar className="filter" setSearchFilter={setSearchFilter} />
    </div>
    {filterdPosts.map(
      ({ id, title, body, date, topic: {
        name: topicName
      },
        user: {
          name: userName
        }
      }) => (
        <Post
          key={id}
          id={id}
          user={userName}
          title={title}
          body={body}
          date={date}
          topic={topicName}
        />
      ))}
  </>)
}
