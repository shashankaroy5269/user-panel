export default function Services() {
  const services = [
    { title: "Cardiology", icon: "❤️" },
    { title: "Neurology", icon: "🧠" },
    { title: "Orthopedics", icon: "🦴" },
    { title: "Pediatrics", icon: "👶" },
  ];

  return (
    <section className="services">
      <h2>Our Services</h2>

      <div className="service-grid">
        {services.map((item, i) => (
          <div key={i} className="service-card">
            <div className="icon">{item.icon}</div>
            <h3>{item.title}</h3>
            <p>Expert care with modern technology and trusted doctors.</p>
          </div>
        ))}
      </div>
    </section>
  );
}