import React from "react";
import Head from "next/head";
import Link from "next/link";

const AboutUs = () => {
  return (
    <>
      <Head>
        <title>About Us | Converso - Sri Lanka's AI-Powered LMS</title>
        <meta
          name="description"
          content="Converso is Sri Lanka’s most innovative AI-powered LMS platform for English-speaking learners. Currently available only in English, our mission is to make smart education accessible for O/L and A/L students across Sri Lanka."
        />
        <meta
          name="keywords"
          content="LMS Sri Lanka, AI education Sri Lanka, O/L A/L online learning, English LMS Sri Lanka, AI tutor Sri Lanka, education SaaS Sri Lanka"
        />
      </Head>

      <section className="bg-white text-gray-800 px-6 md:px-12 lg:px-24 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Language Disclaimer */}
          <div className="bg-yellow-100 text-yellow-800 font-medium px-4 py-3 rounded mb-10 text-center">
            🎙️ Dixi is currently available in <strong>English only</strong>.
            Sinhala & Tamil versions are under development.
          </div>

          {/* Hero Header */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center text-gray-900">
            About Dixi – Sri Lanka’s Smartest AI-Powered Learning Platform
          </h1>
          <p className="text-lg text-gray-600 text-center mb-12">
            Dixi is Sri Lanka’s first AI-powered LMS designed exclusively for
            English-speaking students and educators. We offer personalized,
            voice-assisted learning aligned with the national O/L syllabus, all
            through an intelligent, easy-to-use platform.
          </p>

          {/* Mission */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold mb-4">🎯 Our Mission</h2>
            <p className="text-gray-700 leading-relaxed">
              Our mission is to modernize education across Sri Lanka by
              combining artificial intelligence with curriculum-aligned, digital
              learning. We empower every Englishspeaking student whether in
              Colombo, Kandy, or Galle with access to an AI tutor, smart
              revision tools, and voice-based learning assistance.
            </p>
          </div>

          {/* Unique Features */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold mb-4">💡 Why Converso?</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-3">
              <li>
                🇱🇰 Built for Sri Lanka’s{" "}
                <strong> Grade 1 to O/L students</strong>
              </li>
              <li>
                🧠 Powered by <strong>AI tutors & voice companions</strong>
              </li>
              <li>
                🎙️ <strong>Available only in English</strong> (Sinhala & Tamil
                coming soon)
              </li>
              <li>📱 Mobile-first platform — accessible on any device</li>
              <li>
                🔒 Secure subscriptions, dashboards, and progress tracking
              </li>
            </ul>
          </div>

          {/* Team */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold mb-4">👨‍💻 Our Team</h2>
            <p className="text-gray-700">
              Converso is built by{" "}
              <Link href="https://portfolio-web-umair.netlify.app/">
                {" "}
                Web Div
              </Link>{" "}
              who believed in future ready learning. We're committed to making
              advanced, AI-powered education accessible to every corner of the
              island.
            </p>
          </div>

          {/* Roadmap */}
          <div className="mb-16">
            <h2 className="text-3xl font-semibold mb-4">
              🚀 Our Journey & Roadmap
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>
                ✅ 2025 Q2: Beta launch with English AI lessons & voice bot
              </li>
              <li>📚 2025 Q3: Full O/L lesson library release</li>
              <li>
                🎓 2025 Q4: AI-powered exam prep and smart practice sessions
              </li>
              <li>
                🌏 2026: Sinhala & Tamil versions + expand across South Asia
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div className="text-center">
            <h3 className="text-2xl font-semibold mb-4">
              Ready to Experience the Future of Learning in Sri Lanka?
            </h3>
            <p className="text-gray-600 mb-6">
              Join thousands of students across Sri Lanka who are learning
              smarter with Converso's AI-powered platform.
            </p>
            <a
              href="/sign-in"
              className="inline-block bg-black text-white px-6 py-3 rounded-xl font-semibold hover:opacity-90 transition"
            >
              Get Started Today
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutUs;
