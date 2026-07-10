# QA — Mobile App Test Automation

Proyek ini berisi automated test suite untuk aplikasi mobile **Sistem Manajemen Kesehatan Mahasiswa** (Student Health Management System), dibangun menggunakan **Robot Framework** dengan **AppiumLibrary** untuk menguji aplikasi Android secara end-to-end.

## 📁 Struktur Folder

```
QA/
├── config/
│   ├── requirements.txt      # Daftar dependensi Python
│   ├── run_tests.ps1         # Script PowerShell untuk menjalankan test
│   └── README.md
├── keywords/
│   └── custom_keywords.robot # Custom keywords tambahan (kosong/placeholder)
├── resources/
│   ├── common.resource       # Variabel & keyword umum yang dipakai semua suite
│   └── locators.resource     # Definisi locator elemen UI aplikasi
├── suites/
│   ├── smoke_tests.robot         # Verifikasi setup Robot Framework & Appium
│   ├── login_tests.robot         # Pengujian fitur login
│   ├── dashboard_tests.robot     # Pengujian dashboard admin
│   ├── mahasiswa_tests.robot     # CRUD data mahasiswa
│   ├── rekam_medis_tests.robot   # CRUD rekam medis
│   ├── jadwal_tests.robot        # CRUD jadwal dokter
│   ├── konsultasi_tests.robot    # Fitur konsultasi & balasan
│   ├── obat_tests.robot          # CRUD data obat
│   └── mobile_app_tests.robot    # Pengujian dasar navigasi mobile app
└── reports/
    ├── report.html           # Ringkasan hasil eksekusi test
    ├── log.html              # Log detail eksekusi step-by-step
    └── output.xml            # Output mentah Robot Framework
```

## 🎯 Tentang Proyek

Test suite ini menguji aplikasi mobile Android (`com.umuka.healthapp`) yang mencakup modul-modul berikut:

| Modul | Deskripsi |
|---|---|
| **Login** | Autentikasi sebagai Admin maupun Mahasiswa, termasuk skenario kredensial salah/kosong |
| **Dashboard** | Verifikasi elemen, statistik, dan menu sesuai peran (role) pengguna |
| **Mahasiswa** | CRUD (Create, Read, Update, Delete) data mahasiswa, filter jenjang & gender |
| **Rekam Medis** | CRUD data rekam medis pasien (diagnosa, tindakan, status) |
| **Jadwal Dokter** | CRUD jadwal praktik dokter (spesialisasi, jam, kuota) |
| **Konsultasi** | Pengajuan keluhan dan balasan konsultasi |
| **Obat** | CRUD data obat (jenis, stok, harga) |

Total terdapat **±63 test case** yang tersebar di seluruh suite, dengan tag seperti `smoke`, `critical`, `crud`, `negative`, `security`, `navigation`, dan tag khusus modul (`login`, `dashboard`, `mahasiswa`, dll).

## 🛠️ Teknologi & Dependensi

Didefinisikan pada `config/requirements.txt`:

- `robotframework==7.4.2`
- `robotframework-appiumlibrary==3.2.1`
- `robotframework-seleniumlibrary==6.9.0`
- `webdriver-manager==4.1.1`
- `robotframework-reportportal==5.7.1`

Konfigurasi koneksi Appium (di `resources/common.resource`):

- **Platform**: Android
- **Device**: `emulator-5554`
- **Automation Engine**: UiAutomator2
- **Appium Server**: `http://localhost:4723`

## ⚙️ Persiapan (Prerequisites)

1. Install Python dan Robot Framework beserta dependensinya:
   ```bash
   pip install -r config/requirements.txt
   ```
2. Install [Appium Server](https://appium.io/) dan jalankan di `http://localhost:4723`.
3. Siapkan Android emulator/device dengan nama `emulator-5554` (atau sesuaikan variabel `${DEVICE_NAME}`).
4. Pastikan aplikasi (`com.umuka.healthapp`) sudah terinstall di emulator/device.

## ▶️ Menjalankan Test

### Menggunakan script `run_tests.ps1` (Windows PowerShell)

```powershell
cd config
./run_tests.ps1
```

Script ini menyediakan menu interaktif:

1. **Run All Tests** – menjalankan seluruh suite
2. **Run Smoke Tests** – hanya `login` dan `dashboard`
3. **Run CRUD Tests** – `mahasiswa`, `rekam_medis`, `jadwal`, `konsultasi`, `obat`
4. **Run Specific Suite** – memilih satu suite tertentu
5. **Run Tests by Tag** – menjalankan test berdasarkan tag (misal `smoke`, `critical`, `crud`)

Hasil laporan (HTML report, log, dan XML output) otomatis dihasilkan di folder `reports/`.

### Menjalankan manual dengan Robot Framework CLI

```bash
robot -d reports/ suites/login_tests.robot
```

Atau menjalankan seluruh folder suite:

```bash
robot -d reports/ suites/
```

Menjalankan berdasarkan tag:

```bash
robot -d reports/ --include smoke suites/
```

## 🔑 Kredensial Default (Test Data)

| Role | Email | Password |
|---|---|---|
| Admin | `admin@gmail.com` | `123admin` |
| Mahasiswa | `mahasiswa@gmail.com` | `123` |

> Kredensial ini didefinisikan di `resources/common.resource` dan digunakan sebagai default untuk keyword login (`Login As Admin`, `Login As Mahasiswa`).

## 🧩 Keyword Utama (resources/common.resource)

- **App management**: `Open Application With Retry`, `Close Application With Log`
- **Login**: `Login As Admin`, `Login As Mahasiswa`, `Login As User With Credentials`
- **Navigasi**: `Navigate To Mahasiswa`, `Navigate To RekamMedis`, `Navigate To Jadwal`, `Navigate To Konsultasi`, `Navigate To Obat`, `Navigate To Setting`
- **Interaksi elemen**: `Wait For Element`, `Tap Element`, `Input Text Into Field`, `Scroll To Element`, `Swipe Down Until Element`
- **Generator data uji**: `Generate Random Name`, `Generate Random Date`, `Generate Random Keluhan`
- **Assertion**: `Assert Element Text Contains`, `Assert Element Text Equals`
- **Screenshot & cleanup**: `Take Screenshot On Failure`, `Cleanup Test Data`

Locator elemen UI didefinisikan terpisah di `resources/locators.resource` agar mudah dipelihara jika UI aplikasi berubah.

## 📊 Laporan Hasil Terakhir

Folder `reports/` menyimpan hasil eksekusi terakhir (`report.html`, `log.html`, `output.xml`). Berdasarkan `output.xml` yang tersimpan, eksekusi sebelumnya gagal (0 pass, 9 fail) karena koneksi ke Appium server (`localhost:4723`) ditolak — kemungkinan Appium server belum berjalan saat test dieksekusi. Pastikan Appium server aktif sebelum menjalankan ulang test suite.

## 📝 Catatan

- File `keywords/custom_keywords.robot` dan `config/README.md` saat ini masih kosong — dapat diisi dengan keyword kustom tambahan atau dokumentasi konfigurasi lebih lanjut sesuai kebutuhan tim.
- `suites/mobile_app_tests.robot` menggunakan `appPackage` berbeda (`com.projectakhir.mobile`) dibanding suite lain (`com.umuka.healthapp`) — periksa kembali apakah ini disengaja atau perlu disamakan.
- Sebagian besar teks dan pesan log menggunakan Bahasa Indonesia karena aplikasi yang diuji ditujukan untuk pengguna Indonesia (mahasiswa, dokter, dan admin kampus).
