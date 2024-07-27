import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ListPlanComponent from './components/ListPlanComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import PlanComponent from './components/PlanComponent'
import ListDailyPlanComponent from './components/ListDailyPlanComponent'
import DailyPlanComponent from './components/DailyPlanComponent'

function App() {
  return (
    <>
      <BrowserRouter>
            <HeaderComponent/>
              <Routes>
                  {/* http://localhost:3000 */}
                  <Route path='/' element = {<ListPlanComponent/>}></Route>

                  {/* http://localhost:3000/plans */}
                  <Route path='/plans' element = {<ListPlanComponent/>}></Route>
                  {/* http://localhost:3000/edit-plan */}
                  <Route path='/edit-plan' element = {<PlanComponent/>}></Route>
                  {/* http://localhost:3000/edit-plan/{planIdFromParamsWhenUpdate} */}
                  <Route path='/edit-plan/:planIdFromParamsWhenUpdate' element = {<PlanComponent/>}></Route>

                  {/* http://localhost:3000/daily-plans/{planIdFromParams} */}
                  <Route path='/daily-plans/:planIdFromParams' element = {<ListDailyPlanComponent/>}></Route>
                  {/* http://localhost:3000/daily-plan/add/{planIdFromParamsWhenAdd} */}
                  <Route path='/daily-plans/add/:planIdFromParamsWhenAdd' element = {<DailyPlanComponent/>}></Route>
                  {/* http://localhost:3000/daily-plan/update/{dailyIdFromParamsWhenUpdate} */}
                  <Route path='/daily-plans/update/:dailyIdFromParamsWhenUpdate' element = {<DailyPlanComponent/>}></Route>
                  
              </Routes>
            <FooterComponent/>
        </BrowserRouter>
    </>
  )
}

export default App
