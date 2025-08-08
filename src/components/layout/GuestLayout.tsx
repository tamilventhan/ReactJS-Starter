import type { RefObject } from 'react';
import Footer from './Footer';
import { Home, Bot, MessageCircle, X } from 'lucide-react';

interface GuestLayoutProps {
  isLightMode: boolean;
  toggleTheme: () => void;
  toggleAiPrompt: () => void;
  toggleSupportChat: () => void;
  handleKeyDown: (e: React.KeyboardEvent, action: () => void) => void;
  aiPromptRef: RefObject<HTMLDivElement | null>;
  supportChatRef: RefObject<HTMLDivElement | null>;
  isAiPromptMinimized: boolean;
  isSupportChatMinimized: boolean;
}

const GuestLayout: React.FC<GuestLayoutProps> = ({
  isLightMode,
  toggleTheme,
  toggleAiPrompt,
  toggleSupportChat,
  handleKeyDown,
  aiPromptRef,
  supportChatRef,
  isAiPromptMinimized,
  isSupportChatMinimized,
}) => {
  const themeClasses = isLightMode
    ? 'bg-gradient-to-b from-gray-50 to-green-50 text-gray-900'
    : 'bg-gradient-to-b from-gray-900 to-slate-800 dark:bg-gradient-to-b dark:from-gray-900 dark:to-slate-800 text-gray-100';

  const cardClasses = isLightMode
    ? 'bg-white/80 text-gray-900 shadow-lg border backdrop-blur-sm border-green-100/40'
    : 'bg-gray-800/80 text-gray-100 shadow-lg border backdrop-blur-sm border-slate-700/40';

  const primaryButtonClasses =
    'bg-gradient-to-r from-emerald-500 to-teal-500 hover:bg-gradient-to-r hover:from-teal-500 hover:to-emerald-500 hover:text-white text-white font-semibold py-2 px-4 rounded-md transition-all duration-200 shadow-sm hover:scale-105 hover:shadow-md';

  return (
    <div className={`min-h-screen flex flex-col ${themeClasses} ${isLightMode ? '' : 'dark'} font-['Inter',-apple-system,BlinkMacSystemFont,'Segoe_UI',Roboto,sans-serif]`}>
      <header
        className={`fixed top-0 left-0 right-0 z-50 flex justify-between items-center p-4 sm:p-6 ${
          isLightMode ? 'bg-white/70' : 'bg-gray-900/80'
        } backdrop-blur-md shadow-xs transition-colors duration-300`}
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
        </div>
        <div className="flex items-center space-x-4 sm:space-x-6">
          <button
            onClick={() => console.log('Home clicked')}
            onKeyDown={(e) => handleKeyDown(e, () => console.log('Home clicked'))}
            className={`p-2 rounded-md hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white ${
              isLightMode ? 'text-gray-600' : 'text-gray-300'
            } transition-all duration-200 hover:scale-105 hover:shadow-md`}
            title="Home"
            tabIndex={0}
          >
            <Home className="h-6 w-6" />
          </button>
          <button
            onClick={toggleTheme}
            onKeyDown={(e) => handleKeyDown(e, toggleTheme)}
            className={`p-2 rounded-md ${isLightMode ? 'bg-green-100/60' : 'bg-slate-800/60'} hover:bg-gradient-to-r hover:from-emerald-500 hover:to-teal-500 hover:text-white transition-all duration-200 hover:scale-105 hover:shadow-md`}
            tabIndex={0}
            title={isLightMode ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
          >
            {isLightMode ? (
              <svg className={`h-5 w-5 ${isLightMode ? 'text-gray-600' : 'text-gray-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            ) : (
              <svg className={`h-5 w-5 ${isLightMode ? 'text-gray-600' : 'text-gray-300'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                />
              </svg>
            )}
          </button>
        </div>
      </header>
      <div className="flex flex-1 pt-20">
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto h-[calc(100vh-5rem)]">
          <main className="space-y-6 mb-12">
            <section className="mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-500 to-teal-500">
                Welcome, Guest!
              </h2>
              <div className="flex items-center">
                <p className={`${isLightMode ? 'text-gray-600' : 'text-gray-400'} mr-2 text-xs sm:text-sm`}>
                  Log in to access personalized health services.
                </p>
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
                Get Started
              </h3>
              <p className={`${isLightMode ? 'text-gray-600' : 'text-gray-400'} mb-4 text-xs sm:text-sm`}>
                Sign up or log in to book appointments, track health metrics, and more.
              </p>
              <div className="flex justify-between items-center space-x-2">
                <button
                  className={primaryButtonClasses}
                  onClick={() => console.log('Login clicked')}
                  onKeyDown={(e) => handleKeyDown(e, () => console.log('Login clicked'))}
                  tabIndex={0}
                >
                  Login
                </button>
                <button
                  className={primaryButtonClasses}
                  onClick={() => console.log('Sign Up clicked')}
                  onKeyDown={(e) => handleKeyDown(e, () => console.log('Sign Up clicked'))}
                  tabIndex={0}
                >
                  Sign Up
                </button>
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
                  I need information about your services.
                </div>
              </div>
              <div className="flex justify-start">
                <div
                  className={`p-3 rounded-lg max-w-[80%] ${isLightMode ? 'bg-emerald-50 text-gray-900' : 'bg-emerald-900/20 text-gray-100'} shadow-sm`}
                >
                  Our platform offers appointment booking, health tracking, and AI assistance. Sign up to get started!
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
                  Hi there! How can I assist you today?
                </div>
              </div>
              <div className="flex justify-end">
                <div
                  className={`p-3 rounded-lg max-w-[80%] ${isLightMode ? 'bg-emerald-100 text-gray-900' : 'bg-gray-800/80 text-gray-100'} shadow-sm`}
                >
                  I have a question about signing up.
                </div>
              </div>
              <div className="flex justify-start">
                <div
                  className={`p-3 rounded-lg max-w-[80%] ${isLightMode ? 'bg-emerald-50 text-gray-900' : 'bg-emerald-900/20 text-gray-100'} shadow-sm`}
                >
                  Click the Sign Up button above to create an account!
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

export default GuestLayout;