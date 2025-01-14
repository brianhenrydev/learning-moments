import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { getUserByEmail } from "../../services/users/getUserByEmail"

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
          className="floating-form">
          <form className="auth-form" onSubmit={handleLogin}>
            <h1 className="text-blue-200 font-bold text-4xl">Learning Moments</h1>
            <h2
              className="text-blue-500"
            >Please sign in</h2>
            <fieldset className="auth-fieldset">
              <div>
                <input
                  className="input"
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
                  className="btn-blue"
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


