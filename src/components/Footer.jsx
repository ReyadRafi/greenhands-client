const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-black text-gray-300 mt-16 transition-colors">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h2 className="text-xl font-bold text-white mb-2">GreenHands 🌱</h2>
          <p className="text-sm text-gray-400">
            Bringing communities together for cleanups, plantations, donation
            drives, and more.
          </p>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-1 text-sm">
            <li>Home</li>
            <li>Upcoming Events</li>
            <li>Create Event</li>
          </ul>
        </div>
        <div>
          <h3 className="text-white font-semibold mb-2">Contact</h3>
          <p className="text-sm text-gray-400">contact@greenhands.org</p>
          <p className="text-sm text-gray-400">Dhaka, Bangladesh</p>
        </div>
      </div>
      <div className="text-center text-xs text-gray-500 py-4 border-t border-gray-800">
        © {new Date().getFullYear()} GreenHands. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;