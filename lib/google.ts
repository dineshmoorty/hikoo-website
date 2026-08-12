import { google } from "googleapis";

// =====================================================
// ENVIRONMENT VARIABLES
// =====================================================

const serviceAccountBase64 =
  process.env.GOOGLE_SERVICE_ACCOUNT_BASE64;

const oauthClientBase64 =
  process.env.GOOGLE_OAUTH_CLIENT_BASE64;

const driveTokenBase64 =
  process.env.GOOGLE_DRIVE_TOKEN_BASE64;

const sheetId =
  process.env.GOOGLE_SHEET_ID;

const driveFolderId =
  process.env.GOOGLE_DRIVE_FOLDER_ID;

const sheetName =
  process.env.GOOGLE_SHEET_NAME ||
  "HIKOO Internship Applications";

// =====================================================
// BASE64 JSON DECODER
// =====================================================

function decodeBase64Json(
  value: string | undefined,
  variableName: string
) {
  if (!value) {
    throw new Error(
      `${variableName} is missing.`
    );
  }

  try {
    const json = Buffer.from(
      value,
      "base64"
    ).toString("utf-8");

    return JSON.parse(json);
  } catch {
    throw new Error(
      `${variableName} contains invalid Base64/JSON.`
    );
  }
}

// =====================================================
// REQUIRED ENVIRONMENT VARIABLES
// =====================================================

if (!sheetId) {
  throw new Error(
    "GOOGLE_SHEET_ID is missing."
  );
}

if (!driveFolderId) {
  throw new Error(
    "GOOGLE_DRIVE_FOLDER_ID is missing."
  );
}

// =====================================================
// DECODE GOOGLE CREDENTIALS
// =====================================================

const serviceAccountCredentials =
  decodeBase64Json(
    serviceAccountBase64,
    "GOOGLE_SERVICE_ACCOUNT_BASE64"
  );

const oauthCredentials =
  decodeBase64Json(
    oauthClientBase64,
    "GOOGLE_OAUTH_CLIENT_BASE64"
  );

const driveToken =
  decodeBase64Json(
    driveTokenBase64,
    "GOOGLE_DRIVE_TOKEN_BASE64"
  );

// =====================================================
// GOOGLE SHEETS AUTH
// =====================================================

const sheetsAuth =
  new google.auth.GoogleAuth({
    credentials: {
      client_email:
        serviceAccountCredentials.client_email,

      private_key:
        serviceAccountCredentials.private_key,

      project_id:
        serviceAccountCredentials.project_id,
    },

    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
    ],
  });

// =====================================================
// OAUTH CONFIG
// =====================================================

const oauthConfig =
  oauthCredentials.installed ||
  oauthCredentials.web;

if (!oauthConfig) {
  throw new Error(
    "Invalid Google OAuth client JSON."
  );
}

// =====================================================
// GOOGLE DRIVE AUTH
// =====================================================

const driveAuth =
  new google.auth.OAuth2(
    oauthConfig.client_id,
    oauthConfig.client_secret,
    oauthConfig.redirect_uris?.[0]
  );

// =====================================================
// SET DRIVE TOKEN
// =====================================================

driveAuth.setCredentials(
  driveToken
);

// =====================================================
// GOOGLE SHEETS CLIENT
// =====================================================

export const sheets =
  google.sheets({
    version: "v4",
    auth: sheetsAuth,
  });

// =====================================================
// GOOGLE DRIVE CLIENT
// =====================================================

export const drive =
  google.drive({
    version: "v3",
    auth: driveAuth,
  });

// =====================================================
// EXPORT CONFIG
// =====================================================

export const GOOGLE_SHEET_ID =
  sheetId;

export const GOOGLE_DRIVE_FOLDER_ID =
  driveFolderId;

export const GOOGLE_SHEET_NAME =
  sheetName;