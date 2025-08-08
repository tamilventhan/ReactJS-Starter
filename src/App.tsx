import { useState, useEffect, useRef } from 'react';
import AuthLayout from './components/layout/AuthLayout';
import GuestLayout from './components/layout/GuestLayout';
import type { NavItem, Notification } from './components/layout/Constants';

const App: React.FC = () => {
  const [isLightMode, setIsLightMode] = useState<boolean>(true);
  const [isSidebarMinimized, setIsSidebarMinimized] = useState<boolean>(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState<boolean>(false);
  const [showNotifications, setShowNotifications] = useState<boolean>(false);
  const [isAiPromptMinimized, setIsAiPromptMinimized] = useState<boolean>(true);
  const [isSupportChatMinimized, setIsSupportChatMinimized] = useState<boolean>(true);
  const [hoveredMenuItem, setHoveredMenuItem] = useState<string | null>(null);
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({});
  const [leaveTimeout, setLeaveTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 1, message: 'Your appointment is confirmed for tomorrow at 10 AM.', time: '2 hours ago',
      timestamp: ''
    },
    {
      id: 2, message: 'New health report available.', time: '5 hours ago',
      timestamp: ''
    },
  ]);
  const [isAuthenticated] = useState<boolean>(true);

  const userDropdownRef = useRef<HTMLDivElement | null>(null);
  const userDropdownToggleRef = useRef<HTMLButtonElement | null>(null);
  const notificationRef = useRef<HTMLDivElement | null>(null);
  const notificationToggleRef = useRef<HTMLButtonElement | null>(null);
  const aiPromptRef = useRef<HTMLDivElement | null>(null);
  const supportChatRef = useRef<HTMLDivElement | null>(null);

  const toggleTheme = () => setIsLightMode(prev => !prev);

  const toggleSidebar = () => {
    setIsSidebarMinimized(prev => !prev);
    setHoveredMenuItem(null);
    setOpenSubmenus({});
    if (leaveTimeout) {
      clearTimeout(leaveTimeout);
      setLeaveTimeout(null);
    }
  };

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(prev => !prev);
    setShowNotifications(false);
    setIsAiPromptMinimized(true);
    setIsSupportChatMinimized(true);
  };

  const toggleNotifications = () => {
    setShowNotifications(prev => !prev);
    setIsUserDropdownOpen(false);
    setIsAiPromptMinimized(true);
    setIsSupportChatMinimized(true);
  };

  const toggleAiPrompt = () => {
    setIsAiPromptMinimized(prev => !prev);
    setShowNotifications(false);
    setIsUserDropdownOpen(false);
    setIsSupportChatMinimized(true);
  };

  const toggleSupportChat = () => {
    setIsSupportChatMinimized(prev => !prev);
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
      [label]: !prev[label],
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

  useEffect(() => {
    document.documentElement.classList.toggle('dark', !isLightMode);
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
        !event.target.closest('.ai-prompt-toggle-button') &&
        !isAiPromptMinimized
      ) {
        setIsAiPromptMinimized(true);
      }

      if (
        supportChatRef.current &&
        !supportChatRef.current.contains(event.target as Node) &&
        event.target instanceof Element &&
        !event.target.closest('.support-chat-toggle-button') &&
        !isSupportChatMinimized
      ) {
        setIsSupportChatMinimized(true);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserDropdownOpen, showNotifications, isAiPromptMinimized, isSupportChatMinimized]);

  const userName = 'Lorem ipsum';
  const userInitials = userName
    .split(' ')
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return isAuthenticated ? (
    <AuthLayout
      isLightMode={isLightMode}
      isSidebarMinimized={isSidebarMinimized}
      toggleTheme={toggleTheme}
      toggleSidebar={toggleSidebar}
      toggleUserDropdown={toggleUserDropdown}
      toggleNotifications={toggleNotifications}
      toggleAiPrompt={toggleAiPrompt}
      toggleSupportChat={toggleSupportChat}
      markAllNotificationsAsRead={markAllNotificationsAsRead}
      toggleSubmenu={toggleSubmenu}
      handleMouseEnter={handleMouseEnter}
      handleMouseLeave={handleMouseLeave}
      handleKeyDown={handleKeyDown}
      userDropdownRef={userDropdownRef}
      userDropdownToggleRef={userDropdownToggleRef}
      notificationRef={notificationRef}
      notificationToggleRef={notificationToggleRef}
      aiPromptRef={aiPromptRef}
      supportChatRef={supportChatRef}
      notifications={notifications}
      userName={userName}
      userInitials={userInitials}
      showNotifications={showNotifications}
      isUserDropdownOpen={isUserDropdownOpen}
      isAiPromptMinimized={isAiPromptMinimized}
      isSupportChatMinimized={isSupportChatMinimized}
      hoveredMenuItem={hoveredMenuItem}
      openSubmenus={openSubmenus}
    />
  ) : (
    <GuestLayout
      isLightMode={isLightMode}
      toggleTheme={toggleTheme}
      toggleAiPrompt={toggleAiPrompt}
      toggleSupportChat={toggleSupportChat}
      handleKeyDown={handleKeyDown}
      aiPromptRef={aiPromptRef}
      supportChatRef={supportChatRef}
      isAiPromptMinimized={isAiPromptMinimized}
      isSupportChatMinimized={isSupportChatMinimized}
    />
  );
};

export default App;