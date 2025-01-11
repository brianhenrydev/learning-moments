import { useParams } from "react-router-dom"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"
import { getPostById } from "../../services/posts/getPostById"
import { getPostLikes } from "../../services/posts/getPostLikes"
import { useCallback, useEffect, useState } from "react"

export const PostDetails = ({ user }) => {

  const { postId } = useParams()
  const [post, setPost] = useState({})

  const likePost = (likeObj) =>
    fetch("http://localhost:8088/userLikes", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(likeObj)
    }).then(res => res.json())

  const handleLike = () =>
    likePost({ userId: user.id, postId: post.id }).then(
      () => {
        getAndSetLikes()
      }
    )
  const getAndSetLikes = useCallback(() => {
    getPostById(postId).then((post) => {
      getPostLikes(postId).then((likes) => {
        setPost({
          ...post,
          likes: likes.filter((like) => like.postId === post.id).length
        })
      })
    })
  }, [postId])


  useEffect(() => {
    getAndSetLikes()
  }, [postId, getAndSetLikes])

  return (
    <div className="bg-gray-700 m-3 p-6 rounded-2xl shadow-lg  drop-shadow-2xl hover:translate-x-2 translate-y-3">
      <div className="text-3xl text-cyan-200 font-mono">{post ? post.title : ""}</div>
      <Link to=""><div className="text-red-300">{post ? post.user?.name : ""}</div></Link>
      <div className="text-blue-400">{post ? post.topic?.topic : ""}</div>
      <div className="text-blue-400">{post ? post.date : ""}</div>
      <div className="text-blue-200">{post ? post.body : ""}</div>
      {
        post.userId !== user.id ?
          <div className="post-likes">
            <div className="">{post.likes}</div>
            <button onClick={handleLike} className="post-like-btn">
              <div><i className="fa-solid fa-heart" /></div>
            </button>
          </div>
          : <div className=" p-2 text-red-500"
          ><button onClick={() => { console.log("edit clicked") }}>Edit</button></div>}
    </div >
  )
}

PostDetails.propTypes = {
  user: PropTypes.object.isRequired
}
