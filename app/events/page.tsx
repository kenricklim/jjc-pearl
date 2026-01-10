"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Calendar, MapPin, Leaf } from "lucide-react";

const events = [
  {
    id: "1",
    title: "Clean Up Drive & Mangrove Tree Planting",
    date: "September 20, 2025",
    time: "07:00 AM",
    location: "Broy, Sicsican, Golden Tree",
    description:
      "Join us in greening the earth. One tree at a time! A collaborative effort with City ENRO and Puerto Princesa Este Municipal Office.",
    status: "upcoming",
    partners: ["City ENRO", "Puerto Princesa Este Municipal Office"],
  },
  {
    id: "2",
    title: "Wellness Beyond Walls",
    description:
      "Hygiene, Education, and Recreation for Women Deprived of Liberty",
    status: "completed",
    date: "2024",
  },
  {
    id: "3",
    title: "Amos Tara! Magpaturi Kita! Magpatuli para Pogi Year 3",
    description: "Community health initiative",
    status: "completed",
    date: "2024",
  },
  {
    id: "4",
    title: "Self Defense Workshop",
    description: "Empowering community members with self-defense skills",
    status: "completed",
    date: "2024",
  },
  {
    id: "5",
    title: "Kabataan for Health",
    description: "Youth health awareness and wellness program",
    status: "completed",
    date: "2024",
  },
];

export default function EventsPage() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "upcoming":
        return <Badge variant="accent">Upcoming</Badge>;
      case "completed":
        return <Badge variant="success">Completed</Badge>;
      default:
        return <Badge variant="default">Upcoming</Badge>;
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-gray-900 mb-4">Events</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Our community initiatives and projects that make a positive impact
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event, index) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
          >
            <Card className="h-full hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  {getStatusBadge(event.status)}
                </div>
                <CardTitle className="text-xl">{event.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="space-y-2">
                  {event.date && (
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      {event.date}
                      {event.time && ` • ${event.time}`}
                    </div>
                  )}
                  {event.location && (
                    <div className="flex items-center text-sm text-gray-500">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.location}
                    </div>
                  )}
                  {event.partners && (
                    <div className="flex items-start text-sm text-gray-500 mt-2">
                      <Leaf className="h-4 w-4 mr-2 mt-0.5" />
                      <div>
                        <p className="font-semibold mb-1">Partners:</p>
                        <ul className="list-disc list-inside">
                          {event.partners.map((partner, i) => (
                            <li key={i}>{partner}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

