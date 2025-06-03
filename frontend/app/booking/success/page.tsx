"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { CheckCircle2, Printer, Home, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface RegistrationDetails {
  id: number;
  status: string;
  date: string;
  runner: {
    id: number;
    name: string;
    email: string;
  };
  event: {
    id: number;
    name: string;
    date: string;
  };
  category: {
    id: number;
    name: string;
    distance: number;
    unit: string;
  };
  payment: {
    id: number;
    amount: number;
    status: string;
    method: string;
    transactionId: string;
  };
}

export default function RegistrationSuccess() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const registrationId = searchParams.get("id");
  const [loading, setLoading] = useState(true);
  const [registrationDetails, setRegistrationDetails] = useState<RegistrationDetails | null>(null);

  useEffect(() => {
    if (!registrationId) {
      router.push("/booking");
      return;
    }

    // Normally, you would fetch registration details from the API
    // For now, let's simulate it with a timeout
    const fetchData = async () => {
      try {
        // Uncomment this when you have an actual API endpoint
        // const response = await fetch(`/api/registration/${registrationId}`);
        // const data = await response.json();
        // setRegistrationDetails(data.data);

        // For now, simulate a successful API response
        setTimeout(() => {
          setRegistrationDetails({
            id: parseInt(registrationId),
            status: "confirmed",
            date: new Date().toISOString(),
            runner: {
              id: 1,
              name: "John Doe",
              email: "john.doe@example.com"
            },
            event: {
              id: 1,
              name: "Dhaka Marathon 2025",
              date: "2025-03-15"
            },
            category: {
              id: 3,
              name: "Half Marathon",
              distance: 21.0975,
              unit: "km"
            },
            payment: {
              id: 1,
              amount: 1500,
              status: "completed",
              method: "bKash",
              transactionId: "BKH1234567890"
            }
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching registration details:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [registrationId, router]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className="container mx-auto py-16 px-4 min-h-screen">
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
            <div className="animate-pulse">
              <div className="h-12 bg-gray-200 rounded mb-6"></div>
              <div className="h-32 bg-gray-200 rounded mb-6"></div>
              <div className="h-12 bg-gray-200 rounded"></div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!registrationDetails) {
    return (
      <>
        <Header />
        <main className="container mx-auto py-16 px-4 min-h-screen">
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
            <h1 className="text-2xl font-bold mb-4 text-red-600">Registration Not Found</h1>
            <p className="mb-6">
              We couldn't find the registration details you're looking for. Please try again or contact support.
            </p>
            <Button onClick={() => router.push("/booking")}>
              Return to Registration
            </Button>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container mx-auto py-8 px-4 min-h-screen">
        <div className="max-w-2xl mx-auto bg-white p-6 sm:p-8 rounded-lg shadow-md print:shadow-none">
          {/* Success Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <CheckCircle2 className="h-16 w-16 text-green-500" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Registration Successful!</h1>
            <p className="text-gray-600 mt-2">
              Your registration has been confirmed and your spot is reserved.
            </p>
          </div>

          {/* Registration ID */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="font-semibold text-green-800">Registration ID</h2>
              <p className="text-2xl font-bold text-green-700">#{registrationDetails.id}</p>
            </div>
            <div className="mt-3 sm:mt-0">
              <p className="text-sm text-green-700">Status: <span className="font-semibold capitalize">{registrationDetails.status}</span></p>
              <p className="text-sm text-green-700">Date: {new Date(registrationDetails.date).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Event Details */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 text-gray-800 border-b pb-2">Event Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700">Event</h3>
                <p>{registrationDetails.event.name}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Event Date</h3>
                <p>{new Date(registrationDetails.event.date).toLocaleDateString()}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Category</h3>
                <p>{registrationDetails.category.name}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Distance</h3>
                <p>{registrationDetails.category.distance} {registrationDetails.category.unit}</p>
              </div>
            </div>
          </div>

          {/* Runner Details */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-3 text-gray-800 border-b pb-2">Runner Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700">Name</h3>
                <p>{registrationDetails.runner.name}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Email</h3>
                <p>{registrationDetails.runner.email}</p>
              </div>
            </div>
          </div>

          {/* Payment Details */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-3 text-gray-800 border-b pb-2">Payment Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-gray-700">Amount</h3>
                <p>৳{registrationDetails.payment.amount}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Payment Method</h3>
                <p>{registrationDetails.payment.method}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Transaction ID</h3>
                <p>{registrationDetails.payment.transactionId}</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-700">Status</h3>
                <p className="capitalize">{registrationDetails.payment.status}</p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <h2 className="font-semibold text-blue-800 mb-2">What's Next?</h2>
            <ul className="list-disc list-inside text-blue-700 space-y-1">
              <li>Check your email for a confirmation</li>
              <li>Add the event to your calendar</li>
              <li>Join our community on social media for updates</li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 print:hidden">
            <Button 
              onClick={handlePrint}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-800"
            >
              <Printer size={16} />
              Print Receipt
            </Button>
            <Button 
              onClick={() => router.push("/")}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Home size={16} />
              Back to Home
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}