import { useEffect, useState } from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { AllPostsList } from "../components/post/AllPosts"
import { NavBar } from "../components/nav/NavBar"
import { PostDetails } from "../components/post/PostDetails"
import { NewPost } from "../components/post/new/NewPost"
import { UserPosts } from "../components/post/UserPosts"
import { EditPost } from "../components/post/EditPost"

export const ApplicationViews = () => {
  const [user, setUser] = useState({})
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("learning_user")))
  }, [])
  return (<>
    <Routes>
      <Route path="/" element={
        <>
          <NavBar />
          <Outlet />
        </>
      }>
        <Route index element={<AllPostsList />} />

        <Route path="posts">
          <Route index element={<AllPostsList />} />
          <Route path=":postId" element={<PostDetails localStorageUser={user} />} />
          <Route path="edit/:postId" element={<EditPost />} />



        </Route>
        <Route path="new-post" element={<NewPost localStorageUser={user} />}></Route>
        <Route path="my-posts" element={<UserPosts localStorageUser={user} />}></Route>
      </Route>
    </Routes >
  </>)

}
