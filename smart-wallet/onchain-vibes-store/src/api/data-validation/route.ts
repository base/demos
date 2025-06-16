
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const requestData = await request.json();
 
  try {
    // Extract data from request
    const email = requestData.requestedInfo.email;
    const physicalAddress = requestData.requestedInfo.physicalAddress;
 
    const errors: any = {};
 
    // Example: Reject example.com emails
    if (email && email.endsWith("@example.com")) {
      errors.email = "Example.com emails are not allowed";
    }
 
    // Example: Validate physical address
    if (physicalAddress) {
      if (physicalAddress.postalCode && physicalAddress.postalCode.length < 5) {
        if (!errors.physicalAddress) errors.physicalAddress = {};
        errors.physicalAddress.postalCode = "Invalid postal code";
      }
 
      if (physicalAddress.countryCode === "XY") {
        if (!errors.physicalAddress) errors.physicalAddress = {};
        errors.physicalAddress.countryCode = "We don't ship to this country";
      }
    }
 
    // Return errors if any found
    if (Object.keys(errors).length > 0) {
      return NextResponse.json({
        errors,
      });
    }
 
    // Success - no validation errors - you HAVE to return the original calls
    return NextResponse.json({
        calls: requestData.calls,
        chainId: requestData.chainId,
        capabilities: requestData.capabilities
    });
 
  } catch (error) {
    console.error("Error processing data:", error);
    return NextResponse.json({
      errors: { server: "Server error validating data" }
    });
  }
}
