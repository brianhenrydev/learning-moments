import { useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { getPostById } from "../../services/posts/getPostById"
import { getPostLikes } from "../../services/posts/getPostLikes"
import { useEffect, useState } from "react"

export const PostDetails = ({ user }) => {

  const { postId } = useParams()
  const [post, setPost] = useState({})
  const [likes, setLikes] = useState(0)

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
  const getAndSetLikes = () => {
    getPostById(postId).then((post) => {
      getPostLikes(postId).then((likes) => {
        setPost({
          ...post,
          likes: likes.filter((like) => like.postId === post.id).length
        })
        setLikes(likes.filter((like) => like.postId === post.id))
      })
    })
  }


  useEffect(() => {
    getAndSetLikes()
  }, [postId])

  return (
    <div className="m-10 border-8 border-solid border-green-800 p-10">
      <div className="">{post ? post.title : ""}</div>
      <Link to=""><div className="">{post ? post.user?.name : ""}</div></Link>
      <div className="">{post ? post.topic?.topic : ""}</div>
      <div className="">{post ? post.date : ""}</div>
      <div className="">{post ? post.body : ""}</div>
      {
        post.userId !== user.id ?
          <div className="post-likes">
            <div className="">{post.likes}</div>
            <button onClick={handleLike} className="post-like-btn">
              <div><i className="fa-solid fa-heart" /></div>
            </button>
          </div>
          : <button onClick={() => { console.log("edit clicked") }}>Edit</button>}
    </div >
  )
}
