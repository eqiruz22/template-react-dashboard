import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import './index.css'
import Dashboard from './component/page/Dashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Dashboard />} />
      </Routes>
    </Router>
  )
}

export default App