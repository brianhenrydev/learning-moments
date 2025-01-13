import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createUser, getUserByEmail } from "../../services/userService"

export const Register = () => {
  const [user, setUser] = useState({
    email: "",
    fullName: "",
    cohort: 0,
  })
  let navigate = useNavigate()

  const registerNewUser = () => {
    const newUser = {
      ...user,
      cohort: parseInt(user.cohort),
    }

    createUser(newUser).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "learning_user",
          JSON.stringify({
            id: createdUser.id,
            staff: createdUser.isStaff,
          })
        )

        navigate("/")
      }
    })
  }

  const handleRegister = (e) => {
    e.preventDefault()
    getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists")
      } else {
        // Good email, create user.
        registerNewUser()
      }
    })
  }

  const updateUser = (evt) => {
    const copy = { ...user }
    copy[evt.target.id] = evt.target.value
    setUser(copy)
  }

  return (
    <main className="w-full flex">
      <form className="
        m-auto
        mt-20
        w-1/4
        p-11
        shadow-lg
        bg-gray-700
        rounded-lg" onSubmit={handleRegister}>
        <h1
          className="text-4xl
          text-blue-500
          text-center">Learning Moments</h1>
        <h2
          className="text-blue-400"
        >Please Register</h2>
        <div >
          <fieldset className="mb-2">
            <div
              className="">
              <input
                onChange={updateUser}
                type="text"
                id="fullName"
                className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter your name"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset className="mb-2">
            <div>
              <input
                onChange={updateUser}
                type="email"
                id="email"
                className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Email address"
                required
              />
            </div>
          </fieldset>
          <fieldset className="auth-fieldset">
            <div>
              <input
                onChange={updateUser}
                type="number"
                id="cohort"
                className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Cohort #"
                required
              />
            </div>
          </fieldset>
        </div>
        <fieldset className="auth-fieldset">
          <div>
            <button
              className="w-full mt-2 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
              type="submit">Register</button>
          </div>
        </fieldset>

      </form>
    </main>
  )
}
