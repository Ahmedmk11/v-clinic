import './layout.css'
import Header from '../../components/layout/Header/Header'
import Footer from '../../components/layout/Footer/Footer'
import Sidebar from '../../components/layout/Sidebar/Sidebar'
const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <div className='main-container'>
                <Sidebar />
                {children}
            </div>
            <Footer />
        </>
    )
}

export default Layout
