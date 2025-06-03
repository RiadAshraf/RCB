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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  MoreHorizontal, 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Calendar,
  AlertCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Define the event interface based on the API response
interface Event {
  eventId: number;
  name: string;
  description: string;
  eventDate: string;
  location: string;
  startTime: string;
  registrationOpenDate: string;
  registrationCloseDate: string;
  maxParticipants: number;
  websiteUrl: string;
  eventStatus: string;
  displayOrder: number;
  isFeatured: boolean;
  created_at: string;
  updated_at: string;
  registrations?: number; // This might come from a different API endpoint
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Get API base URL from environment variables with fallback
        const apiBaseUrl = process.env.BACKEND_URL || 'http://localhost:5000';
        
        // Build the API URL with query parameters
        let apiUrl = `${apiBaseUrl}/api/events`;
        if (statusFilter && statusFilter !== 'all') {
          apiUrl += `?eventStatus=${statusFilter}`;
        }
        
        console.log('Fetching events from:', apiUrl);
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch events: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        
        // Check if data has the expected structure
        if (Array.isArray(data) || Array.isArray(data.data)) {
          const eventsData = Array.isArray(data) ? data : data.data;
          
          // Map the API response to include registration counts
          // In a real app, you might need to fetch this separately or it might be included
          const eventsWithRegistrations = eventsData.map((event: Event) => ({
            ...event,
            registrations: event.registrations || 0 // Default to 0 if not provided
          }));
          
          setEvents(eventsWithRegistrations);
        } else {
          console.error('Unexpected API response format:', data);
          setError('Received invalid data format from the server');
        }
      } catch (error) {
        console.error('Error fetching events:', error);
        setError(error instanceof Error ? error.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    };
    
    fetchEvents();
  }, [statusFilter]);

  const handleSignOut = () => {
    // Handle sign out logic
    console.log("Signing out...");
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        const response = await fetch(`/api/events/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          throw new Error('Failed to delete event');
        }
        
        // Remove the deleted event from the state
        setEvents(events.filter(event => event.eventId !== id));
        console.log(`Deleted event ${id}`);
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('Failed to delete event. Please try again.');
      }
    }
  };

  const filteredEvents = events.filter(event => 
    (event.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
     event.location?.toLowerCase().includes(searchQuery.toLowerCase()))
  );

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
      {/* Reusable Admin Navigation Component */}
      <AdminNavigation onSignOut={handleSignOut} />

      <div className="flex">
        {/* Main Content */}
        <main className="flex-1 md:ml-64 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold">Events</h1>
                <p className="text-gray-500">Manage all your marathon events</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link href="/admin/events/new">
                  <Button className="flex items-center gap-1">
                    <Plus size={16} />
                    Add New Event
                  </Button>
                </Link>
              </div>
            </header>

            {/* Search and Filters */}
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input 
                      placeholder="Search events..." 
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  <div>
                    <Select 
                      value={statusFilter}
                      onValueChange={setStatusFilter}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Filter by status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Events</SelectItem>
                        <SelectItem value="upcoming">Upcoming</SelectItem>
                        <SelectItem value="in_progress">In Progress</SelectItem>
                        <SelectItem value="finished">Finished</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

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

            {/* Events Table */}
            <Card>
              <CardHeader>
                <CardTitle>All Events</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="animate-pulse space-y-4">
                    <div className="h-10 bg-gray-200 rounded w-full"></div>
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="h-16 bg-gray-200 rounded w-full"></div>
                    ))}
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Event Name</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Location</TableHead>
                          <TableHead>Registration Period</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredEvents.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                              No events found. Try a different search or create a new event.
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredEvents.map((event) => (
                            <TableRow key={event.eventId}>
                              <TableCell className="font-medium">
                                <Link href={`/admin/events/${event.eventId}`} className="hover:underline">
                                  {event.name}
                                </Link>
                                {event.isFeatured && (
                                  <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 rounded-full text-xs">
                                    Featured
                                  </span>
                                )}
                              </TableCell>
                              <TableCell>{formatDate(event.eventDate)}</TableCell>
                              <TableCell>{event.location}</TableCell>
                              <TableCell>
                                <span className="text-xs text-gray-500">
                                  {formatDate(event.registrationOpenDate)} - {formatDate(event.registrationCloseDate)}
                                </span>
                              </TableCell>
                              <TableCell>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                  event.eventStatus === 'upcoming' 
                                    ? 'bg-green-100 text-green-800' 
                                    : event.eventStatus === 'in_progress'
                                    ? 'bg-blue-100 text-blue-800'
                                    : event.eventStatus === 'finished'
                                    ? 'bg-gray-100 text-gray-800'
                                    : 'bg-red-100 text-red-800'
                                }`}>
                                  {event.eventStatus.charAt(0).toUpperCase() + event.eventStatus.slice(1).replace('_', ' ')}
                                </span>
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
                                      <Link href={`/admin/events/${event.eventId}`} className="flex w-full items-center">
                                        <Calendar className="mr-2 h-4 w-4" />
                                        View Details
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Link href={`/admin/events/${event.eventId}/edit`} className="flex w-full items-center">
                                        <Edit className="mr-2 h-4 w-4" />
                                        Edit
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={() => handleDelete(event.eventId)}>
                                      <Trash2 className="mr-2 h-4 w-4" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}