import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getPostById } from "../../services/posts/getPostById"
import { getPostTopics } from "../../services/topics/getPostTopics"
import { editUserPost } from "../../services/posts/editPost"

export const EditPost = () => {
  const [post, setPost] = useState({})
  const [topics, setTopics] = useState([])
  const { postId } = useParams()
  const nav = useNavigate()

  useEffect(() => {
    getPostById(postId).then((post) => setPost(post))
    getPostTopics().then(topics => setTopics(topics))
  }, [postId])

  const handleChange = ({ target }) => {
    const { name, value } = target
    setPost({
      ...post,
      [name]: value
    })
  }
  const handleEdit = (e) => {
    e.preventDefault()
    post.title && post.topicId && post.body ?
      editUserPost({ ...post }).then(() => {
        nav("my-posts")
      })
      :
      window.alert("fill in fields")

  }

  return (
    <div className="w-full">
      <div className="flex">
        <form className="m-auto w-3/4 p-11 shadow-lg bg-gray-700 rounded-lg">
          <h1 className="text-2xl font-bold text-white mb-6">Edit Post</h1>
          <fieldset className="mb-4">
            <input
              name="title"
              value={post.title ? post.title : ""}
              onChange={handleChange}
              type="text"
              placeholder="Enter Title"
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </fieldset>
          <fieldset className="mb-4">
            <select
              name="topicId"
              value={post.topicId ? post.topicId : ""}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {topics.map(({ topic, id }) => (
                <option key={id} value={id}>{topic}</option>
              ))}
            </select>
          </fieldset>
          <fieldset className="mb-4">
            <textarea
              name="body"
              value={post.body ? post.body : ""}
              onChange={handleChange}
              className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={10}
            ></textarea>
          </fieldset>
          <fieldset>
            <button
              onClick={handleEdit}
              className="w-full p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
            >
              Submit Edit
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  )
}



