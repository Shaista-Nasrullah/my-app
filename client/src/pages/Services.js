import React from "react";
import { Helmet } from "react-helmet";
import Layout from "../components/Layout/Layout";
import "../styles/ServicesStyles.css";

const Services = () => {
  return (
    <Layout>
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Explore the various services offered by Haji Jewellers including custom jewelry design, handcrafted silver jewelry, natural stone settings, and personalized gold jewelry creation. Contact us for more details."
        />
        <meta
          name="keywords"
          content="jewelry services, custom jewelry, handcrafted silver jewelry, natural stone settings, personalized gold jewelry, Haji Jewellers"
        />
        <meta name="author" content="Haji Jewellers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Our Services | Haji Jewellers</title>

        {/* Open Graph Meta Tags for Social Media */}
        <meta property="og:title" content="Our Services | Haji Jewellers" />
        <meta
          property="og:description"
          content="Explore the various services offered by Haji Jewellers including custom jewelry design, handcrafted silver jewelry, natural stone settings, and personalized gold jewelry creation. Contact us for more details."
        />
        <meta property="og:image" content="/images/seo-placeholder.jpg" />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://haji-jewellers.online/services"
        />
      </Helmet>

      <div className="container services-page">
        <header className="services-header text-center">
          <h1>Our Services</h1>
          <p>
            Discover the range of services we offer to meet your jewelry needs.
          </p>
        </header>

        <section className="video-placeholder text-center mt-4">
          <h2>Watch Our Introduction Video</h2>
          <div className="video-container">
            <video width="600" controls>
              <source src="/videos/making.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <p>Video coming soon!</p>
          </div>
        </section>

        {/* Enhanced Services Description Section */}
        <section className="services-list mt-5">
          <div className="row">
            <div className="col-md-4 service-item">
              <h3>Ready-Made Gold Jewelry</h3>
              <p>
                Explore our exquisite collection of ready-made gold jewelry,
                including rings, earrings, sets, bangles, chains, and more. Each
                piece is crafted to perfection, offering timeless elegance and
                unmatched quality.
              </p>
            </div>
            <div className="col-md-4 service-item">
              <h3>Handcrafted Silver Jewelry</h3>
              <p>
                Discover our range of handcrafted silver jewelry, featuring
                unique designs such as Sharshara rings with natural stones. Our
                artisans meticulously create each piece to showcase the natural
                beauty of silver and stones.
              </p>
            </div>
            <div className="col-md-4 service-item">
              <h3>Natural Stones Collection</h3>
              <p>
                We offer a wide selection of natural stones, carefully sourced
                and handpicked for their quality and beauty. Whether for
                personal use or as a unique gift, our stones are ideal for any
                occasion.
              </p>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-md-6 service-item">
              <h3>Custom Silver Jewelry Design</h3>
              <p>
                Our skilled craftsmen specialize in creating custom silver
                jewelry, including rings and sets adorned with natural stones
                and artificial pearls. Share your vision with us, and we'll
                bring your dream piece to life with precision and care.
              </p>
            </div>
            <div className="col-md-6 service-item">
              <h3>Personalized Gold Jewelry Creation</h3>
              <p>
                At Haji Jewellers, we offer personalized gold jewelry design
                services. Choose your desired gold purity and provide us with
                your preferred design, and our expert jewelers will craft a
                unique piece that reflects your style and meets your specific
                needs.
              </p>
            </div>
          </div>
        </section>

        <section className="contact-info mt-5 text-center">
          <h2>Contact Us for More Information</h2>
          <p>
            If you have any questions or would like to schedule a consultation,
            feel free to reach out to us.
          </p>
          <p>
            Email:{" "}
            <a href="mailto:hajijewellers856@gmail.com">
              hajijewellers856@gmail.com
            </a>
          </p>
          <p>
            Phone: <a href="tel:+3401248854">+3401248854</a>
          </p>
        </section>
      </div>
    </Layout>
  );
};

export default Services;
