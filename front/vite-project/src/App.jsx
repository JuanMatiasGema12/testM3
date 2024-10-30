import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Home from "./views/Home/Home.jsx";
import MisTurnos from "./views/MisTurnos/MisTurnos.jsx";
import NavBar from './components/NavBar/NavBar.jsx';
import About from "./views/About/About.jsx";
import Login from "./views/Login/Login.jsx";
import Register from "./views/Register/Register.jsx";
import AgendarTurno from "./views/AgendarTurno/AgendarTurno.jsx"; 
import Footer from "./components/Footer/Footer.jsx";
import NotFound from "./components/NotFound/NotFound.jsx";
import BackgroundImage from './components/BackgroundImage/BackgroundImage.jsx';
import { useEffect } from 'react';
import { UserProvider, useUser } from './context/UserContext';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const { userId } = useUser();

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

function App() {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
}

export default App;
