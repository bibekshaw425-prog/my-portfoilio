import { motion } from "framer-motion";
import { Mail, Linkedin, Send, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

export const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create a mailto URL to send the email directly to their Gmail
      const mailtoUrl = `mailto:bibekshaw425@gmail.com?subject=${encodeURIComponent(
        formData.subject
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      )}`;

      // Open the user's email client
      window.location.href = mailtoUrl;

      toast.success("Opening your email client to send the message!");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error) {
      toast.error("Failed to open email client. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <section id="contact" className="section-padding">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6 tracking-tight">Let's Connect</h2>
          <p className="text-lg text-muted-foreground mb-12 max-w-md leading-relaxed">
            Interested in collaboration or just want to say hi? Reach out to me via the form or social links.
          </p>
          
          <div className="space-y-8 mb-12">
            <div className="flex items-center gap-6 group">
              <div className="p-4 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">Email Me</p>
                <p className="text-xl font-medium">bibekshaw425@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6 group">
              <div className="p-4 rounded-2xl bg-primary/10 group-hover:bg-primary/20 transition-colors">
                <Linkedin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground uppercase tracking-wider mb-1">LinkedIn Profile</p>
                <p className="text-xl font-medium">Bibek Shaw</p>
              </div>
            </div>
          </div>
          
          <div className="flex gap-4">
            {[
              { Icon: Github, href: "https://github.com/bibekshaw425-prog" },
              { Icon: Linkedin, href: "https://www.linkedin.com/in/bibek-shaw-3043b3288/" },
              { Icon: Mail, href: "mailto:bibekshaw425@gmail.com" }
            ].map(({ Icon, href }, i) => (
              <Button
                key={i}
                variant="outline"
                size="icon"
                className="rounded-2xl glass border-white/5 h-12 w-12 hover:border-primary/50 transition-colors"
                asChild
              >
                <a href={href} target="_blank" rel="noopener noreferrer">
                  <Icon className="h-5 w-5" />
                </a>
              </Button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass p-10 rounded-[2.5rem] border-white/5 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Send className="h-24 w-24 -rotate-45" />
          </div>
          <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium ml-1">Full Name</label>
                <Input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="bg-white/5 border-white/10 rounded-2xl h-12 px-5 focus:ring-primary focus:border-primary transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium ml-1">Email Address</label>
                <Input
                  required
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="bg-white/5 border-white/10 rounded-2xl h-12 px-5 focus:ring-primary focus:border-primary transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium ml-1">Subject</label>
              <Input
                required
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Project Inquiry"
                className="bg-white/5 border-white/10 rounded-2xl h-12 px-5 focus:ring-primary focus:border-primary transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium ml-1">Your Message</label>
              <Textarea
                required
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can I help you?"
                className="bg-white/5 border-white/10 rounded-2xl min-h-[150px] p-5 focus:ring-primary focus:border-primary transition-all resize-none"
              />
            </div>
            <Button
              disabled={isSubmitting}
              type="submit"
              className="w-full rounded-2xl h-14 text-lg font-bold gap-3 shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
              <Send className={`h-5 w-5 ${isSubmitting ? "animate-pulse" : ""}`} />
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};
