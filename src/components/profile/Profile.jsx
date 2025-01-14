import { useEffect, useState } from "react"
import { getUserById } from "../../services/users/getUserById"
import { getPostByUserId } from "../../services/posts/getPostByUserId"
import { useParams } from "react-router-dom"
import PropTypes from "prop-types"
import { Link } from "react-router-dom"

export const Profile = ({ localStorageUser }) => {
  const { userId } = useParams()
  const profileUserId = parseInt(userId) || localStorageUser.id
  const [user, setUser] = useState({})
  const [userPosts, setUserPosts] = useState([])

  useEffect(() => {
    getUserById(profileUserId).then(user => setUser(user))
    getPostByUserId(profileUserId).then(posts => {
      setUserPosts(posts)
    })
  }, [profileUserId, userId])

  return (
    <div className="mx-2 mt-12">
      <div className="flex">
        <form className="m-auto w-3/4 p-11 shadow-lg bg-gray-700 rounded-lg">
          <h1 className="text-2xl font-bold mb-6 text-blue-600">Profile</h1>
          <div>
            <div className="text-blue-300">Name: {user.name}</div>
            <div className="text-blue-300">Cohort: {user.cohort}</div>
            <div className="text-blue-300"># Posts: {userPosts.length}</div>
            {
              localStorageUser.id === profileUserId ?
                <Link
                  to={"/profile/edit"}
                  state={user}
                  className="text-red-400 float-end"
                >
                  <button>Edit</button>
                </Link>
                :
                <></>
            }
          </div>
        </form>
      </div>
    </div >
  )
}

Profile.propTypes = {
  localStorageUser: PropTypes.object.isRequired
}
