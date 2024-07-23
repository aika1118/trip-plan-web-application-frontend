import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ListPlanComponent from './components/ListPlanComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'
import PlanComponent from './components/PlanComponent'

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
                  {/* http://localhost:3000/edit-plan/id */}
                  <Route path='edit-plan/:id' element = {<PlanComponent/>}></Route>
              </Routes>
            <FooterComponent/>
        </BrowserRouter>
    </>
  )
}

export default App
