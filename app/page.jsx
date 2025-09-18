"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 md:px-16 lg:px-32 py-6">
        <h1 className="text-2xl font-bold text-blue-600">AI Recruiter</h1>
        <Link href="/auth">
          <Button
            variant="outline"
            className="rounded-full px-6 border-2 border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            Sign In
          </Button>
        </Link>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-8 md:px-16 lg:px-32 mt-16 relative">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-6xl font-extrabold leading-tight max-w-3xl"
        >
          Hire Smarter with <span className="text-blue-600">AI Interviews</span>
        </motion.h1>

        <p className="text-lg text-gray-600 mt-6 max-w-2xl">
          Give candidates a real interview experience powered by AI. Save time,
          reduce bias, and find the right talent faster.
        </p>

        <Link href="/auth">
          <Button className="mt-8 px-8 py-6 text-lg rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
            Get Started
          </Button>
        </Link>

        {/* Decorative Gradient Blob */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.15 }}
          transition={{ duration: 1 }}
          className="absolute top-32 right-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl"
        />
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8 px-8 md:px-16 lg:px-32 mt-24 mb-16">
        {[
          {
            title: "Realistic Interviews",
            desc: "Simulate real-life interviews with natural AI voice and dynamic questions.",
          },
          {
            title: "Save Time",
            desc: "Automate screening and reduce manual interview hours for your HR team.",
          },
          {
            title: "Smarter Insights",
            desc: "Get structured reports and insights on every candidate instantly.",
          },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.2 }}
            className="p-6 bg-white rounded-2xl shadow-md hover:shadow-xl transition-shadow"
          >
            <h3 className="text-xl font-semibold text-blue-600">
              {feature.title}
            </h3>
            <p className="text-gray-600 mt-2">{feature.desc}</p>
          </motion.div>
        ))}
      </section>

      {/* Contact & Support Section */}
      <section className="px-8 md:px-16 lg:px-32 py-16 bg-gradient-to-r from-blue-50 to-white text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-blue-600"
        >
          Need Help or Want to Connect?
        </motion.h2>
        <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
          I’d love to hear from you! Whether you need support, have questions,
          or want to collaborate — feel free to reach out anytime.
        </p>

        <div className="flex flex-col md:flex-row justify-center gap-6 mt-8">
          <div className="flex items-center gap-3 bg-white shadow-md rounded-xl px-6 py-4">
            <Mail className="text-blue-600" />
            <a
              href="mailto:youremail@example.com"
              className="text-gray-700 hover:text-blue-600"
            >
              rangasaimangalagiri@gmail.com
            </a>
          </div>
          <div className="flex items-center gap-3 bg-white shadow-md rounded-xl px-6 py-4">
            <Phone className="text-blue-600" />
            <span className="text-gray-700">+91 70135 08309</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 border-t mt-8">
        © {new Date().getFullYear()} AI Recruiter. All rights reserved.
      </footer>
    </div>
  );
}
