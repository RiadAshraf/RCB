"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import AdminNavigation from "@/components/admin/AdminNavigation";
import { Button } from "@/components/ui/button";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { 
  MoreHorizontal, 
  Plus, 
  Edit, 
  Trash2,
  Tag,
  AlertCircle,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Define interfaces for our data
interface Event {
  eventId: number;
  name: string;
  eventDate: string;
  location: string;
  eventStatus: string;
}

interface Category {
  categoryId: number;
  eventId: number;
  name: string;
  distance: number;
  unit: string;
  maxParticipants?: number;
  currentParticipants?: number;
  registrationCount?: number;
}

// Add this interface after your other interfaces (around line 40)
interface CategoryApiResponse {
  categoryId: number;
  eventId?: number;
  name?: string;
  distance?: number;
  unit?: string;
  maxParticipants?: number;
  currentParticipants?: number;
  registrationCount?: number;
  // Add any other fields that might come from the API
}

// Group categories by event
interface EventWithCategories {
  event: Event;
  categories: Category[];
}

export default function CategoriesPage() {
  const [eventCategories, setEventCategories] = useState<EventWithCategories[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEventsAndCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get API base URL from environment variables with fallback
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        
        // Step 1: Fetch all events
        const eventsResponse = await fetch(`${apiBaseUrl}/api/events`);
        
        if (!eventsResponse.ok) {
          throw new Error(`Failed to fetch events: ${eventsResponse.status}`);
        }
        
        const eventsData = await eventsResponse.json();
        const eventsList = Array.isArray(eventsData) ? eventsData : eventsData.data || [];
        
        // Step 2: Fetch categories for each event
        const categoriesPromises = eventsList.map(async (event: Event) => {
          const categoriesResponse = await fetch(`${apiBaseUrl}/api/events/${event.eventId}/categories`);
          
          if (!categoriesResponse.ok) {
            console.warn(`Failed to fetch categories for event ${event.eventId}`);
            return { event, categories: [] };
          }
          
          const categoriesData = await categoriesResponse.json();
          const categoriesList = Array.isArray(categoriesData) 
            ? categoriesData 
            : categoriesData.data || [];
            
          return {
            event,
            categories: categoriesList.map((cat: CategoryApiResponse) => ({
              categoryId: cat.categoryId,
              eventId: event.eventId,
              name: cat.name || 'Unnamed Category',
              distance: cat.distance || 0,
              unit: cat.unit || 'km',
              maxParticipants: cat.maxParticipants,
              currentParticipants: cat.currentParticipants || 0,
              registrationCount: cat.registrationCount || 0
            }))
          };
        });
        
        const eventsWithCategories = await Promise.all(categoriesPromises);
        setEventCategories(eventsWithCategories);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error instanceof Error ? error.message : 'Failed to fetch data');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEventsAndCategories();
  }, []);

  const handleSignOut = () => {
    console.log("Signing out...");
  };

  const handleDelete = async (categoryId: number, eventId: number) => {
    if (confirm("Are you sure you want to delete this category?")) {
      try {
        const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const response = await fetch(`${apiBaseUrl}/api/events/${eventId}/categories/${categoryId}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error(`Failed to delete category: ${response.status}`);
        }
        
        // Update local state to remove the deleted category
        setEventCategories(prev => 
          prev.map(eventWithCats => ({
            ...eventWithCats,
            categories: eventWithCats.categories.filter(cat => 
              !(cat.categoryId === categoryId && cat.eventId === eventId)
            )
          }))
        );
        
        console.log(`Deleted category ${categoryId} from event ${eventId}`);
      } catch (error) {
        console.error('Error deleting category:', error);
        alert('Failed to delete category. Please try again.');
      }
    }
  };

  // Filter categories based on search query
  const filteredEventCategories = eventCategories;

  // Format date helper
  const formatDate = (dateString: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavigation onSignOut={handleSignOut} />

      <div className="flex">
        <main className="flex-1 md:ml-64 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Race Categories</h1>
                <p className="text-gray-500">Manage all your race distance categories</p>
              </div>
            </header>

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="mb-8">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Categories by Event */}
            {loading ? (
              <div className="animate-pulse space-y-6">
                {[...Array(3)].map((_, i) => (
                  <Card key={i}>
                    <CardHeader className="bg-gray-50">
                      <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="h-10 bg-gray-200 rounded w-full"></div>
                        {[...Array(3)].map((_, j) => (
                          <div key={j} className="h-16 bg-gray-200 rounded w-full"></div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : filteredEventCategories.length === 0 ? (
              <Card>
                <CardContent className="py-10 text-center">
                  <p className="text-gray-500">
                    No categories found. Add your first race category!
                  </p>
                  <div className="mt-4">
                    <Link href="/admin/categories/new">
                      <Button>
                        <Plus size={16} className="mr-2" />
                        Add New Category
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Accordion type="multiple" defaultValue={filteredEventCategories.map(e => `event-${e.event.eventId}`)}>
                {filteredEventCategories.map((eventWithCats) => (
                  <AccordionItem 
                    key={`event-${eventWithCats.event.eventId}`}
                    value={`event-${eventWithCats.event.eventId}`}
                    className="mb-4"
                  >
                    <Card>
                      <CardHeader className="pb-0 pt-4">
                        <AccordionTrigger className="py-2">
                          <div className="flex items-start w-full">
                            <div className="flex-1 text-left">
                              <h3 className="text-lg font-semibold">{eventWithCats.event.name}</h3>
                              <p className="text-sm text-gray-500">
                                {formatDate(eventWithCats.event.eventDate)} • {eventWithCats.event.location}
                              </p>
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              eventWithCats.event.eventStatus === 'upcoming' 
                                ? 'bg-green-100 text-green-800' 
                                : eventWithCats.event.eventStatus === 'in_progress'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                            }`}>
                              {eventWithCats.event.eventStatus.charAt(0).toUpperCase() + 
                                eventWithCats.event.eventStatus.slice(1).replace('_', ' ')}
                            </span>
                          </div>
                        </AccordionTrigger>
                      </CardHeader>

                      <AccordionContent>
                        <CardContent className="pt-4">
                          <div className="overflow-x-auto">
                            <Table>
                              <TableHeader>
                                <TableRow>
                                  <TableHead>Name</TableHead>
                                  <TableHead>Distance</TableHead>
                                  <TableHead>Registrations</TableHead>
                                  <TableHead>Capacity</TableHead>
                                  <TableHead className="text-right">Actions</TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {eventWithCats.categories.map((category) => (
                                  <TableRow key={`cat-${category.categoryId}`}>
                                    <TableCell className="font-medium">
                                      <div className="flex items-center gap-2">
                                        <Tag className="h-4 w-4 text-blue-600" />
                                        {category.name}
                                      </div>
                                    </TableCell>
                                    <TableCell>{category.distance} {category.unit}</TableCell>
                                    <TableCell>{category.registrationCount || 0}</TableCell>
                                    <TableCell>
                                      {category.currentParticipants || 0} / {category.maxParticipants || '∞'}
                                    </TableCell>
                                    <TableCell className="text-right">
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <Button variant="ghost" className="h-8 w-8 p-0">
                                            <span className="sr-only">Open menu</span>
                                            <MoreHorizontal className="h-4 w-4" />
                                          </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                          <DropdownMenuItem>
                                            <Link 
                                              href={`/admin/events/${category.eventId}/categories/${category.categoryId}/edit`} 
                                              className="flex w-full items-center"
                                            >
                                              <Edit className="mr-2 h-4 w-4" />
                                              Edit
                                            </Link>
                                          </DropdownMenuItem>
                                          <DropdownMenuItem 
                                            onClick={() => handleDelete(category.categoryId, category.eventId)}
                                          >
                                            <Trash2 className="mr-2 h-4 w-4" />
                                            Delete
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                          <div className="mt-4 flex justify-end">
                            <Link href={`/admin/events/${eventWithCats.event.eventId}/categories/new`}>
                              <Button variant="outline" size="sm" className="text-xs">
                                <Plus size={14} className="mr-1" />
                                Add Category to {eventWithCats.event.name}
                              </Button>
                            </Link>
                          </div>
                        </CardContent>
                      </AccordionContent>
                    </Card>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}