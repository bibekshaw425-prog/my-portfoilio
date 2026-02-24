import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Services } from "@/components/Services";
import { Portfolio } from "@/components/Portfolio";
import { Showcase3D } from "@/components/Showcase3D";
import { Contact } from "@/components/Contact";

export default function Index() {
  return (
    <Layout>
      <Hero />
      <About />
      <Services />
      <Showcase3D />
      <Portfolio />
      <Contact />
    </Layout>
  );
}
