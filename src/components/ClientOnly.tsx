"use client";
import { useEffect, useState } from "react";

const ClientOnly: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // Or return a loading spinner if you want
  }

  return <>{children}</>;
};

export default ClientOnly;
