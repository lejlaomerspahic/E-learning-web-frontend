import React, { useState } from "react";
import Navbar from "./Navbar";
import SlikaBackground from "./SlikaBackground";
import { useUser } from "../hook/useUser";

function Home() {
  const { user } = useUser();
  console.log(user);
  return (
    <div>
      <Navbar />
      <SlikaBackground />
    </div>
  );
}

export default Home;
