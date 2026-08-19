import { useState, useEffect } from "react"
import { MessagesSquare, LogOut } from "lucide-react"
import Button from "../common/Button.jsx"
import ConfirmModal from "../common/ConfirmModal.jsx"

import { useAuth } from "../../context/AuthContext.jsx"
import { logoutUser } from "../../firebase/auth.js"
import { subscribeToOnlineCount, setUserOffline } from "../../firebase/presence.js"

function ChatNavbar(){
    const {user} = useAuth();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [onlineCount, setOnlineCount] = useState(0);

    useEffect(() => {
        const unsubscribe = subscribeToOnlineCount((count) => {
            setOnlineCount(count);
        });

        return unsubscribe;
    }, [])

    async function handleLogout(){
        try{
            setLoading(true);
            await setUserOffline(user.uid);
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
                            <span>{onlineCount} online</span>
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