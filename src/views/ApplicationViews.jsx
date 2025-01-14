import { useEffect, useState } from "react"
import { Outlet, Route, Routes } from "react-router-dom"
import { AllPostsList } from "../components/post/AllPosts"
import { NavBar } from "../components/nav/NavBar"
import { PostDetails } from "../components/post/PostDetails"
import { NewPost } from "../components/post/NewPost"
import { UserPosts } from "../components/post/UserPosts"
import { EditPost } from "../components/post/EditPost"
import { FavoritePosts } from "../components/post/FavoritePosts"
import { Profile } from "../components/profile/Profile"
import { ProfileEdit } from "../components/forms/ProfileEdit"
import { useRoutes } from "react-router-dom"

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
        <Route path="profile">
          <Route index element={<Profile localStorageUser={user} />} />
          <Route path=":userId" element={<Profile localStorageUser={user} />} />
          <Route path="edit" element={<ProfileEdit />} />

        </Route>


        <Route path="new-post" element={<NewPost localStorageUser={user} />}></Route>
        <Route path="my-posts" element={<UserPosts localStorageUser={user} />}></Route>
        <Route path="favorites" element={<FavoritePosts localStorageUser={user} />}></Route>
      </Route>
    </Routes >
  </>)

}


export const UseRoutesApplicationView = () => {
  const [user, setUser] = useState({})
  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("learning_user")))
  }, [])

  const routes = useRoutes([
    {
      path: '/',
      element: (
        <>
          <NavBar />
          <Outlet />
        </>
      ),
      children: [
        { index: true, element: <AllPostsList /> },
        {
          path: 'posts',
          children: [
            { index: true, element: <AllPostsList /> },
            { path: ':postId', element: <PostDetails localStorageUser={user} /> },
            { path: 'edit/:postId', element: <EditPost /> },
          ],
        },
        {
          path: 'profile',
          children: [
            { index: true, element: <Profile localStorageUser={user} /> },
            { path: ':userId', element: <Profile localStorageUser={user} /> },
            { path: 'edit', element: <ProfileEdit /> },
          ],
        },
        { path: 'new-post', element: <NewPost localStorageUser={user} /> },
        { path: 'my-posts', element: <UserPosts localStorageUser={user} /> },
        { path: 'favorites', element: <FavoritePosts localStorageUser={user} /> },
      ],
    },
  ]);

  return routes;
}
