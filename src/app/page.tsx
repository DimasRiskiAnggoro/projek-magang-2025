// components
import { Navbar, Footer } from "@/components";

// sections
import Hero from "./hero";
import Content from "./content";
import Ayodulursection from "./ayodulursection";
import BlogPosts from "./blog-posts";

export default function Campaign() {
  return (
    <>
      <Navbar />
      <Hero />
      <Content />
      <Ayodulursection />
      <BlogPosts />
      <Footer />
    </>
  );
}
