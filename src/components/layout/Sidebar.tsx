import { LogOut, Sun, Moon, ChevronDown, ChevronRight } from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  submenus?: { label: string; path: string }[];
}

interface SidebarProps {
  isLightMode: boolean;
  isSidebarMinimized: boolean;
  toggleTheme: () => void;
  navItems: NavItem[];
  toggleSubmenu: (label: string) => void;
  handleMouseEnter: (item: NavItem) => void;
  handleMouseLeave: () => void;
  handleKeyDown: (e: React.KeyboardEvent, action: () => void) => void;
  hoveredMenuItem: string | null;
  openSubmenus: { [key: string]: boolean };
  sidebarWidthClass: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  isLightMode,
  isSidebarMinimized,
  toggleTheme,
  navItems,
  toggleSubmenu,
  handleMouseEnter,
  handleMouseLeave,
  handleKeyDown,
  hoveredMenuItem,
  openSubmenus,
  sidebarWidthClass,
}) => {
  const sidebarClasses = [
    isLightMode ? 'bg-gradient-to-b from-green-50 to-green-100/60' : 'bg-gradient-to-b from-gray-800 to-slate-900/60 dark:bg-gradient-to-b dark:from-gray-800 dark:to-slate-900',
    isLightMode ? 'text-gray-900' : 'text-gray-100',
    'shadow-lg border backdrop-blur-sm',
    isLightMode ? 'border-green-200/40' : 'border-slate-700/40'
  ].join(' ');

  const cardClasses = [
    isLightMode ? 'bg-white/80' : 'bg-gray-800/80',
    isLightMode ? 'text-gray-900' : 'text-gray-100',
    'shadow-lg border backdrop-blur-sm',
    isLightMode ? 'border-green-100/40' : 'border-slate-700/40'
  ].join(' ');

  return (
    <aside className={`fixed top-20 bottom-0 ${sidebarWidthClass} p-4 sm:p-6 transition-all duration-300 flex flex-col ${sidebarClasses} z-40 overflow-visible`}>
      <nav className="space-y-2 flex-grow">
        {navItems.map((item) => (
          <div
            key={item.label}
            className="relative"
            onMouseEnter={() => handleMouseEnter(item)}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className={`flex ${isSidebarMinimized ? 'justify-center' : 'items-center space-x-3'} text-sm sm:text-base font-medium ${isLightMode ? 'text-gray-700' : 'text-gray-200'} hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white rounded-md px-3 py-2 transition-all duration-150 hover:scale-105 hover:shadow-md w-full text-left`}
              onClick={(e) => {
                if (item.submenus) {
                  e.preventDefault();
                  toggleSubmenu(item.label);
                } else {
                  console.log(`${item.label} clicked`);
                }
              }}
              onKeyDown={(e) => handleKeyDown(e, () => {
                if (item.submenus) {
                  toggleSubmenu(item.label);
                } else {
                  console.log(`${item.label} clicked`);
                }
              })}
              tabIndex={0}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!isSidebarMinimized && <span className="flex-grow">{item.label}</span>}
              {!isSidebarMinimized && item.submenus && (
                openSubmenus[item.label] ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />
              )}
            </button>
            {!isSidebarMinimized && item.submenus && openSubmenus[item.label] && (
              <div className="ml-6 sm:ml-9 mt-1 space-y-1">
                {item.submenus.map((subItem) => (
                  <button
                    key={subItem.label}
                    className={`flex items-center text-xs sm:text-sm font-medium ${isLightMode ? 'text-gray-600' : 'text-gray-400'} hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white rounded-md px-3 py-1 transition-all duration-150 hover:scale-105 hover:shadow-md w-full text-left`}
                    onClick={() => console.log(`${subItem.label} clicked`)}
                    onKeyDown={(e) => handleKeyDown(e, () => console.log(`${subItem.label} clicked`))}
                    tabIndex={0}
                  >
                    {subItem.label}
                  </button>
                ))}
              </div>
            )}
            {isSidebarMinimized && item.submenus && hoveredMenuItem === item.label && (
              <div className={`absolute top-0 left-full ml-1 sm:ml-2 w-44 sm:w-48 rounded-lg py-2 z-60 ${cardClasses}`}>
                {item.submenus.map((subItem) => (
                  <button
                    key={subItem.label}
                    className={`flex items-center px-4 py-2 text-xs sm:text-sm font-medium ${isLightMode ? 'text-gray-700' : 'text-gray-200'} hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white transition-all duration-150 w-full text-left`}
                    onClick={() => { console.log(`${subItem.label} clicked`); handleMouseLeave(); }}
                    onKeyDown={(e) => handleKeyDown(e, () => { console.log(`${subItem.label} clicked`); handleMouseLeave(); })}
                    tabIndex={0}
                  >
                    {subItem.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
        <button
          className={`flex ${isSidebarMinimized ? 'justify-center' : 'items-center space-x-3'} text-sm sm:text-base font-medium ${isLightMode ? 'text-gray-700' : 'text-gray-200'} hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white rounded-md px-3 py-2 transition-all duration-150 hover:scale-105 hover:shadow-md w-full text-left`}
          onClick={() => console.log('Logout clicked from sidebar')}
          onKeyDown={(e) => handleKeyDown(e, () => console.log('Logout clicked from sidebar'))}
          tabIndex={0}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!isSidebarMinimized && <span>Logout</span>}
        </button>
      </nav>
      <div className={`mt-4 pt-4 border-t ${isLightMode ? 'border-green-200/40' : 'border-slate-700/40'} ${isSidebarMinimized ? 'flex flex-col items-center space-y-2' : 'flex items-center justify-between'}`}>
        {!isSidebarMinimized && (
          <span className={`text-sm font-medium ${isLightMode ? 'text-gray-600' : 'text-gray-400'}`}>
            {isLightMode ? 'Light Mode' : 'Dark Mode'}
          </span>
        )}
        <button
          onClick={toggleTheme}
          onKeyDown={(e) => handleKeyDown(e, toggleTheme)}
          className={`p-2 rounded-md ${isLightMode ? 'bg-green-100/60' : 'bg-slate-800/60'} hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white transition-all duration-200 hover:scale-105 hover:shadow-md ${isSidebarMinimized ? 'w-full flex justify-center' : ''}`}
          tabIndex={0}
        >
          {isLightMode ? <Moon className={`h-5 w-5 ${isLightMode ? 'text-gray-600' : 'text-gray-300'}`} /> : <Sun className={`h-5 w-5 ${isLightMode ? 'text-gray-600' : 'text-gray-300'}`} />}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;