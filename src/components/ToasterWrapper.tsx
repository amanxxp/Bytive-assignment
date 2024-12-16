// components/ToasterWrapper.tsx
"use client";

import { Toaster } from "sonner";
import { useEffect, useState } from "react";

export default function ToasterWrapper() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Mark as client-side after first render
  }, []);

  if (!isClient) return null; // Render nothing on the server side

  return <Toaster />;
}
