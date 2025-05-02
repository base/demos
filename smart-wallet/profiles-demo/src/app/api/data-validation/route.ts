// app/api/data-validation/route.ts
export async function POST(request: Request) {
    // Get the data from the request body
    const requestData = await request.json();
    
    try {
      // Extract data from the callback request
      const email = requestData.capabilities?.dataCallback?.email;
      const physicalAddress = requestData.capabilities?.dataCallback?.physicalAddress?.physicalAddress;
      
      const errors: Record<string, any> = {};
      
      // Example validation check for email
      if (email && email.endsWith("@example.com")) {
        errors.email = "Example.com emails are not allowed";
      }
      
      // Example validation for physical address
      if (physicalAddress) {
        // Check postal code validation - for example, require specific format
        if (physicalAddress.postalCode && 
           (physicalAddress.postalCode.length < 5 || physicalAddress.postalCode.length > 10)) {
          if (!errors.physicalAddress) errors.physicalAddress = {};
          errors.physicalAddress.postalCode = "Invalid postal code format";
        }
        
        // Check country validation - for example, only allow certain countries
        if (physicalAddress.countryCode && physicalAddress.countryCode === "XY") {
          if (!errors.physicalAddress) errors.physicalAddress = {};
          errors.physicalAddress.countryCode = "We don't ship to this country";
        }
        
        // Check city validation
        if (physicalAddress.city && physicalAddress.city.toLowerCase() === "restricted") {
          if (!errors.physicalAddress) errors.physicalAddress = {};
          errors.physicalAddress.city = "We don't ship to this city";
        }
      }
      
      // If there are validation errors, return them
      if (Object.keys(errors).length > 0) {
        return Response.json({ errors });
      }
      
      // If all validations pass, return success
      return Response.json({
        success: true
      });
      
    } catch (error) {
      console.error("Error processing data validation:", error);
      return Response.json({
        errors: {
          server: "Server error validating data"
        }
      });
    }
  }