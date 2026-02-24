import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export const Portfolio = () => {
  const [filter, setFilter] = useState("All");

  const projects = [
    {
      title: "Design Portfolio Website",
      description: "Modern, high-performance personal portfolio using React, Tailwind CSS, and Framer Motion for sleek animations.",
      tech: ["React", "Tailwind", "Framer Motion"],
      category: "Web",
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&auto=format&fit=crop",
      link: "https://kcp7m91p-5173.inc1.devtunnels.ms/",
    },
    {
      title: "3D Game",
      description: "Fast-paced, physics-driven car racing game with realistic handling and immersive 3D environments.",
      tech: ["Unity", "C#", "Blender"],
      category: "Games",
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&auto=format&fit=crop",
      link: "https://nebula-strike-by-bibek.netlify.app/"
    },
    {
      title: "Data Analysis Dashboard",
      description: "Comprehensive data visualization tool for analyzing market trends and user behavior datasets.",
      tech: ["Python", "Pandas", "Power BI", "Google Colab"],
      category: "Data",
      image: "https://images.pexels.com/photos/97080/pexels-photo-97080.jpeg",
      link: "https://colab.research.google.com/drive/1wqadJwT0dX8nI2Fa7GTSq8pIpkfVYPXE#scrollTo=raEI9LJDNAfg",
    },
    {
      title: "Minecraft Game Simulation",
      description: "A block-based 3D environment featuring procedural generation, physics, and custom entity systems.",
      tech: ["Unity", "C#", "Blender"],
      category: "Games",
      image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&auto=format&fit=crop",
      link: "https://deft-platypus-8d4e23.netlify.app/", 
    },
  ];

  const filteredProjects = projects.filter(
    (p) => filter === "All" || p.category === filter
  );

  return (
    <section id="portfolio" className="section-padding">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">Portfolio</h2>
          <p className="text-muted-foreground text-lg">Notable projects and experiments.</p>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-center">
          {["All", "Web", "Games", "Data"].map((f) => (
            <Button
              key={f}
              variant={filter === f ? "default" : "outline"}
              onClick={() => setFilter(f)}
              className="rounded-full px-6"
            >
              {f}
            </Button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className="glass rounded-[2rem] overflow-hidden group border-white/5"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                  <Button size="icon" variant="secondary" className="rounded-full" asChild>
                    <a href={project.link || "#"} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-5 w-5" />
                    </a>
                  </Button>
                  <Button size="icon" variant="secondary" className="rounded-full">
                    <Github className="h-5 w-5" />
                  </Button>
                </div>
              </div>
              <div className="p-8">
                <div className="flex justify-between items-center mb-4">
                  <Badge variant="outline" className="text-primary border-primary/20">
                    {project.category}
                  </Badge>
                  <div className="flex gap-2">
                    {project.tech.map((t) => (
                      <span key={t} className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-6 line-clamp-2 leading-relaxed">
                  {project.description}
                </p>
                <Button variant="link" className="p-0 h-auto gap-2 group/btn" asChild>
                  <a href={project.link || "#"} target="_blank" rel="noopener noreferrer">
                    View Project Details <ExternalLink className="h-4 w-4 transition-transform group-hover/btn:-translate-y-1 group-hover/btn:translate-x-1" />
                  </a>
                </Button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
};
