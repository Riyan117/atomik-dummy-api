// playwright.config.ts
import { defineConfig } from "@playwright/test";
import { AUTH_FILE } from "./utils/api.config";

export default defineConfig({
  testDir: "./tests/api-suite",
  // ⭐️ 1. Gunakan Global Setup untuk Login awal
  globalSetup: require.resolve("./global-setup"),
  fullyParallel: true,
  reporter: "html",

  projects: [
    {
      // ⭐️ 2. Project 'authenticated' akan menggunakan token dari AUTH_FILE
      name: "authenticated",
      testMatch: /.*\.spec\.ts/, // Cocokkan semua file test
      use: {
        baseURL: "https://dummyjson.com",
        storageState: AUTH_FILE, // Memuat token
        extraHTTPHeaders: {
          Accept: "application/json",
        },
      },
    },
    {
      // ⭐️ 3. Project 'unauthenticated' untuk simulasi Logout/gagal sesi
      name: "unauthenticated",
      testMatch: /05_logout_sim\.spec\.ts/, // Hanya jalankan file logout
      use: {
        baseURL: "https://dummyjson.com",
        storageState: undefined, // TIDAK memuat token
      },
    },
  ],
});
