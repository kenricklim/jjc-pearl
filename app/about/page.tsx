"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Heart, Users, Globe, Scale, Sparkles, Target } from "lucide-react";

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      text: "That faith in God gives meaning and purpose to human life;",
    },
    {
      icon: Users,
      text: "That the brotherhood of men transcends the sovereignty of nations;",
    },
    {
      icon: Globe,
      text: "That economic justice can best be won by free men through free enterprise;",
    },
    {
      icon: Scale,
      text: "That government should be of laws rather than of men;",
    },
    {
      icon: Sparkles,
      text: "That earth's great treasure lies in human personality;",
    },
    {
      icon: Target,
      text: "And that service to humanity is the best work of life.",
    },
  ];

  const timeline = [
    {
      year: "1968",
      title: "First Junior Jaycees Chapter",
      description:
        "Davao Jaycees, spearheaded by JC Rene Al Madrazo, founded the Davao Junior Jaycees. JJC Butch Francisco was elected as the first Junior Jaycees Chapter president. The Davao Junior Jaycees Chapter Presentation and Induction Ceremonies were held at Davao Insular Hotel on September 28, 1968.",
    },
    {
      year: "1971",
      title: "Temporary Extinction",
      description:
        "Despite being launched with high hopes, the organization failed and lost its aspirations due to poor leadership. All youth clubs vanished in thin air.",
    },
    {
      year: "1973",
      title: "Accent on Youth Project",
      description:
        "JCI Sen. Felicano 'Sonny' Belmonte, Jr., then JCIP National President, laid down a year-long program for implementing the Accent on Youth project nationally. The program disseminated information on organizing and effective operation of Youth Councils and projects along the lines of health, welfare, recreation and education.",
    },
    {
      year: "1974",
      title: "Cainta Junior Jaycees",
      description:
        "During the provisional years of the Cainta Junior Jaycees, headed by JC Manny Duldulao, the organization was registered in the Philippine Jaycees as its auxiliary unit. With the encouragement of JCI Sen. David Chua-Unsu, 1974 JCP national President, the formation of Junior Jaycees by the Jaycees in Manila and nearby provinces sprouted fast.",
    },
    {
      year: "1974",
      title: "First Metro Manila Conference",
      description:
        "The first Metro Manila Conference was held on November 30 to December 1, 1974, hosted by the Manila Junior Jaycees at the University of the Philippines.",
    },
    {
      year: "1975",
      title: "National Organization Founded",
      description:
        "The Philippine Junior Jaycees was formally organized as a national organization and auxiliary of the Philippine Jaycees Inc. The Junior Jaycees Organization adapted the same concept, creed, principles and philosophies of the Jaycees movement.",
    },
    {
      year: "2023",
      title: "Puerto Princesa Perlas Chapter Founded",
      description:
        "Junior Jaycees Puerto Princesa Perlas was created by its mother chapter JCI Puerto Princesa Kiao Inc. on March 12, 2023.",
    },
    {
      year: "2025",
      title: "Continuing the Mission",
      description:
        "This organization continues the mission and vision of the Junior Jaycees in a more sustainable and empowering way.",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-secondary mb-4">About Us</h1>
        <p className="text-xl text-secondary/80 max-w-4xl mx-auto leading-relaxed">
          The Junior Jaycees Philippines, hereinafter referred to as JJC Philippines, is a
          student-run nationwide youth leadership training organization that provides an
          avenue for young advocates to develop their leadership skills, fellowship, and social
          responsibility that will mold them into becoming champions of positive change. As an
          organization, we believe that it is imperative for the youth to engage in social action in
          the pursuit of achieving the 17 SDGs to ensure a brighter future for all.
        </p>
      </motion.div>

      {/* JCI Values */}
      <section className="mb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-secondary mb-4">
            JCI Values - We Believe
          </h2>
        </motion.div>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <value.icon className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
                    <p className="text-gray-700 leading-relaxed">{value.text}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mb-16">
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Our Mission</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  To provide leadership development opportunities that empower
                  young people to create positive change.
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-2xl text-primary">Our Vision</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  To be the foremost global network of young leaders.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* History Timeline */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-secondary mb-4">Our History</h2>
        </motion.div>
        <div className="max-w-3xl mx-auto">
          {timeline.map((event, index) => (
            <motion.div
              key={event.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.6 }}
              className="relative pl-8 pb-8 last:pb-0"
            >
              {index !== timeline.length - 1 && (
                <div className="absolute left-3 top-8 bottom-0 w-0.5 bg-primary" />
              )}
              <div className="absolute left-0 top-1 h-6 w-6 rounded-full bg-primary border-4 border-white" />
              <div className="ml-8">
                <div className="text-2xl font-bold text-primary mb-1">
                  {event.year}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {event.title}
                </h3>
                <p className="text-gray-600">{event.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

