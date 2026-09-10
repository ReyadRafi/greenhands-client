import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";

const features = [
  {
    icon: "🌍",
    title: "Community Driven",
    desc: "Every event is created and run by people in your own community, not a faceless organization.",
  },
  {
    icon: "📅",
    title: "Easy to Join",
    desc: "Browse upcoming events, filter by type, and join with a single click once you're logged in.",
  },
  {
    icon: "🩸",
    title: "Beyond the Environment",
    desc: "From beach cleanups to blood donation camps and elderly care visits — all social good, one platform.",
  },
  {
    icon: "📊",
    title: "Track Your Impact",
    desc: "Keep a record of every event you've joined or organized, all in one personal dashboard.",
  },
];

const galleryImages = [
  "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=600&q=80",
  "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5?w=600&q=80",
  "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&q=80",
  "https://images.unsplash.com/photo-1607472829760-2a316073c5c9?w=600&q=80",
  "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&q=80",
  "https://images.unsplash.com/photo-1593113646773-028c64a8f1b8?w=600&q=80",
];

const Home = () => {
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    e.target.reset();
    toast.success("Thanks for subscribing! (Demo only — no email sent)");
  };

  return (
    <div>
      {/* Banner Section */}
      <section className="bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-10">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex-1 text-center md:text-left"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight mb-5">
              Small Acts,{" "}
              <span className="text-green-700">Growing Together</span>
            </h1>
            <p className="text-gray-600 text-lg mb-8 max-w-xl">
              GreenHands connects neighbors who want to give back — cleanups,
              plantations, donation drives, and more. Find an event near you
              or start your own.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <Link
                to="/upcoming-events"
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition"
              >
                Browse Events
              </Link>
              <Link
                to="/register"
                className="border border-green-600 text-green-700 px-6 py-3 rounded-lg font-medium hover:bg-green-50 transition"
              >
                Get Started
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1"
          >
            <img
              src="https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=800&q=80"
              alt="Community volunteers"
              className="rounded-3xl shadow-lg w-full h-80 object-cover"
            />
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-20">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-3">
          Why GreenHands?
        </h2>
        <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
          A simple platform built to make community service easier to find
          and easier to organize.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm hover:shadow-md transition text-center"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                {f.title}
              </h3>
              <p className="text-sm text-gray-500">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-3">
            Moments From Our Events
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
            A glimpse into what community members have accomplished together.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((src, i) => (
              <motion.img
                key={i}
                src={src}
                alt={`Community event ${i + 1}`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="w-full h-48 object-cover rounded-xl shadow-sm hover:scale-[1.02] transition-transform"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Stay in the Loop
        </h2>
        <p className="text-gray-500 mb-8 max-w-xl mx-auto">
          Subscribe to get notified about new events happening near you.
        </p>
        <form
          onSubmit={handleNewsletterSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <input
            type="email"
            required
            placeholder="Enter your email"
            className="flex-grow px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition"
          >
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
};

export default Home;