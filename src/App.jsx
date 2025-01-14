import { Route, Routes } from "react-router-dom"
import { Register } from "./components/auth/Register"
import { Login } from "./components/auth/Login"
import { UseRoutesApplicationView } from "./views/ApplicationViews"
import { Authorized } from "./views/Authorized"

export const App = () => (
  <>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="*"
        element={
          <Authorized>
            <UseRoutesApplicationView />
          </Authorized>}
      />
    </Routes >
  </>
)

