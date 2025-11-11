import { motion } from "framer-motion";

const Section = ({ id, title, children }) => (
  <section id={id} className="container-max mx-auto px-6 py-16">
    <h2 className="text-3xl md:text-4xl font-bold text-primary-800 mb-6">{title}</h2>
    <div className="text-slate-700">{children}</div>
  </section>
);

export default function App() {
  return (
    <div className="min-h-screen text-slate-900 gradient-bg">
      {/* NAV */}
      <header className="sticky top-0 backdrop-blur bg-white/70 border-b border-slate-200 z-50">
        <nav className="container-max mx-auto px-6 py-3 flex items-center justify-between">
          <span className="font-extrabold tracking-tight text-primary-800">Sadgyan Singh</span>
          <div className="hidden md:flex gap-6 text-sm">
            <a href="#about" className="hover:text-primary-700">About</a>
            <a href="#skills" className="hover:text-primary-700">Skills</a>
            <a href="#projects" className="hover:text-primary-700">Projects</a>
            <a href="#hackathons" className="hover:text-primary-700">Hackathons</a>
            <a href="#contact" className="hover:text-primary-700">Contact</a>
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
            className="text-4xl md:text-5xl font-extrabold leading-tight text-primary-900"
          >
            Full Stack Developer <span className="text-primary-600">&nbsp;| AI/ML</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-4 text-lg text-slate-700 max-w-2xl"
          >
            I develop modern web apps powered by machine learning.
          </motion.p>

          <div className="mt-6 flex gap-3">
            <a
              href="https://github.com/ssadgyan"
              target="_blank"
              className="primary-btn"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/sadgyan-singh-789b8b253"
              target="_blank"
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
            className="w-56 h-67 rounded-full object-cover border-4 border-white shadow-lg"
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
            <div className="mt-3 text-sm text-primary-700">Tech: MERN, MongoDB, AWS</div>
          </div>
          <div className="card">
            <h3 className="font-semibold text-lg">FraudGuardian (Credit Card Fraud Detection)</h3>
            <a href="https://fraudgradian.vercel.app/" target="_blank" className="text-sm underline text-primary-700">
              fraudgradian.vercel.app
            </a>
            <p className="mt-2 text-sm">ML-based system to detect fraudulent transactions. Led a team of 3.</p>
            <div className="mt-3 text-sm text-primary-700">Tech: Python, Jupyter, MERN, MongoDB, Render, Vercel</div>
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
        <p className="text-sm">Gurugram, Haryana · Phone: 9044351175</p>
        <p className="text-sm">Email: dsvvsadgyansinghindo@gmail.com / 2501940046@krmu.edu.in</p>
      </Section>

      <footer className="py-8 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Sadgyan Singh. All rights reserved.
      </footer>
    </div>
  );
}
