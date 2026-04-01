"use client";

import styles from "./about.module.css";

export default function AboutPage() {
  return (
    <div className={styles.container}>

      
      <section className={styles.hero}>
        <div className={styles.left}>
          <h1>Who We Are</h1>
          <p>
            At <b>Doctor+</b>, we combine advanced medical technology with
            compassionate care. Our mission is to ensure every patient receives
            safe, effective, and personalized treatment.
          </p>

          <button className={styles.btn}>Explore Services</button>
        </div>

        <div className={styles.right}>
          <img src="/img/doctor1.jpg" alt="doctor" />
        </div>
      </section>

      
      <section className={styles.features}>
        <div className={styles.card}>
          <h3>👨‍⚕️ Expert Doctors</h3>
          <p>Highly experienced and certified professionals.</p>
        </div>

        <div className={styles.card}>
          <h3>🏥 Modern Equipment</h3>
          <p>Advanced medical tools for accurate diagnosis.</p>
        </div>

        <div className={styles.card}>
          <h3>⏰ 24/7 Support</h3>
          <p>Always available for emergency and assistance.</p>
        </div>
      </section>

      
      <section className={styles.stats}>
        <div>
          <h2>500+</h2>
          <p>Doctors</p>
        </div>

        <div>
          <h2>10K+</h2>
          <p>Patients</p>
        </div>

        <div>
          <h2>50+</h2>
          <p>Departments</p>
        </div>
      </section>

    </div>
  );
}