import { useEffect, useState } from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { AllPostsList } from "../components/AllPosts"

export const ApplicationViews = () => {
  const [user, setUser] = useState({})
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("learing_user")))
  }, [])
  return (<>
    <Routes>
      <Route
        path="/">
        <Route index element={<AllPostsList />} />
      </Route>

    </Routes>
  </>)

}
