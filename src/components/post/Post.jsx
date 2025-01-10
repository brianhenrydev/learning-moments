import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getPostById } from "../../services/posts/getPostById"
import { getPostLikes } from "../../services/posts/getPostLikes"
export const Post = ({ id, title, topic }) => {
  const [likes, setLikes] = useState([])

  const getAndSetLikes = () => {
    getPostById(id).then((post) => {
      getPostLikes(id).then((likes) => {
        setLikes(likes.filter((like) => like.postId === post.id).length)
      })
    })
  }
  useEffect(() => {
    getAndSetLikes()

  }, [])
  return (
    <div id={id} className="m-10 border-8 border-solid border-green-800 p-10">
      <Link key={id} to={`/posts/${id}`}>
        <div className="">{title}</div>
      </Link>
      <div className="">{topic}</div>
      <div className="justify-self-end"><i className="fa-solid fa-heart" />{likes}</div>
    </div>
  )
} 
