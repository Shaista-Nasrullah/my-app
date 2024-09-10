import React from "react";
import Layout from "../components/Layout/Layout";
import { Helmet } from "react-helmet";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

const Contact = () => {
  return (
    <Layout
      title="Contact Us - Haji Jewellers"
      description="Get in touch with Haji Jewellers for any queries about our products. We are available 24/7 to assist you with your needs. Contact us via email, phone, or our toll-free support line."
      keywords="Haji Jewellers, contact us, customer support, jewelry inquiries, email contact, phone support, toll-free number"
      author="Haji Jewellers"
    >
      <Helmet>
        <meta charSet="utf-8" />

        {/* SEO Meta Tags */}
        <meta
          name="description"
          content="Get in touch with Haji Jewellers for any queries about our products. We are available 24/7 to assist you with your needs. Contact us via email, phone, or our toll-free support line."
        />
        <meta
          name="keywords"
          content="Haji Jewellers, contact us, customer support, jewelry inquiries, email contact, phone support, toll-free number"
        />
        <meta name="author" content="Haji Jewellers" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Title for SEO */}
        <title>Contact Us - Haji Jewellers</title>

        {/* Open Graph Meta Tags for Social Media */}
        <meta property="og:title" content="Contact Us - Haji Jewellers" />
        <meta
          property="og:description"
          content="Get in touch with Haji Jewellers for any queries about our products. We are available 24/7 to assist you with your needs. Contact us via email, phone, or our toll-free support line."
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://haji-jewellers.online/contact"
        />
        <meta
          property="og:image"
          content="https://haji-jewellers.online/images/contact.jpg"
        />
      </Helmet>

      <div className="row contactus">
        <div className="col-md-6 image">
          <img
            src="/images/contact.jpg"
            alt="Contact Us"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-6">
          <h1 className="bg-dark p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            Any query and info about product feel free to call anytime we are
            24x7 available
          </p>
          <p className="mt-3">
            <BiMailSend /> :{" "}
            <a href="hajijewellers856@gmail.com">hajijewellers856@gmail.com</a>
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : <a href="tel:+923401248854">0340-1248854</a>
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
