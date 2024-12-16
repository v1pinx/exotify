import axios from "axios";
import { setCookie } from "cookies-next";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    // Fetch the access token from Spotify
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "client_credentials",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        auth: {
          username: process.env.SPOTIFY_CLIENT_ID || "",
          password: process.env.SPOTIFY_CLIENT_SECRET || "",
        },
      }
    );

    const accessToken = response.data.access_token;
    const expiresIn = response.data.expires_in; // Token expiration time in seconds

    // Setting the cookie using `setCookie`
    const res = NextResponse.json({ success: true, token: accessToken });
    setCookie("sp_token", accessToken, {
      req: req as any,
      res,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: expiresIn,
      path: "/",
    });

    return res;
  } catch (error: any) {
    console.error(
      "Error fetching token:",
      error.response?.data || error.message
    );

    // Return an error response
    return NextResponse.json(
      { error: "Failed to fetch Spotify token", details: error.message },
      { status: 500 }
    );
  }
}
