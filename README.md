# Proyek Otomatisasi Pengujian API dengan Playwright

Proyek ini berisi rangkaian pengujian API otomatis untuk layanan [DummyJSON](https://dummyjson.com/docs), yang dibangun menggunakan [Playwright](https://playwright.dev/).

## 🚀 Fitur Utama

-   **Pengujian Independen (Atomik)**: Setiap tes dirancang untuk berjalan mandiri tanpa ketergantungan, memastikan keandalan dan kemudahan dalam pemeliharaan.
-   **Autentikasi Otomatis**: Proses login ditangani secara global sebelum semua tes dijalankan, dan token digunakan kembali di seluruh pengujian.
-   **Eksekusi Paralel**: Tes dijalankan secara paralel untuk efisiensi waktu yang maksimal.
-   **Cakupan API Luas**: Mencakup pengujian untuk berbagai sumber daya API, termasuk:
    -   Products
    -   Carts
    -   Users
    -   Posts
    -   Comments
    -   Todos
    -   Quotes
    -   Recipes
-   **Laporan HTML**: Menghasilkan laporan pengujian HTML yang interaktif dan mudah dibaca.

## ⚙️ Prasyarat

-   [Node.js](https://nodejs.org/en/) (versi 16 atau lebih tinggi)
-   `npm` (biasanya sudah terpasang bersama Node.js)

## 📦 Instalasi

1.  **Clone repositori ini:**
    ```bash
    git clone <URL_REPOSITORI_ANDA>
    cd dummy-api
    ```

2.  **Instal dependensi proyek:**
    ```bash
    npm install
    ```

3.  **Instal browser yang dibutuhkan oleh Playwright:**
    ```bash
    npx playwright install
    ```

## ▶️ Menjalankan Pengujian

Anda dapat menjalankan pengujian dengan beberapa cara:

### 1. Menjalankan Seluruh Rangkaian Tes

Untuk menjalankan semua file pengujian (`*.spec.ts`) di dalam direktori `tests/api-suite`:

```bash
npx playwright test
```

### 2. Menjalankan Satu File Tes Spesifik

Jika Anda hanya ingin menguji satu sumber daya, misalnya `products`:

```bash
npx playwright test tests/api-suite/products.spec.ts
```

### 3. Menjalankan Tes dengan UI Mode

Playwright menyediakan UI Mode untuk pengalaman *debugging* yang lebih interaktif:

```bash
npx playwright test --ui
```

## 📄 Melihat Laporan Hasil Tes

Setelah pengujian selesai, laporan HTML akan secara otomatis dibuat. Untuk melihat laporan terakhir:

```bash
npx playwright show-report
```

## 🏗️ Struktur Proyek

-   `tests/api-suite/`: Direktori utama yang berisi semua file pengujian. Setiap file dikelompokkan berdasarkan sumber daya API (misalnya, `products.spec.ts`).
-   `global-setup.ts`: Skrip yang dieksekusi sekali sebelum semua tes dimulai. Skrip ini bertanggung jawab untuk proses autentikasi dan penyimpanan token.
-   `utils/api.config.ts`: File konfigurasi untuk menyimpan data kredensial dan URL dasar API.
-   `playwright.config.ts`: File konfigurasi utama untuk Playwright, tempat alur kerja pengujian, proyek, dan reporter diatur.
-   `playwright-report/`: Direktori tempat laporan HTML hasil pengujian disimpan.
-   `playwright/.auth/`: Direktori tempat file status autentikasi (termasuk token) disimpan oleh `global-setup`.

## 🔑 Alur Eksekusi Pengujian

Dokumentasi ini menjelaskan bagaimana alur pengujian diatur dalam proyek ini.

### 1. Konsep Utama: Pengujian Independen (Atomik)

Rangkaian pengujian ini dibangun berdasarkan prinsip **pengujian independen**. Artinya, setiap kasus uji (`test`) dirancang untuk berjalan sendiri tanpa bergantung pada hasil dari kasus uji lainnya.

**Keuntungan:**
-   **Keandalan**: Kegagalan dalam satu tes tidak akan mempengaruhi tes lainnya.
-   **Fleksibilitas**: Anda dapat menjalankan satu tes spesifik, satu file tes, atau seluruh rangkaian tes dengan mudah.
-   **Paralelisasi**: Playwright dapat menjalankan tes-tes ini secara paralel, sehingga eksekusi menjadi jauh lebih cepat.

### 2. Alur Eksekusi Rinci

Berikut adalah alur yang terjadi ketika Anda menjalankan perintah `npx playwright test`:

**Langkah 1: Global Setup (Autentikasi Terpusat)**

-   Sebelum tes apa pun dijalankan, sebuah skrip bernama `global-setup.ts` dieksekusi secara otomatis.
-   Skrip ini melakukan hal berikut:
    1.  Mengirim permintaan `POST` ke endpoint `/auth/login` dengan kredensial yang ditentukan di `utils/api.config.ts`.
    2.  Menerima token autentikasi (`accessToken`) dari respons server.
    3.  Menyimpan token ini ke dalam sebuah file bernama `playwright/.auth/user.json`.
-   Tujuannya adalah untuk melakukan login sekali saja dan menggunakan kembali token tersebut untuk semua tes yang membutuhkan autentikasi.

**Langkah 2: Eksekusi Tes secara Paralel**

-   Setelah `global-setup` selesai, Playwright mulai menjalankan semua file `*.spec.ts` yang ada di dalam direktori `tests/api-suite`.
-   Setiap file berisi sekelompok tes yang terkait dengan satu sumber daya API (misalnya, `products.spec.ts` untuk produk).
-   Playwright akan menjalankan tes-tes ini secara paralel di beberapa *worker* (proses terpisah) untuk efisiensi waktu.

**Langkah 3: Konteks Pengujian Otomatis**

-   Untuk setiap tes, Playwright membuat sebuah konteks API (`request`) yang sudah dikonfigurasi sebelumnya.
-   Berdasarkan konfigurasi di `playwright.config.ts`, konteks ini secara otomatis menyertakan token autentikasi yang disimpan pada Langkah 1 di setiap *header* permintaan.
-   Inilah yang membuat setiap tes (seperti "get all products" atau "delete a product") dapat berjalan seolah-olah sudah login, tanpa perlu kode login di setiap file tes.

### Contoh Alur untuk `products.spec.ts`

1.  **`test('should be able to get all products', ...)`**: Mengirim permintaan `GET` ke `/products` dengan token yang sudah terpasang otomatis.
2.  **`test('should be able to add a new product', ...)`**: Mengirim permintaan `POST` ke `/products/add` dengan data produk baru dan token.
3.  **`test('should be able to update a product', ...)`**: Mengirim permintaan `PUT` ke `/products/1` dengan data pembaruan dan token.
4.  **`test('should be able to delete a product', ...)`**: Mengirim permintaan `DELETE` ke `/products/1` dengan token.

Setiap tes ini berjalan secara terpisah dan tidak saling mempengaruhi. Misalnya, tes "update produk" tidak bergantung pada apakah tes "tambah produk" berhasil atau tidak. Ia akan selalu mencoba memperbarui produk dengan ID `1`.
