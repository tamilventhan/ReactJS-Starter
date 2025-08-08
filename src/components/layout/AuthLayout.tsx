import type { RefObject } from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { Thermometer, Droplet, Weight, Bot, MessageCircle, X } from 'lucide-react';
import { type NavItem, type Notification, navItems } from './Constants';

interface AuthLayoutProps {
  isLightMode: boolean;
  isSidebarMinimized: boolean;
  toggleTheme: () => void;
  toggleSidebar: () => void;
  toggleUserDropdown: () => void;
  toggleNotifications: () => void;
  toggleAiPrompt: () => void;
  toggleSupportChat: () => void;
  markAllNotificationsAsRead: () => void;
  toggleSubmenu: (label: string) => void;
  handleMouseEnter: (item: NavItem) => void;
  handleMouseLeave: () => void;
  handleKeyDown: (e: React.KeyboardEvent, action: () => void) => void;
  userDropdownRef: RefObject<HTMLDivElement | null>;
  userDropdownToggleRef: RefObject<HTMLButtonElement | null>;
  notificationRef: RefObject<HTMLDivElement | null>;
  notificationToggleRef: RefObject<HTMLButtonElement | null>;
  aiPromptRef: RefObject<HTMLDivElement | null>;
  supportChatRef: RefObject<HTMLDivElement | null>;
  notifications: Notification[];
  userName: string;
  userInitials: string;
  showNotifications: boolean;
  isUserDropdownOpen: boolean;
  isAiPromptMinimized: boolean;
  isSupportChatMinimized: boolean;
  hoveredMenuItem: string | null;
  openSubmenus: { [key: string]: boolean };
}

const AuthLayout: React.FC<AuthLayoutProps> = ({
  isLightMode,
  isSidebarMinimized,
  toggleTheme,
  toggleSidebar,
  toggleUserDropdown,
  toggleNotifications,
  toggleAiPrompt,
  toggleSupportChat,
  markAllNotificationsAsRead,
  toggleSubmenu,
  handleMouseEnter,
  handleMouseLeave,
  handleKeyDown,
  userDropdownRef,
  userDropdownToggleRef,
  notificationRef,
  notificationToggleRef,
  aiPromptRef,
  supportChatRef,
  notifications,
  userName,
  userInitials,
  showNotifications,
  isUserDropdownOpen,
  isAiPromptMinimized,
  isSupportChatMinimized,
  hoveredMenuItem,
  openSubmenus,
}) => {
  const themeClasses = isLightMode
    ? 'bg-gradient-to-b from-gray-50 to-green-50 text-gray-900'
    : 'bg-gradient-to-b from-gray-900 to-slate-800 dark:bg-gradient-to-b dark:from-gray-900 dark:to-slate-800 text-gray-100';

  const cardClasses = isLightMode
    ? 'bg-white/80 text-gray-900 shadow-lg border backdrop-blur-sm border-green-100/40'
    : 'bg-gray-800/80 text-gray-100 shadow-lg border backdrop-blur-sm border-slate-700/40';

  const primaryButtonClasses =
    'bg-gradient-to-r from-emerald-500 to-teal-500 hover:bg-gradient-to-r hover:from-teal-500 hover:to-emerald-500 hover:text-white text-white font-semibold py-2 px-4 rounded-md transition-all duration-200 shadow-sm hover:scale-105 hover:shadow-md';

  const sidebarWidthClass = isSidebarMinimized ? 'w-16 sm:w-20' : 'w-48 sm:w-64';
  const mainContentMargin = isSidebarMinimized ? 'ml-16 sm:ml-20' : 'ml-48 sm:ml-64';

  return (
    <div className={`min-h-screen flex flex-col ${themeClasses} ${isLightMode ? '' : 'dark'} font-['Inter',-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif]`}>
      <Header
        isLightMode={isLightMode}
        isSidebarMinimized={isSidebarMinimized}
        toggleSidebar={toggleSidebar}
        toggleUserDropdown={toggleUserDropdown}
        toggleNotifications={toggleNotifications}
        handleKeyDown={handleKeyDown}
        userDropdownRef={userDropdownRef}
        userDropdownToggleRef={userDropdownToggleRef}
        notificationRef={notificationRef}
        notificationToggleRef={notificationToggleRef}
        notifications={notifications}
        markAllNotificationsAsRead={markAllNotificationsAsRead}
        userName={userName}
        userInitials={userInitials}
        showNotifications={showNotifications}
        isUserDropdownOpen={isUserDropdownOpen}
      />
      <div className="flex flex-1 pt-20">
        <Sidebar
          isLightMode={isLightMode}
          isSidebarMinimized={isSidebarMinimized}
          toggleTheme={toggleTheme}
          navItems={navItems}
          toggleSubmenu={toggleSubmenu}
          handleMouseEnter={handleMouseEnter}
          handleMouseLeave={handleMouseLeave}
          handleKeyDown={handleKeyDown}
          hoveredMenuItem={hoveredMenuItem}
          openSubmenus={openSubmenus}
          sidebarWidthClass={sidebarWidthClass}
        />
        <div className={`flex-1 p-4 sm:p-6 overflow-y-auto h-[calc(100vh-5rem)] ${mainContentMargin}`}>
          <main className="space-y-6 mb-12">
            <section className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-500">
                Welcome {userName}!
              </h2>
              <div className="flex items-center">
                <p className={`${isLightMode ? 'text-gray-600' : 'text-gray-400'} mr-2 text-xs sm:text-sm`}>How can we assist you today?</p>
                <button
                  onClick={toggleAiPrompt}
                  onKeyDown={(e) => handleKeyDown(e, toggleAiPrompt)}
                  className={`p-2 rounded-md hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white ${
                    isLightMode ? 'text-emerald-500' : 'text-emerald-300'
                  } transition-all duration-200 hover:scale-105 hover:shadow-md ai-prompt-toggle-button`}
                  tabIndex={0}
                  title="Open AI Assistant"
                >
                  <Bot className="h-6 w-6" />
                </button>
              </div>
            </section>
            <div className={`p-4 sm:p-6 rounded-lg ${cardClasses}`}>
              <h3 className="text-lg sm:text-xl font-semibold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-500">
                Book an Appointment
              </h3>
              <p className={`${isLightMode ? 'text-gray-600' : 'text-gray-400'} mb-4 text-xs sm:text-sm`}>
                Complete the remaining steps in your profile to book an appointment.
              </p>
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
              <h3 className="text-lg sm:text-xl font-semibold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-500">
                Upcoming Appointment
              </h3>
              <div className="flex items-center mb-2">
                <span className={`${isLightMode ? 'text-gray-500' : 'text-gray-400'} mr-2 text-xs sm:text-sm`}>Asthma</span>
                <span className={`${isLightMode ? 'text-gray-500' : 'text-gray-400'} text-xs sm:text-sm`}>22-07-2025</span>
              </div>
              <p className={`${isLightMode ? 'text-gray-600' : 'text-gray-400'} mb-4 text-xs sm:text-sm`}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.
              </p>
              <div className="flex justify-between items-center">
                <span className="font-semibold text-sm sm:text-base">Dr. Lorem ipsum</span>
                <div className="space-x-2">
                  <button
                    className="bg-gradient-to-r from-amber-500 to-amber-600 hover:bg-gradient-to-r hover:from-amber-600 hover:to-amber-700 hover:text-white text-white font-semibold py-2 px-4 rounded-md transition-all duration-200 shadow-sm hover:scale-105 hover:shadow-md"
                    onClick={() => console.log('Reschedule clicked')}
                    onKeyDown={(e) => handleKeyDown(e, () => console.log('Reschedule clicked'))}
                    tabIndex={0}
                  >
                    Reschedule
                  </button>
                  <button
                    className={primaryButtonClasses}
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
              <h3 className="text-lg sm:text-xl font-semibold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-500">
                Health Metrics
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div
                  className={`p-4 rounded-lg flex items-center space-x-3 ${
                    isLightMode ? 'bg-white/80 border-green-100/40' : 'bg-gray-800/80 border-slate-700/40'
                  } border`}
                >
                  <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-900">
                    <Thermometer className="h-6 sm:h-8 w-6 sm:w-8 text-emerald-600" />
                  </div>
                  <div>
                    <p className={`${isLightMode ? 'text-gray-500' : 'text-gray-400'} text-xs sm:text-sm`}>Body Temperature</p>
                    <p className="text-base sm:text-lg font-semibold">98.6 °F</p>
                    <p className="text-xs text-emerald-500">Compared to last visit</p>
                  </div>
                </div>
                <div
                  className={`p-4 rounded-lg flex items-center space-x-3 ${
                    isLightMode ? 'bg-white/80 border-green-100/40' : 'bg-gray-800/80 border-slate-700/40'
                  } border`}
                >
                  <div className="p-2 rounded-full bg-rose-100 dark:bg-rose-900">
                    <Droplet className="h-6 sm:h-8 w-6 sm:w-8 text-rose-600" />
                  </div>
                  <div>
                    <p className={`${isLightMode ? 'text-gray-500' : 'text-gray-400'} text-xs sm:text-sm`}>Blood Pressure</p>
                    <p className="text-base sm:text-lg font-semibold">123/80 mmHg</p>
                    <p className="text-xs text-emerald-500">Compared to last visit</p>
                  </div>
                </div>
                <div
                  className={`p-4 rounded-lg flex items-center space-x-3 ${
                    isLightMode ? 'bg-white/80 border-green-100/40' : 'bg-gray-800/80 border-slate-700/40'
                  } border`}
                >
                  <div className="p-2 rounded-full bg-violet-100 dark:bg-violet-900">
                    <Weight className="h-6 sm:h-8 w-6 sm:w-8 text-violet-600" />
                  </div>
                  <div>
                    <p className={`${isLightMode ? 'text-gray-500' : 'text-gray-400'} text-xs sm:text-sm`}>Body Weight</p>
                    <p className="text-base sm:text-lg font-semibold">84 kg</p>
                    <p className="text-xs text-emerald-500">Compared to last month</p>
                  </div>
                </div>
                <div
                  className={`p-4 rounded-lg flex items-center space-x-3 ${
                    isLightMode ? 'bg-white/80 border-green-100/40' : 'bg-gray-800/80 border-slate-700/40'
                  } border`}
                >
                  <div className="p-2 rounded-full bg-emerald-100 dark:bg-emerald-900">
                    <Thermometer className="h-6 sm:h-8 w-6 sm:w-8 text-emerald-600" />
                  </div>
                  <div>
                    <p className={`${isLightMode ? 'text-gray-500' : 'text-gray-400'} text-xs sm:text-sm`}>Blood Glucose</p>
                    <p className="text-base sm:text-lg font-semibold">112 mg/dl</p>
                    <p className="text-xs text-emerald-500">Compared to last visit</p>
                  </div>
                </div>
              </div>
            </div>
            <div className={`p-4 sm:p-6 rounded-lg ${cardClasses}`}>
              <h3 className="text-lg sm:text-xl font-semibold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-500">
                Health Conditions
              </h3>
              <div className="space-y-4">
                <div className={`border-b pb-3 ${isLightMode ? 'border-green-200/40' : 'border-slate-700/40'}`}>
                  <p className="font-semibold text-sm sm:text-base">Hypertension</p>
                  <p className={`${isLightMode ? 'text-gray-500' : 'text-gray-400'} text-xs sm:text-sm`}>Feb 14, 2025</p>
                  <p className={`${isLightMode ? 'text-gray-600' : 'text-gray-400'} text-xs sm:text-sm`}>
                    The patient's hypertension has been recorded in the past.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-sm sm:text-base">Immunizations:</p>
                  <p className={`${isLightMode ? 'text-gray-500' : 'text-gray-400'} text-xs sm:text-sm`}>
                    Influenza (Flu Shot) - Feb 14, 2025
                  </p>
                </div>
              </div>
            </div>
            <div className={`p-4 sm:p-6 rounded-lg ${cardClasses}`}>
              <h3 className="text-lg sm:text-xl font-semibold mb-4 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-500">
                CALADRION
              </h3>
              <p className={`${isLightMode ? 'text-gray-600' : 'text-gray-400'} mb-4 text-xs sm:text-sm`}>
                Welcome to Caladrion. Get started with our suite of tools. Not sure where to begin?
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div
                  className={`p-4 rounded-lg ${isLightMode ? 'bg-white/80 border-green-100/40' : 'bg-gray-800/80 border-slate-700/40'} border`}
                >
                  <p className="font-semibold text-sm sm:text-base">CalQuery</p>
                  <p className={`${isLightMode ? 'text-gray-500' : 'text-gray-400'} text-xs sm:text-sm`}>Smart Knowledge Search</p>
                </div>
                <div
                  className={`p-4 rounded-lg ${isLightMode ? 'bg-white/80 border-green-100/40' : 'bg-gray-800/80 border-slate-700/40'} border`}
                >
                  <p className="font-semibold text-sm sm:text-base">CalAssist</p>
                  <p className={`${isLightMode ? 'text-gray-500' : 'text-gray-400'} text-xs sm:text-sm`}>AI Chat Assistant</p>
                </div>
                <div
                  className={`p-4 rounded-lg ${isLightMode ? 'bg-white/80 border-green-100/40' : 'bg-gray-800/80 border-slate-700/40'} border`}
                >
                  <p className="font-semibold text-sm sm:text-base">CalFlow</p>
                  <p className={`${isLightMode ? 'text-gray-500' : 'text-gray-400'} text-xs sm:text-sm`}>Task Automation Assistant</p>
                </div>
                <div
                  className={`p-4 rounded-lg ${isLightMode ? 'bg-white/80 border-green-100/40' : 'bg-gray-800/80 border-slate-700/40'} border`}
                >
                  <p className="font-semibold text-sm sm:text-base">CalBrief</p>
                  <p className={`${isLightMode ? 'text-gray-500' : 'text-gray-400'} text-xs sm:text-sm`}>Contextual Summary Generator</p>
                </div>
                <div
                  className={`p-4 rounded-lg ${isLightMode ? 'bg-white/80 border-green-100/40' : 'bg-gray-800/80 border-slate-700/40'} border`}
                >
                  <p className="font-semibold text-sm sm:text-base">CalLense</p>
                  <p className={`${isLightMode ? 'text-gray-500' : 'text-gray-400'} text-xs sm:text-sm`}>Visual AI Analyzer</p>
                </div>
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Ask me anything..."
                  className={`w-full p-3 rounded-md border ${
                    isLightMode ? 'border-green-200 bg-white text-gray-900' : 'border-slate-700 bg-gray-800/80 text-gray-100'
                  } focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-200`}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer isLightMode={isLightMode} />
      <div
        ref={aiPromptRef}
        className={`fixed bottom-4 right-20 sm:right-24 rounded-lg shadow-lg transition-all duration-300 ${
          isAiPromptMinimized
            ? 'w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center bg-white/70 dark:bg-gray-800/70 backdrop-blur-sm'
            : `w-64 sm:w-80 h-[60vh] sm:h-[75vh] flex flex-col ${cardClasses}`
        } z-50`}
      >
        {isAiPromptMinimized ? (
          <button
            onClick={toggleAiPrompt}
            onKeyDown={(e) => handleKeyDown(e, toggleAiPrompt)}
            className={`ai-prompt-toggle-button p-2 rounded-full hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white ${
              isLightMode ? 'text-emerald-500' : 'text-emerald-300'
            } transition-all duration-200 hover:scale-105 hover:shadow-md`}
            tabIndex={0}
            title="Open AI Assistant"
          >
            <Bot className="h-6 sm:h-8 w-6 sm:w-8" />
          </button>
        ) : (
          <>
            <div
              className={`flex justify-between items-center p-4 border-b ${
                isLightMode ? 'border-green-200/40 bg-white/80' : 'border-slate-700/40 bg-gray-800/80'
              } rounded-t-lg`}
            >
              <h3 className="text-base sm:text-lg font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-500">
                AI Assistant
              </h3>
              <button
                onClick={toggleAiPrompt}
                onKeyDown={(e) => handleKeyDown(e, toggleAiPrompt)}
                className={`p-1 rounded-md hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white ai-prompt-toggle-button ${
                  isLightMode ? 'text-gray-600' : 'text-gray-300'
                } transition-all duration-200 hover:scale-105 hover:shadow-md`}
                title="Close AI Assistant"
                tabIndex={0}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-grow overflow-y-auto p-4 space-y-3">
              <div className="flex justify-start">
                <div
                  className={`p-3 rounded-lg max-w-[80%] ${isLightMode ? 'bg-emerald-50 text-gray-900' : 'bg-emerald-900/20 text-gray-100'} shadow-sm`}
                >
                  Hello! How can I help you today?
                </div>
              </div>
              <div className="flex justify-end">
                <div
                  className={`p-3 rounded-lg max-w-[80%] ${isLightMode ? 'bg-emerald-100 text-gray-900' : 'bg-gray-800/80 text-gray-100'} shadow-sm`}
                >
                  I need to book an appointment.
                </div>
              </div>
              <div className="flex justify-start">
                <div
                  className={`p-3 rounded-lg max-w-[80%] ${isLightMode ? 'bg-emerald-50 text-gray-900' : 'bg-emerald-900/20 text-gray-100'} shadow-sm`}
                >
                  Sure, what kind of appointment are you looking for?
                </div>
              </div>
            </div>
            <div
              className={`p-4 border-t ${isLightMode ? 'border-green-200/40 bg-white/80' : 'border-slate-700/40 bg-gray-800/80'} rounded-b-lg`}
            >
              <input
                type="text"
                placeholder="Ask AI anything..."
                className={`w-full p-3 rounded-md border ${
                  isLightMode ? 'border-green-200 bg-white text-gray-900' : 'border-slate-700 bg-gray-800/80 text-gray-100'
                } focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-200`}
              />
            </div>
          </>
        )}
      </div>
      <div
        ref={supportChatRef}
        className={`fixed bottom-4 right-4 rounded-lg shadow-lg transition-all duration-300 ${
          isSupportChatMinimized ? 'w-12 sm:w-16 h-12 sm:h-16 flex items-center justify-center' : `w-64 sm:w-80 h-80 sm:h-96 flex flex-col ${cardClasses}`
        } z-50`}
      >
        {isSupportChatMinimized ? (
          <button
            onClick={toggleSupportChat}
            onKeyDown={(e) => handleKeyDown(e, toggleSupportChat)}
            className={`support-chat-toggle-button p-2 rounded-full hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white ${
              isLightMode ? 'text-emerald-500' : 'text-emerald-300'
            } transition-all duration-200 hover:scale-105 hover:shadow-md`}
            tabIndex={0}
            title="Open Support Chat"
          >
            <MessageCircle className="h-6 sm:h-8 w-6 sm:w-8" />
          </button>
        ) : (
          <>
            <div
              className={`flex justify-between items-center p-4 border-b ${
                isLightMode ? 'border-green-200/40 bg-white/80' : 'border-slate-700/40 bg-gray-800/80'
              }`}
            >
              <h3 className="text-base sm:text-lg font-semibold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-500">
                Support Chat
              </h3>
              <button
                onClick={toggleSupportChat}
                onKeyDown={(e) => handleKeyDown(e, toggleSupportChat)}
                className={`p-1 rounded-md hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white ${
                  isLightMode ? 'text-gray-600' : 'text-gray-300'
                } transition-all duration-200 hover:scale-105 hover:shadow-md`}
                title="Close Support Chat"
                tabIndex={0}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="flex-grow overflow-y-auto p-4 space-y-3">
              <div className="flex justify-start">
                <div
                  className={`p-3 rounded-lg max-w-[80%] ${isLightMode ? 'bg-emerald-50 text-gray-900' : 'bg-emerald-900/20 text-gray-100'} shadow-sm`}
                >
                  Hi there! How can I help you today?
                </div>
              </div>
              <div className="flex justify-end">
                <div
                  className={`p-3 rounded-lg max-w-[80%] ${isLightMode ? 'bg-emerald-100 text-gray-900' : 'bg-gray-800/80 text-gray-100'} shadow-sm`}
                >
                  I have a question about my recent appointment.
                </div>
              </div>
              <div className="flex justify-start">
                <div
                  className={`p-3 rounded-lg max-w-[80%] ${isLightMode ? 'bg-emerald-50 text-gray-900' : 'bg-emerald-900/20 text-gray-100'} shadow-sm`}
                >
                  Certainly, please tell me more.
                </div>
              </div>
            </div>
            <div
              className={`p-4 border-t ${isLightMode ? 'border-green-200/40 bg-white/80' : 'border-slate-700/40 bg-gray-800/80'} rounded-b-lg`}
            >
              <input
                type="text"
                placeholder="Type your message..."
                className={`w-full p-3 rounded-md border ${
                  isLightMode ? 'border-green-200 bg-white text-gray-900' : 'border-slate-700 bg-gray-800/80 text-gray-100'
                } focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all duration-200`}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AuthLayout;