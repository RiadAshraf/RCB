"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AdminNavigation from "@/components/admin/AdminNavigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Calendar, MapPin, Globe, Users } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const eventFormSchema = z.object({
        name: z.string().min(3, { message: "Event name must be at least 3 characters." }),
        description: z.string().min(10, { message: "Description must be at least 10 characters." }),
        eventDate: z.string().refine((date: string): boolean => !isNaN(Date.parse(date)), {
                message: "Please enter a valid date."
        }),
        location: z.string().min(3, { message: "Location is required." }),
        startTime: z.string(),
        registrationOpenDate: z.string().refine((date: string): boolean => !isNaN(Date.parse(date)), {
                message: "Please enter a valid date."
        }),
        registrationCloseDate: z.string(),
        maxParticipants: z.coerce.number().int().positive().min(1),
        eventStatus: z.enum(["upcoming", "in_progress", "finished", "cancelled"]),
        displayOrder: z.coerce.number().int().nonnegative(),
        isFeatured: z.boolean(),
        websiteUrl: z.string().url({ message: "Please enter a valid URL" }).optional(),
}).refine((data) => {
        const closeDate = new Date(data.registrationCloseDate);
        const openDate = new Date(data.registrationOpenDate);
        return closeDate > openDate;
}, {
        message: "Registration close date must be after open date.",
        path: ["registrationCloseDate"]
});

type EventFormValues = z.infer<typeof eventFormSchema>;

export default function NewEventPage() {
  // Set default values for the form
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  const defaultValues: Partial<EventFormValues> = {
    eventStatus: "upcoming" as const,
    displayOrder: 1,
    isFeatured: false,
    startTime: "06:00:00",
    maxParticipants: 1000,
  };

  const form = useForm<EventFormValues>({
    resolver: zodResolver(eventFormSchema),
    defaultValues,
  });

  const onSubmit = async (data: EventFormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const apiBaseUrl = process.env.BACKEND_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBaseUrl}/api/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || `Failed to create event: ${response.status}`
        );
      }

      // Navigate back to events list on success
      router.push('/admin/events');
      router.refresh(); // Refresh the page to show the new event
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error creating event:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavigation />

      <div className="flex">
        <main className="flex-1 md:ml-64 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-6">
              <Button
                variant="ghost"
                onClick={handleCancel}
                className="mr-4"
              >
                <ArrowLeft className="h-5 w-5 mr-1" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Create New Event</h1>
                <p className="text-gray-500">Add a new marathon event to your platform</p>
              </div>
            </div>

            {error && (
              <Alert variant="destructive" className="mb-6">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Event Details</CardTitle>
                    <CardDescription>
                      Basic information about the event
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g. Dhaka Marathon 2025"
                              className="placeholder:text-gray-400 border-gray-300" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            The full name of the event as it will appear to participants
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="Describe the event..."
                              className="min-h-32 placeholder:text-gray-400 border-gray-300"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            Provide details about the event, route, or special features
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="eventDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Event Date</FormLabel>
                            <FormControl>
                              <div className="flex">
                                <Calendar className="w-4 h-4 text-gray-500 mr-2 mt-3" />
                                <Input 
                                  type="date" 
                                  className="border-gray-300"
                                  {...field} 
                                />
                              </div>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="startTime"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Start Time</FormLabel>
                            <FormControl>
                              <Input 
                                type="time" 
                                step="1" 
                                className="border-gray-300"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <div className="flex">
                              <MapPin className="w-4 h-4 text-gray-500 mr-2 mt-3" />
                              <Input 
                                placeholder="e.g. Dhaka, Bangladesh" 
                                className="placeholder:text-gray-400 border-gray-300" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            City or specific location where the event will take place
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="websiteUrl"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Website URL (Optional)</FormLabel>
                          <FormControl>
                            <div className="flex">
                              <Globe className="w-4 h-4 text-gray-500 mr-2 mt-3" />
                              <Input 
                                placeholder="https://example.com" 
                                className="placeholder:text-gray-400 border-gray-300" 
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Official website for the event if available
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Registration Settings</CardTitle>
                    <CardDescription>
                      Configure registration period and capacity
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="registrationOpenDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Registration Open Date</FormLabel>
                            <FormControl>
                              <Input 
                                type="date" 
                                className="border-gray-300"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="registrationCloseDate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Registration Close Date</FormLabel>
                            <FormControl>
                              <Input 
                                type="date" 
                                className="border-gray-300"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="maxParticipants"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Maximum Participants</FormLabel>
                          <FormControl>
                            <div className="flex">
                              <Users className="w-4 h-4 text-gray-500 mr-2 mt-3" />
                              <Input 
                                type="number" min="1" 
                                className="placeholder:text-gray-400 border-gray-300" 
                                {...field} />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Set a limit for the total number of registrations
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Event Status & Display</CardTitle>
                    <CardDescription>
                      Configure how the event appears on the platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="eventStatus"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Status</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="border-gray-300">
                                <SelectValue placeholder="Select event status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="upcoming">Upcoming</SelectItem>
                              <SelectItem value="in_progress">In Progress</SelectItem>
                              <SelectItem value="finished">Finished</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            Current status of the event
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="displayOrder"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Display Order</FormLabel>
                          <FormControl>
                            <Input type="number" min="0" 
                            className="placeholder:text-gray-400 border-gray-300" 
                            {...field} />
                          </FormControl>
                          <FormDescription>
                            Lower numbers will appear first in listings
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="isFeatured"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                              className="border-2 border-gray-300 data-[state=checked]:border-primary"
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>
                              Feature this event
                            </FormLabel>
                            <FormDescription>
                              Featured events appear prominently on the homepage
                            </FormDescription>
                          </div>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : "Create Event"}
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        </main>
      </div>
    </div>
  );
}