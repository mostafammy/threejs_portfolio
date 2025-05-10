const IsMobile = (WindowWidth) => {
    if (WindowWidth === undefined) {
        WindowWidth = window.innerWidth;
    } else if (WindowWidth < 768) {
        return true;
    } else {
        return false;
    }
}
export default IsMobile
