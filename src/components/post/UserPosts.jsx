
import { useEffect, useState } from "react"
import { getAllPosts } from "../../services/posts/getAllPosts"
import { Link } from "react-router-dom"
import { deletePost } from "../../services/posts/deletePost"

export const UserPosts = ({ localStorageUser }) => {
  const [userPosts, setUserPosts] = useState([])
  const gASUsers = () => {
    getAllPosts().then((posts) => {
      setUserPosts(posts.filter((post) => post.userId === localStorageUser.id).reverse())
    })
  }
  useEffect(() => {
    gASUsers()

  }, [localStorageUser])
  const handleDelete = (postId) => {
    deletePost(postId).then(() => gASUsers())
  }


  return (
    <div className="flex-col">
      {userPosts.map(
        ({
          id,
          title,
        }
        ) => (
          <div key={id} id={id} className=" flex justify-evenly m-10 border-8 border-solid border-green-800 p-10">
            <div>
              <Link to={`/posts/${id}`}>
                <div className="">{title}</div>
              </Link>
            </div>
            <div className="float-right">
              <button onClick={() => {
                handleDelete(id)
              }}>Delete me</button>

            </div>
          </div>
        ))}
    </div>)
}
