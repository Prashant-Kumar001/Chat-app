import React from "react";
import AppLayout from "../layout/AppLayout";
import { motion } from "framer-motion";
const Home = () => {
  return (
    <div className="container mx-auto ">
      <section className="text-center py-20 px-4 bg-gradient-to-r from-pink-300 to-orange-400 hover:from-pink-600 hover:to-orange-600 text-white">
        <motion.h2
          className="text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Welcome to MyBrand
        </motion.h2>
        <p className="text-lg mb-6">
          Discover amazing content and services tailored for you.
        </p>
        <button className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg">
          Get Started
        </button>
      </section>

      {/* Featured Section */}
      <section className="py-16 px-6 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {[1, 2, 3].map((item) => (
          <div
            key={item}
            className="bg-white p-6 shadow-lg rounded-lg text-center"
          >
            <h3 className="text-xl font-semibold mb-2">Feature {item}</h3>
            <p className="text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            </p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default AppLayout()(Home);
