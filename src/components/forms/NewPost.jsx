import { useEffect, useState } from "react"
import { getPostTopics } from "../../../services/topics/getPostTopics"
import { useNavigate } from "react-router-dom"
import { createNewPost } from "../../../services/posts/createNewPost"
import PropTypes from "prop-types"

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
    <div className="mx-2 mt-12">
      <div className="flex">
        <form className="m-auto w-3/4 p-11 shadow-lg bg-gray-700 rounded-lg">
          <h1 className="text-2xl font-bold mb-6 text-blue-600">New Post</h1>
          <fieldset className="mb-4">
            <input
              onChange={({ target: { value } }) => { setTitle(value) }}
              type="text"
              placeholder="Enter Title"
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </fieldset>
          <fieldset className="mb-4">
            <select
              onChange={({ target: { value } }) => { setTopicId(value) }}
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {topics.map(({ topic, id }) => (
                <option key={id} value={id}>{topic}</option>
              ))}
            </select>
          </fieldset>
          <fieldset className="mb-4">
            <textarea
              onChange={({ target: { value } }) => { setBody(value) }}
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={10}
              placeholder="Enter Data"
            ></textarea>
          </fieldset>
          <fieldset>
            <button
              onClick={handlePost}
              className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Post
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  )
}

NewPost.propTypes = {
  localStorageUser: PropTypes.object.isRequired
}
