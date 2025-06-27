import React from "react";

const Hero = () => {
  return (
    <section className="bg-white py-20 px-6 md:px-12 lg:px-24">
      <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        <div className="text-center lg:text-left max-w-xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
            Sri Lanka’s #1 AI-Powered Learning Companion
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Build your own learning companion, explore bite-sized lessons, and
            track your journey anytime, anywhere.
          </p>
          <div className="flex justify-center lg:justify-start gap-4">
            <button className="bg-black text-white px-6 py-3 rounded-xl font-medium hover:opacity-90 transition">
              Launch Now
            </button>
            <button className="border border-black text-black px-6 py-3 rounded-xl font-medium hover:bg-black hover:text-white transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Image / Illustration */}
        <div className="w-full lg:w-1/2">
          <img
            src="/images/hero.jpg" // Replace with your own image
            alt="Learning Illustration"
            className="w-full h-auto rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
