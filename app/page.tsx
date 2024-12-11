'use client'
import { Button } from "@/components/ui/button";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [token, setToken] = useState(null);

  async function generateToken() {
    try {
      const response = await axios.post('/api/generateToken'); // Assuming this route exists
      setToken(response.data.token); // Accessing the token from the response
    } catch (error) {
      console.error("Error generating token:", error);
    }
  }

  return (
    <>
      <Button onClick={generateToken}>Generate</Button>
      <div>Token: {token || "No token generated yet"}</div>
    </>
  );
}
