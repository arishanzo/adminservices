import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { getMenuItems } from "../../lib/MenuItems/getMenuItem";

const Sidebar = () => {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const isActive = (path, activePaths = []) => {
    if (activePaths.length > 0) {
      return activePaths.some(activePath => location.pathname.startsWith(activePath));
    }
    return location.pathname === path;
  };
  
  const menuItems = getMenuItems();

 
  
  return (
    <div className={` hidden sm:flex flex-col z-50 bg-white shadow-xl border-r border-gray-200 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'md:w-64'
    } min-h-screen`}>
      
      {/* Header */}
      <div className="flex items-center justify-center  p-4 border-b border-gray-200">
        {!isCollapsed && (
          <a href="/dashboard" className="items-center ">
            <img className="w-40 h-40" src="../img/logo/logogopintar.png" alt="Go-Pintar" />
          </a>
        )}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
        >
         
        </button>
      </div>

    

      {/* Main Menu */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => (
          <a
            key={item.path}
            href={item.path}
            className={`flex items-center space-x-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative ${
              isActive(item.path, item.activePaths)
                ? 'bg-green-100 text-green-700 shadow-sm'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <div className={`${isActive(item.path, item.activePaths) ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
              {item.icon}
            </div>
            {!isCollapsed && (
              <>
                <span className="font-medium">{item.name}</span>
                {item.notification && (
                  <span className="ml-auto bg-green-500 text-white text-xs rounded-full px-2 py-0.5 min-w-[20px] text-center">
                    {item.notification}
                  </span>
                )}
              </>
            )}
            {isCollapsed && item.notification && (
              <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {item.notification}
              </span>
            )}
          </a>
        ))}

        
      <div className="p-4 border-t border-gray-200 space-y-2">
         {/* Profile Link */}
        <a
          href="/profil"
          className={`flex items-start space-x-3  py-2.5 rounded-lg transition-all duration-200 group ${
            isActive('/profil')
              ? 'bg-green-100 text-green-700 shadow-sm'
              : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <div className={`${isActive('/profil') ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
            
                        <svg className="w-5 h-5 " fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
          </div>
          {!isCollapsed && <span className="font-medium">Pengaturan</span>}
        </a>
      </div>
      </nav>

        
       
      </div>
 
  );
};

export default Sidebar;