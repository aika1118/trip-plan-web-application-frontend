import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { isUserLoggedIn, logout } from '../services/AuthService';

/**
 * HeaderComponent
 * 
 * 페이지의 Header를 구성하는 component 입니다.
 */

const HeaderComponent = () => {

    const isAuth = isUserLoggedIn();
    const navigator = useNavigate();

    function handleLogout(){
        logout();
        //navigator('/login')
    }

    return (
        <div>
            <header>
            <nav className='navbar navbar-expand-md navbar-dark bg-dark'>
                    <div>
                        <NavLink to="/plans" className="navbar-brand nav-link">Trip Plan Management</NavLink>
                    </div>

                    <div className='collapse navbar-collapse'>
                        <ul className='navbar-nav'>
                            {
                                isAuth && // 로그인 상태일 때만 보여줌
                                <li className='nav-item'>
                                    <NavLink to="/plans" className="nav-link">Plans</NavLink>
                                </li>
                            }
                            
                        </ul>
                    </div>
                    
                    <div>
                        <ul className='navbar-nav'>
                            {
                                !isAuth && // 로그인 상태가 아닐 때 보여줌
                                <li className='nav-item'>
                                    <NavLink to="/register" className="nav-link">Register</NavLink>
                                </li>
                            }
                            {
                                !isAuth && // 로그인 상태가 아닐 때 보여줌
                                <li className='nav-item'>
                                    <NavLink to="/login" className="nav-link">Login</NavLink>
                                </li>
                            }
                            {
                                isAuth && // 로그인 상태일 떄 보여줌
                                <li className='nav-item'>
                                    <NavLink to="/login" className="nav-link" onClick={handleLogout}>Logout</NavLink>
                                </li>
                            }
                                
                        </ul>
                    </div>
                </nav>
            </header>
        </div>
    )
}

export default HeaderComponent