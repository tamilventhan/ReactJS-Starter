import { useState, useEffect, useRef } from 'react';
import { Home, Calendar, Users, PlusCircle, Stethoscope, Pill, FileText, Settings, Shield, HelpCircle, Thermometer, Droplet, Weight, Sun, Moon, Bell, Menu, X, ChevronDown, ChevronRight, User, LogOut, MessageCircle, Bot } from 'lucide-react';

interface NavItem {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  path: string;
  submenus?: { label: string; path: string }[];
}

interface Notification {
  id: number;
  message: string;
  time: string;
}

const navItems: NavItem[] = [
  {
    label: 'Appointments',
    icon: Calendar,
    path: '#',
    submenus: [
      { label: 'Book New', path: '#book-new' },
      { label: 'Upcoming', path: '#upcoming' },
      { label: 'Past', path: '#past' },
    ],
  },
  {
    label: 'My Family',
    icon: Users,
    path: '#',
    submenus: [
      { label: 'Add Member', path: '#add-member' },
      { label: 'View Members', path: '#view-members' },
    ],
  },
  { label: 'Ask AI', icon: PlusCircle, path: '#ask-ai' },
  { label: 'My Doctors', icon: Stethoscope, path: '#my-doctors' },
  { label: 'Medications', icon: Pill, path: '#medications' },
  { label: 'Documents', icon: FileText, path: '#documents' },
  { label: 'ABHA', icon: Shield, path: '#abha' },
  { label: 'Settings', icon: Settings, path: '#settings' },
  { label: 'Security and Privacy', icon: Shield, path: '#security-privacy' },
  { label: 'Support and Feedback', icon: HelpCircle, path: '#support-feedback' },
  { label: 'Terms of Services', icon: FileText, path: '#terms-of-services' },
];

const mockNotifications: Notification[] = [
  { id: 1, message: 'Your appointment with Dr. Smith is confirmed for tomorrow.', time: '2 hours ago' },
  { id: 2, message: 'New medication "PainRelief" has been added to your prescription.', time: '5 hours ago' },
  { id: 3, message: 'Your recent lab results are available for review.', time: '1 day ago' },
  { id: 4, message: 'Reminder: Flu shot due next month.', time: '3 days ago' },
];

const App = () => {
  const [isLightMode, setIsLightMode] = useState(true);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isAiPromptMinimized, setIsAiPromptMinimized] = useState(true);
  const [isSupportChatMinimized, setIsSupportChatMinimized] = useState(true);
  const [hoveredMenuItem, setHoveredMenuItem] = useState<string | null>(null);
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({});
  const [leaveTimeout, setLeaveTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);

  const userDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownToggleRef = useRef<HTMLButtonElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  const notificationToggleRef = useRef<HTMLButtonElement>(null);
  const aiPromptRef = useRef<HTMLDivElement>(null);
  const supportChatRef = useRef<HTMLDivElement>(null);

  const toggleTheme = () => setIsLightMode(!isLightMode);

  const toggleSidebar = () => {
    setIsSidebarMinimized(!isSidebarMinimized);
    setHoveredMenuItem(null);
    setOpenSubmenus({});
    if (leaveTimeout) {
      clearTimeout(leaveTimeout);
      setLeaveTimeout(null);
    }
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
    setShowNotifications(false);
    setIsAiPromptMinimized(true);
    setIsSupportChatMinimized(true);
  };

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    setIsUserDropdownOpen(false);
    setIsAiPromptMinimized(true);
    setIsSupportChatMinimized(true);
  };

  const toggleAiPrompt = () => {
    setIsAiPromptMinimized(!isAiPromptMinimized);
    setShowNotifications(false);
    setIsUserDropdownOpen(false);
    setIsSupportChatMinimized(true);
  };

  const toggleSupportChat = () => {
    setIsSupportChatMinimized(!isSupportChatMinimized);
    setShowNotifications(false);
    setIsUserDropdownOpen(false);
    setIsAiPromptMinimized(true);
  };

  const markAllNotificationsAsRead = () => {
    setNotifications([]);
    setShowNotifications(false);
  };

  const toggleSubmenu = (label: string) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [label]: !prev[label]
    }));
  };

  const handleMouseEnter = (item: NavItem) => {
    if (leaveTimeout) {
      clearTimeout(leaveTimeout);
      setLeaveTimeout(null);
    }
    if (isSidebarMinimized && item.submenus) {
      setHoveredMenuItem(item.label);
    }
  };

  const handleMouseLeave = () => {
    if (isSidebarMinimized) {
      const timeout = setTimeout(() => {
        setHoveredMenuItem(null);
      }, 150);
      setLeaveTimeout(timeout);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  // Apply dark class to <html> and log for debugging
  useEffect(() => {
    console.log('isLightMode:', isLightMode);
    if (isLightMode) {
      document.documentElement.classList.remove('dark');
      console.log('Removed dark class from <html>');
    } else {
      document.documentElement.classList.add('dark');
      console.log('Added dark class to <html>');
    }
  }, [isLightMode]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target as Node) &&
        userDropdownToggleRef.current &&
        !userDropdownToggleRef.current.contains(event.target as Node)
      ) {
        setIsUserDropdownOpen(false);
      }

      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node) &&
        notificationToggleRef.current &&
        !notificationToggleRef.current.contains(event.target as Node)
      ) {
        setShowNotifications(false);
      }

      if (
        aiPromptRef.current &&
        !aiPromptRef.current.contains(event.target as Node) &&
        event.target instanceof Element &&
        event.target.closest('.ai-prompt-toggle-button') === null &&
        !isAiPromptMinimized
      ) {
        setIsAiPromptMinimized(true);
      }

      if (
        supportChatRef.current &&
        !supportChatRef.current.contains(event.target as Node) &&
        event.target instanceof Element &&
        event.target.closest('.support-chat-toggle-button') === null &&
        !isSupportChatMinimized
      ) {
        setIsSupportChatMinimized(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserDropdownOpen, showNotifications, isAiPromptMinimized, isSupportChatMinimized]);

  const themeClasses = [
    isLightMode ? 'bg-gradient-to-b from-gray-50 to-green-50' : 'bg-gradient-to-b from-gray-900 to-slate-800 dark:bg-gradient-to-b dark:from-gray-900 dark:to-slate-800',
    isLightMode ? 'text-gray-900' : 'text-gray-100'
  ].join(' ');

  const cardClasses = [
    isLightMode ? 'bg-white' : 'bg-gray-800 dark:bg-gray-800',
    isLightMode ? 'text-gray-900' : 'text-gray-100',
    'shadow-lg border',
    isLightMode ? 'border-green-100' : 'border-slate-700 dark:border-slate-700'
  ].join(' ');

  const sidebarClasses = [
    isLightMode ? 'bg-gradient-to-b from-green-50 to-green-100' : 'bg-gradient-to-b from-gray-800 to-slate-900 dark:bg-gradient-to-b dark:from-gray-800 dark:to-slate-900',
    isLightMode ? 'text-gray-900' : 'text-gray-100',
    'shadow-lg border',
    isLightMode ? 'border-green-200' : 'border-slate-700 dark:border-slate-700'
  ].join(' ');

  const primaryButtonClasses = [
    'bg-gradient-to-r from-blue-600 to-green-500',
    'hover:bg-gradient-to-r hover:from-green-600 hover:to-green-700',
    'hover:text-white',
    'text-white font-semibold py-2 px-4 rounded-md',
    'transition-all duration-200 shadow-sm hover:scale-105 hover:shadow-md'
  ].join(' ');

  const sidebarWidthClass = isSidebarMinimized ? 'w-16 sm:w-20' : 'w-48 sm:w-64';
  const mainContentMargin = isSidebarMinimized ? 'ml-16 sm:ml-20' : 'ml-48 sm:ml-64';
  const userName = "Lorem ipsum";
  const userInitials = userName.split(' ').map(word => word[0]).join('').slice(0, 2).toUpperCase();

  return (
    <div className={`min-h-screen flex flex-col ${themeClasses} ${isLightMode ? '' : 'dark'} font-['Inter',-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif]`}>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 sm:p-6 bg-white dark:bg-gray-800">
        {/* CHANGE HEADER BACKGROUND COLOR HERE: Modify the `bg-white dark:bg-gray-800` class.
             For gradient: Use `bg-gradient-to-r from-white to-slate-50 dark:from-gray-800 dark:to-slate-900`
             For other colors: Try `bg-white dark:bg-blue-800` or `bg-white dark:bg-teal-800` */}
        <div className="flex items-center">
          <button
            onClick={toggleSidebar}
            onKeyDown={(e) => handleKeyDown(e, toggleSidebar)}
            className={`p-2 rounded-md hover:bg-gradient-to-r hover:from-green-600 hover:to-green-700 hover:text-white ${isLightMode ? 'text-gray-600' : 'text-gray-300'} transition-all duration-200 hover:scale-105 hover:shadow-md`}
            tabIndex={0}
          >
            {isSidebarMinimized ? <Menu className="h-6 w-6" /> : <X className="h-6 w-6" />}
          </button>
          <div className="flex items-center space-x-2 ml-2 sm:ml-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-blue-600">
              <path d="M12 2L2 7V17L12 22L22 17V7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M2 7L12 12L22 7" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
              <path d="M12 22V12" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
            <span className="text-xl sm:text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-500">ALADRIOA</span>
          </div>
        </div>
        <div className="flex items-center space-x-4 sm:space-x-6 relative">
          <button
            onClick={() => console.log('Home clicked')}
            onKeyDown={(e) => handleKeyDown(e, () => console.log('Home clicked'))}
            className={`p-2 rounded-md hover:bg-gradient-to-r hover:from-green-600 hover:to-green-700 hover:text-white ${isLightMode ? 'text-gray-600' : 'text-gray-300'} transition-all duration-200 hover:scale-105 hover:shadow-md`}
            tabIndex={0}
          >
            <Home className="h-6 w-6" />
          </button>
          <button
            ref={notificationToggleRef}
            onClick={toggleNotifications}
            onKeyDown={(e) => handleKeyDown(e, toggleNotifications)}
            className={`p-2 rounded-md hover:bg-gradient-to-r hover:from-green-600 hover:to-green-700 hover:text-white relative ${isLightMode ? 'text-gray-600' : 'text-gray-300'} transition-all duration-200 hover:scale-105 hover:shadow-md`}
            tabIndex={0}
          >
            <Bell className="h-6 w-6" />
            {notifications.length > 0 && (
              <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {notifications.length}
              </span>
            )}
          </button>
          {showNotifications && (
            <div ref={notificationRef} className={`absolute right-0 mt-2 w-72 sm:w-80 rounded-lg py-2 z-50 top-full ${cardClasses}`}>
              <div className={`px-4 py-3 border-b ${isLightMode ? 'border-green-200' : 'border-slate-700 dark:border-slate-700'} flex justify-between items-center ${isLightMode ? 'bg-white' : 'bg-gray-800 dark:bg-gray-800'}`}>
                <h3 className="font-semibold text-base sm:text-lg bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-500">Notifications</h3>
                <button
                  onClick={markAllNotificationsAsRead}
                  onKeyDown={(e) => handleKeyDown(e, markAllNotificationsAsRead)}
                  className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium"
                  tabIndex={0}
                >
                  Mark all as read
                </button>
              </div>
              {notifications.length > 0 ? (
                notifications.map((notif) => (
                  <div key={notif.id} className={`px-4 py-3 hover:bg-gradient-to-r hover:from-green-600 hover:to-green-700 hover:text-white border-b ${isLightMode ? 'border-green-100' : 'border-slate-700 dark:border-slate-700'} last:border-b-0 transition-all duration-150`}>
                    <p className="text-xs sm:text-sm font-medium">{notif.message}</p>
                    <p className={`text-xs ${isLightMode ? 'text-gray-500' : 'text-gray-400'} mt-1`}>{notif.time}</p>
                  </div>
                ))
              ) : (
                <div className={`px-4 py-3 text-xs sm:text-sm ${isLightMode ? 'text-gray-500' : 'text-gray-400'} text-center`}>
                  No new notifications.
                </div>
              )}
            </div>
          )}
          <button
            ref={userDropdownToggleRef}
            className="flex items-center space-x-2 sm:space-x-3"
            onClick={toggleUserDropdown}
            onKeyDown={(e) => handleKeyDown(e, toggleUserDropdown)}
            tabIndex={0}
          >
            <div className={`w-8 sm:w-10 h-8 sm:h-10 rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm ${isLightMode ? 'bg-blue-600' : 'bg-slate-700 dark:bg-slate-700'} border ${isLightMode ? 'border-green-200' : 'border-slate-600 dark:border-slate-600'}`}>
              {userInitials}
            </div>
            <div className="flex flex-col justify-center">
              <p className="text-xs sm:text-sm font-semibold">{userName}</p>
              <p className={`text-xs ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`}>lorem.ipsum@gmail.com</p>
            </div>
            <ChevronDown className={`h-4 w-4 ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`} />
          </button>
          {isUserDropdownOpen && (
            <div ref={userDropdownRef} className={`absolute right-0 mt-2 w-44 sm:w-48 rounded-lg py-2 z-50 top-full ${cardClasses}`}>
              <button
                className={`flex items-center px-4 py-2 text-xs sm:text-sm font-medium hover:bg-gradient-to-r hover:from-green-600 hover:to-green-700 hover:text-white ${isLightMode ? 'text-gray-700' : 'text-gray-200'} transition-all duration-150 w-full text-left`}
                onClick={() => { console.log('Profile clicked'); setIsUserDropdownOpen(false); }}
                onKeyDown={(e) => handleKeyDown(e, () => { console.log('Profile clicked'); setIsUserDropdownOpen(false); })}
                tabIndex={0}
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </button>
              <button
                className={`flex items-center px-4 py-2 text-xs sm:text-sm font-medium hover:bg-gradient-to-r hover:from-green-600 hover:to-green-700 hover:text-white ${isLightMode ? 'text-gray-700' : 'text-gray-200'} transition-all duration-150 w-full text-left`}
                onClick={() => { console.log('Settings clicked'); setIsUserDropdownOpen(false); }}
                onKeyDown={(e) => handleKeyDown(e, () => { console.log('Settings clicked'); setIsUserDropdownOpen(false); })}
                tabIndex={0}
              >
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </button>
              <button
                className={`flex items-center px-4 py-2 text-xs sm:text-sm font-medium hover:bg-gradient-to-r hover:from-green-600 hover:to-green-700 hover:text-white ${isLightMode ? 'text-gray-700' : 'text-gray-200'} transition-all duration-150 w-full text-left`}
                onClick={() => { console.log('Logout clicked'); setIsUserDropdownOpen(false); }}
                onKeyDown={(e) => handleKeyDown(e, () => { console.log('Logout clicked'); setIsUserDropdownOpen(false); })}
                tabIndex={0}
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
            </div>
          )}
        </div>
      </header>
      <div className="flex flex-1 pt-20">
        {/* Sidebar */}
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
                  className={`flex ${isSidebarMinimized ? 'justify-center' : 'items-center space-x-3'} text-sm sm:text-base font-medium ${isLightMode ? 'text-gray-700' : 'text-gray-200'} hover:bg-gradient-to-r hover:from-green-600 hover:to-green-700 hover:text-white rounded-md px-3 py-2 transition-all duration-150 hover:scale-105 hover:shadow-md w-full text-left`}
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
                        className={`flex items-center text-xs sm:text-sm font-medium ${isLightMode ? 'text-gray-600' : 'text-gray-400'} hover:bg-gradient-to-r hover:from-green-600 hover:to-green-700 hover:text-white rounded-md px-3 py-1 transition-all duration-150 hover:scale-105 hover:shadow-md w-full text-left`}
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
                        className={`flex items-center px-4 py-2 text-xs sm:text-sm font-medium ${isLightMode ? 'text-gray-700' : 'text-gray-200'} hover:bg-gradient-to-r hover:from-green-600 hover:to-green-700 hover:text-white transition-all duration-150 w-full text-left`}
                        onClick={() => { console.log(`${subItem.label} clicked`); setHoveredMenuItem(null); }}
                        onKeyDown={(e) => handleKeyDown(e, () => { console.log(`${subItem.label} clicked`); setHoveredMenuItem(null); })}
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
              className={`flex ${isSidebarMinimized ? 'justify-center' : 'items-center space-x-3'} text-sm sm:text-base font-medium ${isLightMode ? 'text-gray-700' : 'text-gray-200'} hover:bg-gradient-to-r hover:from-green-600 hover:to-green-700 hover:text-white rounded-md px-3 py-2 transition-all duration-150 hover:scale-105 hover:shadow-md w-full text-left`}
              onClick={() => console.log('Logout clicked from sidebar')}
              onKeyDown={(e) => handleKeyDown(e, () => console.log('Logout clicked from sidebar'))}
              tabIndex={0}
            >
              <LogOut className="h-5 w-5 flex-shrink-0" />
              {!isSidebarMinimized && <span>Logout</span>}
            </button>
          </nav>
          <div className={`mt-4 pt-4 border-t ${isLightMode ? 'border-green-200' : 'border-slate-700 dark:border-slate-700'} ${isSidebarMinimized ? 'flex flex-col items-center space-y-2' : 'flex items-center justify-between'}`}>
            {!isSidebarMinimized && (
              <span className={`text-sm font-medium ${isLightMode ? 'text-gray-600' : 'text-gray-400'}`}>
                {isLightMode ? 'Light Mode' : 'Dark Mode'}
              </span>
            )}
            <button
              onClick={toggleTheme}
              onKeyDown={(e) => handleKeyDown(e, toggleTheme)}
              className={`p-2 rounded-md ${isLightMode ? 'bg-green-100' : 'bg-slate-800 dark:bg-slate-800'} hover:bg-gradient-to-r hover:from-green-600 hover:to-green-700 hover:text-white transition-all duration-200 hover:scale-105 hover:shadow-md ${isSidebarMinimized ? 'w-full flex justify-center' : ''}`}
              tabIndex={0}
            >
              {isLightMode ? <Moon className={`h-5 w-5 ${isLightMode ? 'text-gray-600' : 'text-gray-300'}`} /> : <Sun className={`h-5 w-5 ${isLightMode ? 'text-gray-600' : 'text-gray-300'}`} />}
            </button>
          </div>
        </aside>
        {/* Main Content */}
        <div className={`flex-1 p-4 sm:p-6 overflow-y-auto h-[calc(100vh-5rem)] ${mainContentMargin}`}>
          <main className="space-y-6">
            <section className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-500">Welcome {userName}!</h2>
              <div className="flex items-center">
                <p className={`${isLightMode ? 'text-gray-600' : 'text-gray-400'} mr-2 text-xs sm:text-sm`}>How can we assist you today?</p>
                <button
                  onClick={toggleAiPrompt}
                  onKeyDown={(e) => handleKeyDown(e, toggleAiPrompt)}
                  className={`p-2 rounded-md hover:bg-gradient-to-r hover:from-green-600 hover:to-green-700 hover:text-white ${isLightMode ? 'text-blue-600' : 'text-blue-400'} transition-all duration-200 hover:scale-105 hover:shadow-md ai-prompt-toggle-button`}
                  tabIndex={0}
                >
                  <Bot className="h-6 w-6" />
                </button>
              </div>
            </section>
            <div className={`p-4 sm:p-6 rounded-lg ${cardClasses}`}>
              <h3 className="text-lg sm:text-xl font-semibold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-500">Book an Appointment</h3>
              <p className={`${isLightMode ? 'text-gray-600' : 'text-gray-400'} mb-4 text-xs sm:text-sm`}>Complete the remaining steps in your profile to book an appointment.</p>
              <div className="flex justify-between items-center">
                <button
                  className={primaryButtonClasses}
                  onClick={() => console.log('Go to Profile clicked')}
                  onKeyDown={(e) => handleKeyDown(e, () => console.log('Go to Profile clicked'))}
                  tabIndex={0}
                >
                  Go to Profile
                </button>
              </div>
            </div>
            <div className={`p-4 sm:p-6 rounded-lg ${cardClasses}`}>
              <h3 className="text-lg sm:text-xl font-semibold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-500">Upcoming Appointment</h3>
              <div className="flex items-center mb-2">
                <span className={`text-xs sm:text-sm ${isLightMode ? 'text-gray-500' : 'text-gray-400'} mr-2`}>Asthma</span>
                <span className={`text-xs sm:text-sm ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`}>22-07-2025</span>
              </div>
              <p className={`${isLightMode ? 'text-gray-600' : 'text-gray-400'} mb-4 text-xs sm:text-sm`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
              </p>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-sm sm:text-base">Dr. Lorem ipsum</span>
                <div className="space-x-2">
                  <button
                    className={`bg-gradient-to-r from-amber-500 to-amber-600 hover:bg-gradient-to-r hover:from-green-600 hover:to-green-700 hover:text-white text-white font-semibold py-2 px-4 rounded-md transition-all duration-200 shadow-sm hover:scale-105 hover:shadow-md`}
                    onClick={() => console.log('Reschedule clicked')}
                    onKeyDown={(e) => handleKeyDown(e, () => console.log('Reschedule clicked'))}
                    tabIndex={0}
                  >
                    Reschedule
                  </button>
                  <button
                    className={`bg-gradient-to-r from-green-600 to-green-500 hover:bg-gradient-to-r hover:from-green-600 hover:to-green-700 hover:text-white text-white font-semibold py-2 px-4 rounded-md transition-all duration-200 shadow-sm hover:scale-105 hover:shadow-md`}
                    onClick={() => console.log('Check-in clicked')}
                    onKeyDown={(e) => handleKeyDown(e, () => console.log('Check-in clicked'))}
                    tabIndex={0}
                  >
                    Check-in
                  </button>
                </div>
              </div>
            </div>
            <div className={`p-4 sm:p-6 rounded-lg ${cardClasses}`}>
              <h3 className="text-lg sm:text-xl font-semibold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-500">Health Metrics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className={`p-4 rounded-lg flex items-center space-x-3 ${isLightMode ? 'bg-white' : 'bg-gray-800 dark:bg-gray-800'} border ${isLightMode ? 'border-green-100' : 'border-slate-700 dark:border-slate-700'}`}>
                  <Thermometer className="h-6 sm:h-8 w-6 sm:w-8 text-blue-600" />
                  <div>
                    <p className={`text-xs sm:text-sm ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`}>Body Temperature</p>
                    <p className="text-base sm:text-lg font-semibold">98.6 °F</p>
                    <p className="text-xs text-blue-500">Compared to last visit</p>
                  </div>
                </div>
                <div className={`p-4 rounded-lg flex items-center space-x-3 ${isLightMode ? 'bg-white' : 'bg-gray-800 dark:bg-gray-800'} border ${isLightMode ? 'border-green-100' : 'border-slate-700 dark:border-slate-700'}`}>
                  <Droplet className="h-6 sm:h-8 w-6 sm:w-8 text-red-500" />
                  <div>
                    <p className={`text-xs sm:text-sm ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`}>Blood Pressure</p>
                    <p className="text-base sm:text-lg font-semibold">123/80 mmHg</p>
                    <p className="text-xs text-blue-500">Compared to last visit</p>
                  </div>
                </div>
                <div className={`p-4 rounded-lg flex items-center space-x-3 ${isLightMode ? 'bg-white' : 'bg-gray-800 dark:bg-gray-800'} border ${isLightMode ? 'border-green-100' : 'border-slate-700 dark:border-slate-700'}`}>
                  <Weight className="h-6 sm:h-8 w-6 sm:w-8 text-purple-500" />
                  <div>
                    <p className={`text-xs sm:text-sm ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`}>Body Weight</p>
                    <p className="text-base sm:text-lg font-semibold">84 kg</p>
                    <p className="text-xs text-blue-500">Compared to last month</p>
                  </div>
                </div>
                <div className={`p-4 rounded-lg flex items-center space-x-3 ${isLightMode ? 'bg-white' : 'bg-gray-800 dark:bg-gray-800'} border ${isLightMode ? 'border-green-100' : 'border-slate-700 dark:border-slate-700'}`}>
                  <Thermometer className="h-6 sm:h-8 w-6 sm:w-8 text-blue-600" />
                  <div>
                    <p className={`text-xs sm:text-sm ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`}>Blood Glucose</p>
                    <p className="text-base sm:text-lg font-semibold">112 mg/dl</p>
                    <p className="text-xs text-blue-500">Compared to last visit</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={`p-4 sm:p-6 rounded-lg ${cardClasses}`}>
              <h3 className="text-lg sm:text-xl font-semibold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-500">Health Conditions</h3>
              <div className="space-y-4">
                <div className={`border-b pb-3 ${isLightMode ? 'border-green-200' : 'border-slate-700 dark:border-slate-700'}`}>
                  <p className="font-semibold text-sm sm:text-base">Hypertension</p>
                  <p className={`text-xs sm:text-sm ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`}>Feb 14, 2025</p>
                  <p className={`${isLightMode ? 'text-gray-600' : 'text-gray-400'} text-xs sm:text-sm`}>The patient's hypertension has been recorded in the past.</p>
                </div>
                <div>
                  <p className="font-semibold text-sm sm:text-base">Immunizations:</p>
                  <p className={`text-xs sm:text-sm ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`}>Influenza (Flu Shot) - Feb 14, 2025</p>
                </div>
              </div>
            </div>
            <div className={`p-4 sm:p-6 rounded-lg ${cardClasses}`}>
              <h3 className="text-lg sm:text-xl font-semibold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-500">CALADRION</h3>
              <p className={`${isLightMode ? 'text-gray-600' : 'text-gray-400'} mb-4 text-xs sm:text-sm`}>
                Welcome to Caladrion. Get started with our suite of tools. Not sure where to begin?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className={`p-4 rounded-lg ${isLightMode ? 'bg-white' : 'bg-gray-800 dark:bg-gray-800'} border ${isLightMode ? 'border-green-100' : 'border-slate-700 dark:border-slate-700'}`}>
                  <p className="font-semibold text-sm sm:text-base">CalQuery</p>
                  <p className={`text-xs sm:text-sm ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`}>Smart Knowledge Search</p>
                </div>
                <div className={`p-4 rounded-lg ${isLightMode ? 'bg-white' : 'bg-gray-800 dark:bg-gray-800'} border ${isLightMode ? 'border-green-100' : 'border-slate-700 dark:border-slate-700'}`}>
                  <p className="font-semibold text-sm sm:text-base">CalAssist</p>
                  <p className={`text-xs sm:text-sm ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`}>AI Chat Assistant</p>
                </div>
                <div className={`p-4 rounded-lg ${isLightMode ? 'bg-white' : 'bg-gray-800 dark:bg-gray-800'} border ${isLightMode ? 'border-green-100' : 'border-slate-700 dark:border-slate-700'}`}>
                  <p className="font-semibold text-sm sm:text-base">CalFlow</p>
                  <p className={`text-xs sm:text-sm ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`}>Task Automation Assistant</p>
                </div>
                <div className={`p-4 rounded-lg ${isLightMode ? 'bg-white' : 'bg-gray-800 dark:bg-gray-800'} border ${isLightMode ? 'border-green-100' : 'border-slate-700 dark:border-slate-700'}`}>
                  <p className="font-semibold text-sm sm:text-base">CalBrief</p>
                  <p className={`text-xs sm:text-sm ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`}>Contextual Summary Generator</p>
                </div>
                <div className={`p-4 rounded-lg ${isLightMode ? 'bg-white' : 'bg-gray-800 dark:bg-gray-800'} border ${isLightMode ? 'border-green-100' : 'border-slate-700 dark:border-slate-700'}`}>
                  <p className="font-semibold text-sm sm:text-base">CalLense</p>
                  <p className={`text-xs sm:text-sm ${isLightMode ? 'text-gray-500' : 'text-gray-400'}`}>Visual AI Analyzer</p>
                </div>
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Ask me anything..."
                  className={`w-full p-3 rounded-md border ${isLightMode ? 'border-green-200 bg-white text-gray-900' : 'border-slate-700 bg-gray-800 dark:bg-gray-800 text-gray-100'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
      <footer className={`fixed bottom-0 left-0 right-0 py-4 text-center ${isLightMode ? 'bg-gradient-to-r from-green-50 to-green-100 text-gray-600' : 'bg-gradient-to-r from-gray-800 to-slate-900 dark:bg-gradient-to-r dark:from-gray-800 dark:to-slate-900 text-gray-300'} text-xs sm:text-sm z-30`}>
        <p>&copy; {new Date().getFullYear()} ALADRIOA. All rights reserved.</p>
      </footer>
      <div ref={aiPromptRef} className={`fixed bottom-4 right-20 sm:right-24 rounded-lg shadow-lg transition-all duration-300 ${isAiPromptMinimized ? 'w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-slate-900' : `w-64 sm:w-80 h-[60vh] sm:h-[75vh] flex flex-col ${cardClasses}`} z-50`}>
        {isAiPromptMinimized ? (
          <button
            onClick={toggleAiPrompt}
            onKeyDown={(e) => handleKeyDown(e, toggleAiPrompt)}
            className={`ai-prompt-toggle-button p-2 rounded-md hover:bg-gradient-to-r hover:from-green-600 hover:to-green-700 hover:text-white ${isLightMode ? 'text-blue-600' : 'text-blue-400'} transition-all duration-200 hover:scale-105 hover:shadow-md`}
            tabIndex={0}
          >
            <Bot className="h-6 sm:h-8 w-6 sm:w-8" />
          </button>
        ) : (
          <>
            <div className={`flex justify-between items-center p-4 border-b ${isLightMode ? 'border-green-200 bg-white' : 'border-slate-700 bg-gray-800 dark:bg-gray-800'} rounded-t-lg`}>
              <h3 className="text-base sm:text-lg font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-500">AI Assistant</h3>
              <button
                onClick={toggleAiPrompt}
                onKeyDown={(e) => handleKeyDown(e, toggleAiPrompt)}
                className={`p-1 rounded-md hover:bg-gradient-to-r hover:from-green-600 hover:to-green-700 hover:text-white ai-prompt-toggle-button ${isLightMode ? 'text-gray-600' : 'text-gray-300'} transition-all duration-200 hover:scale-105 hover:shadow-md`}
                tabIndex={0}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-grow overflow-y-auto p-4 space-y-3">
              <div className="flex justify-start">
                <div className={`p-3 rounded-lg max-w-[80%] ${isLightMode ? 'bg-gradient-to-r from-blue-50 to-green-50 text-gray-900' : 'bg-gradient-to-r from-blue-900 to-slate-900 dark:bg-gradient-to-r dark:from-blue-900 dark:to-slate-900 text-gray-100'} shadow-sm`}>
                  Hello! How can I help you today?
                </div>
              </div>
              <div className="flex justify-end">
                <div className={`p-3 rounded-lg max-w-[80%] ${isLightMode ? 'bg-gradient-to-r from-green-50 to-green-100 text-gray-900' : 'bg-gradient-to-r from-gray-800 to-slate-900 dark:bg-gradient-to-r dark:from-gray-800 dark:to-slate-900 text-gray-100'} shadow-sm`}>
                  I need to book an appointment.
                </div>
              </div>
              <div className="flex justify-start">
                <div className={`p-3 rounded-lg max-w-[80%] ${isLightMode ? 'bg-gradient-to-r from-blue-50 to-green-50 text-gray-900' : 'bg-gradient-to-r from-blue-900 to-slate-900 dark:bg-gradient-to-r dark:from-blue-900 dark:to-slate-900 text-gray-100'} shadow-sm`}>
                  Sure, what kind of appointment are you looking for?
                </div>
              </div>
            </div>
            <div className={`p-4 border-t ${isLightMode ? 'border-green-200 bg-white' : 'border-slate-700 bg-gray-800 dark:bg-gray-800'} rounded-b-lg`}>
              <input
                type="text"
                placeholder="Ask AI anything..."
                className={`w-full p-3 rounded-md border ${isLightMode ? 'border-green-200 bg-white text-gray-900' : 'border-slate-700 bg-gray-800 dark:bg-gray-800 text-gray-100'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
              />
            </div>
          </>
        )}
      </div>
      <div ref={supportChatRef} className={`fixed bottom-4 right-4 rounded-lg shadow-lg transition-all duration-300 ${isSupportChatMinimized ? 'w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center' : 'w-64 sm:w-80 h-80 sm:h-96 flex flex-col'} z-50 ${cardClasses}`}>
        {isSupportChatMinimized ? (
          <button
            onClick={toggleSupportChat}
            onKeyDown={(e) => handleKeyDown(e, toggleSupportChat)}
            className={`support-chat-toggle-button p-2 rounded-md hover:bg-gradient-to-r hover:from-green-600 hover:to-green-700 hover:text-white ${isLightMode ? 'text-blue-600' : 'text-blue-400'} transition-all duration-200 hover:scale-105 hover:shadow-md`}
            tabIndex={0}
          >
            <MessageCircle className="h-6 sm:h-8 w-6 sm:w-8" />
          </button>
        ) : (
          <>
            <div className={`flex justify-between items-center p-4 border-b ${isLightMode ? 'border-green-200 bg-white' : 'border-slate-700 bg-gray-800 dark:bg-gray-800'}`}>
              <h3 className="text-base sm:text-lg font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-500">Support Chat</h3>
              <button
                onClick={toggleSupportChat}
                onKeyDown={(e) => handleKeyDown(e, toggleSupportChat)}
                className={`p-1 rounded-md hover:bg-gradient-to-r hover:from-green-600 hover:to-green-700 hover:text-white ${isLightMode ? 'text-gray-600' : 'text-gray-300'} transition-all duration-200 hover:scale-105 hover:shadow-md`}
                tabIndex={0}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-grow overflow-y-auto p-4 space-y-3">
              <div className="flex justify-start">
                <div className={`p-3 rounded-lg max-w-[80%] ${isLightMode ? 'bg-gradient-to-r from-blue-50 to-green-50 text-gray-900' : 'bg-gradient-to-r from-blue-900 to-slate-900 dark:bg-gradient-to-r dark:from-blue-900 dark:to-slate-900 text-gray-100'} shadow-sm`}>
                  Hi there! How can I help you today?
                </div>
              </div>
              <div className="flex justify-end">
                <div className={`p-3 rounded-lg max-w-[80%] ${isLightMode ? 'bg-gradient-to-r from-green-50 to-green-100 text-gray-900' : 'bg-gradient-to-r from-gray-800 to-slate-900 dark:bg-gradient-to-r dark:from-gray-800 dark:to-slate-900 text-gray-100'} shadow-sm`}>
                  I have a question about my recent appointment.
                </div>
              </div>
              <div className="flex justify-start">
                <div className={`p-3 rounded-lg max-w-[80%] ${isLightMode ? 'bg-gradient-to-r from-blue-50 to-green-50 text-gray-900' : 'bg-gradient-to-r from-blue-900 to-slate-900 dark:bg-gradient-to-r dark:from-blue-900 dark:to-slate-900 text-gray-100'} shadow-sm`}>
                  Certainly, please tell me more.
                </div>
              </div>
            </div>
            <div className={`p-4 border-t ${isLightMode ? 'border-green-200 bg-white' : 'border-slate-700 bg-gray-800 dark:bg-gray-800'} rounded-b-lg`}>
              <input
                type="text"
                placeholder="Type your message..."
                className={`w-full p-3 rounded-md border ${isLightMode ? 'border-green-200 bg-white text-gray-900' : 'border-slate-700 bg-gray-800 dark:bg-gray-800 text-gray-100'} focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200`}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;