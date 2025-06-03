"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import AdminNavigation from "@/components/admin/AdminNavigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { ArrowLeft, Clock, Ruler, DollarSign, Users } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Define the validation schema using Zod
const categoryFormSchema = z.object({
  name: z.string().min(2, { message: "Category name must be at least 2 characters." }),
  distance: z.coerce.number().positive({ message: "Distance must be a positive number." }),
  distanceUnit: z.enum(["km", "mi"], { 
    required_error: "Please select a distance unit." 
  }),
  startTime: z.string(),
  entryFee: z.coerce.number().int().nonnegative(),
  maxParticipants: z.coerce.number().int().positive().min(1),
  ageMin: z.coerce.number().int().nonnegative(),
  ageMax: z.coerce.number().int().positive(),
}).refine((data) => {
  return data.ageMax > data.ageMin;
}, {
  message: "Maximum age must be greater than minimum age.",
  path: ["ageMax"]
});

type CategoryFormValues = z.infer<typeof categoryFormSchema>;

// Sample race categories for preset selection
const racePresets = [
  { name: "Full Marathon", distance: 42.195, distanceUnit: "km" },
  { name: "Half Marathon", distance: 21.0975, distanceUnit: "km" },
  { name: "10K Run", distance: 10, distanceUnit: "km" },
  { name: "5K Run", distance: 5, distanceUnit: "km" },
  { name: "3K Fun Run", distance: 3, distanceUnit: "km" },
];

// Add this interface near your other type definitions (around line 55)
interface EventDetails {
  eventId: number;
  name: string;
  eventDate?: string;
  location?: string;
  eventStatus?: string;
  // Add other properties you might need from the event
}

export default function NewCategoryPage() {
  const params = useParams();
  const eventId = params.eventId as string;
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [eventDetails, setEventDetails] = useState<EventDetails | null>(null);
  const [eventLoading, setEventLoading] = useState(true);

  // Set default values for the form
  const defaultValues: Partial<CategoryFormValues> = {
    distanceUnit: "km",
    startTime: "06:00:00",
    entryFee: 1000,
    maxParticipants: 500,
    ageMin: 18,
    ageMax: 65,
  };

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues,
  });

  // Fetch event details to show event name in the header
  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setEventLoading(true);
        const apiBaseUrl = process.env.BACKEND_URL || 'http://localhost:5000';
        const response = await fetch(`${apiBaseUrl}/api/events/${eventId}`);
        
        if (!response.ok) {
          throw new Error("Failed to fetch event details");
        }
        
        const data = await response.json();
        setEventDetails(data);
      } catch (err) {
        console.error("Error fetching event:", err);
      } finally {
        setEventLoading(false);
      }
    };
    
    if (eventId) {
      fetchEventDetails();
    }
  }, [eventId]);

  const onSubmit = async (data: CategoryFormValues) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBaseUrl}/api/events/${eventId}/categories`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || `Failed to create category: ${response.status}`
        );
      }

      // Navigate back to categories list on success
      router.push(`/admin/categories`);
      router.refresh(); // Refresh the page to show the new category
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.error('Error creating category:', err);
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
                <h1 className="text-2xl md:text-3xl font-bold">Add New Race Category</h1>
                <p className="text-gray-500">
                  {eventLoading ? 'Loading event details...' : 
                   eventDetails ? `For event: ${eventDetails.name}` : 
                   `For event ID: ${eventId}`}
                </p>
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
                    <CardTitle>Category Details</CardTitle>
                    <CardDescription>
                      Basic information about the race category
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category Name</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g. Full Marathon"
                              className="placeholder:text-gray-400 border-gray-300" 
                              {...field} 
                            />
                          </FormControl>
                          <FormDescription>
                            The name of this race category as it will appear to participants
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="distance"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Distance</FormLabel>
                            <FormControl>
                              <div className="flex">
                                <Ruler className="w-4 h-4 text-gray-500 mr-2 mt-3" />
                                <Input 
                                  type="number" 
                                  step="0.01" 
                                  min="0" 
                                  placeholder="42.195"
                                  className="placeholder:text-gray-400 border-gray-300" 
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
                        name="distanceUnit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Unit</FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="border-gray-300">
                                  <SelectValue placeholder="Select unit" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="km">Kilometers (km)</SelectItem>
                                <SelectItem value="mi">Miles (mi)</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="startTime"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Start Time</FormLabel>
                          <FormControl>
                            <div className="flex">
                              <Clock className="w-4 h-4 text-gray-500 mr-2 mt-3" />
                              <Input 
                                type="time" 
                                step="1" 
                                className="border-gray-300"
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            What time does this category start? (Event&apos;s local time)
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
                      Configure entry fee and participant limits
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <FormField
                      control={form.control}
                      name="entryFee"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Entry Fee (in BDT)</FormLabel>
                          <FormControl>
                            <div className="flex">
                              <DollarSign className="w-4 h-4 text-gray-500 mr-2 mt-3" />
                              <Input 
                                type="number" 
                                min="0" 
                                className="border-gray-300"
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Registration fee for this category
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

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
                                type="number" 
                                min="1" 
                                className="border-gray-300"
                                {...field} 
                              />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Maximum number of participants allowed in this category
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="ageMin"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Minimum Age</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min="0" 
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
                        name="ageMax"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Maximum Age</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                min="1" 
                                className="border-gray-300"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="flex justify-end gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleCancel}
                    className="border-gray-300"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating..." : "Create Category"}
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