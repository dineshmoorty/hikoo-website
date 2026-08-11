import { NextResponse } from "next/server";
import { PassThrough } from "stream";

import {
  drive,
  sheets,
  GOOGLE_DRIVE_FOLDER_ID,
  GOOGLE_SHEET_ID,
  GOOGLE_SHEET_NAME,
} from "@/lib/google";

export const runtime = "nodejs";

// =====================================================
// POST /api/internship/apply
// =====================================================

export async function POST(request: Request) {
  try {
    // ===================================================
    // READ FORM DATA
    // ===================================================

    const formData = await request.formData();

    const type =
      formData.get("type") as string | null;

    const name =
      formData.get("name") as string | null;

    const email =
      formData.get("email") as string | null;

    const phone =
      formData.get("phone") as string | null;

    const qualification =
      formData.get("qualification") as string | null;

    const graduationYear =
      formData.get("graduationYear") as string | null;

    const experience =
      formData.get("experience") as string | null;

    const skills =
      formData.get("skills") as string | null;

    const preferredRole =
      formData.get("preferredRole") as string | null;

    const college =
      formData.get("college") as string | null;

    const department =
      formData.get("department") as string | null;

    const yearOfStudy =
      formData.get("yearOfStudy") as string | null;

    const internshipDuration =
      formData.get(
        "internshipDuration"
      ) as string | null;

    const message =
      formData.get("message") as string | null;

    const resume =
      formData.get("resume");

    // ===================================================
    // VALIDATE INTERNSHIP TYPE
    // ===================================================

    if (
      type !== "job" &&
      type !== "college"
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid internship type.",
        },
        { status: 400 }
      );
    }

    // ===================================================
    // VALIDATE REQUIRED FIELDS
    // ===================================================

    if (
      !name?.trim() ||
      !email?.trim() ||
      !phone?.trim() ||
      !preferredRole?.trim() ||
      !skills?.trim() ||
      !message?.trim()
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please fill in all required fields.",
        },
        { status: 400 }
      );
    }

    // ===================================================
    // RESUME VALIDATION
    // ===================================================

    if (!(resume instanceof File)) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Please upload your resume.",
        },
        { status: 400 }
      );
    }

    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    const maxSize =
      5 * 1024 * 1024;

    if (
      !allowedTypes.includes(
        resume.type
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Resume must be a PDF, DOC, or DOCX file.",
        },
        { status: 400 }
      );
    }

    if (resume.size > maxSize) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Resume must be less than 5 MB.",
        },
        { status: 400 }
      );
    }

    // ===================================================
    // CREATE SAFE FILE NAME
    // ===================================================

    const safeName =
      name
        .trim()
        .replace(
          /[^a-zA-Z0-9-_]/g,
          "_"
        );

    const timestamp =
      Date.now();

    const fileName =
      `${type}_${safeName}_${timestamp}_${resume.name}`;

    // ===================================================
    // CONVERT RESUME TO BUFFER
    // ===================================================

    const resumeBuffer =
      Buffer.from(
        await resume.arrayBuffer()
      );

    // ===================================================
    // CREATE STREAM
    // ===================================================

    const stream =
      new PassThrough();

    stream.end(resumeBuffer);

    // ===================================================
    // UPLOAD RESUME TO GOOGLE DRIVE
    // ===================================================

    const uploadedFile =
      await drive.files.create({
        requestBody: {
          name: fileName,

          parents: [
            GOOGLE_DRIVE_FOLDER_ID,
          ],
        },

        media: {
          mimeType: resume.type,
          body: stream,
        },

        fields:
          "id,name,webViewLink",
      });

    // ===================================================
    // CHECK DRIVE RESPONSE
    // ===================================================

    const resumeFileId =
      uploadedFile.data.id;

    if (!resumeFileId) {
      throw new Error(
        "Google Drive upload completed but no file ID was returned."
      );
    }

    // ===================================================
    // RESUME URL
    // ===================================================

    const resumeLink =
      uploadedFile.data.webViewLink ||
      `https://drive.google.com/file/d/${resumeFileId}/view`;

    // ===================================================
    // SUBMITTED TIME
    // ===================================================

    const submittedAt =
      new Date().toLocaleString(
        "en-IN",
        {
          timeZone:
            "Asia/Kolkata",
        }
      );

    // ===================================================
    // GOOGLE SHEETS ROW
    // ===================================================

    const row = [
      submittedAt,

      type === "job"
        ? "Job Internship"
        : "College Internship",

      name || "",

      email || "",

      phone || "",

      college || "",

      qualification || "",

      department || "",

      graduationYear || "",

      yearOfStudy || "",

      experience || "",

      preferredRole || "",

      skills || "",

      internshipDuration || "",

      resumeLink,

      message || "",

      "New",

      "",
    ];

    // ===================================================
    // SAVE TO GOOGLE SHEETS
    // ===================================================

    await sheets.spreadsheets.values.append({
      spreadsheetId:
        GOOGLE_SHEET_ID,

      range:
        `${GOOGLE_SHEET_NAME}!A:R`,

      valueInputOption:
        "USER_ENTERED",

      insertDataOption:
        "INSERT_ROWS",

      requestBody: {
        values: [row],
      },
    });

    // ===================================================
    // SUCCESS
    // ===================================================

    return NextResponse.json(
      {
        success: true,

        message:
          "Application submitted successfully.",

        resumeUrl:
          resumeLink,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    // ===================================================
    // SERVER ERROR
    // ===================================================

    console.error(
      "======================================"
    );

    console.error(
      "INTERNSHIP APPLICATION ERROR"
    );

    console.error(error);

    console.error(
      "======================================"
    );

    const errorMessage =
      error instanceof Error
        ? error.message
        : "Unknown server error";

    return NextResponse.json(
      {
        success: false,

        message:
          "Something went wrong while submitting your application.",

        // Development only
        ...(process.env.NODE_ENV ===
        "development"
          ? {
              error: errorMessage,
            }
          : {}),
      },
      {
        status: 500,
      }
    );
  }
}