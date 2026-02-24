import { motion } from "framer-motion";
import { Gamepad2, Database, Code2, Globe } from "lucide-react";

export const Services = () => {
  const services = [
    {
      title: "Game Development",
      description: "Crafting immersive 2D and 3D games using Unity and Unreal Engine. Expertise in gameplay mechanics, physics, and character control.",
      icon: <Gamepad2 className="h-10 w-10 text-primary" />,
    },
    {
      title: "Data Analysis",
      description: "Transforming complex datasets into actionable insights using Python, Pandas, and Power BI. Professional experience in data visualization.",
      icon: <Database className="h-10 w-10 text-primary" />,
    },
    {
      title: "Backend Development",
      description: "Building scalable and secure server-side applications using Node.js, Express, and Python. Specialized in API design and database management.",
      icon: <Code2 className="h-10 w-10 text-primary" />,
    },
    {
      title: "Full Stack Web",
      description: "Developing modern, responsive web applications with React, Tailwind CSS, and Framer Motion for high-performance user interfaces.",
      icon: <Globe className="h-10 w-10 text-primary" />,
    },
  ];

  return (
    <section id="services" className="section-padding">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Services</h2>
        <p className="text-muted-foreground text-lg">Specialized solutions for modern digital needs.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass p-8 rounded-3xl border-white/5 hover:border-primary/50 transition-colors group"
          >
            <div className="mb-6 p-4 rounded-2xl bg-primary/10 w-fit group-hover:scale-110 transition-transform">
              {service.icon}
            </div>
            <h3 className="text-xl font-bold mb-4">{service.title}</h3>
            <p className="text-muted-foreground leading-relaxed">{service.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
