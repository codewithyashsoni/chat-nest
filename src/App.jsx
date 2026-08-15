import { Routes, Route, Navigate } from "react-router-dom"
import Dashboard from "./pages/Dashboard.jsx"
import Signup from "./pages/Signup.jsx"
import Login from "./pages/Login.jsx"

import ProtectedRoute from "./routes/ProtectedRoute.jsx"

function App() {
  return (
    <>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<Dashboard />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
        
    </>
  )
}

export default App
