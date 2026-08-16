function Button({children, type="button", variant="primary", 
    className = "", onClick, disabled = false}){
        
    return(
        <button 
            type={type}
            className={`button button-${variant} ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
export default Button