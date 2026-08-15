import { MessagesSquare } from "lucide-react"

function AuthLayout({children}){
    return(
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-brand">
                    <div className="auth-logo">
                        <MessagesSquare className="auth-logo-icon" strokeWidth={3} />
                        <h1 className="auth-logo-text">ChatNest</h1>
                    </div>
                    
                    <p>Real-time conversations, all in one place.</p>
                </div>

                <div className="auth-card">
                    {children}
                </div>
            </div>
        </div>
    )
}
export default AuthLayout