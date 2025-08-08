interface FooterProps {
  isLightMode: boolean;
}

const Footer: React.FC<FooterProps> = ({ isLightMode }) => {
  return (
    <footer className={`fixed bottom-0 left-0 right-0 py-4 text-center ${isLightMode ? 'bg-gradient-to-r from-green-50 to-green-100 text-gray-600' : 'bg-gradient-to-r from-gray-800 to-slate-900 dark:bg-gradient-to-r dark:from-gray-800 dark:to-slate-900 text-gray-300'} text-xs sm:text-sm z-30`}>
      <p>&copy; {new Date().getFullYear()} ALADRIOA. All rights reserved.</p>
    </footer>
  );
};

export default Footer;