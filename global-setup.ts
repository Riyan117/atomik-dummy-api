
// global-setup.ts
import axios from "axios";
import { LOGIN_PAYLOAD, BASE_URL, AUTH_FILE } from "./utils/api.config";
import * as fs from "fs";
import * as path from "path";

async function globalSetup() {
  console.log("Running global setup: Logging in to get JWT token...");

  try {
    // 1. Lakukan Login
    const response = await axios.post(`${BASE_URL}/auth/login`, LOGIN_PAYLOAD, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response.data);

    // 2. Playwright menyimpan status (termasuk token JWT) ke file
    const authState = {
      cookies: [],
      origins: [
        {
          origin: BASE_URL,
          localStorage: [
            {
              name: "token",
              value: response.data.accessToken,
            },
          ],
        },
      ],
    };

    const dir = path.dirname(AUTH_FILE);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(AUTH_FILE, JSON.stringify(authState, null, 2));

    console.log(`Login successful. Auth state saved to ${AUTH_FILE}`);
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}

export default globalSetup;
