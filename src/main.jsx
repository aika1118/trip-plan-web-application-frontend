import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  // 이 태그가 있으면 컴포넌트 디버그로 인해 useEffect가 두 번 불리게 됨
  // 실제 배포 시 태그 제거하기
  <React.StrictMode> 
    <App />
  </React.StrictMode>,
)
