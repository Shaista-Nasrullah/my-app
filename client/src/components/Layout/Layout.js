import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import { Toaster } from "react-hot-toast";

const Layout = ({ children, title, description, keywords, author }) => {
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />

        {/* SEO Meta Tags */}
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Title for SEO */}
        <title>{title}</title>

        {/* Open Graph Meta Tags for Social Media */}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="**https://haji-jewellers.online/**" />
        <meta
          property="og:image"
          content="**https://haji-jewellers.online/images/these.png**"
        />
      </Helmet>
      <Header />
      <main style={{ minHeight: "70vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer />
    </div>
  );
};

Layout.defaultProps = {
  title:
    "Haji Jewellers - Gold Jewelry, Silver Rings, Natural Stones | Custom Handmade Jewelry",
  description:
    "Welcome to Haji Jewellers, your trusted local jewelry store offering a wide range of gold jewelry including rings, earrings, bangles, and sets. We specialize in custom-made silver rings with natural stones of your choice, hand-crafted to perfection. Explore our exclusive collection of unique, high-quality jewelry pieces designed for both men and women. Visit our shop today for personalized service, expert craftsmanship, and a truly unique shopping experience.",
  keywords:
    "Haji Jewellers, gold jewelry, silver rings, natural stones, custom jewelry, handmade jewelry, men's jewelry, women's jewelry, gold rings, earrings, bangles, gold sets, local jewelry store, personalized jewelry, unique jewelry designs, jewelry shop near me, custom silver rings, natural stone rings",
  author: "**Haji Jewellers**",
};

export default Layout;
