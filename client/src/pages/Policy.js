// import React from "react";
// import Layout from "../components/Layout/Layout";

// const Policy = () => {
//   return (
//     <Layout title={'Privacy Policy'}>
//       <div className="about">
//         <div className="col-md-6 image">
//           <img
//             src="/images/about1.jfif"
//             alt="Contact Us"
//             style={{ width: "100%", height: "60vh" }}
//           />
//         </div>
//         <div className="col-md-4 text">
//           <p>Lorem Ipsum is simply dummy text of the printing </p>
//           <p>Lorem Ipsum is simply dummy text of the printing </p>
//           <p>Lorem Ipsum is simply dummy text of the printing </p>
//           <p>Lorem Ipsum is simply dummy text of the printing </p>
//           <p>Lorem Ipsum is simply dummy text of the printing </p>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Policy;


import React from "react";
import Layout from "../components/Layout/Layout";
import "../styles/PrivacyPolicyStyles.css"; // Add this line to link your custom CSS

const PrivacyPolicy = () => {
  return (
    <Layout title={"Privacy Policy"}>
      <div className="privacy-policy-container">
        <h1 className="privacy-policy-title">Privacy Policy</h1>
        <p>Welcome to our eCommerce website for silver rings with natural stones in Pakistan. Your privacy is very important to us. This privacy policy outlines how we collect, use, and protect your personal information.</p>

        <h2>1. Information We Collect</h2>
        <p>We collect information that you provide to us directly, such as when you create an account, make a purchase, or subscribe to our newsletter. This information may include your name, email address, phone number, and payment details.</p>

        <h2>2. How We Use Your Information</h2>
        <p>Your information is used to process your orders, provide customer support, and send you updates about our products and promotions. We may also use your information to improve our website and services.</p>

        <h2>3. Data Security</h2>
        <p>We take reasonable precautions to protect your personal information from unauthorized access, use, or disclosure. However, no method of transmission over the internet or electronic storage is completely secure.</p>

        <h2>4. Sharing Your Information</h2>
        <p>We do not sell or rent your personal information to third parties. We may share your information with trusted service providers who assist us in operating our website and conducting our business, as long as they agree to keep this information confidential.</p>

        <h2>5. Cookies</h2>
        <p>We use cookies to enhance your experience on our website. Cookies are small files stored on your device that help us remember your preferences and improve your shopping experience.</p>

        <h2>6. Your Rights</h2>
        <p>You have the right to access, update, or delete your personal information. You can do this by logging into your account or contacting our customer support team.</p>

        <h2>7. Changes to This Policy</h2>
        <p>We may update this privacy policy from time to time. Any changes will be posted on this page, and we encourage you to review this policy periodically.</p>

        <h2>8. Contact Us</h2>
        <p>If you have any questions or concerns about our privacy policy, please contact us at [your contact information].</p>
      </div>
    </Layout>
  );
};

export default PrivacyPolicy;

