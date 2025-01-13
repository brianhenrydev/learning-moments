import React, { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { getUserByEmail } from "../../services/userService"

export const Login = () => {
  const [email, set] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    return getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0]
        localStorage.setItem(
          "learning_user",
          JSON.stringify({
            id: user.id,
          })
        )

        navigate("/")
      } else {
        window.alert("Invalid login")
      }
    })
  }

  return (
    <main className="w-full">
      <div className="flex ">
        <section
          className="m-auto w-1/4 mt-20 p-11 shadow-lg bg-gray-700 rounded-lg">
          <form className="auth-form" onSubmit={handleLogin}>
            <h1 className="text-blue-200 font-bold text-4xl">Learning Moments</h1>
            <h2
              className="text-blue-500"
            >Please sign in</h2>
            <fieldset className="auth-fieldset">
              <div>
                <input
                  className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="email"
                  value={email}
                  onChange={(evt) => set(evt.target.value)}
                  placeholder="Email address"
                  required
                  autoFocus
                />
              </div>
            </fieldset>
            <fieldset >
              <div>
                <button
                  className="w-full mt-2 p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
                  type="submit">Sign in</button>
              </div>
            </fieldset>
          </form>
          <section className="register-link">
            <Link
              className="hover:text-red-300  text-red-500"
              to="/register">Not a member yet?</Link>
          </section>
        </section>
      </div>
    </main>
  )
}


