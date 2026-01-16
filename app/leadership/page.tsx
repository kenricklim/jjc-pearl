"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import Image from "next/image";

// Helper function to get image path for a member
const getMemberImage = (name: string): string | null => {
  const imageMap: Record<string, string> = {
    "Suzane Valdez": "Suzane Valdez.jpg",
    "Jessa Merl G. Terrado": "Jessa terrado.jpg",
    "Cristine V. Arzaga": "Cristine Arzaga.jpg",
    "Garry Loyd Lagan": "Garry Lagan.jpg",
    "Kaith Xyla Clarine Tanaleon": "Kaith Tanaelon.jpg",
    "Allysa Denise T. Ducay": "allyssa ducay.jpg",
    "Rosanie L. Eleazar": "Rosanie Eleazar.jpg",
    "Justine Jaye B. Delos Reyes": "Justine Jace Delos Reyes.jpg",
    "Yasmien Jade A. Aban": "Aba,  Yasmien.jpg",
    "Eremil C. Aborot": "Erimil aborot.jpg",
    "Arianna Avel T. Amora": "Arinna Amora.jpg",
    "Krisha Jane L. Fabrigas": "Krisha Jane Fabrigas.jpg",
    "Karen R. Garcellano": "Karen Garcellano.jpg",
  };
  
  const imageName = imageMap[name];
  return imageName ? `/bod-and-members/${imageName}` : null;
};

// Helper function to get custom object position for specific members
const getImagePosition = (name: string): string => {
  const positionMap: Record<string, string> = {
    "Eremil C. Aborot": "object-[center_top]", // Position to show face area at the top center
    "Suzane Valdez": "object-center", // Center the image for better clarity
  };
  
  return positionMap[name] || "";
};

const boardMembers = [
  {
    name: "Suzane Valdez",
    position: "President",
    category: "Executive",
  },
  {
    name: "Jessa Merl G. Terrado",
    position: "Immediate Past President",
    category: "Executive",
  },
  {
    name: "Cristine V. Arzaga",
    position: "Executive Vice-President",
    category: "Executive",
  },
  {
    name: "Kaith Xyla Clarine Tanaleon",
    position: "Vice President Internal",
    category: "Executive",
  },
  {
    name: "Garry Loyd Lagan",
    position: "Vice President External",
    category: "Executive",
  },
  {
    name: "Allysa Denise T. Ducay",
    position: "Secretary",
    category: "Executive",
  },
  {
    name: "Rosanie L. Eleazar",
    position: "Treasurer",
    category: "Executive",
  },
  {
    name: "Justine Jaye B. Delos Reyes",
    position: "Auditor",
    category: "Executive",
  },
  {
    name: "Yasmien Jade A. Aban",
    position: "Community Development Commissioner",
    category: "Commissioner",
  },
  {
    name: "Eremil C. Aborot",
    position: "Local Membership Extension Commissioner",
    category: "Commissioner",
  },
  {
    name: "Arianna Avel T. Amora",
    position: "Pres Relations Commissioner",
    category: "Commissioner",
  },
  {
    name: "Krisha Jane L. Fabrigas",
    position: "Local Skills Development Director",
    category: "Director",
  },
  {
    name: "Karen R. Garcellano",
    position: "Youth Development Commissioner",
    category: "Commissioner",
  },
];

const founders = [
  "Aborot, Ledith C",
  "Aborot, Eremil C Abia",
  "Bea Pamela",
  "Luzares, Rica May B.",
  "Sencil, Jessa G.",
  "Maloto, Kurt",
  "Hayagan, Mary Hope A",
  "Sotelo, Phoebe Andrea C.",
  "Bandoles, China Heart",
  "Eavila, Sofia Bianca",
  "Moreno, Rubylyn D",
  "Cacho, Lujille C",
  "Terrado, Jessa Merl",
  "Dobleros, Maria Pia Niña",
  "Recalde, Marriane B",
  "Apid, Kris Joy",
  "Lora, Agnes",
  "Caintapan, Stephanie B.",
  "Arzaga, Cristine V.",
  "Vallejo, Veve Jean S.",
];

export default function LeadershipPage() {
  const executives = boardMembers.filter((m) => m.category === "Executive");
  const commissioners = boardMembers.filter((m) => m.category === "Commissioner");
  const directors = boardMembers.filter((m) => m.category === "Director");

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-secondary mb-4">Leadership</h1>
        <p className="text-xl text-secondary/80 max-w-3xl mx-auto">
          2025-2026 Junior Jaycees Puerto Princesa Perlas Board of Directors
        </p>
      </motion.div>

      {/* Executive Board */}
      <section className="mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-secondary mb-8 text-center"
        >
          Executive Board
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {executives.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 overflow-hidden relative ${
                    member.name === "Suzane Valdez" ? "h-52 w-52" : "h-48 w-48"
                  }`}>
                    {getMemberImage(member.name) ? (
                      <Image
                        src={getMemberImage(member.name)!}
                        alt={member.name}
                        fill
                        className={`object-cover rounded-full ${getImagePosition(member.name)}`}
                        style={
                          member.name === "Eremil C. Aborot" 
                            ? { objectPosition: "center top" } 
                            : member.name === "Suzane Valdez"
                            ? { objectPosition: "center center", objectFit: "cover" }
                            : undefined
                        }
                        sizes={member.name === "Suzane Valdez" ? "208px" : "192px"}
                        quality={95}
                        priority={member.name === "Suzane Valdez"}
                      />
                    ) : (
                      <User className="h-12 w-12 text-primary" />
                    )}
                  </div>
                  <CardTitle className="text-center text-xl">{member.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-primary font-semibold">
                    {member.position}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Commissioners */}
      <section className="mb-16">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-gray-900 mb-8 text-center"
        >
          Commissioners & Directors
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...commissioners, ...directors].map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
            >
              <Card className="h-full hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 overflow-hidden relative ${
                    member.name === "Suzane Valdez" ? "h-52 w-52" : "h-48 w-48"
                  }`}>
                    {getMemberImage(member.name) ? (
                      <Image
                        src={getMemberImage(member.name)!}
                        alt={member.name}
                        fill
                        className={`object-cover rounded-full ${getImagePosition(member.name)}`}
                        style={
                          member.name === "Eremil C. Aborot" 
                            ? { objectPosition: "center top" } 
                            : member.name === "Suzane Valdez"
                            ? { objectPosition: "center center", objectFit: "cover" }
                            : undefined
                        }
                        sizes={member.name === "Suzane Valdez" ? "208px" : "192px"}
                        quality={95}
                        priority={member.name === "Suzane Valdez"}
                      />
                    ) : (
                      <User className="h-12 w-12 text-primary" />
                    )}
                  </div>
                  <CardTitle className="text-center text-xl">{member.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-center text-primary font-semibold">
                    {member.position}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Founders */}
      <section>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-secondary mb-4">Founding Members</h2>
          <p className="text-secondary/80">
            Created on March 12, 2023 by JCI Puerto Princesa Kiao Inc.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {founders.map((founder, index) => (
            <motion.div
              key={founder}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <Card>
                <CardContent className="p-4 text-center">
                  <p className="text-sm text-gray-700">{founder}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}

