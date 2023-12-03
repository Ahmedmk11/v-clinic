import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Sidebar from '../Sidebar/Sidebar'
import backIcn from '../../../assets/icons/back.svg'

const BackIcon = () => (
    <img
        onClick={() => {
            window.history.back()
        }}
        className='back-btn'
        style={{ width: 25, height: 25 }}
        src={backIcn}
    />
)

const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <div className='main-container'>
                <Sidebar />
                <>
                    <BackIcon />
                    {children}
                </>
            </div>
            <Footer />
        </>
    )
}

export default Layout
