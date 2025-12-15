import { NextRequest, NextResponse } from 'next/server';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { JWT } from 'google-auth-library';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { phone, description } = body;

    // 1. Validation
    if (!phone || !description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // 2. Auth with Google
    const serviceAccountAuth = new JWT({
      email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      key: process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n'), // Fix for newline chars in Vercel/Env
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(
      process.env.GOOGLE_SHEET_ID!,
      serviceAccountAuth
    );

    // 3. Load Sheet and Add Row
    await doc.loadInfo();
    const sheet = doc.sheetsByIndex[0]; // Writes to the first tab

    await sheet.addRow({
      Phone: phone,
      Description: description,
      Timestamp: new Date().toISOString(),
      Status: 'NEW'
    });

    return NextResponse.json({ success: true, message: 'Data logged successfully' });

  } catch (error) {
    console.error('Sheet Error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}