import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollEffects from "@/components/ScrollEffects";
import BackToTop from "@/components/BackToTop";
import NewsletterForm from "@/components/NewsletterForm";

const STORE_URL = "https://chromewebstore.google.com/detail/Pipi/fpenkllimfengpmkkcmpkmcplkboboak";

const FEATURES = [
  { icon: "fa-clock", label: "Set reminders for any URL" },
  { icon: "fa-bell", label: "Receive notifications instantly" },
  { icon: "fa-music", label: "Alarm sound playback" },
  { icon: "fa-magnifying-glass", label: "Bookmark Tabs" },
  { icon: "fa-database", label: "Auto Sync of Data" },
  { icon: "fa-bolt", label: "Tab Optimization" },
];

const STEPS = [
  { title: "Set Reminder", body: "Pick a date & time for your reminder." },
  { title: "Smart Scheduling", body: null },
  { title: "Instant Notification", body: "When time's up you get notified & your tab reopens instantly." },
];

const TESTIMONIALS = [
  { name: "Alex D.", role: "Product Designer", quote: "Finally, a way to declutter my browser without losing important tabs. The reminders are a lifesaver!" },
  { name: "Sarah M.", role: "Developer", quote: "I used to have 50+ tabs open. Now I just schedule them for later. Pipi Tabs is exactly what I needed." },
  { name: "James K.", role: "Student", quote: "The alarm sound feature ensures I actually look at the tab when it reopens. Super helpful for studying." },
];

const FAQS = [
  { q: "Is Pipi Tabs free to use?", a: "Yes! Pipi Tabs is currently completely free to download and use from the Chrome Web Store." },
  { q: "Does it sync across my devices?", a: "Yes, as long as you are signed into your Pipi account, your saved tabs and reminders will sync automatically." },
  { q: 'How do I set a reminder?', a: 'Simply open the extension popup, select the tab you want to save, pick a date and time, and click "Save".' },
  { q: "Is my data private?", a: "Absolutely. Your bookmarks and reminders are stored securely and synced via our backend. We do not sell your data." },
];

export default function LandingPage() {
  return (
    <>
      <ScrollEffects />
      <Nav />

      {/* HERO */}
      <section className="min-h-screen md:relative top-40 md:mb-40 mt-20 md:mt-0 flex flex-col justify-center items-center text-center px-6">
        <div className="fade-up">
          <section className="w-full">
            <section className="z-50 backdrop-blur-lg rounded-xl p-4 w-full">
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-semibold mb-6">Never forget a tab again.</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-10">
                Effortlessly save, group, and manage your bookmarks all in one Extension. Pipi turns your chaotic tabs
                into a structured workflow with just a few clicks.
              </p>
              <a
                href={STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-black text-white px-8 py-3 group rounded-md text-md hover:text-secondary font-bold hover:bg-tabBg transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 dark:hover:bg-black dark:bg-tabBg dark:text-black dark:hover:text-white flex items-center justify-center gap-4 max-w-max mx-auto"
              >
                Add to Chrome
                <i className="fa-brands fa-chrome text-2xl transition-transform duration-300 group-hover:rotate-12" />
              </a>
            </section>

            <section className="transform opacity-40 w-full max-w-4xl mt-20 z-2 pointer-events-none dark:opacity-80">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/asserts/tabs.svg" alt="" />
            </section>
          </section>
        </div>
      </section>

      {/* FEATURES */}
      <section className="md:p-10">
        <section id="features" className="py-24 transition-colors duration-300 md:relative md:top-40 bg-abstract">
          <div className="max-w-5xl mx-auto px-6">
            <h3 className="text-3xl font-semibold text-center mb-12 fade-up">✨ Features</h3>
            <div className="grid md:grid-cols-3 gap-10 text-center">
              {FEATURES.map((f) => (
                <div
                  key={f.label}
                  className="fade-up bg-black/60 backdrop-blur-lg text-white dark:bg-gray-800/60 p-6 rounded-2xl shadow-sm border border-white/20 dark:border-gray-700/50 hover:shadow-md transition flex flex-col items-center glass-card"
                >
                  <div className="w-12 h-12 bg-gray-50 dark:bg-gray-700 rounded-full flex items-center justify-center text-xl mb-4 text-gray-800 dark:text-white animate-icon-ripple">
                    <i className={`fa-solid ${f.icon}`} />
                  </div>
                  <p className="font-medium">{f.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how"
        className="py-24 bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm border-t border-gray-100 dark:border-gray-800 transition-colors duration-300 md:relative top-40"
      >
        <div className="max-w-6xl mx-auto px-6 fade-up text-center">
          <h3 className="text-3xl font-semibold mb-8">🚀 How It Works</h3>
          <div className="relative max-w-5xl mx-auto mt-12">
            <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700" />
            {STEPS.map((step, i) => {
              const left = i % 2 === 0;
              return (
                <div key={step.title} className={`relative flex items-center justify-between ${i < STEPS.length - 1 ? "mb-12" : ""}`}>
                  {left ? (
                    <div className="w-full md:w-5/12 pl-12 md:pl-0 md:text-right relative">
                      <div className="hidden md:block absolute top-1/2 left-full w-[20%] h-0.5 bg-gray-200 dark:bg-gray-700 -translate-y-1/2" />
                      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-6 rounded-xl shadow-sm border border-white/20 dark:border-gray-700/50 hover:shadow-md transition glass-card">
                        <h4 className="text-lg font-semibold mb-2 dark:text-white">{step.title}</h4>
                        {step.body && <p className="text-gray-600 dark:text-gray-400">{step.body}</p>}
                        {step.title === "Smart Scheduling" && (
                          <p className="text-gray-600 dark:text-gray-400">
                            Pipi schedules it using <code>chrome.alarms</code>.
                          </p>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className="hidden md:block w-5/12" />
                  )}

                  <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 flex items-center justify-center">
                    <div className="w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center text-white dark:text-black font-bold z-10 shadow-lg relative">
                      {i + 1}
                      <div className="absolute inset-0 w-full h-full bg-black dark:bg-white rounded-full animate-pulse -z-10 opacity-50" />
                    </div>
                  </div>

                  {left ? (
                    <div className="hidden md:block w-5/12" />
                  ) : (
                    <div className="w-full md:w-5/12 pl-12 md:pl-0 text-left relative md:left-4">
                      <div className="hidden md:block absolute top-1/2 right-full w-[20%] h-0.5 bg-gray-200 dark:bg-gray-700 -translate-y-1/2" />
                      <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-6 rounded-xl shadow-sm border border-white/20 dark:border-gray-700/50 hover:shadow-md transition glass-card">
                        <h4 className="text-lg font-semibold mb-2 dark:text-white">{step.title}</h4>
                        {step.body && <p className="text-gray-600 dark:text-gray-400">{step.body}</p>}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section
        id="testimonials"
        className="py-24 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300 md:relative top-40"
      >
        <div className="max-w-6xl mx-auto px-6 fade-up">
          <h3 className="text-3xl font-semibold text-center mb-12">❤️ Loved by Early Users</h3>
          <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 no-scrollbar -mx-6 px-6 md:mx-0 md:px-0">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="snap-center shrink-0 w-[70vw] md:w-96 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-6 rounded-2xl shadow-sm border border-white/20 dark:border-gray-700/50 hover:shadow-md transition glass-card"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-500 dark:text-gray-300">
                    <i className="fa-solid fa-user" />
                  </div>
                  <div>
                    <p className="font-semibold dark:text-white">{t.name}</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">{t.role}</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">&quot;{t.quote}&quot;</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="py-24 bg-white/30 dark:bg-gray-900/30 backdrop-blur-sm border-t border-gray-100 dark:border-gray-800 transition-colors duration-300 md:relative top-40"
      >
        <div className="max-w-4xl mx-auto px-6 fade-up">
          <h3 className="text-3xl font-semibold text-center mb-12">🤔 Frequently Asked Questions</h3>
          <div className="space-y-6">
            {FAQS.map((item) => (
              <div
                key={item.q}
                className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-md p-6 rounded-xl shadow-sm border border-white/20 dark:border-gray-700/50 hover:shadow-md transition glass-card"
              >
                <h4 className="text-lg font-semibold mb-2 dark:text-white">{item.q}</h4>
                <p className="text-gray-600 dark:text-gray-300">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section
        id="newsletter"
        className="py-24 border-t border-gray-100 dark:border-gray-800 transition-colors duration-300 md:relative top-40"
      >
        <div className="max-w-md mx-auto px-6 text-center fade-up">
          <h3 className="text-3xl font-semibold mb-6">Stay Updated</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-8">
            Subscribe to our newsletter for the latest features, productivity tips, and updates.
          </p>
          <NewsletterForm />
        </div>
      </section>

      <BackToTop />
      <Footer />
    </>
  );
}
