function AuthInput({label, type = "text",name,  value, 
    onChange, placeholder, autoComplete, required = false, minLength}){
    return(
        <div className="auth-input-group">

            <label htmlFor={name}>{label}:</label>

            <input
                id={name}
                name={name}
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                autoComplete={autoComplete}
                className="auth-input"
                required={required}
                minLength={minLength}
            />
        </div>
    )
}
export default AuthInput