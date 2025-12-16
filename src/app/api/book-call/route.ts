import { NextRequest, NextResponse } from "next/server";
import { SignJWT, importPKCS8 } from "jose";

// Explicitly set runtime to edge
export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, description } = body;

    // 1. Validation
    if (!phone || !description) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    // 2. Get Access Token (The manual, Edge-safe way)
    const token = await getGoogleAccessToken(
      process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL!,
      process.env.GOOGLE_PRIVATE_KEY!,
      ["https://www.googleapis.com/auth/spreadsheets"]
    );

    // 3. Append Row via Raw REST API
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;
    const range = "Sheet1!A:A"; // Adjust Sheet Name if needed
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: [
          [phone, description, new Date().toISOString(), "NEW"]
        ],
      }),
    });

    if (!response.ok) {
      const errData = await response.json(); 
      throw new Error(`Google Sheets API Error: ${JSON.stringify(errData)}`);
    }

    return NextResponse.json({ success: true, message: "Logged successfully" });
  } catch (error: any) {
    console.error("Edge Error:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error", details: error.message },
      { status: 500 }
    );
  }
}

// Helper: Sign JWT for Google OAuth without 'google-auth-library'
async function getGoogleAccessToken(email: string, privateKey: string, scopes: string[]) {
  // Clean key format
  const pem = privateKey.replace(/\\n/g, "\n");
  
  // Import key
  const ecPrivateKey = await importPKCS8(pem, "RS256");

  // Create JWT
  const jwt = await new SignJWT({
    scope: scopes.join(" "),
  })
    .setProtectedHeader({ alg: "RS256", typ: "JWT" })
    .setIssuer(email)
    .setSubject(email)
    .setAudience("https://oauth2.googleapis.com/token")
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(ecPrivateKey);

  // Exchange JWT for Access Token
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  const data = await res.json();
  return data.access_token;
}