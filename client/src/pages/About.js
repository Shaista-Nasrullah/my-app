import React from "react";
import Layout from "../components/Layout/Layout";
import { Helmet } from "react-helmet";
import "../styles/AboutStyles.css";

const About = () => {
  return (
    <Layout
      title="About Us - Haji Jewellers"
      description="Learn about Haji Jewellers, a master craftsman dedicated to creating handmade silver rings and jewelry. Discover our story and passion for traditional craftsmanship."
      keywords="Haji Jewellers, about us, silver rings, handmade jewelry, natural stones, jewelry craftsmanship"
      author="Haji Jewellers"
    >
      <Helmet>
        <meta charSet="utf-8" />

        {/* SEO Meta Tags */}
        <meta
          name="description"
          content="Learn about Haji Jewellers, a master craftsman dedicated to creating handmade silver rings and jewelry. Discover our story and passion for traditional craftsmanship."
        />
        <meta
          name="keywords"
          content="Haji Jewellers, about us, silver rings, handmade jewelry, natural stones, jewelry craftsmanship"
        />
        <meta name="author" content="Haji Jewellers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Title for SEO */}
        <title>About Us - Haji Jewellers</title>

        {/* Open Graph Meta Tags for Social Media */}
        <meta property="og:title" content="About Us - Haji Jewellers" />
        <meta
          property="og:description"
          content="Learn about Haji Jewellers, a master craftsman dedicated to creating handmade silver rings and jewelry. Discover our story and passion for traditional craftsmanship."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://haji-jewellers.online/about" />
        <meta
          property="og:image"
          content="https://haji-jewellers.online/images/these.png"
        />
      </Helmet>

      <div className="about">
        <div className="image-container">
          {/* Add your video here */}
          <video width="100%" height="auto" controls>
            <source src="/images/making.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className="text-container">
          <h1 className="about-title">Our Story</h1>
          <p className="about-text">
            Welcome to our eCommerce platform, where tradition meets modernity.
            This web app is owned by Nasrullah, a master craftsman who has
            dedicated his life to the art of creating handmade silver rings and
            jewelry.
          </p>
          <p className="about-text">
            Nasrullah's journey began in childhood, learning the craft from his
            father, who was also a skilled jeweler. From a young age, Nasrullah
            honed his skills, earning a living through his exceptional talent in
            silverwork.
          </p>
          <p className="about-text">
            With over 40 years of experience, Nasrullah now offers his unique
            creations online. He specializes in crafting silver rings for both
            men and women, with a deep knowledge of natural stones that can be
            set into these rings.
          </p>
          <p className="about-text">
            Each piece is a testament to his dedication, expertise, and passion
            for the craft. Whether you're looking for a custom-made ring or a
            piece that carries the legacy of centuries-old traditions,
            Nasrullah's creations are designed to last a lifetime.
          </p>
          <p className="about-text">
            Thank you for supporting our small business, and we look forward to
            bringing a piece of Nasrullah's craftsmanship into your life.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
