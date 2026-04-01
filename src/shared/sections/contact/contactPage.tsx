"use client";

import styles from "./contact.module.css";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className={styles.container}>

      
      <div className={styles.header}>
        <h1>Contact Us</h1>
        <p>We are here to help you. Reach out anytime!</p>
      </div>

      <div className={styles.wrapper}>
        
      
        <div className={styles.info}>
          <h2>Get In Touch</h2>

          <div className={styles.item}>
            <Mail />
            <span>support@doctorplus.com</span>
          </div>

          <div className={styles.item}>
            <Phone />
            <span>+91 7872640492</span>
          </div>

          <div className={styles.item}>
            <MapPin />
            <span>Durgapur, India</span>
          </div>
        </div>

        
        <form className={styles.form}>
          <input type="text" placeholder="Your Name" />
          <input type="email" placeholder="Your Email" />
          <textarea placeholder="Your Message"></textarea>

          <button type="submit">Send Message</button>
        </form>

      </div>
    </div>
  );
}