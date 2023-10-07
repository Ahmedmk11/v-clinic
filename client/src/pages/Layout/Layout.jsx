import './layout.css'
import Header from '../../components/Header/Header'
import Footer from '../../components/Footer/Footer'
import Sidebar from '../../components/Sidebar/Sidebar'
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
