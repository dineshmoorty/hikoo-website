import { NextResponse } from "next/server";
import {
  sheets,
  GOOGLE_SHEET_ID,
} from "@/lib/google";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const name =
      typeof body.name === "string"
        ? body.name.trim()
        : "";

    const email =
      typeof body.email === "string"
        ? body.email.trim()
        : "";

    const phone =
      typeof body.phone === "string"
        ? body.phone.trim()
        : "";

    const subject =
      typeof body.subject === "string"
        ? body.subject.trim()
        : "";

    const message =
      typeof body.message === "string"
        ? body.message.trim()
        : "";

    // =====================================================
    // VALIDATION
    // =====================================================

    if (!name) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter your name.",
        },
        { status: 400 }
      );
    }

    if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        email
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    if (
      phone &&
      !/^\d{10}$/.test(
        phone.replace(/\D/g, "")
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Phone number must contain exactly 10 digits.",
        },
        { status: 400 }
      );
    }

    if (!subject) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a subject.",
        },
        { status: 400 }
      );
    }

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please enter your message.",
        },
        { status: 400 }
      );
    }

    if (message.length > 500) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Message must be 500 characters or less.",
        },
        { status: 400 }
      );
    }

    // =====================================================
    // APPLICATION ID
    // =====================================================

    const now = new Date();

    const datePart =
      now.toLocaleDateString(
        "en-CA",
        {
          timeZone: "Asia/Kolkata",
        }
      ).replace(/-/g, "");

    const randomPart =
      Math.floor(
        1000 + Math.random() * 9000
      );

    const applicationId =
      `HIKOO-CON-${datePart}-${randomPart}`;

    // =====================================================
    // SUBMITTED TIME
    // =====================================================

    const submittedAt =
      now.toLocaleString(
        "en-IN",
        {
          timeZone: "Asia/Kolkata",
        }
      );

    // =====================================================
    // GOOGLE SHEETS ROW
    // =====================================================

    const row = [
      applicationId,
      submittedAt,
      name,
      email,
      phone,
      subject,
      message,
      "New",
    ];

    // =====================================================
    // SAVE TO CONTACT ENQUIRIES
    // =====================================================

    await sheets.spreadsheets.values.append({
      spreadsheetId:
        GOOGLE_SHEET_ID,

      range:
        "Contact Enquiries!A:H",

      valueInputOption:
        "USER_ENTERED",

      insertDataOption:
        "INSERT_ROWS",

      requestBody: {
        values: [row],
      },
    });

    // =====================================================
    // SUCCESS
    // =====================================================

    return NextResponse.json(
      {
        success: true,
        message:
          "Your enquiry has been submitted successfully.",
        applicationId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "CONTACT FORM ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Something went wrong while submitting your enquiry.",
      },
      { status: 500 }
    );
  }
}