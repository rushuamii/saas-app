"use client";

import React, { useState, useEffect } from "react";
import Head from "next/head";
import { motion, useAnimation } from "framer-motion";
import Lottie from "lottie-react";
import particles from "@/constants/particles.json"; // Ensure this file exists
import Link from "next/link";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    purpose: "support",
  });
  const [status, setStatus] = useState("");
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ opacity: 1, y: 0 });
  }, [controls]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) setStatus("Message sent successfully!");
      else setStatus("Failed to send. Please try again.");
    } catch (error) {
      setStatus("An error occurred. Please try again later.");
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us | Dixi - Sri Lanka's AI-Powered LMS</title>
        <meta
          name="description"
          content="Get in touch with Dixi for developer support, partnership opportunities, or educational inquiries. Contact our AI-powered LMS team today."
        />
        <meta
          name="keywords"
          content="contact Dixi, LMS support Sri Lanka, AI education support, developer API Dixi, partnership LMS Sri Lanka"
        />
      </Head>

      <section className="bg-gradient-to-b from-blue-50 via-white to-blue-50 text-gray-800 px-4 sm:px-6 md:px-12 lg:px-24 py-16 sm:py-20 md:py-24 min-h-screen relative overflow-hidden">
        {/* Background Animation */}
        <div className="absolute inset-0 opacity-20">
          <Lottie animationData={particles} loop={true} autoplay={true} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Header */}
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 0.8 }}
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-center text-gray-900"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-gray-600 text-center mb-12 max-w-2xl mx-auto"
          >
            Reach out to Dixi for developer support, educational inquiries, or
            partnership opportunities. Our team is here to assist you.
          </motion.p>

          {/* Contact Options */}
       
   
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="bg-white p-6 sm:p-8 rounded-lg shadow-md border border-gray-200 max-w-2xl mx-auto"
          >
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
              Send Us a Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Your email"
                />
              </div>
              <div>
                <label
                  htmlFor="purpose"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Purpose
                </label>
                <select
                  id="purpose"
                  name="purpose"
                  value={formData.purpose}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Contact purpose"
                >
                  <option value="support">Support</option>
                  <option value="developer">Developer Inquiry</option>
                  <option value="partnership">Partnership</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  aria-label="Your message"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.05, backgroundColor: "#1e40af" }}
                type="submit"
                className="w-full bg-black text-white px-4 py-2 rounded-lg font-semibold transition-all duration-300"
                aria-label="Submit contact form"
              >
                {status || "Send Message"}
              </motion.button>
              {status && (
                <p className="text-center text-sm text-gray-600 mt-2">
                  {status}
                </p>
              )}
            </form>
          </motion.div>

          {/* Additional Support */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-12 text-center"
          >
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4">
              Quick Support
            </h3>
            <p className="text-gray-600 mb-4">
              Need immediate help? Join our live chat or follow us on social
              media.
            </p>
            <div className="flex justify-center gap-6">
              <a
                href="https://x.com/dixi_lms"
                className="text-blue-600 hover:underline"
                aria-label="Dixi on X"
              >
                <span className="sr-only">X</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="mailto:support@dixi.lk"
                className="text-blue-600 hover:underline"
                aria-label="Email support"
              >
                <span className="sr-only">Email</span>
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                </svg>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
