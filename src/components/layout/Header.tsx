import type { RefObject } from 'react';
import { Bell, User, LogOut, Settings, Menu } from 'lucide-react';
import type { Notification } from './Constants';

interface HeaderProps {
  isLightMode: boolean;
  isSidebarMinimized: boolean;
  toggleSidebar: () => void;
  toggleUserDropdown: () => void;
  toggleNotifications: () => void;
  handleKeyDown: (e: React.KeyboardEvent, action: () => void) => void;
  userDropdownRef: RefObject<HTMLDivElement | null>;
  userDropdownToggleRef: RefObject<HTMLButtonElement | null>;
  notificationRef: RefObject<HTMLDivElement | null>;
  notificationToggleRef: RefObject<HTMLButtonElement | null>;
  notifications: Notification[];
  markAllNotificationsAsRead: () => void;
  userName: string;
  userInitials: string;
  showNotifications: boolean;
  isUserDropdownOpen: boolean;
}

const Header: React.FC<HeaderProps> = ({
  isLightMode,
  isSidebarMinimized,
  toggleSidebar,
  toggleUserDropdown,
  toggleNotifications,
  handleKeyDown,
  userDropdownRef,
  userDropdownToggleRef,
  notificationRef,
  notificationToggleRef,
  notifications,
  markAllNotificationsAsRead,
  userName,
  userInitials,
  showNotifications,
  isUserDropdownOpen,
}) => {
  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 sm:p-6 ${
        isLightMode ? 'bg-white/70' : 'bg-gray-900/80'
      } backdrop-blur-md shadow-xs transition-colors duration-300 ${
        isSidebarMinimized ? 'pl-8 sm:pl-8' : 'pl-8 sm:pl-8'
      }`}
    >
      <div className="flex items-center space-x-2 sm:space-x-4">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-emerald-500">
          <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M2 7L12 12L22 7" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <path d="M12 22V12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
        <span className="text-xl sm:text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-500">
          FHIR 7 R4
        </span>
        <button
          onClick={toggleSidebar}
          onKeyDown={(e) => handleKeyDown(e, toggleSidebar)}
          className={`p-2 rounded-md hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white ${
            isLightMode ? 'text-gray-600' : 'text-gray-300'
          } transition-all duration-200 hover:scale-105 hover:shadow-md`}
          title={isSidebarMinimized ? 'Expand Sidebar' : 'Minimize Sidebar'}
          tabIndex={0}
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
      <div className="flex items-center space-x-4 sm:space-x-6">
        <div className="relative">
          <button
            ref={notificationToggleRef}
            onClick={toggleNotifications}
            onKeyDown={(e) => handleKeyDown(e, toggleNotifications)}
            className={`p-2 rounded-md hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white ${
              isLightMode ? 'text-gray-600' : 'text-gray-300'
            } transition-all duration-200 hover:scale-105 hover:shadow-md relative`}
            title="Notifications"
            tabIndex={0}
          >
            <Bell className="h-6 w-6" />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>
          {showNotifications && (
            <div
              ref={notificationRef}
              className={`absolute top-12 right-0 w-64 sm:w-80 rounded-lg shadow-lg z-50 ${
                isLightMode
                  ? 'bg-white/80 text-gray-900 border-green-100/40'
                  : 'bg-gray-800/80 text-gray-100 border-slate-700/40'
              } border backdrop-blur-sm`}
            >
              <div
                className={`flex justify-between items-center p-4 border-b ${
                  isLightMode ? 'border-green-200/40' : 'border-slate-700/40'
                }`}
              >
                <h3 className="text-base font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-500">
                  Notifications
                </h3>
                <button
                  onClick={markAllNotificationsAsRead}
                  onKeyDown={(e) => handleKeyDown(e, markAllNotificationsAsRead)}
                  className={`text-xs ${isLightMode ? 'text-gray-600' : 'text-gray-300'} hover:text-emerald-500 transition-colors duration-200`}
                  tabIndex={0}
                >
                  Mark all as read
                </button>
              </div>
              <div className="max-h-64 overflow-y-auto">
                {notifications.length > 0 ? (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 border-b ${
                        isLightMode ? 'border-green-200/40' : 'border-slate-700/40'
                      } hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white transition-all duration-200`}
                    >
                      <p className="text-xs sm:text-sm">{notification.message}</p>
                      <p className={`text-xs ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`}>
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="p-3 text-center text-xs sm:text-sm">No new notifications</div>
                )}
              </div>
            </div>
          )}
        </div>
        <div className="relative">
          <button
            ref={userDropdownToggleRef}
            onClick={toggleUserDropdown}
            onKeyDown={(e) => handleKeyDown(e, toggleUserDropdown)}
            className={`p-2 rounded-md hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white ${
              isLightMode ? 'text-gray-600' : 'text-gray-300'
            } transition-all duration-200 hover:scale-105 hover:shadow-md`}
            title="User Menu"
            tabIndex={0}
          >
            <div className="flex items-center space-x-2">
              <div
                className={`h-8 w-8 rounded-full flex items-center justify-center ${
                  isLightMode ? 'bg-emerald-100 text-emerald-600' : 'bg-emerald-900 text-emerald-300'
                }`}
              >
                {userInitials}
              </div>
              <span className="hidden sm:inline text-sm font-medium">{userName}</span>
            </div>
          </button>
          {isUserDropdownOpen && (
            <div
              ref={userDropdownRef}
              className={`absolute top-12 right-0 w-48 rounded-lg shadow-lg z-50 ${
                isLightMode
                  ? 'bg-white/80 text-gray-900 border-green-100/40'
                  : 'bg-gray-800/80 text-gray-100 border-slate-700/40'
              } border backdrop-blur-sm`}
            >
              <div className="p-2">
                <button
                  onClick={() => console.log('Profile clicked')}
                  onKeyDown={(e) => handleKeyDown(e, () => console.log('Profile clicked'))}
                  className={`w-full text-left px-3 py-2 rounded-md hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white ${
                    isLightMode ? 'text-gray-600' : 'text-gray-300'
                  } flex items-center space-x-2 text-sm transition-all duration-200 hover:scale-[1.02]`}
                  tabIndex={0}
                >
                  <User className="h-4 w-4" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => console.log('Settings clicked')}
                  onKeyDown={(e) => handleKeyDown(e, () => console.log('Settings clicked'))}
                  className={`w-full text-left px-3 py-2 rounded-md hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white ${
                    isLightMode ? 'text-gray-600' : 'text-gray-300'
                  } flex items-center space-x-2 text-sm transition-all duration-200 hover:scale-[1.02]`}
                  tabIndex={0}
                >
                  <Settings className="h-4 w-4" />
                  <span>Settings</span>
                </button>
                <button
                  onClick={() => console.log('Logout clicked')}
                  onKeyDown={(e) => handleKeyDown(e, () => console.log('Logout clicked'))}
                  className={`w-full text-left px-3 py-2 rounded-md hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white ${
                    isLightMode ? 'text-gray-600' : 'text-gray-300'
                  } flex items-center space-x-2 text-sm transition-all duration-200 hover:scale-[1.02]`}
                  tabIndex={0}
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;