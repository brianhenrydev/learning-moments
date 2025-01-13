import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
export const NavBar = () => {
  const nav = useNavigate()
  return (
    <div className="">
      <div className="bg-cyan-900 p-2 m-3 mx-2 rounded-2xl shadow-lg  ">
        <ul className="relative flex h-12 items-center justify-between px-3 ">
          <li className="text-white hover:text-blue-500  ">
            <Link to="/posts"
              className=""> All Posts</Link>
          </li>
          <li className="text-white hover:text-blue-500">
            <Link to="/my-posts">My posts</Link>
          </li>
          <li className="text-white hover:text-blue-500">
            <Link to="/favorites">
              Favorites
            </Link>
          </li>
          <li className="text-white hover:text-blue-500">
            <Link to={"/new-post"}>
              New Post
            </Link>
          </li>
          <li className="text-white hover:text-blue-500">
            <Link to={"/profile"}>
              Profile
            </Link>
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
      </div >
    </div >)
}
