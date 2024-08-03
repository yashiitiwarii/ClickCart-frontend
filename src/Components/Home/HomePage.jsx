import React from "react";
import HeroSection from "./HeroSection";
import iphone from "../../assets/assets/iphone15_pro-removebg-preview.png";
import mac from "../../assets/assets/mac-system-cut.jfif";
import FeaturedProducts from "./FeaturedProducts";
const HomePage = () => {
  return (
    <div>
      <HeroSection
        title="iPhone 15 Pro"
        subtitle="Experience the power of latest iPhone 15 Pro with our most Pro camera ever."
        image={iphone}
        buttonText="LAUNCHING SOON"
      />

      <FeaturedProducts />

      <HeroSection
        title="Built the ultimate setup"
        subtitle="You can add Studio Display and colour-matched Magin accessories to your bag after configuring your Mac mini."
        link="/product/66935f54735cc179884bffda"
        image={mac}
        buttonText="BUY NOW"
      />
    </div>
  );
};

export default HomePage;
