import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ListPlanComponent from './components/ListPlanComponent'
import HeaderComponent from './components/HeaderComponent'
import FooterComponent from './components/FooterComponent'

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
              </Routes>
            <FooterComponent/>
        </BrowserRouter>
    </>
  )
}

export default App
