import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Sidebar from '../Sidebar/Sidebar'

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <div className='main-container'>
                <Sidebar />
                <>{children}</>
            </div>
            <Footer />
        </>
    )
}

export default Layout
