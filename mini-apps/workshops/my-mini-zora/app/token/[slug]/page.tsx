import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { CollageSolo } from "@/components/Collage/CollageSolo";
async function fetchTokenData(address: string) {
  try {
    // Get the host from request headers to build absolute URL
    const headersList = headers();
    const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https';
    const host = headersList.get('host') || 'localhost:3000';
    
    // Create an absolute URL
    const apiUrl = `${protocol}://${host}/api/token/${address}`;
    
    
    const response = await fetch(apiUrl, {
      next: { revalidate: 300 }, // Revalidate every 5 minutes
    });
    
    if (!response.ok) {
      console.error(`API error: ${response.status} ${response.statusText}`);
      
      if (response.status === 404) {
        return { notFound: true };
      }
      
      return { error: `Failed to fetch token data: ${response.statusText}` };
    }
    
    const result = await response.json();
    
    if (!result.data) {
      console.error('API returned success but no data found');
      return { error: 'No data found' };
    }
    
    console.log('Token data successfully fetched');
    return { data: result.data };
  } catch (error) {
    console.error("Error fetching token data:", error);
    return { error: error instanceof Error ? error.message : 'Unknown error occurred' };
  }
}

export default async function Page({
  params,
}: {
  params: { slug: string }
}) {
  const { slug } = params;
  
  if (!slug) {
    console.log('No slug provided, showing 404');
    notFound();
  }
  
  const result = await fetchTokenData(slug);
  
  if (result.notFound) {
    console.log('Token not found, showing 404');
    notFound();
  }
  
  if (result.error) {
    // You could render an error component here instead of notFound()
    console.error(`Error fetching token: ${result.error}`);
    notFound();
  }
  
  const tokenData = result.data;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <CollageSolo
        tokenAddress={tokenData.tokenAddress}
        title={tokenData.title}
        holders={tokenData.holders}
        id={tokenData.id}
        description={tokenData.description}
        format={tokenData.format}
        size={tokenData.size}
        created={tokenData.created}
        collection={tokenData.collection}
        imagePath={tokenData.imagePath}
      />
    </div>
  );
}