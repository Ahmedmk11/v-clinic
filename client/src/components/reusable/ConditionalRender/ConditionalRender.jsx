const ConditionalRender = ({ condition, children, elseComponent = null }) => {
    if (!condition) {
        return <>{elseComponent}</>
    }
    return <>{children}</>
}
export default ConditionalRender
