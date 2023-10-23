const ConditionalRender = ({ condition, children }) => {
    if (!condition) {
      return <></>
    }
    return <>{children}</>
  }
export default ConditionalRender  