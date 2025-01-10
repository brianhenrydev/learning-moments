import { useEffect, useState } from "react"
import { getPostTopics } from "../../../services/topics/getPostTopics"
import { useNavigate } from "react-router-dom"
import { createNewPost } from "../../../services/posts/createNewPost"

export const NewPost = ({ localStorageUser }) => {
  const [user, setUser] = useState({})
  const [title, setTitle] = useState("")
  const [topics, setTopics] = useState([])
  const [topicId, setTopicId] = useState(0)
  const [body, setBody] = useState("")
  const nav = useNavigate()

  useEffect(() => {
    setUser(localStorageUser)
    getPostTopics().then(topics => setTopics(topics))
  }, [localStorageUser])

  const handlePost = (e) => {
    e.preventDefault()
    title && user && topicId && body ? createNewPost({
      title: title,
      userId: user.id,
      topicId: topicId,
      date: new Date(),
      body: body
    }
    ).then(() => {
      nav("/")
    }) : window.alert("Fill form")
  }
  return (
    <div className=" mx-2 mt-12">
      <div className="flex">
        <form className="bg-green-800 m-auto mt-12 p-16 pt-2 pb-2 border-solid border-black border-8">
          <h1>New Post</h1>
          <fieldset className="fieldset">
            <input onChange={({ target: { value } }) => { setTitle(value) }} type="text" placeholder="Enter Title"></input>
          </fieldset>
          <fieldset className="new-post-fieldset">
            <select onChange={({ target: { value } }) => { setTopicId(value) }}>
              {topics.map(({ topic, id }) => <option key={id} value={id}>{topic}</option>)}
            </select>
          </fieldset>
          <fieldset className="new-post-fieldset">
            <textarea onChange={({ target: { value } }) => { setBody(value) }} className="post-body" type="text" rows={10} placeholder="Enter Data"></textarea>
          </fieldset>
          <fieldset className="new-post-fieldset">
            <button onClick={handlePost}>Post</button>
          </fieldset>
        </form>
      </div>
    </div>
  )
}
