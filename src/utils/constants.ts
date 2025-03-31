import { FacebookIcon, MediumIcon, XIcon, InstagramIcon } from "@/public/svgs";

export const navLinks = [
  { name: "Home", href: "/" },
  { name: "Features", href: "#features" },
  { name: "How it works", href: "#how-it-works" },
  { name: "Testimonials", href: "#testimonials" },
  { name: "FAQs", href: "#faqs" },
];

export const footerLinks = [
  {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/#home" },
      { label: "Features", href: "/#features" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Testimonials", href: "/#testimonials" },
      { label: "FAQs", href: "/#faqs" },
    ],
  },
  {
    title: "Features",
    links: [
      { label: "Savings Plans", href: "#" },
      { label: "Investment Options", href: "#" },
      { label: "Group Savings", href: "#" },
    ],
  },
  {
    title: "Legal Links",
    links: [
      { label: "Privacy Policy", href: "#" },
      { label: "Terms of Service", href: "#" },
      { label: "Cookie Policy", href: "#" },
    ],
  },
  {
    title: "Contact Information",
    links: [
      { label: "support@growe.com", href: "mailto:support@growe.com" },
      { label: "+23.48163149976", href: "tel:+2348163149976" },
      { label: "Whatsapp", href: "https://wa.me/2348163149976" },
    ],
  },
];

export const socialLinks = [
  {
    href: "https://facebook.com",
    icon: FacebookIcon,
  },
  {
    href: "https://instagram.com",
    icon: InstagramIcon,
  },
  {
    href: "https://twitter.com",
    icon: XIcon,
  },
  {
    href: "https://medium.com",
    icon: MediumIcon,
  },
];
