"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  AcademicCapIcon,
  LightBulbIcon,
  SparklesIcon,
} from "@heroicons/react/24/solid";

const features = [
  {
    icon: <AcademicCapIcon className="h-8 w-8 text-blue-500" />,
    title: "AI-Powered Courses",
    desc: "Learn from the latest in AI, ML, and Data Science with hands-on projects.",
  },
  {
    icon: <LightBulbIcon className="h-8 w-8 text-pink-500" />,
    title: "Practical Learning",
    desc: "Real-world labs, case studies, and interactive content for deep understanding.",
  },
  {
    icon: <SparklesIcon className="h-8 w-8 text-purple-500" />,
    title: "Career Support",
    desc: "Mentorship, resume reviews, and job prep to launch your tech career.",
  },
];

const timeline = [
  {
    year: "2022",
    title: "Founded",
    desc: "AI Learn NG is born with a mission to democratize AI education in Africa.",
  },
  {
    year: "2023",
    title: "First 1,000 Students",
    desc: "Rapid growth as learners join our platform and community events.",
  },
  {
    year: "2024",
    title: "Industry Partnerships",
    desc: "Collaborations with top tech companies and universities.",
  },
  {
    year: "2025",
    title: "AI for All",
    desc: "Expanded scholarships and new programs for all backgrounds.",
  },
];

const team = [
  {
    name: "Ada Lovelace",
    role: "Founder & CEO",
    img: "/images/team-ada.png",
    desc: "Visionary leader passionate about accessible AI education.",
    linkedin: "#",
  },
  {
    name: "Alan Turing",
    role: "Head of Curriculum",
    img: "/images/team-alan.png",
    desc: "Designs innovative, hands-on AI learning experiences.",
    linkedin: "#",
  },
  {
    name: "Grace Hopper",
    role: "Community Lead",
    img: "/images/team-grace.png",
    desc: "Fosters a supportive and inclusive student community.",
    linkedin: "#",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-[#F8FAFC] min-h-screen pb-20">
      {/* HERO */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="max-w-3xl mx-auto pt-20 pb-12 text-center px-4"
      >
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight">
          About AI Learn NG
        </h1>
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
          AI Learn NG is a next-generation learning platform empowering students and professionals with the skills to thrive in the AI-driven future. Our mission is to make world-class AI education accessible, practical, and inspiring for all.
        </p>
      </motion.section>

      {/* MISSION & VISION */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.1 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 px-4 mb-16"
      >
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="rounded-2xl bg-white/70 backdrop-blur-lg shadow-xl p-8 flex flex-col items-center text-center border border-slate-100 transition-all duration-300 hover:shadow-2xl"
        >
          <LightBulbIcon className="h-10 w-10 text-blue-500 mb-3" />
          <h2 className="text-3xl md:text-4xl font-semibold mb-3 text-slate-900">Our Mission</h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            To democratize AI education by providing accessible, hands-on, and industry-relevant learning experiences for everyone.
          </p>
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.03 }}
          className="rounded-2xl bg-white/70 backdrop-blur-lg shadow-xl p-8 flex flex-col items-center text-center border border-slate-100 transition-all duration-300 hover:shadow-2xl"
        >
          <SparklesIcon className="h-10 w-10 text-pink-500 mb-3" />
          <h2 className="text-3xl md:text-4xl font-semibold mb-3 text-slate-900">Our Vision</h2>
          <p className="text-base md:text-lg text-gray-600 leading-relaxed">
            To become Africa’s leading platform for AI talent, driving innovation and positive change across the continent and beyond.
          </p>
        </motion.div>
      </motion.section>

      {/* TIMELINE */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-4 mb-20"
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-10 text-center">Our Journey</h2>
        <div className="relative border-l-4 border-gradient-to-b from-blue-400 to-pink-400 pl-8">
          {timeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="mb-10 last:mb-0"
            >
              <div className="absolute -left-5 top-2 w-4 h-4 rounded-full bg-gradient-to-br from-blue-400 to-pink-400 border-2 border-white shadow" />
              <div className="bg-white rounded-2xl shadow p-6 ml-2">
                <span className="text-sm text-gray-500 font-bold">{item.year}</span>
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mt-1 mb-1">{item.title}</h3>
                <p className="text-base md:text-lg text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FEATURES GRID */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3 }}
        viewport={{ once: true }}
        className="max-w-6xl mx-auto px-4 mb-20"
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-10 text-center">What We Offer</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, scale: 1.04, boxShadow: "0 8px 32px rgba(236,72,153,0.12)" }}
              className="rounded-2xl bg-white shadow-lg p-7 flex flex-col items-center text-center border border-slate-100 transition-all duration-300 hover:shadow-2xl"
            >
              {f.icon}
              <h3 className="mt-4 mb-2 text-xl md:text-2xl font-semibold text-slate-900">{f.title}</h3>
              <p className="text-base md:text-lg text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* TEAM SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        viewport={{ once: true }}
        className="max-w-5xl mx-auto px-4 mb-20"
      >
        <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-10 text-center">Meet the Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {team.map((member, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -8, scale: 1.04, boxShadow: "0 8px 32px rgba(59,130,246,0.10)" }}
              className="rounded-2xl bg-white shadow-lg p-7 flex flex-col items-center text-center border border-slate-100 transition-all duration-300 hover:shadow-2xl"
            >
              <div className="mb-4">
                <Image
                  src={member.img}
                  alt={member.name}
                  width={90}
                  height={90}
                  className="rounded-full object-cover h-24 w-24 border-4 border-blue-100 shadow"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-1">{member.name}</h3>
              <span className="text-pink-500 font-medium text-sm mb-2">{member.role}</span>
              <p className="text-base md:text-lg text-gray-600 mb-2">{member.desc}</p>
              <Link href={member.linkedin} className="text-blue-500 hover:underline text-xs">LinkedIn</Link>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* CTA SECTION */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto px-4"
      >
        <div className="rounded-2xl bg-gradient-to-r from-blue-400 via-pink-400 to-pink-500 shadow-xl p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-2">Ready to start your AI journey?</h2>
            <p className="text-base md:text-lg text-white/90 mb-4 md:mb-0">Join AI Learn NG and unlock your future in tech today.</p>
          </div>
          <Link
            href="/sign-up"
            className="inline-block rounded-full bg-white text-pink-600 font-semibold px-8 py-3 shadow hover:bg-pink-50 transition text-lg"
          >
            Join Now
          </Link>
        </div>
      </motion.section>
    </main>
  );
}
