export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* LEFT */}
        <div className="footer-col">
          <h2 className="footer-logo">Doctor<span>+</span></h2>
          <p>
            We provide trusted healthcare services with expert doctors and
            modern technology.
          </p>
        </div>

        {/* LINKS */}
        <div className="footer-col">
          <h3>Quick Links</h3>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/findDoctor">Doctors</a>
          <a href="/contact">Contact</a>
        </div>

        {/* CONTACT */}
        <div className="footer-col">
          <h3>Contact Us</h3>
          <p>📧 support@doctroplus.com</p>
          <p>📞 +91 7872640492</p>
          <p>📍 Durgapur, India</p>
        </div>

        {/* SOCIAL */}
        <div className="footer-col">
          <h3>Follow Us</h3>
          <div className="socials">
            <span>🌐</span>
            <span>📘</span>
            <span>📸</span>
            <span>🐦</span>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        © 2026 MediCare. All rights reserved.
      </div>
    </footer>
  );
}