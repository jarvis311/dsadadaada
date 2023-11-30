import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../App'
import Header from './Header'
import Sidebar from './Sidebar'

const Layout = (props) => {

    const [sidebar, setSidebar] = useState(false);
    const { classActive, setClassActive } = useContext(AuthContext)
    const sidebarCollapsed = localStorage.getItem('sidebar-collapsed');
    const [isExpanded, setIsExpanded] = useState(sidebarCollapsed ? false : true);

    const handleToggler = () => {
        setClassActive({ ...classActive, drp1: false, drp2: false, drp3: false })
        if (isExpanded) {
            setIsExpanded(false);
            localStorage.setItem('sidebar-collapsed', true);
            return;
        }
        setIsExpanded(true);
        localStorage.removeItem('sidebar-collapsed');
    };

    const toggleSidebar = () => {
        setSidebar((prevState) => !prevState)
    }

    return (
        <>
            <div className={isExpanded ? "layout-wrapper" : "layout-wrapper collapsed"}>
                {
                    props.sidebar === true ? <Sidebar sidebar={sidebar} isExpanded={isExpanded}/> : <></>
                }
                <Header openSidebar={toggleSidebar} />
                <div className="toggler">
                    <Link to="" className="sidebar-hide" onClick={handleToggler}><i className='bx bx-menu fs-3'></i></Link>
                </div>
                <div id="main">
                    <div className="main-content">
                        {
                            props.children
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default Layout