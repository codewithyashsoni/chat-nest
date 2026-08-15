import { Navigate, Outlet } from "react-router-dom"
import { useAuth } from "../context/AuthContext.jsx"

function ProtectedRoute(){
    const { user, loading } = useAuth();

    if(loading){
        return <div>Checking authentication</div>
    }
    if(!user){
        return <Navigate to="/login" replace />
    }
    return <Outlet />

}
export default ProtectedRoute