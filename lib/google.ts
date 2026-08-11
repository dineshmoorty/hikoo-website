import { google } from "googleapis";
import fs from "fs";
import path from "path";

// =====================================================
// PATHS
// =====================================================

const credentialsDir = path.join(
  process.cwd(),
  "credentials"
);

const serviceAccountPath = path.join(
  credentialsDir,
  "google-service-account.json"
);

const oauthClientPath = path.join(
  credentialsDir,
  "oauth-client.json"
);

const driveTokenPath = path.join(
  credentialsDir,
  "drive-token.json"
);

// =====================================================
// CHECK CREDENTIAL FILES
// =====================================================

if (!fs.existsSync(serviceAccountPath)) {
  throw new Error(
    "Google service account credentials not found."
  );
}

if (!fs.existsSync(oauthClientPath)) {
  throw new Error(
    "Google OAuth client credentials not found."
  );
}

if (!fs.existsSync(driveTokenPath)) {
  throw new Error(
    "Google Drive OAuth token not found."
  );
}

// =====================================================
// LOAD SERVICE ACCOUNT
// =====================================================

const serviceAccountCredentials =
  JSON.parse(
    fs.readFileSync(
      serviceAccountPath,
      "utf-8"
    )
  );

// =====================================================
// SHEETS AUTH
// =====================================================

const sheetsAuth =
  new google.auth.GoogleAuth({
    credentials:
      serviceAccountCredentials,

    scopes: [
      "https://www.googleapis.com/auth/spreadsheets",
    ],
  });

// =====================================================
// LOAD OAUTH CLIENT
// =====================================================

const oauthCredentials =
  JSON.parse(
    fs.readFileSync(
      oauthClientPath,
      "utf-8"
    )
  );

// Google OAuth credentials can have
// "installed" or "web" depending on
// the OAuth client type.

const oauthConfig =
  oauthCredentials.installed ||
  oauthCredentials.web;

if (!oauthConfig) {
  throw new Error(
    "Invalid OAuth client JSON. Expected installed or web credentials."
  );
}

// =====================================================
// DRIVE OAUTH CLIENT
// =====================================================

const driveAuth =
  new google.auth.OAuth2(
    oauthConfig.client_id,
    oauthConfig.client_secret,
    oauthConfig.redirect_uris?.[0]
  );

// =====================================================
// LOAD SAVED TOKEN
// =====================================================

const driveToken =
  JSON.parse(
    fs.readFileSync(
      driveTokenPath,
      "utf-8"
    )
  );

// =====================================================
// SET DRIVE CREDENTIALS
// =====================================================

driveAuth.setCredentials(
  driveToken
);

// =====================================================
// GOOGLE CLIENTS
// =====================================================

export const sheets =
  google.sheets({
    version: "v4",
    auth: sheetsAuth,
  });

export const drive =
  google.drive({
    version: "v3",
    auth: driveAuth,
  });

// =====================================================
// ENVIRONMENT VARIABLES
// =====================================================

const sheetId =
  process.env.GOOGLE_SHEET_ID;

const driveFolderId =
  process.env.GOOGLE_DRIVE_FOLDER_ID;

if (!sheetId) {
  throw new Error(
    "GOOGLE_SHEET_ID is missing from .env.local"
  );
}

if (!driveFolderId) {
  throw new Error(
    "GOOGLE_DRIVE_FOLDER_ID is missing from .env.local"
  );
}

// =====================================================
// EXPORT CONFIG
// =====================================================

export const GOOGLE_SHEET_ID: string =
  sheetId;

export const GOOGLE_DRIVE_FOLDER_ID: string =
  driveFolderId;

export const GOOGLE_SHEET_NAME =
  process.env.GOOGLE_SHEET_NAME ||
  "Sheet1";