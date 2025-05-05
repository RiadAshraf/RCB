"use client";

import { useRouter } from "next/navigation";

// This function checks if a user is logged in and either navigates to the target route
// or shows the login popup if not authenticated
export const navigateIfAuthenticated = (
  router: any, 
  targetRoute: string, 
  isLoggedIn: boolean, 
  showLoginPopup: () => void
) => {
  if (isLoggedIn) {
    // User is logged in, navigate to the requested route
    router.push(targetRoute);
  } else {
    // User is not logged in, show an alert message
    alert("You need to log in before Registering for Marathon");
    
    // Show the login popup after the alert
    showLoginPopup();
    
    // Store the intended destination to redirect after login
    sessionStorage.setItem('redirectAfterLogin', targetRoute);
  }
};

// This function handles navigation after successful login
export const handlePostLoginRedirect = (router: any) => {
  // Check if there's a stored redirect URL
  const redirectUrl = sessionStorage.getItem('redirectAfterLogin');
  if (redirectUrl) {
    sessionStorage.removeItem('redirectAfterLogin');
    router.push(redirectUrl);
  }
};