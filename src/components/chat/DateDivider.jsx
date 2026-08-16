function DateDivider({label}){
    return(
        <div className="date-divider">
            <div className="date-divider-line"></div>
            <span className="date-divider-label">
                {label}
            </span>
            <div className="date-divider-line"></div>
        </div>
    )
}
export default DateDivider