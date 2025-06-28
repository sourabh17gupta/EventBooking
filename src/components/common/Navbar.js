import { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useSelector } from 'react-redux';
import Logo from '../../assest/Logo.png';
import dashboardImg from "../../assest/dashboardImg.jpg";
import GetAllCategories  from '../../api/Services/catalogApi/GetAllCategory';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCatalogMenu, setShowCatalogMenu] = useState(false);
  const [showMobileCatalogMenu, setShowMobileCatalogMenu] = useState(false);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const catalogRef = useRef();

  // Fetch categories dynamically
  const { data: categories = [], isLoading } = GetAllCategories();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const baseLink = "text-white hover:text-blue-400 transition";
  const activeLink = "text-blue-400 font-semibold";

  const handleCatalogClick = () => setShowCatalogMenu((prev) => !prev);

  const handleCategoryClick = (type) => {
    navigate(`/catalog?category=${type}`);
    setShowCatalogMenu(false);
    setShowMobileCatalogMenu(false);
    setMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (catalogRef.current && !catalogRef.current.contains(e.target)) {
        setShowCatalogMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="bg-[#04092C] shadow-md fixed top-0 w-full z-[70]">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <NavLink to="/">
          <img src={Logo} alt="Logo" className="h-10 w-auto" />
        </NavLink>

        <div className="hidden md:flex items-center space-x-6 text-white font-medium relative">
          <NavLink to="/" className={({ isActive }) => isActive ? activeLink : baseLink}>Home</NavLink>

          <div className="relative" ref={catalogRef}>
            <span
              onClick={handleCatalogClick}
              className="cursor-pointer text-white hover:text-blue-400 transition"
            >
              Catalog ▾
            </span>
            {showCatalogMenu && (
              <div className="absolute left-0 top-full mt-2 bg-[#04092C] rounded-lg shadow-lg py-2 w-40 z-[80] border border-white">
                {isLoading ? (
                  <span className="block px-4 py-2 text-white">Loading...</span>
                ) : categories.length > 0 ? (
                  categories.map((type) => (
                    <span
                      key={type}
                      onClick={() => handleCategoryClick(type)}
                      className="block w-full text-left px-4 py-2 text-white hover:text-blue-400 cursor-pointer"
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </span>
                  ))
                ) : (
                  <span className="block px-4 py-2 text-white">No categories</span>
                )}
              </div>
            )}
          </div>

          <NavLink to="/aboutUs" className={({ isActive }) => isActive ? activeLink : baseLink}>About Us</NavLink>

          {!user ? (
            <>
              <NavLink
                to="/login"
                className="border border-white px-4 py-1 rounded-full text-white hover:bg-blue-400 transition"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="border border-white px-4 py-1 rounded-full text-white hover:bg-blue-400 transition"
              >
                Sign Up
              </NavLink>
            </>
          ) : (
            <div
              onClick={() => navigate('/dashboard')}
              className="cursor-pointer flex items-center space-x-3 transition"
            >
              <img src={dashboardImg} alt="Dashboard" className="h-10 w-10 rounded-full object-cover" />
              <div>
                <p className="text-sm font-medium">{user?.firstName}</p>
                <p className="text-xs text-gray-300">{user?.email}</p>
              </div>
            </div>
          )}
        </div>

        <div className="md:hidden flex items-center space-x-3">
          {!user && (
            <>
              <NavLink
                to="/login"
                className="border border-white px-3 py-1 rounded-full text-white hover:bg-blue-400 transition text-sm"
              >
                Login
              </NavLink>
              <NavLink
                to="/signup"
                className="border border-white px-3 py-1 rounded-full text-white hover:bg-blue-400 transition text-sm"
              >
                Sign Up
              </NavLink>
            </>
          )}
          <button onClick={toggleMenu} className="text-white">
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-64 bg-[#04092C] shadow-lg transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'} z-[90]`}>
        <div className="p-4 flex justify-between items-start border-b border-white">
          <div className="flex items-center space-x-3">
            {user && (
              <div
                onClick={() => {
                  navigate('/dashboard');
                  setMenuOpen(false);
                }}
                className="cursor-pointer flex items-center space-x-3"
              >
                <img src={dashboardImg} alt="Dashboard" className="h-10 w-10 rounded-full object-cover" />
                <div>
                  <p className="text-white text-sm font-semibold">{user?.firstName}</p>
                  <p className="text-gray-400 text-xs">{user?.email}</p>
                </div>
              </div>
            )}
          </div>
          <button onClick={toggleMenu} className="text-white">
            <X size={24} />
          </button>
        </div>

        <div className="flex flex-col px-4 py-2 space-y-4 font-medium text-white">
          <NavLink to="/" onClick={toggleMenu} className={({ isActive }) => isActive ? activeLink : baseLink}>Home</NavLink>

          <span onClick={() => setShowMobileCatalogMenu(prev => !prev)} className="cursor-pointer hover:text-blue-400">
            Catalog ▾
          </span>
          {showMobileCatalogMenu && (
            <div className="ml-4 space-y-2">
              {isLoading ? (
                <span className="text-white">Loading...</span>
              ) : categories.length > 0 ? (
                categories.map((type) => (
                  <span
                    key={type}
                    onClick={() => handleCategoryClick(type)}
                    className="block w-full text-left px-2 py-1 text-white hover:text-blue-400 text-sm cursor-pointer"
                  >
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </span>
                ))
              ) : (
                <span className="text-white">No categories available</span>
              )}
            </div>
          )}

          <NavLink to="/aboutUs" onClick={toggleMenu} className={({ isActive }) => isActive ? activeLink : baseLink}>About Us</NavLink>
        </div>
      </div>

      {menuOpen && <div className="fixed inset-0 bg-black bg-opacity-30 z-[80]" onClick={toggleMenu}></div>}
    </nav>
  );
};

export default Navbar;
