import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import ListPlanComponent from './components/ListPlanComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import PlanComponent from './components/PlanComponent'
import ListDailyPlanComponent from './components/ListDailyPlanComponent'
import DailyPlanComponent from './components/DailyPlanComponent'
import RegisterComponent from './components/RegisterComponent'
import LoginComponent from './components/LoginComponent'
import { isUserLoggedIn } from './services/AuthService'
import ListSubPlanComponent from './components/ListSubPlanComponent'
import SubPlanComponent from './components/SubPlanComponent'
import LayoutComponent from './components/Layout/LayoutComponent'
import MainLayoutComponent from './components/Layout/MainLayoutComponent'

function App() {

  // component 렌더링 하기 전 인증 상태 먼저 체크
  function AuthenticatedRoute({children}){
    const isAuth = isUserLoggedIn();

    if (isAuth) // 인증 상태면 children component 반환
        return children;

    return <Navigate to="/login"/> // 인증 상태가 아니면 /login 으로 navigate 할 수 있도록 return 
}

  return (
    <>
    <LayoutComponent>
        <BrowserRouter>
            <HeaderComponent/>
                <MainLayoutComponent>
                    <Routes>
                        {/* http://localhost:3000/ */}
                        <Route path='/' element = {
                            <AuthenticatedRoute>
                                <ListPlanComponent/> {/* AuthenticatedRoute의 children */}
                            </AuthenticatedRoute>
                        }></Route>
                        {/* http://localhost:3000/plans */}
                        <Route path='/plans' element = {
                            <AuthenticatedRoute>
                                <ListPlanComponent/>
                            </AuthenticatedRoute>
                        }></Route>
                        {/* http://localhost:3000/edit-plan */}
                        <Route path='/edit-plan' element = {
                            <AuthenticatedRoute>
                                <PlanComponent/>
                            </AuthenticatedRoute>
                        }></Route>
                        {/* http://localhost:3000/edit-plan/{planIdFromParamsWhenUpdate} */}
                        <Route path='/edit-plan/:planIdFromParamsWhenUpdate' element = {
                            <AuthenticatedRoute>
                                <PlanComponent/>
                            </AuthenticatedRoute>
                        }></Route>

                        {/* http://localhost:3000/daily-plans/{planIdFromParams} */}
                        <Route path='/daily-plans/:planIdFromParams' element = {
                            <AuthenticatedRoute>
                                <ListDailyPlanComponent/>
                            </AuthenticatedRoute>
                        }></Route>
                        {/* http://localhost:3000/daily-plans/add/{planIdFromParamsWhenAdd} */}
                        <Route path='/daily-plans/add/:planIdFromParamsWhenAdd' element = {
                            <AuthenticatedRoute>
                                <DailyPlanComponent/>
                            </AuthenticatedRoute>
                        }></Route>
                        {/* http://localhost:3000/daily-plans/update/{dailyIdFromParamsWhenUpdate} */}
                        <Route path='/daily-plans/update/:dailyIdFromParamsWhenUpdate' element = {
                            <AuthenticatedRoute>
                                <DailyPlanComponent/>
                            </AuthenticatedRoute>
                        }></Route>

                        {/* http://localhost:8080/register */}
                        <Route path='/register' element = {<RegisterComponent/>}></Route>
                        {/* http://localhost:8080/login */}
                        <Route path='/login' element = {<LoginComponent/>}></Route>

                        {/* http://localhost:3000/sub-plans/{dailyIdFromParams} */}
                        <Route path='/sub-plans/:dailyIdFromParams' element = {
                            <AuthenticatedRoute>
                                <ListSubPlanComponent/>
                            </AuthenticatedRoute>
                        }></Route>
                        {/* http://localhost:3000/sub-plans/add/{dailyIdFromParamsWhenAdd} */}
                        <Route path='/sub-plans/add/:dailyIdFromParamsWhenAdd' element = {
                            <AuthenticatedRoute>
                                <SubPlanComponent/>
                            </AuthenticatedRoute>
                        }></Route>
                        {/* http://localhost:3000/sub-plans/update/{subIdFromParamsWhenUpdate} */}
                        <Route path='/sub-plans/update/:subIdFromParamsWhenUpdate' element = {
                            <AuthenticatedRoute>
                                <SubPlanComponent/>
                            </AuthenticatedRoute>
                        }></Route>
                        
                    </Routes>
                </MainLayoutComponent>
            <FooterComponent/>
        </BrowserRouter>
    </LayoutComponent>                      
    </>
  )
}

export default App
