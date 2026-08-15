import { BrowserRouter, Routes, Route } from "react-router-dom"
import Dashboard from "./pages/Dashboard.jsx"
import Signup from "./pages/Signup.jsx"
import Login from "./pages/Login.jsx"

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
        
    </>
  )
}

export default App
