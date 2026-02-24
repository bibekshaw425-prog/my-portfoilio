import { motion, useInView } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useRef, useState, useEffect } from "react";

const SkillBar = ({ name, level }: { name: string; level: number }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setValue(level), 200);
      return () => clearTimeout(timer);
    }
  }, [isInView, level]);

  return (
    <div ref={ref} className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium">{name}</span>
        <span className="text-muted-foreground">{value}%</span>
      </div>
      <Progress value={value} className="h-1 bg-white/5" />
    </div>
  );
};

export const About = () => {
  const skills = [
    { name: "Python", level: 90 },
    { name: "C++", level: 85 },
    { name: "C# (Unity)", level: 80 },
    { name: "JavaScript / TypeScript", level: 85 },
    { name: "Unreal Engine", level: 75 },
    { name: "Data Science (Pandas, Google Colab)", level: 85 },
    { name: "Backend (Node.js/Express)", level: 80 },
    { name: "Power BI", level: 70 },
  ];

  return (
    <section id="about" className="section-padding">
      <div className="flex flex-col lg:flex-row gap-16 items-center mb-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative group"
        >
          <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-primary/0 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-2 border-white/10 glass relative z-10">
            <img
              src="https://cdn.builder.io/api/v1/image/assets%2Fef8ebc362e964387a089d7d76b6a30a5%2F924d2a9415bf46f2afe87e979994867a?format=webp&width=800&height=1200"
              alt="Bibek Shaw"
              loading="lazy"
              className="w-full h-full object-cover transition-all duration-500"
            />
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex-1 text-center lg:text-left"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">About Me</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl leading-relaxed">
            I am a gaming developer, data scientist, and backend developer. 
            Currently pursuing B.Tech in CSE at Chaibasa Engineering College (2024–2028).
          </p>
          <div className="flex flex-wrap justify-center lg:justify-start gap-4">
            <div className="glass px-6 py-4 rounded-2xl border-white/5">
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Experience</p>
              <p className="font-bold">Internship in Data Science</p>
            </div>
            <div className="glass px-6 py-4 rounded-2xl border-white/5">
              <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Education</p>
              <p className="font-bold">B.Tech CSE (2024–2028)</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <h3 className="text-2xl font-bold">Primary Skills</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {["Python", "C++", "C", "C#", "HTML/CSS", "Blender", "Unity", "Unreal Engine", "Pandas", "Power BI"].map((skill) => (
              <Badge key={skill} variant="secondary" className="justify-center py-2 rounded-full glass border-white/5">
                {skill}
              </Badge>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed">
            My journey in technology is driven by curiosity and a desire to build things that matter. 
            From optimizing backend algorithms to designing complex game levels, I enjoy every step of the development process.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-6"
        >
          <h3 className="text-2xl font-bold">Proficiency</h3>
          {skills.map((skill) => (
            <SkillBar key={skill.name} name={skill.name} level={skill.level} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};