"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { motion } from "framer-motion";
import { Calendar, MapPin, Leaf, Image as ImageIcon, Plus, X, Upload } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@/components/auth-provider";
import { createClient } from "@/lib/supabase/client";
import type { Event } from "@/types/database";

export default function EventsPage() {
  const { user } = useAuth();
  const supabase = createClient();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "completed" as "upcoming" | "completed",
    date: "",
    time: "",
    location: "",
    partners: "",
    images: [] as string[],
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    checkAdminStatus();
    loadEvents();
  }, [user]);

  const checkAdminStatus = async () => {
    if (!user) {
      setIsAdmin(false);
      return;
    }

    try {
      const { data } = await supabase
        .from("profiles")
        .select("role")
        .eq("user_id", user.id)
        .single();

      if (data?.role === "admin") {
        setIsAdmin(true);
      }
    } catch (error) {
      console.error("Error checking admin status:", error);
    }
  };

  const loadEvents = async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setEvents(data || []);
    } catch (error) {
      console.error("Error loading events:", error);
    } finally {
      setLoading(false);
    }
  };

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

  const openImageDialog = (event: Event, imageIndex: number = 0) => {
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
        prev < selectedEvent.images!.length - 1 ? prev + 1 : 0
      );
    }
  };

  const prevImage = () => {
    if (selectedEvent && selectedEvent.images) {
      setSelectedImageIndex((prev) => 
        prev > 0 ? prev - 1 : selectedEvent.images!.length - 1
      );
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Validate file types
    const validFiles = files.filter((file) => {
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!validTypes.includes(file.type)) {
        alert(`${file.name} is not a valid image file. Please upload JPEG, PNG, WebP, or GIF images.`);
        return false;
      }
      // Check file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert(`${file.name} is too large. Maximum file size is 5MB.`);
        return false;
      }
      return true;
    });
    
    setImageFiles((prev) => [...prev, ...validFiles]);
    
    // Create preview URLs for display
    const previewUrls = validFiles.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...previewUrls],
    }));
  };

  const removeImage = (index: number) => {
    // Revoke object URL to free memory
    if (formData.images[index]?.startsWith('blob:')) {
      URL.revokeObjectURL(formData.images[index]);
    }
    
    setImageFiles((prev) => prev.filter((_, i) => i !== index));
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !isAdmin) return;

    setSubmitting(true);
    try {
      // Upload images to Supabase Storage
      const uploadedImageUrls: string[] = [];
      
      for (let i = 0; i < imageFiles.length; i++) {
        const file = imageFiles[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
        const filePath = `${user.id}/${fileName}`;

        // Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from('event-images')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (uploadError) {
          console.error('Error uploading image:', uploadError);
          throw new Error(`Failed to upload ${file.name}: ${uploadError.message}`);
        }

        // Get public URL
        const { data: urlData } = supabase.storage
          .from('event-images')
          .getPublicUrl(filePath);

        if (urlData?.publicUrl) {
          uploadedImageUrls.push(urlData.publicUrl);
        }
      }

      const allImageUrls = uploadedImageUrls;

      // Create event in database
      const { error } = await supabase
        .from("events")
        .insert({
          title: formData.title,
          description: formData.description,
          status: formData.status,
          date: formData.date || null,
          time: formData.time || null,
          location: formData.location || null,
          partners: formData.partners
            ? formData.partners.split(",").map((p) => p.trim()).filter(Boolean)
            : null,
          images: allImageUrls.length > 0 ? allImageUrls : null,
          created_by: user.id,
        });

      if (error) throw error;

      // Clean up preview URLs
      formData.images.forEach((url) => {
        if (url.startsWith('blob:')) {
          URL.revokeObjectURL(url);
        }
      });

      // Reset form
      setFormData({
        title: "",
        description: "",
        status: "completed",
        date: "",
        time: "",
        location: "",
        partners: "",
        images: [],
      });
      setImageFiles([]);
      setIsCreateDialogOpen(false);
      loadEvents();
    } catch (error) {
      console.error("Error creating event:", error);
      alert(error instanceof Error ? error.message : "Failed to create event. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading events...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1"></div>
          <div className="flex-1 text-center">
            <h1 className="text-5xl font-bold text-secondary mb-4">Events</h1>
            <p className="text-xl text-secondary/80 max-w-3xl mx-auto">
              Our community initiatives and projects that make a positive impact
            </p>
          </div>
          <div className="flex-1 flex justify-end">
            {isAdmin && (
              <Button
                onClick={() => setIsCreateDialogOpen(true)}
                className="bg-[#0097D7] hover:bg-[#0077B6] text-white"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Event
              </Button>
            )}
          </div>
        </div>
      </motion.div>

      {events.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No events found.</p>
          {isAdmin && (
            <p className="text-gray-500 mt-2">Click "Add Event" to create your first event.</p>
          )}
        </div>
      ) : (
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
                    {event.partners && event.partners.length > 0 && (
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
      )}

      {/* Create Event Dialog */}
      {isAdmin && (
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Create New Event</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Title *
                </label>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  maxLength={500}
                  placeholder="Event title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description *
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  maxLength={2000}
                  rows={4}
                  placeholder="Event description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Status *
                  </label>
                  <Select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as "upcoming" | "completed" })}
                    required
                  >
                    <option value="completed">Completed</option>
                    <option value="upcoming">Upcoming</option>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <Input
                    type="text"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="e.g., January 10, 2026"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <Input
                    type="text"
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    placeholder="e.g., 2:00 PM"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <Input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="Event location"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Partners (comma-separated)
                </label>
                <Input
                  type="text"
                  value={formData.partners}
                  onChange={(e) => setFormData({ ...formData, partners: e.target.value })}
                  placeholder="Partner 1, Partner 2, Partner 3"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Event Images
                </label>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md cursor-pointer hover:bg-gray-50 transition-colors">
                      <Upload className="h-4 w-4" />
                      <span className="text-sm">Upload Images</span>
                      <input
                        type="file"
                        accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                    <span className="text-xs text-gray-500">
                      Max 5MB per image. Formats: JPEG, PNG, WebP, GIF
                    </span>
                  </div>
                  
                  {formData.images.length > 0 && (
                    <div className="grid grid-cols-3 gap-3">
                      {formData.images.map((imageUrl, index) => (
                        <div key={index} className="relative group">
                          <div className="relative aspect-video rounded-md overflow-hidden border border-gray-300 bg-gray-100">
                            {imageUrl.startsWith('blob:') ? (
                              <img
                                src={imageUrl}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <Image
                                src={imageUrl}
                                alt={`Preview ${index + 1}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 33vw"
                              />
                            )}
                          </div>
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            aria-label="Remove image"
                          >
                            <X className="h-3 w-3" />
                          </button>
                          {imageFiles[index] && (
                            <p className="text-xs text-gray-500 mt-1 truncate" title={imageFiles[index].name}>
                              {imageFiles[index].name}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsCreateDialogOpen(false);
                    setFormData({
                      title: "",
                      description: "",
                      status: "completed",
                      date: "",
                      time: "",
                      location: "",
                      partners: "",
                      images: [],
                    });
                    setImageFiles([]);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={submitting}
                  className="bg-[#0097D7] hover:bg-[#0077B6] text-white"
                >
                  {submitting ? "Creating..." : "Create Event"}
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Image Dialog */}
      {selectedEvent && selectedEvent.images && selectedEvent.images.length > 0 && (
        <Dialog open={!!selectedEvent} onOpenChange={closeImageDialog}>
          <DialogContent onClose={closeImageDialog} className="max-w-4xl">
            <DialogHeader>
              <DialogTitle>{selectedEvent.title} - Documentation</DialogTitle>
            </DialogHeader>
            <div className="relative">
              <div className="relative w-full h-[60vh] bg-gray-100 rounded-lg overflow-hidden">
                <Image
                  src={selectedEvent.images[selectedImageIndex]}
                  alt={`${selectedEvent.title} - Image ${selectedImageIndex + 1}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1024px"
                  quality={90}
                />
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
