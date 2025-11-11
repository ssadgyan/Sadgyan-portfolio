import { motion } from "framer-motion";
import { useEffect, useState } from "react";

/* ---------- Contact Form (AJAX, stays on page) ---------- */
function ContactForm() {
  const [status, setStatus] = useState(null); // "ok" | "error" | null
  const [loading, setLoading] = useState(false);

  async function onSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    const formData = new FormData(e.currentTarget);
    formData.append("access_key", "6d4be4ff-94e7-4f34-9751-8bf6ad0fe7cb");
    formData.append("subject", "New message from Portfolio Contact Form");
    formData.append("from_name", "Sadgyan Portfolio");

    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      const data = await res.json();
      if (data.success) {
        setStatus("ok");
        e.currentTarget.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3 max-w-xl">
      <input name="name" placeholder="Your Name" className="border rounded-lg px-3 py-2" required />
      <input name="email" type="email" placeholder="Your Email" className="border rounded-lg px-3 py-2" required />
      <textarea name="message" placeholder="Your Message" className="border rounded-lg px-3 py-2 min-h-[120px]" required />
      <button
        disabled={loading}
        className="px-4 py-2 rounded-xl bg-primary-600 text-white hover:bg-primary-700 disabled:opacity-60"
      >
        {loading ? "Sending..." : "Send Message"}
      </button>
      {status === "ok" && <p className="text-green-600 text-sm">✅ Thanks! Your message was sent.</p>}
      {status === "error" && <p className="text-red-600 text-sm">❌ Something went wrong. Try again.</p>}
    </form>
  );
}

/* ---------- Section wrapper ---------- */
const Section = ({ id, title, children }) => (
  <section id={id} className="container-max mx-auto px-6 py-16">
    <h2 className="text-3xl md:text-4xl font-bold text-primary-800 dark:text-primary-300 mb-6">{title}</h2>
    <div className="text-slate-700 dark:text-slate-300">{children}</div>
  </section>
);

export default function App() {
  // Dark mode state + effect to toggle .dark on <html>
  const [dark, setDark] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className="min-h-screen text-slate-900 dark:text-slate-200 gradient-bg">
      {/* NAV */}
      <header className="sticky top-0 backdrop-blur bg-white/70 dark:bg-slate-900/70 border-b border-slate-200 dark:border-slate-700 z-50">
        <nav className="container-max mx-auto px-6 py-3 flex items-center justify-between">
          <span className="font-extrabold tracking-tight text-primary-800 dark:text-primary-300">Sadgyan Singh</span>
          <div className="flex items-center gap-4 text-sm">
            <a href="#about" className="hover:text-primary-700 dark:hover:text-primary-300 hidden md:inline">About</a>
            <a href="#skills" className="hover:text-primary-700 dark:hover:text-primary-300 hidden md:inline">Skills</a>
            <a href="#projects" className="hover:text-primary-700 dark:hover:text-primary-300 hidden md:inline">Projects</a>
            <a href="#hackathons" className="hover:text-primary-700 dark:hover:text-primary-300 hidden md:inline">Hackathons</a>
            <a href="#contact" className="hover:text-primary-700 dark:hover:text-primary-300 hidden md:inline">Contact</a>
            <button
              onClick={() => setDark(d => !d)}
              className="rounded-lg px-3 py-1 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200"
              title="Toggle dark mode"
            >
              {dark ? "Light" : "Dark"}
            </button>
          </div>
        </nav>
      </header>

      {/* HERO */}
      <section className="container-max mx-auto px-6 pt-16 pb-10 grid md:grid-cols-[1.2fr,0.8fr] gap-10 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold leading-tight text-primary-900 dark:text-primary-200"
          >
            Full Stack Developer <span className="text-primary-600">&nbsp;| AI/ML</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 text-lg text-slate-700 dark:text-slate-300 max-w-2xl"
          >
            I develop modern web apps powered by machine learning.
          </motion.p>

          <div className="mt-6 flex gap-3">
            <a
              href="https://github.com/ssadgyan"
              target="_blank"
              rel="noreferrer"
              className="primary-btn"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/sadgyan-singh-789b8b253"
              target="_blank"
              rel="noreferrer"
              className="link-btn"
            >
              LinkedIn
            </a>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <img
            src="/avatar.png"
            alt="Sadgyan Singh"
            className="w-56 h-65 rounded-full object-cover border-4 border-white shadow-lg"
          />
        </motion.div>
      </section>

      {/* ABOUT */}
      <Section id="about" title="About">
        <p>
          I am a passionate Full Stack Developer and AI/ML enthusiast who enjoys building scalable web applications and
          solving real-world problems through code. I work primarily with the MERN stack, Python, and data tools like
          Pandas, NumPy, Streamlit, and Plotly.
        </p>
      </Section>

      {/* SKILLS */}
      <Section id="skills" title="Skills">
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-2 list-disc list-inside">
          <li>Java, Python, C, C++</li>
          <li>MERN (MongoDB, Express, React, Node)</li>
          <li>AWS, MongoDB Atlas</li>
          <li>Pandas, NumPy, Plotly, Streamlit</li>
          <li>Machine Learning Basics</li>
          <li>Git, GitHub, Vercel</li>
        </ul>
      </Section>

      {/* PROJECTS */}
      <Section id="projects" title="Projects">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="card">
            <h3 className="font-semibold text-lg">Handyman (Home Service Platform)</h3>
            <p className="mt-2 text-sm">MERN-based platform for booking home repair & maintenance services.</p>
            <div className="mt-3 text-sm text-primary-700 dark:text-primary-300">Tech: MERN, MongoDB, AWS</div>
          </div>
          <div className="card">
            <h3 className="font-semibold text-lg">FraudGuardian (Credit Card Fraud Detection)</h3>
            <a href="https://fraudgradian.vercel.app/" target="_blank" rel="noreferrer" className="text-sm underline text-primary-700 dark:text-primary-300">
              fraudgradian.vercel.app
            </a>
            <p className="mt-2 text-sm">ML-based system to detect fraudulent transactions. Led a team of 3.</p>
            <div className="mt-3 text-sm text-primary-700 dark:text-primary-300">Tech: Python, Jupyter, MERN, MongoDB, Render, Vercel</div>
          </div>
        </div>
      </Section>

      {/* HACKATHONS */}
      <Section id="hackathons" title="Hackathons & Achievements">
        <ul className="list-disc list-inside space-y-1">
          <li>Hackathon 6.0 Jaipur</li>
          <li>Build and Beyond</li>
          <li>Code Canvas</li>
          <li>Kaggle 5-Day Challenge</li>
          <li>4th rank in BCA Department</li>
        </ul>
      </Section>

      {/* CONTACT */}
      <Section id="contact" title="Contact">
        <ContactForm />
        <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
          Gurugram, Haryana · Phone: 9044351175 · Email: dsvvsadgyansinghindo@gmail.com , 2501940046@krmu.edu.in
        </p>
      </Section>

      <footer className="py-8 text-center text-xs text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} Sadgyan Singh. All rights reserved.
      </footer>
    </div>
  );
}
