import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
export const NavBar = () => {
  const nav = useNavigate()
  return (
    <div className="bg-gray-800 p-2 m-1 mx-2">
      <ul className="flex justify-evenly">
        <li className="text-white hover:text-blue-500">
          <Link to="/posts"> All Posts</Link>
        </li>
        <li className="text-white hover:text-blue-500">
          <Link to="/my-posts">My posts</Link>
        </li>
        <li>
          Favorites
        </li>
        <li className="text-white hover:text-blue-500">
          <Link to={"/new-post"}>
            New Post
          </Link>
        </li>
        <li>
          Profile
        </li>
        {localStorage.getItem("learning_user") ? (
          <li className="text-white hover:text-blue-500">
            <Link to=""
              onClick={() => {
                localStorage.removeItem("learning_user")
                nav("/login", { replace: true })
              }}
            >
              Logout
            </Link>
          </li>
        ) : (
          ""
        )}
      </ul >
    </div >)
}
