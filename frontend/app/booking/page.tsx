"use client";

import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, ArrowRight } from "lucide-react"; // Add these icons

export default function Book() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    birthDate: "",
    sex: "",
    bloodGroup: "",
    fathersName: "",
    mothersName: "",
    emergencyPhoneNumber: "",
    address: {
      District: "",
      Upazilla: "",
      Thana: "",
    },
    hasDisability: false,
    disabilityDescription: "",
  });

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
      formData.bloodGroup.trim() === ""
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add your submission logic here
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

      {/* Address */}
      <div>
        <Label htmlFor="address.District" className="text-gray-700">
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