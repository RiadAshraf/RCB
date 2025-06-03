"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight } from "lucide-react";

// Define category interface
interface Category {
  id: number;
  name: string;
  distance: number;
  unit: string;
}

// First, define an interface for the API response
interface CategoryApiResponse {
  categoryId: number;
  name: string | null;
  distance: number | null;
  unit: string | null;
  // Add other possible fields that might come from the API
}

export default function Book() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  
  // Updated form state with all required fields
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    birthDate: "",
    sex: "",
    bloodGroup: "",
    allergies: "",
    medications: "",
    fitnessLevel: "",
    previousMarathons: "0",
    fathersName: "",
    mothersName: "",
    emergencyPhoneNumber: "",
    emergencyContactRelationship: "",
    emergencyContactEmail: "",
    isLocal: true,
    country: "Bangladesh",
    address: {
      Division: "",
      District: "",
      Upazilla: "",
      Thana: "",
    },
    hasDisability: false,
    disabilityDescription: "",
    eventId: "1", // Default event ID
    categoryId: "",
    paymentMethod: "bKash",
    transactionId: "",
    paymentAmount: "1500", // Default amount
    tShirtSize: "",
    additionalNotes: "",
  });

  // Fetch categories when component mounts
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const apiBaseUrl = process.env.BACKEND_URL || 'http://localhost:5000';
        const response = await fetch(`${apiBaseUrl}/api/events/${formData.eventId}/categories`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        
        const data = await response.json();
        console.log("Fetched categories:", data);
        if (Array.isArray(data.data)) {
          // Validate and sanitize category data
          const validCategories = data.data
            .map((item: CategoryApiResponse) => ({
              id: item.categoryId,
              name: item.name || 'Unnamed Category',
              distance: item.distance || 0,
              unit: item.unit || 'km'
            }));
          console.log("Valid categories:", validCategories);
          setCategories(validCategories);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoadingCategories(false);
      }
    };

    fetchCategories();
  }, [formData.eventId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.includes("address.")) {
      const addressField = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        address: {
          ...prev.address,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const validateFirstStep = () => {
    // Basic validation for first step
    if (
      formData.fullName.trim() === "" ||
      formData.email.trim() === "" ||
      formData.phoneNumber.trim() === "" ||
      formData.birthDate.trim() === "" ||
      formData.sex.trim() === "" ||
      formData.bloodGroup.trim() === "" ||
      formData.fitnessLevel.trim() === "" ||
      formData.tShirtSize.trim() === "" ||
      formData.categoryId === ""
    ) {
      alert("Please fill in all required fields");
      return false;
    }
    return true;
  };

  const nextStep = () => {
    if (validateFirstStep()) {
      setCurrentStep(2);
      // Scroll to top when moving to next step
      window.scrollTo(0, 0);
    }
  };

  const prevStep = () => {
    setCurrentStep(1);
    // Scroll to top when moving back
    window.scrollTo(0, 0);
  };

  // Generate bKash transaction ID
  const generateTransactionId = () => {
    return "BKH" + Math.floor(Math.random() * 10000000000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Generate transaction ID if not provided
    const transactionId = formData.transactionId || generateTransactionId();
    
    // Create API request body from form data
    const registrationData = {
      firstName: formData.fullName.split(' ')[0],
      lastName: formData.fullName.split(' ').slice(1).join(' '),
      email: formData.email,
      phone: formData.phoneNumber,
      dateOfBirth: formData.birthDate,
      gender: formData.sex.toLowerCase(),
      bloodType: formData.bloodGroup,
      medicalConditions: formData.hasDisability ? formData.disabilityDescription : "None",
      allergies: formData.allergies || "None",
      medications: formData.medications || "None",
      fitnessLevel: formData.fitnessLevel,
      previousMarathons: parseInt(formData.previousMarathons) || 0,
      emergencyContactName: formData.fathersName || formData.mothersName,
      emergencyContactRelationship: formData.emergencyContactRelationship,
      emergencyContactPhone: formData.emergencyPhoneNumber,
      emergencyContactEmail: formData.emergencyContactEmail || "",
      isLocal: formData.isLocal,
      country: formData.country,
      division: formData.address.Division || "",
      district: formData.address.District,
      upazilla: formData.address.Upazilla,
      eventId: parseInt(formData.eventId),
      categoryId: parseInt(formData.categoryId),
      paymentMethod: formData.paymentMethod,
      transactionId: transactionId,
      paymentAmount: parseFloat(formData.paymentAmount),
      paymentDate: new Date().toISOString(),
      tShirtSize: formData.tShirtSize,
      dietaryRequirements: "None", // We removed this from UI as requested
      additionalNotes: formData.additionalNotes || ""
    };

    try {
      const apiBaseUrl = process.env.BACKEND_URL || 'http://localhost:5000';
      const response = await fetch(`${apiBaseUrl}/api/registration`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registrationData),
      });

      const data = await response.json();
      
      if (data.success) {
        console.log("Registration successful:", data);
        router.push(`/booking/success?id=${data.data.registration.id}`);
      } else {
        console.error("Registration failed:", data);
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting registration:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const renderProgressBar = () => {
    return (
      <div className="mb-6">
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div
            className="bg-green-600 h-2.5 rounded-full transition-all duration-300"
            style={{ width: currentStep === 1 ? "50%" : "100%" }}
          ></div>
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span className={currentStep === 1 ? "font-bold" : ""}>Personal Information</span>
          <span className={currentStep === 2 ? "font-bold" : ""}>Family & Contact Details</span>
        </div>
      </div>
    );
  };

  // Step 1: Personal Information Form
  const renderStep1 = () => (
    <>
      {/* Full Name */}
      <div>
        <Label htmlFor="fullName" className="text-gray-700">
          Full Name
        </Label>
        <Input
          id="fullName"
          name="fullName"
          placeholder="Enter your name..."
          value={formData.fullName}
          onChange={handleChange}
          required
        />
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email" className="text-gray-700">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="Enter your email..."
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      {/* Phone Number */}
      <div>
        <Label htmlFor="phoneNumber" className="text-gray-700">
          Phone Number
        </Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          type="tel"
          placeholder="Enter your phone number..."
          value={formData.phoneNumber}
          onChange={handleChange}
          required
        />
      </div>

      {/* Birth Date */}
      <div>
        <Label htmlFor="birthDate" className="text-gray-700">
          Birth Date
        </Label>
        <Input
          id="birthDate"
          name="birthDate"
          type="date"
          value={formData.birthDate}
          onChange={handleChange}
          required
        />
      </div>

      {/* Gender */}
      <div>
        <Label htmlFor="sex" className="text-gray-700">
          Gender
        </Label>
        <Select
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              sex: value,
            }))
          }
          value={formData.sex}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Male">Male</SelectItem>
            <SelectItem value="Female">Female</SelectItem>
            <SelectItem value="Third Gender">Third Gender</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Blood Group */}
      <div>
        <Label htmlFor="bloodGroup" className="text-gray-700">
          Blood Group
        </Label>
        <Select
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              bloodGroup: value,
            }))
          }
          value={formData.bloodGroup}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Blood Group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="A+">A+</SelectItem>
            <SelectItem value="A-">A-</SelectItem>
            <SelectItem value="B+">B+</SelectItem>
            <SelectItem value="B-">B-</SelectItem>
            <SelectItem value="O+">O+</SelectItem>
            <SelectItem value="O-">O-</SelectItem>
            <SelectItem value="AB+">AB+</SelectItem>
            <SelectItem value="AB-">AB-</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Race Category */}
      <div>
        <Label htmlFor="categoryId" className="text-gray-700">
          Race Category
        </Label>
        <Select
          onValueChange={(value) => {
            setFormData((prev) => ({
              ...prev,
              categoryId: value,
            }));
          }}
          value={formData.categoryId}
          disabled={isLoadingCategories}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder={isLoadingCategories ? "Loading categories..." : "Select Race Category"} />
          </SelectTrigger>
          <SelectContent>
            {isLoadingCategories ? (
              <SelectItem value="loading" disabled>Loading categories...</SelectItem>
            ) : categories.length > 0 ? (
              // Add filtering to remove invalid categories and provide safe toString conversion
              categories
                .filter(category => category && category.id !== undefined)
                .map((category) => (
                  <SelectItem 
                    key={category.id} 
                    value={String(category.id)}
                  >
                    {category.name || 'Unnamed'} ({category.distance || 0} {category.unit || 'km'})
                  </SelectItem>
                ))
            ) : (
              <SelectItem value="no-categories" disabled>No categories available</SelectItem>
            )}
          </SelectContent>
        </Select>
      </div>

      {/* Fitness Level */}
      <div>
        <Label htmlFor="fitnessLevel" className="text-gray-700">
          Fitness Level
        </Label>
        <Select
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              fitnessLevel: value,
            }))
          }
          value={formData.fitnessLevel}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Fitness Level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Beginner">Beginner</SelectItem>
            <SelectItem value="Intermediate">Intermediate</SelectItem>
            <SelectItem value="Advanced">Advanced</SelectItem>
            <SelectItem value="Professional">Professional</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Previous Marathons */}
      <div>
        <Label htmlFor="previousMarathons" className="text-gray-700">
          Previous Marathons Participated
        </Label>
        <Input
          id="previousMarathons"
          name="previousMarathons"
          type="number"
          min="0"
          placeholder="Enter number of previous marathons..."
          value={formData.previousMarathons}
          onChange={handleChange}
        />
      </div>

      {/* T-Shirt Size */}
      <div>
        <Label htmlFor="tShirtSize" className="text-gray-700">
          T-Shirt Size
        </Label>
        <Select
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              tShirtSize: value,
            }))
          }
          value={formData.tShirtSize}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select T-Shirt Size" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="XS">XS</SelectItem>
            <SelectItem value="S">S</SelectItem>
            <SelectItem value="M">M</SelectItem>
            <SelectItem value="L">L</SelectItem>
            <SelectItem value="XL">XL</SelectItem>
            <SelectItem value="XXL">XXL</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Allergies */}
      <div>
        <Label htmlFor="allergies" className="text-gray-700">
          Allergies (if any)
        </Label>
        <Input
          id="allergies"
          name="allergies"
          placeholder="Enter any allergies..."
          value={formData.allergies}
          onChange={handleChange}
        />
      </div>

      {/* Medications */}
      <div>
        <Label htmlFor="medications" className="text-gray-700">
          Current Medications (if any)
        </Label>
        <Input
          id="medications"
          name="medications"
          placeholder="Enter any medications..."
          value={formData.medications}
          onChange={handleChange}
        />
      </div>

      {/* Local or International */}
      <div>
        <Label className="text-gray-700 flex items-center space-x-2">
          <Checkbox
            checked={formData.isLocal}
            onCheckedChange={(checked) =>
              setFormData((prev) => ({
                ...prev,
                isLocal: Boolean(checked),
              }))
            }
          />
          <span>I am a resident of Bangladesh</span>
        </Label>
      </div>

      {/* Next Button */}
      <Button
        type="button"
        className="w-full flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        onClick={nextStep}
      >
        Next <ArrowRight size={16} />
      </Button>
    </>
  );

  // Step 2: Family and Additional Information Form
  const renderStep2 = () => (
    <>
      {/* Father's Name */}
      <div>
        <Label htmlFor="fathersName" className="text-gray-700">
          Father&#39;s Name
        </Label>
        <Input
          id="fathersName"
          name="fathersName"
          placeholder="Enter your father&#39;s name..."
          value={formData.fathersName}
          onChange={handleChange}
          required
        />
      </div>

      {/* Mother's Name */}
      <div>
        <Label htmlFor="mothersName" className="text-gray-700">
          Mother&#39;s Name
        </Label>
        <Input
          id="mothersName"
          name="mothersName"
          placeholder="Enter your mother&#39;s name..."
          value={formData.mothersName}
          onChange={handleChange}
          required
        />
      </div>

      {/* Emergency Phone Number */}
      <div>
        <Label htmlFor="emergencyPhoneNumber" className="text-gray-700">
          Emergency Phone Number
        </Label>
        <Input
          id="emergencyPhoneNumber"
          name="emergencyPhoneNumber"
          type="tel"
          placeholder="Enter an emergency phone number..."
          value={formData.emergencyPhoneNumber}
          onChange={handleChange}
          required
        />
      </div>

      {/* Emergency Contact Relationship */}
      <div>
        <Label htmlFor="emergencyContactRelationship" className="text-gray-700">
          Relationship with Emergency Contact
        </Label>
        <Select
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              emergencyContactRelationship: value,
            }))
          }
          value={formData.emergencyContactRelationship}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Relationship" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Parent">Parent</SelectItem>
            <SelectItem value="Spouse">Spouse</SelectItem>
            <SelectItem value="Sibling">Sibling</SelectItem>
            <SelectItem value="Child">Child</SelectItem>
            <SelectItem value="Friend">Friend</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Emergency Contact Email */}
      <div>
        <Label htmlFor="emergencyContactEmail" className="text-gray-700">
          Emergency Contact Email (Optional)
        </Label>
        <Input
          id="emergencyContactEmail"
          name="emergencyContactEmail"
          type="email"
          placeholder="Enter emergency contact email..."
          value={formData.emergencyContactEmail}
          onChange={handleChange}
        />
      </div>

      {/* Address */}
      <div>
        <Label htmlFor="address.Division" className="text-gray-700">
          Division
        </Label>
        <Select
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              address: {
                ...prev.address,
                Division: value,
              },
            }))
          }
          value={formData.address.Division}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Division" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Dhaka">Dhaka</SelectItem>
            <SelectItem value="Chittagong">Chittagong</SelectItem>
            <SelectItem value="Rajshahi">Rajshahi</SelectItem>
            <SelectItem value="Khulna">Khulna</SelectItem>
            <SelectItem value="Barisal">Barisal</SelectItem>
            <SelectItem value="Sylhet">Sylhet</SelectItem>
            <SelectItem value="Rangpur">Rangpur</SelectItem>
            <SelectItem value="Mymensingh">Mymensingh</SelectItem>
          </SelectContent>
        </Select>

        <Label htmlFor="address.District" className="text-gray-700 mt-4">
          District
        </Label>
        <Input
          id="address.District"
          name="address.District"
          placeholder="Enter your district..."
          value={formData.address.District}
          onChange={handleChange}
          required
        />
        
        <Label htmlFor="address.Upazilla" className="text-gray-700 mt-4">
          Upazilla
        </Label>
        <Input
          id="address.Upazilla"
          name="address.Upazilla"
          placeholder="Enter your upazilla..."
          value={formData.address.Upazilla}
          onChange={handleChange}
          required
        />
        
        <Label htmlFor="address.Thana" className="text-gray-700 mt-4">
          Thana
        </Label>
        <Input
          id="address.Thana"
          name="address.Thana"
          placeholder="Enter your thana..."
          value={formData.address.Thana}
          onChange={handleChange}
          required
        />
      </div>

      {/* Payment Method */}
      <div>
        <Label htmlFor="paymentMethod" className="text-gray-700">
          Payment Method
        </Label>
        <Select
          onValueChange={(value) =>
            setFormData((prev) => ({
              ...prev,
              paymentMethod: value,
            }))
          }
          value={formData.paymentMethod}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Payment Method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bKash">bKash</SelectItem>
            <SelectItem value="Nagad">Nagad</SelectItem>
            <SelectItem value="Rocket">Rocket</SelectItem>
            <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Transaction ID - Only show if not auto-generated */}
      <div>
        <Label htmlFor="transactionId" className="text-gray-700">
          Transaction ID (Leave blank for auto-generation)
        </Label>
        <Input
          id="transactionId"
          name="transactionId"
          placeholder="Enter transaction ID if you have one..."
          value={formData.transactionId}
          onChange={handleChange}
        />
      </div>

      {/* Disability */}
      <div>
        <Label className="text-gray-700 flex items-center space-x-2">
          <Checkbox
            checked={formData.hasDisability}
            onCheckedChange={(checked) =>
              setFormData((prev) => ({
                ...prev,
                hasDisability: Boolean(checked),
              }))
            }
          />
          <span>Do you have any disability?</span>
        </Label>
        {formData.hasDisability && (
          <Textarea
            name="disabilityDescription"
            placeholder="Please describe your disability"
            value={formData.disabilityDescription}
            onChange={handleChange}
            className="mt-2"
          />
        )}
      </div>

      {/* Additional Notes */}
      <div>
        <Label htmlFor="additionalNotes" className="text-gray-700">
          Additional Notes (Optional)
        </Label>
        <Textarea
          id="additionalNotes"
          name="additionalNotes"
          placeholder="Any additional information you'd like to share..."
          value={formData.additionalNotes}
          onChange={handleChange}
        />
      </div>

      {/* Navigation Buttons */}
      <div className="flex gap-3">
        <Button
          type="button"
          className="w-1/2 flex items-center justify-center gap-2 bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600"
          onClick={prevStep}
        >
          <ArrowLeft size={16} /> Back
        </Button>
        <Button
          type="submit"
          className="w-1/2 flex items-center justify-center gap-2 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700"
        >
          Submit
        </Button>
      </div>
    </>
  );

  return (
    <>
      <Header />
      <main className="container mx-auto py-8 px-4 min-h-screen">
        <div className="max-w-lg mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-2 text-center text-gray-800">Register</h1>
          <p className="text-gray-500 text-center mb-4">
            {currentStep === 1
              ? "Step 1: Personal Information"
              : "Step 2: Family & Contact Details"}
          </p>

          {renderProgressBar()}

          <form onSubmit={handleSubmit} className="space-y-4">
            {currentStep === 1 ? renderStep1() : renderStep2()}
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}