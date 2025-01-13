
import { useEffect, useState, useCallback } from "react"
import { getAllPosts } from "../../services/posts/getAllPosts"
import { Link } from "react-router-dom"
import { deletePost } from "../../services/posts/deletePost"

export const UserPosts = ({ localStorageUser }) => {
  const [userPosts, setUserPosts] = useState([])
  const gASUserPosts = useCallback(() => {
    getAllPosts().then((posts) => {
      setUserPosts(posts.filter((post) => post.userId === localStorageUser.id).reverse())
    })
  }, [localStorageUser.id])
  useEffect(() => {
    gASUserPosts()

  }, [localStorageUser, gASUserPosts])
  const handleDelete = (postId) => {
    deletePost(postId).then(() => gASUserPosts())
  }


  return (
    <div className="flex-col">
      {userPosts.map(
        ({
          id,
          title,
        }
        ) => (
          <div key={id} className="shadow-lg  bg-gray-700 rounded-2xl">
            <div id={id}
              className="m-3 p-6  drop-shadow-2xl flex justify-between">

              <div>
                <Link to={`/posts/${id}`}>
                  <div className=" text-blue-300 hover:text-blue-200">{title}</div>
                </Link>
              </div>
              <div className="hover:text-red-400 text-red-500 float-right ">
                <button onClick={() => {
                  handleDelete(id)
                }}>Delete me</button>

              </div>
            </div>
          </div>
        ))}
    </div>)
}
