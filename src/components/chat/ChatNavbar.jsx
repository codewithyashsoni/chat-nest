import { useState } from "react"
import { MessagesSquare, LogOut } from "lucide-react"
import Button from "../common/Button.jsx"
import ConfirmModal from "../common/ConfirmModal.jsx"

import { useAuth } from "../../context/AuthContext.jsx"
import { logoutUser } from "../../firebase/auth.js"

function ChatNavbar(){
    const {user} = useAuth();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [loading, setLoading] = useState(false);

    async function handleLogout(){
        try{
            setLoading(true);
            await logoutUser();
        }catch(error){
            console.error("failed to logout:", error);
        }finally{
            setLoading(false);
            setShowLogoutModal(false)
        }
    }

    return(
        <>
            <div className="chat-navbar-container">
                <div className="chat-navbar">
                    
                    <div className="chat-navbar-logo">
                        <MessagesSquare className="chat-navbar-logo-icon" strokeWidth={2.5} />
                        <span className="chat-navbar-logo-text">ChatNest</span>
                    </div>

                    <div className="chat-navbar-actions">
                        <div className="chat-online-status">
                            <span className="online-dot"></span>
                            <span>4 online</span>
                        </div>

                        <Button 
                            variant="danger"
                            className="chat-logout-btn"
                            onClick={() => setShowLogoutModal(true)}
                        >
                            <LogOut strokeWidth={2} />
                            Logout
                        </Button>
                    </div>
                </div>
            </div>

            <ConfirmModal
                isOpen={showLogoutModal}
                title="Logout?"
                message="Are you sure you want to log out of ChatNest?"
                onConfirm={handleLogout}
                onCancel={() => setShowLogoutModal(false)}
                loading={loading}
            />
        </>
    )
}
export default ChatNavbar