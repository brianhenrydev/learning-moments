import { useEffect, useState } from "react"
import { Link } from "react-router-dom"

export const FavoritePosts = ({ localStorageUser }) => {
  const [likedPosts, setLikedPosts] = useState([])

  const fetchUserPosts = () =>
    fetch("http://localhost:8088/posts?_expand=topic&_expand=user&_embed=userLikes")
      .then(res => res.json())
      .then((posts) =>
        setLikedPosts(
          posts.filter(
            (post) => post.userLikes.some(
              (likes) => likes.userId === localStorageUser.id))))


  const handleRemoveLike = (id) => {
    fetch(`http://localhost:8088/userLikes/${id}`, {
      method: "DELETE"
    }).then(fetchUserPosts)

  }


  useEffect(() => {
    fetchUserPosts()
  }, [localStorageUser.id])

  return (

    <div className="flex-col">
      {likedPosts.map(
        ({
          id,
          title,
          userLikes
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
                  handleRemoveLike(userLikes[0].id)
                }
                }>Remove Like</button>

              </div>
            </div>
          </div>
        ))}
    </div>)
}
