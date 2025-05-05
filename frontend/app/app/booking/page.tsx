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

export default function Book() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <>
      <Header />
      <main className="container mx-auto py-8 px-4">
        <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Register</h1>
          <p className="text-gray-500 text-center mb-6">Start the journey with us today.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
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
                      hasDisability: Boolean(checked), // Convert CheckedState to boolean
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
                />
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700">
              Submit
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}