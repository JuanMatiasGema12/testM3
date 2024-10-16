import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Home from "./views/Home";
import MisTurnos from "./views/MisTurnos";
import NavBar from './components/NavBar';
import About from "./views/About";
import Login from './views/Login';
import Register from './views/Register';
import AgendarTurno from './views/AgendarTurno'; 
import Footer from "./components/Footer";
import NotFound from "./components/NotFound"
import BackgroundImage from './components/BackgroundImage';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const userId = useSelector(state => state.user); 

  useEffect(() => {
    if (userId) {
      if (location.pathname === "/login" || location.pathname === "/register") {
        navigate("/");
      }
    } else if (location.pathname !== "/login" && location.pathname !== "/register") {
      navigate("/login");
    }
  }, [location.pathname, userId, navigate]);

  return (
    <>
      <BackgroundImage /> 

      {!userId ? ( 
        <main>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      ) : (
        <>
          <header>
            <NavBar />
          </header>
          
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/appointments" element={<MisTurnos />} />
              <Route path="/about" element={<About />} />
              <Route path="/agendar" element={<AgendarTurno />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Footer />
          </main>
        </>
      )}
    </>
  );
  
}

export default App;
