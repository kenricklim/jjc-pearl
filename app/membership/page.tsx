"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ExternalLink, Users, Heart, Lightbulb, Award } from "lucide-react";

const benefits = [
  {
    icon: Users,
    title: "Leadership Development",
    description: "Develop your leadership skills through hands-on projects and training programs",
  },
  {
    icon: Heart,
    title: "Community Service",
    description: "Make a positive impact in your community through meaningful service projects",
  },
  {
    icon: Lightbulb,
    title: "Networking Opportunities",
    description: "Connect with like-minded young leaders and build lasting friendships",
  },
  {
    icon: Award,
    title: "Personal Growth",
    description: "Enhance your skills, confidence, and character through diverse experiences",
  },
];

export default function MembershipPage() {
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdawZbjtTHc4Qn-31k2h88mv3OuO0-wpRSebXavyfg6A-o3uw/viewform";

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-secondary mb-4">Become a Member</h1>
        <p className="text-xl text-secondary/80 max-w-3xl mx-auto">
          Join JJC Puerto Princesa Perlas and be part of a movement that empowers
          young leaders to create positive change
        </p>
      </motion.div>

      {/* Benefits Section */}
      <section className="mb-12">
        <h2 className="text-3xl font-bold text-secondary mb-8 text-center">
          Why Join Us?
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="h-full">
                <CardHeader>
                  <benefit.icon className="h-10 w-10 text-[#0097D7] mb-4" />
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Application Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="border-2 border-[#0097D7]">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl mb-2">Ready to Make a Difference?</CardTitle>
            <CardDescription className="text-lg">
              Fill out the Official Membership Form to begin your journey with us
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-pearl-200 p-6 rounded-lg">
              <h3 className="font-semibold text-secondary mb-2">
                Application Process
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-secondary/80">
                <li>Click the link below to access the official membership form</li>
                <li>Complete all required fields in the Google Form</li>
                <li>Submit your application</li>
                <li>
                  After submitting, create an account on this website to access
                  our community features (Freedom Wall and Service Desk)
                </li>
              </ol>
            </div>
            <div className="flex justify-center">
              <Button
                size="lg"
                onClick={() => window.open(googleFormUrl, "_blank")}
                className="group bg-[#0097D7] hover:bg-[#0077B6] text-white shadow-lg hover:shadow-xl transition-all"
              >
                Fill out the Official Membership Form
                <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
            <p className="text-sm text-gray-500 text-center">
              Note: The membership application is handled through Google Forms.
              After completing the form, please sign in with Google on this
              website to access community features.
            </p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

