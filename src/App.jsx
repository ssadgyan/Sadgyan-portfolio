import { motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

/* ---------- Global reveal animation config ---------- */
const reveal = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};
/* ---------- Rotating Tagline ---------- */
const taglines = [
  "Full Stack Developer",
  "AI / Machine Learning",
  "Problem Solver",
  "Open Source Learner",
];

function DynamicTagline() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % taglines.length);
    }, 2000); // changes every 2 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.span
      key={taglines[index]}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-primary-600 dark:text-primary-300 font-semibold"
    >
      {taglines[index]}
    </motion.span>
  );
}

/* ---------- Animations ---------- */
const fadeIn = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

/* ---------- WhatsApp FAB ---------- */
const WHATSAPP_NUMBER = "+919044351175"; // change if needed
function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER.replace("+", "")}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 shadow-lg"
      title="Chat on WhatsApp"
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-7 h-7 fill-white">
        <path d="M19.11 17.42c-.26-.13-1.53-.75-1.77-.84-.24-.09-.41-.13-.58.13-.17.26-.66.84-.81 1.01-.15.17-.3.19-.56.06-.26-.13-1.07-.39-2.04-1.24-.75-.67-1.26-1.49-1.41-1.75-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.45.13-.15.17-.26.26-.43.09-.17.04-.32-.02-.45-.06-.13-.58-1.4-.8-1.91-.21-.51-.43-.44-.58-.45l-.5-.01c-.17 0-.45.06-.69.32-.24.26-.9.88-.9 2.15 0 1.27.92 2.5 1.05 2.67.13.17 1.82 2.78 4.42 3.89.62.27 1.1.43 1.48.55.62.2 1.19.17 1.64.1.5-.07 1.53-.62 1.75-1.22.22-.6.22-1.12.15-1.22-.06-.1-.23-.16-.49-.29z" />
        <path d="M26.7 5.3C23.9 2.5 20.2 1 16.2 1 8.5 1 2.2 7.3 2.2 15c0 2.4.6 4.7 1.7 6.7L2 31l9.5-1.8c1.9 1 4.1 1.6 6.5 1.6 7.7 0 14-6.3 14-14 0-3.9-1.5-7.6-4.3-10.5zM16 28.2c-2.1 0-4.1-.6-5.8-1.6l-.4-.2-5.6 1.1 1.1-5.5-.3-.5c-1.1-1.9-1.6-4-1.6-6.1C3.5 8.3 9.1 2.8 16.2 2.8c3.2 0 6.2 1.2 8.4 3.5 2.3 2.3 3.5 5.3 3.5 8.5-.1 6.6-5.4 11.9-12.1 11.9z" />
      </svg>
    </a>
  );
}
/* ---------- Scroll Progress Bar ---------- */
function ScrollProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 20,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed left-0 top-0 right-0 h-1 origin-left z-[60] bg-primary-600"
    />
  );
}

/* ---------- Contact Form (AJAX) ---------- */
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
        body: formData,
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
  <motion.section
    id={id}
    className="container-max mx-auto px-6 py-16 scroll-mt-24"
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
    variants={reveal}
  >
    <h2 className="text-3xl md:text-4xl font-bold text-primary-800 dark:text-primary-300 mb-6">
      {title}
    </h2>
    <div className="text-slate-700 dark:text-slate-300">{children}</div>
  </motion.section>
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
              onClick={() => setDark((d) => !d)}
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

        {/* LEFT SIDE TEXT */}
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-extrabold leading-tight text-primary-900 dark:text-primary-200"
          >
            Hi, I'm Sadgyan Singh 👋
            <br />
            <DynamicTagline />
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
              href="https://github.com/SadgyanSingh"
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
            <a href="/resume.pdf" download className="link-btn">
              Download Resume
            </a>
          </div>
        </div>

        {/* RIGHT SIDE IMAGE WITH GLOW */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center hero-glow"
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
        <motion.ul
          className="grid grid-cols-2 md:grid-cols-3 gap-3"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            show: {
              opacity: 1,
              transition: { staggerChildren: 0.08 }
            }
          }}
        >
          {[
            "Java", "Python", "C", "C++", "MERN Stack", "MongoDB", "Express",
            "React", "Node.js", "AWS", "Git", "NumPy", "Pandas", "Streamlit",
            "Plotly", "Machine Learning", "Vercel"
          ].map((skill) => (
            <motion.li
              key={skill}
              variants={reveal}
              whileHover={{ scale: 1.08 }}
              className="px-4 py-2 rounded-xl border border-slate-300 dark:border-slate-600 
                   bg-white/60 dark:bg-slate-800/40 backdrop-blur cursor-default"
            >
              {skill}
            </motion.li>
          ))}
        </motion.ul>
      </Section>


      {/* PROJECTS */}
      <Section id="projects" title="Projects">
        <div className="grid md:grid-cols-2 gap-6">

          <motion.div
            whileHover={{ scale: 1.04, rotateX: 4, rotateY: -4 }}
            transition={{ type: "spring", stiffness: 160, damping: 12 }}
            className="card"
          >
            <h3 className="font-semibold text-lg">Handyman (Home Service Platform)</h3>
            <p className="mt-2 text-sm">MERN-based platform for booking home repair & maintenance services.</p>
            <div className="mt-3 text-sm text-primary-700 dark:text-primary-300">Tech: MERN, MongoDB, AWS</div>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.04, rotateX: 4, rotateY: -4 }}
            transition={{ type: "spring", stiffness: 160, damping: 12 }}
            className="card"
          >
            <h3 className="font-semibold text-lg">FraudGuardian (Credit Card Fraud Detection)</h3>
            <a href="https://fraudgradian.vercel.app/" target="_blank" rel="noreferrer"
              className="text-sm underline text-primary-700 dark:text-primary-300">
              fraudgradian.vercel.app
            </a>
            <p className="mt-2 text-sm">ML-based system to detect fraudulent transactions. Led a team of 3.</p>
            <div className="mt-3 text-sm text-primary-700 dark:text-primary-300">Tech: Python, Jupyter, MERN, MongoDB, Render, Vercel</div>
          </motion.div>

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

      <WhatsAppButton />
    </div>
  );
}