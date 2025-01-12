import { useEffect, useState } from "react"
import { getAllPosts } from "../../services/posts/getAllPosts"
import { Post } from "./Post"
import { FilterBar, FilterDropDown } from "../FilterBar"
import { getPostTopics } from "../../services/topics/getPostTopics"

export const AllPostsList = () => {
  const [posts, setPosts] = useState([])
  const [filterdPosts, setFilteredPosts] = useState([])
  const [topicFilter, setTopicFilter] = useState("")
  const [searchFilter, setSearchFilter] = useState("")
  const [topics, setTopics] = useState([])

  useEffect(() => {
    getAllPosts().then((posts) => {
      posts.reverse()

      setPosts(posts)
      setFilteredPosts(posts)
    })
    getPostTopics().then(topics => setTopics(topics))
  }, [])

  useEffect(() => {
    topicFilter === "All" ?
      setFilteredPosts(posts)
      :
      setFilteredPosts(posts.filter(({ topic: { topic } }) => topic === topicFilter))
  }, [topicFilter, posts])

  useEffect(() => {
    setFilteredPosts(posts.filter(({ title }) => title.toLowerCase().includes(searchFilter.toLowerCase())))
  }, [searchFilter, posts])

  return (
    <div className="flex-col">
      <div className=" flex flex-row justify-evenly">
        <FilterDropDown topics={topics} setTopicFilter={setTopicFilter} />
        <FilterBar setSearchFilter={setSearchFilter} />
      </div>
      <div className="">
        {filterdPosts.map(
          ({ id,
            title,
            topic: {
              topic: topicName
            }
          }) => (
            <Post
              key={id}
              id={id}
              title={title}
              topic={topicName}
            />
          ))}
      </div>
    </div>)
}
