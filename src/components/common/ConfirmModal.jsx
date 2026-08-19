import Button from "./Button.jsx"

function ConfirmModal({isOpen, title, message, onConfirm, onCancel, loading = false}){
    if(!isOpen){
        return null;
    }
    
    return(
        <div className="confirm-modal-overlay">
            <div className="confirm-modal">
                <div className="confirm-modal-content">
                    <h2>{title}</h2>
                    <p>{message}</p>
                </div>

                <div className="confirm-modal-actions">
                    <Button
                        type="button"
                        variant="secondary"
                        onClick={onCancel}
                        disabled={loading}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="button"
                        variant="danger"
                        onClick={onConfirm}
                        disabled={loading}
                    >
                        {loading ? "Logging out..." : "Logout"}
                    </Button>
                </div>
            </div>
        </div>
    )
}
export default ConfirmModal