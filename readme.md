## Cara Pasang

### Prasyarat
Pastikan Anda memiliki Node.js dan npm terinstal di komputer Anda.

1. Saat Anda mendapatkan kode sumber ini, pastikan untuk menginstal semua modul yang diperlukan dengan menjalankan perintah ini di terminal atau command prompt:

```bash
cd /halaman/mengarah/ke/Xilver-Moods
npm install
```

Setelah selesai menginstal, jalankan bot dengan perintah:

```bash
npm start
```

### Cara Menghubungkan ke Nomor WhatsApp

1. Setelah bot dijalankan, akan ada opsi untuk menghubungkan ke nomor WhatsApp Anda melalui QR atau pairing.

2. Jika Anda memilih QR, Anda memerlukan perangkat tambahan. Disarankan untuk menggunakan opsi pairing.

3. Jika Anda memilih pairing:
   - Masukkan nomor WhatsApp Anda, contoh: 62831109XXXXX.
   - Salin kode yang ditampilkan.
   - Buka WhatsApp Anda dan ikuti langkah-langkah berikut:
     - Klik titik tiga di kanan atas.
     - Pilih "Perangkat tertaut" > "Masuk dengan nomor telepon".
     - Masukkan kode yang Anda salin tadi.
     - Tunggu proses koneksi, ini bisa memakan waktu.

Jika mengalami kesulitan, coba hapus folder `lib/connection/session` dan jalankan ulang bot.