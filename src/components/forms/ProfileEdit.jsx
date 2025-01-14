import { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { updateUser } from "../../services/users/updateUser"

export const ProfileEdit = () => {
  const user = useLocation()
  const { state: userData } = user
  const [userObj, setUserObj] = useState({})
  const nav = useNavigate()

  const handleChange = ({ target: { name, value } }) => {
    setUserObj({
      ...userObj,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    userObj.name && userObj.cohort ?
      updateUser({ ...userObj }).then(() => {
        nav("/profile")
      })
      :
      window.alert("You must have a name and cohort")
  }

  useEffect(() => {
    setUserObj(userData)
  }, [userData])

  return (

    <div className="w-full">
      <div className="flex">
        <form className="m-auto w-3/4 p-11 shadow-lg bg-gray-700 rounded-lg">
          <h1 className="text-2xl font-bold text-red-400 mb-6">Edit Profile</h1>
          <fieldset className="mb-4">
            <h3 className="text-blue-300">Enter Full Name</h3>
            <input
              name="name"
              type="text"
              placeholder="Enter Full Name"
              value={userObj.name ? userObj.name : ""}
              onChange={handleChange}
              className="input"
            />
          </fieldset>
          <fieldset className="mb-4">
            <h3 className="text-blue-300">Enter Cohort Number</h3>
            <input
              name="cohort"
              type="text"
              value={userObj.cohort ? userObj.cohort : ""}
              onChange={handleChange}
              placeholder="cohort #"
              className="input"
            />
          </fieldset>
          <fieldset>
            <button
              className="btn-submit"
              onClick={handleSubmit}
            >
              Submit Edit
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  )
} 
