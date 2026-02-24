import React from "react";
import { Navbar } from "./Navbar";
import { ScrollProgress } from "./ScrollProgress";
import { AnimatedCursor } from "./AnimatedCursor";
import { Background3D } from "./Background3D";
import { motion } from "framer-motion";

export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen selection:bg-primary/30">
      <ScrollProgress />
      <AnimatedCursor />
      <Background3D />
      <Navbar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>
      <footer className="py-12 border-t border-border/50 text-center text-sm text-muted-foreground">
        <div className="max-w-7xl mx-auto px-6">
          <p>© {new Date().getFullYear()} Bibek Shaw. Built with React & Three.js.</p>
        </div>
      </footer>
    </div>
  );
};
