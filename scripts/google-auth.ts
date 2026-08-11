import path from "node:path";
import fs from "node:fs";

import { authenticate } from "@google-cloud/local-auth";

const SCOPES = [
  "https://www.googleapis.com/auth/drive",
];

const CREDENTIALS_PATH = path.join(
  process.cwd(),
  "credentials",
  "oauth-client.json"
);

const TOKEN_PATH = path.join(
  process.cwd(),
  "credentials",
  "drive-token.json"
);

async function main() {
  // ===================================================
  // CHECK OAUTH CLIENT
  // ===================================================

  if (!fs.existsSync(CREDENTIALS_PATH)) {
    throw new Error(
      `OAuth credentials not found:\n${CREDENTIALS_PATH}`
    );
  }

  console.log(
    "Starting Google Drive authorization..."
  );

  // ===================================================
  // AUTHORIZE GOOGLE ACCOUNT
  // ===================================================

  const auth = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });

  // ===================================================
  // SAVE TOKEN
  // ===================================================

  const credentials =
    auth.credentials;

  fs.writeFileSync(
    TOKEN_PATH,
    JSON.stringify(
      credentials,
      null,
      2
    ),
    "utf-8"
  );

  console.log("");
  console.log(
    "=========================================="
  );

  console.log(
    "Google Drive authorization successful!"
  );

  console.log(
    "=========================================="
  );

  console.log("");
  console.log(
    `Token saved to:\n${TOKEN_PATH}`
  );

  console.log("");
  console.log(
    "You can now close this process."
  );
}

main().catch((error) => {
  console.error("");
  console.error(
    "Google authorization failed:"
  );
  console.error(error);
  process.exit(1);
});