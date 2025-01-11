import { useCallback, useEffect, useState } from "react"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { getPostById } from "../../services/posts/getPostById"
import { getPostLikes } from "../../services/posts/getPostLikes"

export const Post = ({ id, title, topic }) => {
  const [likes, setLikes] = useState([])
  const getAndSetLikes = useCallback(() => {
    getPostById(id).then((post) => {
      getPostLikes(id).then((likes) => {
        setLikes(likes.filter((like) => like.postId === post.id).length)
      })
    })
  }, [id])
  useEffect(() => {
    getAndSetLikes()

  }, [getAndSetLikes])
  return (
    <div id={id} className="bg-gray-700 m-3 p-6 rounded-2xl shadow-lg  drop-shadow-2xl hover:translate-x-2 translate-y-3">
      <Link key={id} to={`/posts/${id}`}>
        <div className="text-3xl text-cyan-200 font-mono">{title}</div>
      </Link>

      <div className="text-blue-400">{topic}</div>

      <div className="">
        <div className="justify-self-end text-cyan-200 flex row-auto">
          <i className="fa-regular fa-heart text-blue-500 text-2xl hover:fa-solid hover:text-red-300 " />
          <div className="mx-2">{likes}</div>
        </div>

      </div>

    </div>
  )
}

Post.propTypes = {
  topic: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired

}
