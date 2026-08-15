import { LoaderCircle } from "lucide-react"

function AuthButton({children, type ="submit", onClick, disabled = false, loading = false }){

        return(
            <button
                type={type}
                className="auth-button"
                onClick={onClick}
                disabled={disabled || loading}
            >
                {loading ? (<LoaderCircle className="auth-loader" />) : children}
            </button>
        )
}
export default AuthButton