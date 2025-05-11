const Button = ({name, isBeam = false, containerClass, onClickMoveTo = null}) => {
    const MoveTo = (URL = onClickMoveTo) => {
        window.open(URL, '_self');
        // console.log('MoveTo', URL);
    }
    // onClickMoveTo ? console.log('MoveTo', onClickMoveTo) : console.log('MoveTo', 'null');
    return (
        <button className={`btn ${containerClass}`} onClick={onClickMoveTo ? () => MoveTo() : ''}>
            {isBeam && (
                <span className={"relative flex h-3 w-3"}>
                    <span className={'btn-ping'}/>
                    <span className={'btn-ping_dot'}/>
                </span>
            )}
            {name}
        </button>
    )
}
export default Button
