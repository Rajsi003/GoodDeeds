import { BrowserRouter as Router,Routes,Route } from "react-router-dom"
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'



function App() {
  return (
    <>
    <Router>
    <div >
        <Header />
        <Routes>
          <Route path='/login' element= {<Login/>} />
          <Route path='/register' element= {<Register/>} />
          <Route path='/' element= {<Dashboard/>} />
        </Routes>
    </div>
    </Router>
    </>
  );
}

export default App;
