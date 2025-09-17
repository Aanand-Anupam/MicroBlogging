import { useState, useEffect } from 'react'
import { login, logout } from './store/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import Footer from './components/Footer/Footer'
import authService from './Appwrite/auth'
import Drawer from './components/Drawer/Drawer'
import { Outlet } from 'react-router-dom'

function App() {

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setLoading(true);
    setError(null);

    authService.getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData: userData, status: true }));
        } else {
          dispatch(logout());
        }
      })

      .catch((error) => {
        setError("Error while running getCurrent user");
        console.log("Authentication Error", error);
      })
      .finally(() => setLoading(false))
  }, [dispatch])

  const authStatus = useSelector((state) => state.auth.status);

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {loading ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h1 className="text-2xl font-semibold text-gray-700">Loading...</h1>
          </div>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center min-h-screen">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center max-w-md">
            <p className="text-red-500 text-lg mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              aria-label="Retry authentication"
            >
              Retry
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex flex-1">
            {/* Drawer */}
            <nav
              className={`fixed top-0 left-0 h-[calc(100vh)] w-64 bg-white shadow-lg transform transition-transform duration-300 ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"
                } md:translate-x-0 z-20`}
              aria-label="Main navigation"
            >
              <Drawer authStatus={authStatus} toggleDrawer={toggleDrawer} />
            </nav>

            {/* Drawer Toggle Button for Mobile */}
            <button
              type='button'
              className={`fixed top-4 left-4 z-30 md:hidden p-2 bg-white rounded-md shadow-md ${isDrawerOpen ? "hidden" : "block"
                }`}
              onClick={toggleDrawer}
              aria-label="Open drawer"
            >
              <svg
                className="h-6 w-6 text-gray-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>

            {/* Main Content (Outlet) */}
            <main className="flex-1 ml-0 md:ml-64  pb-16">
              <div className="container mx-auto px-4">
                <Outlet />
              </div>
            </main>
          </div>

          {/* Footer */}
          <footer className="fixed bottom-0 left-0 w-full bg-white shadow-t-lg z-10">
            <div className="container mx-auto px-54 py-4">
              <Footer />
            </div>
          </footer>
        </>
      )}
    </div>
  );
}

export default App
