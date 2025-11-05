  import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
  import Login from './pages/Login';
  import Signup from './pages/Signup';
  import Dashboard from './pages/Dashboard';
  import Marketplace from './pages/Marketplace';
  import Requests from './pages/Requests';
  import History from './pages/History';
  import Home from './pages/Home';
  import Navbar from './components/Navbar';

  function PrivateRoute({ children }) {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
  }

  function WithNavbar({ children }) {
    return (
      <>
        <Navbar />
        <div style={{ padding: '20px' }}>{children}</div>
      </>
    );
  }

  export default function App() {
    const token = localStorage.getItem('token');

    return (
      <BrowserRouter>
        <Routes>
          {/* Home: redirect if logged in */}
          <Route path="/" element={token ? <Navigate to="/dashboard" /> : <Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <WithNavbar><Dashboard /></WithNavbar>
              </PrivateRoute>
            }
          />
          <Route
            path="/marketplace"
            element={
              <PrivateRoute>
                <WithNavbar><Marketplace /></WithNavbar>
              </PrivateRoute>
            }
          />
          <Route
            path="/requests"
            element={
              <PrivateRoute>
                <WithNavbar><Requests /></WithNavbar>
              </PrivateRoute>
            }
          />
          <Route
            path="/history"
            element={
              <PrivateRoute>
                <WithNavbar><History /></WithNavbar>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    );
  }
