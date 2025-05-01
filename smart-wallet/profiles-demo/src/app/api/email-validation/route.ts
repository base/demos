// app/api/email-validation/route.ts
export async function POST(request: Request) {
    // Get the email from the request body
    const requestData = await request.json();
    let email = "";
    
    try {
      // Extract email from the data callback request
      email = requestData.capabilities?.dataCallback?.email || "";
      
      // Validate the email
      if (!email) {
        return Response.json({
          errors: {
            email: "Email is required"
          }
        });
      }
      
      // Simple regex for email validation
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailRegex.test(email)) {
        return Response.json({
          errors: {
            email: "Invalid email format"
          }
        });
      }
      
      // Add any additional validation logic here
      // For example, check for disposable email domains
      if (email.endsWith("@example.com")) {
        return Response.json({
          errors: {
            email: "Example.com emails are not allowed"
          }
        });
      }
      
      // Email is valid, return success
      return Response.json({
        success: true
      });
      
    } catch (error) {
      console.error("Error processing email validation:", error);
      return Response.json({
        errors: {
          email: "Server error validating email"
        }
      });
    }
  }