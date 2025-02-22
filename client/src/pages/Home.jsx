import React from "react";
import AppLayout from "../layout/AppLayout";
import { motion } from "framer-motion";
const Home = () => {
  return (
    <div className="container mx-auto ">
      <h1 className="text-3xl text-black font-semibold text-center mt-20">
        Please
        select a chat to start messaging
      </h1>
    </div>
  );
};

export default AppLayout()(Home);
