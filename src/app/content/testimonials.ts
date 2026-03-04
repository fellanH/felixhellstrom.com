export interface Testimonial {
  name: string;
  role: string;
  relationship: "client" | "colleague" | "designer";
  quote: string;
  image?: string;
  linkedin?: string;
}

export const testimonials: Testimonial[] = [
  {
    name: "Mitch Davey",
    role: "Colleague at Stormfors",
    relationship: "colleague",
    quote:
      "Felix is a true Webflow wizard whose endless curiosity and dedication to his craft are truly inspiring. Much of what I know about Webflow, I learned by following his example. Felix was one of the OG members of Stormfors when I joined, and I saw first-hand how his expertise and innovative approach significantly shaped the direction of the company. His ability to tackle complex projects and deliver outstanding results consistently makes him an invaluable asset to any team.",
    image: "/images/people/mitch-davey.avif",
    linkedin:
      "https://www.linkedin.com/in/felixhellstrom/details/recommendations/",
  },
  {
    name: "Colin Simpson",
    role: "Founder & CEO",
    relationship: "client",
    quote:
      "Felix is a brilliant digital designer and developer. He understands his domain extremely well and constantly offers up his valuable perspective and solutions. I've thoroughly enjoyed working with him, especially because of his great communication style and attention to detail. You can tell he really loves what he does and it shows. I'd highly recommend Felix!",
    image: "/images/people/colin-simpson.avif",
    linkedin:
      "https://www.linkedin.com/in/felixhellstrom/details/recommendations/",
  },
  {
    name: "Johanna Appelgren",
    role: "Head of Marketing",
    relationship: "client",
    quote:
      "I had the pleasure of working with Felix on improving our company website and I couldn't be more impressed with his skills as a web developer. Felix is not only highly knowledgeable, but also a true professional who takes pride in his work. He was always available to address any concerns and provided creative solutions that helped take our website to the next level.",
    image: "/images/people/johanna-appelgren.avif",
    linkedin:
      "https://www.linkedin.com/in/felixhellstrom/details/recommendations/",
  },
  {
    name: "Jed Mosely",
    role: "Founder & CEO",
    relationship: "client",
    quote:
      "Felix was great to work with in building out our website true to our original intent. He's likable and reliable. He didn't back down from some technical challenges along the way. He's a great blend of the professional and personable. Felix helped us understand our options and built and executed a plan that met our goals.",
    image: "/images/people/jed-mosely.avif",
    linkedin:
      "https://www.linkedin.com/in/felixhellstrom/details/recommendations/",
  },
  {
    name: "Tesceline Tabilas",
    role: "Designer at Stormfors",
    relationship: "designer",
    quote:
      "It was wonderful to partner with a web developer who has appreciation and respect for design. Two of Felix's qualities that stood out to me were his understanding of the client's needs and business and his ability to enhance meeting productivity by guiding conversation. I am impressed by his technical skills and grateful for his openness to share his knowledge.",
    image: "/images/people/tesceline-tabilas.avif",
    linkedin:
      "https://www.linkedin.com/in/felixhellstrom/details/recommendations/",
  },
  {
    name: "Mikael Brunnberg",
    role: "Colleague at Stormfors",
    relationship: "colleague",
    quote:
      "Felix is one of the most productive and fast colleagues I have had the opportunity to work together with. He's very creative and technically skilled in Webflow/web development and up to date with the modern tools. He's fun, positive and super easy to collaborate with. A pleasure!",
    image: "/images/people/mikael-brunnberg.avif",
    linkedin:
      "https://www.linkedin.com/in/felixhellstrom/details/recommendations/",
  },
  {
    name: "Lisbeth Langhorn",
    role: "Head of Marketing",
    relationship: "client",
    quote:
      "I can certainly recommend Felix to anyone seeking a Webflow professional who can elevate their digital presence. He possesses the skills, creativity, and dedication needed to bring your vision to life. I am confident that his contributions will significantly enhance any project fortunate enough to have him on board.",
    image: "/images/people/lisbeth-langhorn.avif",
    linkedin:
      "https://www.linkedin.com/in/felixhellstrom/details/recommendations/",
  },
  {
    name: "Frank Bagge",
    role: "Senior Consultant at Narva",
    relationship: "client",
    quote:
      "Incredibly grateful for the swift and outstanding delivery of a one-page solution for one of our valued customers at Narva! The efficiency, attention to detail, and seamless execution made all the difference. Truly a job well done!",
    image: "/images/people/frank-bagge.avif",
    linkedin:
      "https://www.linkedin.com/in/felixhellstrom/details/recommendations/",
  },
  {
    name: "Jacob Schultz",
    role: "Senior Designer",
    relationship: "designer",
    quote:
      "Working alongside Felix was an absolute delight. His technical expertise and commitment were evident throughout the entire process. Felix has my warmest recommendation.",
    image: "/images/people/jacob-schultz.avif",
    linkedin:
      "https://www.linkedin.com/in/felixhellstrom/details/recommendations/",
  },
];
