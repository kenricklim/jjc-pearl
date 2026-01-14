"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { Calendar, MapPin, Leaf, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

const events = [
  {
    id: "1",
    title: "PJJCI Old Guards Gala Night and 2nd Induction and Turnover Ceremonies JJC PP Perlas",
    description: "Gala night celebrating PJJCI Old Guards and the 2nd induction and turnover ceremonies of JJC PP Perlas",
    status: "completed",
    date: "January 10, 2026",
    images: ["/Events picture/Jan 10, 2026 _ PJJCI OLD GUARDS GALA NIGHT AND 2nd INDUCTION AND TURNOVER Ceremonies JJC PP PERLAS.png"],
  },
  {
    id: "2",
    title: "PJJCI Old Guards City Tour in PPC, Palawan",
    description: "City tour for PJJCI Old Guards exploring Puerto Princesa City, Palawan",
    status: "completed",
    date: "January 10, 2026",
    images: ["/Events picture/Jan 10, 2026_ PJJCI OLD GUARDS CITY TOUR IN PPC, PALAWAN.jpg"],
  },
  {
    id: "3",
    title: "PJJCI Old Guards and JJC PP Perlas Dinner Night",
    description: "Dinner night bringing together PJJCI Old Guards and JJC PP Perlas members",
    status: "completed",
    date: "January 9, 2026",
    images: ["/Events picture/Jan 9, 2026 _ PJJCI OLD GUARDS AND JJC PP PERLAS DINNER NIGHT.jpg"],
  },
  {
    id: "4",
    title: "Project Lingap - CSWD Group Home for Children, Brgy. Mangingisda, PPC",
    description: "Community service project at CSWD Group Home for Children in Brgy. Mangingisda, Puerto Princesa City",
    status: "completed",
    date: "January 9, 2026",
    images: ["/Events picture/Jan 9, 2026 _ Project Lingap ( CSWD GROUP HOME FOR CHILDREN, Brgy. Mangingisda, PPC)_.jpg"],
  },
  {
    id: "5",
    title: "Oplan Kaagapay - Tulong para sa mga Palaweno Apektado ng Bagyong Tino",
    description: "Relief operation for Palawenos affected by Typhoon Tino",
    status: "completed",
    date: "November 9, 2025",
    images: ["/Events picture/Nov 9, 2025 _ Oplan Kaagapay_ Tulong para sa mga Palaweno apektado ng bagyong Tino.jpg"],
  },
  {
    id: "6",
    title: "UNSDG 17 Goals Unlocked - Session 2",
    description: "Session 2 of the UNSDG 17 Goals Unlocked program",
    status: "completed",
    date: "November 2, 2025",
    images: ["/Events picture/Nov 2, 2025_ UNSDG 17 Goals unlocked_ Session 2.jpg"],
  },
  {
    id: "7",
    title: "Halloween Party - Fundraising Event",
    description: "Halloween party fundraising event for community causes",
    status: "completed",
    date: "October 31, 2025",
    images: ["/Events picture/Oct 31, 2025 _ Halloween Party_ Fundraising event.jpg"],
  },
  {
    id: "8",
    title: "Parliamentary Procedure and Project Planning Seminar",
    description: "Educational seminar on parliamentary procedure and effective project planning",
    status: "completed",
    date: "October 25, 2025",
    images: ["/Events picture/Oct 25, 2025 _ Parliamentary Procedure and Project Planning Seminar.jpg"],
  },
  {
    id: "9",
    title: "World Cleanup Day",
    description: "Participating in World Cleanup Day - a global movement to clean up the planet",
    status: "completed",
    date: "September 20, 2025",
    images: ["/Events picture/Sept 20, 2025 _ World Cleanup Day.jpg"],
  },
  {
    id: "10",
    title: "Teachers Day - Fundraising Event",
    description: "Fundraising event celebrating Teachers Day",
    status: "completed",
    date: "September 26, 2025",
    images: ["/Events picture/Sept 26, 2025 _Teachers day_ Fundraising Event.jpg"],
  },
  {
    id: "11",
    title: "Opportunity to Impact and General Membership Meeting",
    description: "General membership meeting and opportunity to impact event",
    status: "completed",
    date: "September 7, 2025",
    images: ["/Events picture/Sept 7,  2025_ opportunityto impact and general membershipmeeting.jpg"],
  },
  {
    id: "12",
    title: "Membership Seminar",
    description: "Educational seminar for new and prospective members",
    status: "completed",
    date: "July 5, 2025",
    images: ["/Events picture/July 5, 2025 _ Membership Seminar.jpg"],
  },
  {
    id: "13",
    title: "JJC PP Perlas 1st Induction and Turnover Ceremonies",
    description: "First induction and turnover ceremonies of JJC PP Perlas",
    status: "completed",
    date: "February 17, 2025",
    images: ["/Events picture/Feb 17, 2025 _ JJC PP PERLAS 1st Induction and Turnover Ceremonies.jpg"],
  },
  {
    id: "14",
    title: "Dinner for a Cause",
    description: "Fundraising dinner event for community causes",
    status: "completed",
    date: "February 14, 2025",
    images: ["/Events picture/Feb 14, 2025_ dinner for a cause.jpg"],
  },
  {
    id: "15",
    title: "General Membership Meeting and Opportunity to Impact",
    description: "General membership meeting and opportunity to impact event for members",
    status: "completed",
    date: "February 3, 2025",
    images: ["/Events picture/Feb 3, 2025 _ General Membership Meeting and Opportunity to Impact.jpg"],
  },
  {
    id: "16",
    title: "Wellness Behind the Wall - Hygiene, Education and Recreation for Women Deprived of Liberty",
    description: "Program providing hygiene, education, and recreation for women deprived of liberty",
    status: "completed",
    date: "January 29, 2025",
    images: ["/Events picture/Jan 29, 2025_ Wellness Behind the Wall_ Hygiene, Education and Recreation for women deprived of liberty.jpg"],
  },
  {
    id: "17",
    title: "Pasko na Sinta Kiao - Christmas Lantern for a Cause Year 3",
    description: "Annual Christmas lantern fundraising event - Year 3",
    status: "completed",
    date: "November 7, 2024",
    images: ["/Events picture/Nov 7, 2024 _ Pasko na Sinta Kiao_ Christmas Lantern for a Cause Year 3_.jpg"],
  },
  {
    id: "18",
    title: "Membership Seminar",
    description: "Educational seminar for new and prospective members",
    status: "completed",
    date: "September 15, 2024",
    images: ["/Events picture/Sept 15, 2024 _ Membership Seminar.jpg"],
  },
  {
    id: "19",
    title: "Kabataan for Health",
    description: "Youth health awareness and wellness program at Group Homes for Children, Brgy. Mangingisda, PPC",
    status: "completed",
    date: "April 14, 2024",
    images: ["/Events picture/April 14, 2024 _ Kabataan for Health ( Group Homes for Children, Brgy. Mangingisda, Ppc)_.jpg"],
  },
  {
    id: "20",
    title: "Outreach Initiative at Brgy. Conception, PPC (BATAK COMMUNITY)",
    description: "Community outreach and support initiative for the Batak community in Brgy. Conception, Puerto Princesa City",
    status: "completed",
    date: "March 19, 2024",
    images: ["/Events picture/March 19, 2024 _Outreach Initiative at Brgy. Conception, PPC ( BATAK COMMUNITY)_.jpg"],
  },
  {
    id: "21",
    title: "Halloween Party for a Cause",
    description: "Community Halloween celebration with a purpose - bringing joy and support to the community",
    status: "completed",
    date: "October 30, 2023",
    images: ["/Events picture/October 30, 2023 Halloween party for a cause_.jpg"],
  },
  {
    id: "22",
    title: "JCI Protocols and Project Planning Workshop",
    description: "Training workshop on JCI protocols and effective project planning for members",
    status: "completed",
    date: "October 7, 2023",
    images: ["/Events picture/October 7, 2023 JCI PROTOCOLS AND PROJECT PLANINGWORKSHOP_.jpg"],
  },
  {
    id: "23",
    title: "1st General Membership Meeting and 2nd Opportunity to Impact",
    description: "General membership meeting and opportunity to impact event for new and existing members",
    status: "completed",
    date: "2023",
    images: ["/Events picture/2023 1st General Membership Meeting and 2nd OpportunityTo impact.jpg"],
  },
  {
    id: "24",
    title: "Cake Tagal Kitang Hinihintay - Cake Raffle Year 6",
    description: "Annual cake raffle fundraising event - Year 6 of this beloved community tradition",
    status: "completed",
    date: "February 5, 2023",
    images: ["/Events picture/feb 05, 2023 _ Cake Tagal Kitang Hinihintay_ Cake Raffle Year 6_.jpg"],
  },
];

export default function EventsPage() {
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

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

  const openImageDialog = (event: typeof events[0], imageIndex: number = 0) => {
    if (event.images && event.images.length > 0) {
      setSelectedEvent(event);
      setSelectedImageIndex(imageIndex);
    }
  };

  const closeImageDialog = () => {
    setSelectedEvent(null);
    setSelectedImageIndex(0);
  };

  const nextImage = () => {
    if (selectedEvent && selectedEvent.images) {
      setSelectedImageIndex((prev) => 
        prev < selectedEvent.images.length - 1 ? prev + 1 : 0
      );
    }
  };

  const prevImage = () => {
    if (selectedEvent && selectedEvent.images) {
      setSelectedImageIndex((prev) => 
        prev > 0 ? prev - 1 : selectedEvent.images.length - 1
      );
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
        <h1 className="text-5xl font-bold text-secondary mb-4">Events</h1>
        <p className="text-xl text-secondary/80 max-w-3xl mx-auto">
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
            <Card className="h-full hover:shadow-lg transition-shadow overflow-hidden">
              {event.images && event.images.length > 0 && (
                <div className="relative w-full h-48 overflow-hidden bg-gray-100">
                  {event.id === "10" ? (
                    <img
                      src={event.images[0]}
                      alt={event.title}
                      className="w-full h-full object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={() => openImageDialog(event, 0)}
                      loading="eager"
                    />
                  ) : (
                    <Image
                      src={event.images[0]}
                      alt={event.title}
                      fill
                      className="object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                      onClick={() => openImageDialog(event, 0)}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      quality={90}
                      loading={index < 9 ? "eager" : "lazy"}
                      priority={index < 6}
                    />
                  )}
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-colors cursor-pointer" onClick={() => openImageDialog(event, 0)} />
                </div>
              )}
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
                  {event.images && event.images.length > 0 && (
                    <div className="mt-4">
                      <button
                        onClick={() => openImageDialog(event, 0)}
                        className="flex items-center gap-2 text-sm text-[#0097D7] hover:text-[#0077B6] transition-colors font-medium"
                      >
                        <ImageIcon className="h-4 w-4" />
                        View Documentation ({event.images.length} {event.images.length === 1 ? 'photo' : 'photos'})
                      </button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Image Dialog */}
      {selectedEvent && selectedEvent.images && selectedEvent.images.length > 0 && (
        <Dialog open={!!selectedEvent} onOpenChange={closeImageDialog}>
          <DialogContent onClose={closeImageDialog} className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedEvent.title} - Documentation</DialogTitle>
            </DialogHeader>
            <div className="relative">
              <div className="relative w-full h-[60vh] bg-gray-100 rounded-lg overflow-hidden">
                {selectedEvent.id === "10" ? (
                  <img
                    src={selectedEvent.images[selectedImageIndex]}
                    alt={`${selectedEvent.title} - Image ${selectedImageIndex + 1}`}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <Image
                    src={selectedEvent.images[selectedImageIndex]}
                    alt={`${selectedEvent.title} - Image ${selectedImageIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
                    unoptimized={selectedEvent.id === "11"}
                  />
                )}
              </div>
              {selectedEvent.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    aria-label="Previous image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    aria-label="Next image"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                  <div className="mt-4 text-center text-sm text-gray-600">
                    Image {selectedImageIndex + 1} of {selectedEvent.images.length}
                  </div>
                </>
              )}
              {selectedEvent.images.length > 1 && (
                <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                  {selectedEvent.images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      className={`flex-shrink-0 relative w-20 h-20 rounded overflow-hidden border-2 ${
                        idx === selectedImageIndex ? 'border-[#0097D7]' : 'border-gray-300'
                      }`}
                    >
                      <Image
                        src={img}
                        alt={`Thumbnail ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="80px"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}

