/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19-11.4.10-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: rakun87_voltama
-- ------------------------------------------------------
-- Server version	11.4.10-MariaDB-ubu2404

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*M!100616 SET @OLD_NOTE_VERBOSITY=@@NOTE_VERBOSITY, NOTE_VERBOSITY=0 */;

--
-- Table structure for table `article_categories`
--

DROP TABLE IF EXISTS `article_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `article_categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `article_categories_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `article_categories`
--

LOCK TABLES `article_categories` WRITE;
/*!40000 ALTER TABLE `article_categories` DISABLE KEYS */;
INSERT INTO `article_categories` VALUES
(1,'Tips Keamanan Listrik','tips-keamanan-listrik','/uploads/categories/artcat_1780578611.png',NULL,1,'2026-06-04 06:10:11','2026-06-04 06:10:11'),
(2,'Panduan Instalasi Listrik','panduan-instalasi-listrik','/uploads/categories/artcat_1780578634.png',NULL,1,'2026-06-04 06:10:34','2026-06-04 06:10:34'),
(3,'Edukasi Produk Voltama','edukasi-produk-voltama','/uploads/categories/artcat_1780578918.png',NULL,1,'2026-06-04 06:15:18','2026-06-04 06:15:18'),
(4,'Standar & Sertifikasi','standar-sertifikasi','/uploads/categories/artcat_1780578946.png',NULL,1,'2026-06-04 06:15:46','2026-06-04 06:15:46'),
(5,'Berita & Aktivitas Perusahaan','berita-aktivitas-perusahaan','/uploads/categories/artcat_1780578973.png',NULL,1,'2026-06-04 06:16:13','2026-06-04 06:16:13');
/*!40000 ALTER TABLE `article_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `articles`
--

DROP TABLE IF EXISTS `articles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `articles` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `article_category_id` bigint(20) unsigned DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` longtext NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `views` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `articles_slug_unique` (`slug`),
  KEY `articles_article_category_id_foreign` (`article_category_id`),
  CONSTRAINT `articles_article_category_id_foreign` FOREIGN KEY (`article_category_id`) REFERENCES `article_categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `articles`
--

LOCK TABLES `articles` WRITE;
/*!40000 ALTER TABLE `articles` DISABLE KEYS */;
INSERT INTO `articles` VALUES
(1,NULL,'10 Langkah Penting untuk Mencegah Korsleting dan Kebakaran','10-langkah-penting-untuk-mencegah-korsleting-dan-kebakaran','<p>Tips&nbsp;Keamanan&nbsp;Listrik&nbsp;di&nbsp;Rumah:&nbsp;10&nbsp;Langkah&nbsp;Penting&nbsp;untuk&nbsp;Mencegah&nbsp;Korsleting&nbsp;dan&nbsp;Kebakaran</p><p></p><p>Listrik&nbsp;merupakan&nbsp;kebutuhan&nbsp;utama&nbsp;dalam&nbsp;kehidupan&nbsp;modern.&nbsp;Namun,&nbsp;instalasi&nbsp;listrik&nbsp;yang&nbsp;tidak&nbsp;aman&nbsp;dapat&nbsp;menyebabkan&nbsp;korsleting,&nbsp;sengatan&nbsp;listrik,&nbsp;bahkan&nbsp;kebakaran.&nbsp;Oleh&nbsp;karena&nbsp;itu,&nbsp;memahami&nbsp;dan&nbsp;menerapkan&nbsp;langkah-langkah&nbsp;keamanan&nbsp;listrik&nbsp;sangat&nbsp;penting&nbsp;untuk&nbsp;melindungi&nbsp;keluarga&nbsp;dan&nbsp;aset&nbsp;Anda.</p><p></p><p>Mengapa&nbsp;Keamanan&nbsp;Listrik&nbsp;Penting?</p><p></p><p>Berdasarkan&nbsp;berbagai&nbsp;kasus&nbsp;kebakaran&nbsp;di&nbsp;Indonesia,&nbsp;salah&nbsp;satu&nbsp;penyebab&nbsp;utama&nbsp;adalah&nbsp;gangguan&nbsp;instalasi&nbsp;listrik,&nbsp;seperti&nbsp;kabel&nbsp;yang&nbsp;rusak,&nbsp;beban&nbsp;listrik&nbsp;berlebih,&nbsp;dan&nbsp;penggunaan&nbsp;peralatan&nbsp;yang&nbsp;tidak&nbsp;sesuai&nbsp;standar.&nbsp;Dengan&nbsp;menerapkan&nbsp;praktik&nbsp;keamanan&nbsp;listrik&nbsp;yang&nbsp;benar,&nbsp;risiko&nbsp;tersebut&nbsp;dapat&nbsp;diminimalkan&nbsp;secara&nbsp;signifikan.</p><p></p><p>⸻</p><p></p><p>1.&nbsp;Gunakan&nbsp;Kabel&nbsp;dan&nbsp;Peralatan&nbsp;Listrik&nbsp;Bersertifikat</p><p></p><p>Pastikan&nbsp;seluruh&nbsp;kabel,&nbsp;saklar,&nbsp;stop&nbsp;kontak,&nbsp;dan&nbsp;perlengkapan&nbsp;listrik&nbsp;yang&nbsp;digunakan&nbsp;telah&nbsp;memenuhi&nbsp;standar&nbsp;keamanan&nbsp;dan&nbsp;memiliki&nbsp;sertifikasi&nbsp;yang&nbsp;berlaku.</p><p></p><p>Keuntungan&nbsp;menggunakan&nbsp;produk&nbsp;berkualitas:</p><p></p><p>*&nbsp;Lebih&nbsp;tahan&nbsp;panas</p><p>*&nbsp;Isolasi&nbsp;lebih&nbsp;kuat</p><p>*&nbsp;Mengurangi&nbsp;risiko&nbsp;korsleting</p><p>*&nbsp;Umur&nbsp;pakai&nbsp;lebih&nbsp;panjang</p><p></p><p>Tips:&nbsp;Pilih&nbsp;produk&nbsp;listrik&nbsp;dari&nbsp;merek&nbsp;terpercaya&nbsp;yang&nbsp;telah&nbsp;memenuhi&nbsp;standar&nbsp;mutu&nbsp;dan&nbsp;keamanan.</p><p></p><p>⸻</p><p></p><p>2.&nbsp;Hindari&nbsp;Stop&nbsp;Kontak&nbsp;Bertumpuk</p><p></p><p>Banyak&nbsp;orang&nbsp;menggunakan&nbsp;terminal&nbsp;atau&nbsp;adaptor&nbsp;bertumpuk&nbsp;untuk&nbsp;menghubungkan&nbsp;banyak&nbsp;perangkat&nbsp;sekaligus.&nbsp;Kebiasaan&nbsp;ini&nbsp;dapat&nbsp;menyebabkan:</p><p></p><p>*&nbsp;Overload&nbsp;(beban&nbsp;berlebih)</p><p>*&nbsp;Panas&nbsp;berlebih&nbsp;pada&nbsp;kabel</p><p>*&nbsp;Risiko&nbsp;percikan&nbsp;api</p><p></p><p>Yang&nbsp;Disarankan:</p><p></p><p>✔&nbsp;Gunakan&nbsp;stop&nbsp;kontak&nbsp;sesuai&nbsp;kapasitasnya</p><p>✔&nbsp;Sebarkan&nbsp;penggunaan&nbsp;perangkat&nbsp;ke&nbsp;beberapa&nbsp;titik&nbsp;listrik</p><p>✔&nbsp;Hindari&nbsp;penggunaan&nbsp;adaptor&nbsp;bertingkat&nbsp;secara&nbsp;berlebihan</p><p></p><p>⸻</p><p></p><p>3.&nbsp;Periksa&nbsp;Kondisi&nbsp;Kabel&nbsp;Secara&nbsp;Berkala</p><p></p><p>Kabel&nbsp;yang&nbsp;sudah&nbsp;tua&nbsp;atau&nbsp;rusak&nbsp;dapat&nbsp;menyebabkan&nbsp;kebocoran&nbsp;arus&nbsp;listrik.</p><p></p><p>Tanda&nbsp;kabel&nbsp;perlu&nbsp;diganti:</p><p></p><p>*&nbsp;Isolasi&nbsp;retak&nbsp;atau&nbsp;mengelupas</p><p>*&nbsp;Warna&nbsp;kabel&nbsp;berubah&nbsp;akibat&nbsp;panas</p><p>*&nbsp;Kabel&nbsp;terasa&nbsp;panas&nbsp;saat&nbsp;digunakan</p><p>*&nbsp;Muncul&nbsp;bau&nbsp;terbakar</p><p></p><p>Lakukan&nbsp;pemeriksaan&nbsp;minimal&nbsp;setiap&nbsp;6&nbsp;bulan&nbsp;sekali,&nbsp;terutama&nbsp;pada&nbsp;instalasi&nbsp;yang&nbsp;berusia&nbsp;lebih&nbsp;dari&nbsp;5&nbsp;tahun.</p><p></p><p>⸻</p><p></p><p>4.&nbsp;Jangan&nbsp;Menyentuh&nbsp;Peralatan&nbsp;Listrik&nbsp;dengan&nbsp;Tangan&nbsp;Basah</p><p></p><p>Air&nbsp;merupakan&nbsp;penghantar&nbsp;listrik&nbsp;yang&nbsp;sangat&nbsp;baik.</p><p></p><p>Saat&nbsp;tangan&nbsp;basah:</p><p></p><p>*&nbsp;Risiko&nbsp;sengatan&nbsp;listrik&nbsp;meningkat</p><p>*&nbsp;Dapat&nbsp;menyebabkan&nbsp;cedera&nbsp;serius</p><p></p><p>Pastikan&nbsp;tangan&nbsp;dalam&nbsp;kondisi&nbsp;kering&nbsp;sebelum:</p><p></p><p>*&nbsp;Menyalakan&nbsp;saklar</p><p>*&nbsp;Mencabut&nbsp;atau&nbsp;memasang&nbsp;steker</p><p>*&nbsp;Mengoperasikan&nbsp;peralatan&nbsp;listrik</p><p></p><p>⸻</p><p></p><p>5.&nbsp;Gunakan&nbsp;MCB&nbsp;Sesuai&nbsp;Kapasitas</p><p></p><p>MCB&nbsp;(Miniature&nbsp;Circuit&nbsp;Breaker)&nbsp;berfungsi&nbsp;sebagai&nbsp;pelindung&nbsp;saat&nbsp;terjadi&nbsp;arus&nbsp;berlebih&nbsp;atau&nbsp;korsleting.</p><p></p><p>Fungsi&nbsp;MCB:</p><p></p><p>*&nbsp;Memutus&nbsp;aliran&nbsp;listrik&nbsp;secara&nbsp;otomatis</p><p>*&nbsp;Mencegah&nbsp;kerusakan&nbsp;instalasi</p><p>*&nbsp;Mengurangi&nbsp;risiko&nbsp;kebakaran</p><p></p><p>Pastikan&nbsp;kapasitas&nbsp;MCB&nbsp;sesuai&nbsp;dengan&nbsp;kebutuhan&nbsp;daya&nbsp;listrik&nbsp;rumah&nbsp;atau&nbsp;bangunan.</p><p></p><p>⸻</p><p></p><p>6.&nbsp;Jauhkan&nbsp;Kabel&nbsp;dari&nbsp;Sumber&nbsp;Panas</p><p></p><p>Kabel&nbsp;yang&nbsp;terkena&nbsp;panas&nbsp;berlebih&nbsp;dapat&nbsp;mengalami&nbsp;kerusakan&nbsp;pada&nbsp;lapisan&nbsp;isolasinya.</p><p></p><p>Hindari&nbsp;pemasangan&nbsp;kabel&nbsp;di&nbsp;dekat:</p><p></p><p>*&nbsp;Kompor</p><p>*&nbsp;Oven</p><p>*&nbsp;Mesin&nbsp;pemanas</p><p>*&nbsp;Atap&nbsp;seng&nbsp;tanpa&nbsp;pelindung</p><p></p><p>Gunakan&nbsp;pelindung&nbsp;kabel&nbsp;jika&nbsp;instalasi&nbsp;berada&nbsp;di&nbsp;area&nbsp;dengan&nbsp;suhu&nbsp;tinggi.</p><p></p><p>⸻</p><p></p><p>7.&nbsp;Lindungi&nbsp;Anak&nbsp;dari&nbsp;Bahaya&nbsp;Listrik</p><p></p><p>Anak-anak&nbsp;memiliki&nbsp;rasa&nbsp;ingin&nbsp;tahu&nbsp;yang&nbsp;tinggi&nbsp;dan&nbsp;sering&nbsp;kali&nbsp;memasukkan&nbsp;benda&nbsp;asing&nbsp;ke&nbsp;dalam&nbsp;stop&nbsp;kontak.</p><p></p><p>Cara&nbsp;pencegahan:</p><p></p><p>*&nbsp;Gunakan&nbsp;stop&nbsp;kontak&nbsp;dengan&nbsp;safety&nbsp;shutter</p><p>*&nbsp;Pasang&nbsp;penutup&nbsp;stop&nbsp;kontak</p><p>*&nbsp;Simpan&nbsp;kabel&nbsp;jauh&nbsp;dari&nbsp;jangkauan&nbsp;anak</p><p></p><p>Langkah&nbsp;sederhana&nbsp;ini&nbsp;dapat&nbsp;mencegah&nbsp;kecelakaan&nbsp;yang&nbsp;serius.</p><p></p><p>⸻</p><p></p><p>8.&nbsp;Cabut&nbsp;Peralatan&nbsp;yang&nbsp;Tidak&nbsp;Digunakan</p><p></p><p>Selain&nbsp;menghemat&nbsp;energi,&nbsp;mencabut&nbsp;peralatan&nbsp;yang&nbsp;tidak&nbsp;digunakan&nbsp;dapat&nbsp;mengurangi&nbsp;risiko&nbsp;gangguan&nbsp;listrik.</p><p></p><p>Peralatan&nbsp;yang&nbsp;sebaiknya&nbsp;dicabut&nbsp;saat&nbsp;tidak&nbsp;digunakan:</p><p></p><p>*&nbsp;Charger&nbsp;ponsel</p><p>*&nbsp;Setrika</p><p>*&nbsp;Rice&nbsp;cooker</p><p>*&nbsp;Televisi</p><p>*&nbsp;Dispenser</p><p></p><p>⸻</p><p></p><p>9.&nbsp;Jangan&nbsp;Memperbaiki&nbsp;Instalasi&nbsp;Tanpa&nbsp;Pengetahuan&nbsp;yang&nbsp;Memadai</p><p></p><p>Perbaikan&nbsp;instalasi&nbsp;listrik&nbsp;memerlukan&nbsp;pengetahuan&nbsp;dan&nbsp;prosedur&nbsp;keselamatan&nbsp;tertentu.</p><p></p><p>Jika&nbsp;terjadi&nbsp;masalah&nbsp;seperti:</p><p></p><p>*&nbsp;MCB&nbsp;sering&nbsp;turun</p><p>*&nbsp;Stop&nbsp;kontak&nbsp;mengeluarkan&nbsp;percikan</p><p>*&nbsp;Lampu&nbsp;berkedip&nbsp;terus&nbsp;menerus</p><p></p><p>Segera&nbsp;hubungi&nbsp;teknisi&nbsp;listrik&nbsp;profesional&nbsp;untuk&nbsp;melakukan&nbsp;pemeriksaan.</p><p></p><p>⸻</p><p></p><p>10.&nbsp;Lakukan&nbsp;Audit&nbsp;Instalasi&nbsp;Secara&nbsp;Berkala</p><p></p><p>Instalasi&nbsp;listrik&nbsp;yang&nbsp;sudah&nbsp;lama&nbsp;digunakan&nbsp;perlu&nbsp;diperiksa&nbsp;secara&nbsp;menyeluruh.</p><p></p><p>Audit&nbsp;instalasi&nbsp;meliputi:</p><p></p><p>*&nbsp;Kondisi&nbsp;kabel</p><p>*&nbsp;Sambungan&nbsp;listrik</p><p>*&nbsp;MCB&nbsp;dan&nbsp;panel&nbsp;listrik</p><p>*&nbsp;Stop&nbsp;kontak&nbsp;dan&nbsp;saklar</p><p>*&nbsp;Sistem&nbsp;grounding</p><p></p><p>Pemeriksaan&nbsp;berkala&nbsp;dapat&nbsp;mendeteksi&nbsp;potensi&nbsp;masalah&nbsp;sebelum&nbsp;menjadi&nbsp;bahaya&nbsp;yang&nbsp;lebih&nbsp;besar.</p><p></p><p>⸻</p><p></p><p>Kesimpulan</p><p></p><p>Keamanan&nbsp;listrik&nbsp;bukan&nbsp;hanya&nbsp;tanggung&nbsp;jawab&nbsp;teknisi,&nbsp;tetapi&nbsp;juga&nbsp;pengguna&nbsp;sehari-hari.&nbsp;Dengan&nbsp;menggunakan&nbsp;produk&nbsp;listrik&nbsp;berkualitas,&nbsp;menghindari&nbsp;beban&nbsp;berlebih,&nbsp;serta&nbsp;melakukan&nbsp;pemeriksaan&nbsp;rutin,&nbsp;Anda&nbsp;dapat&nbsp;menciptakan&nbsp;lingkungan&nbsp;yang&nbsp;lebih&nbsp;aman&nbsp;dan&nbsp;nyaman&nbsp;bagi&nbsp;keluarga&nbsp;maupun&nbsp;tempat&nbsp;usaha.</p><p></p><p>Voltama&nbsp;–&nbsp;Berkualitas&nbsp;dan&nbsp;Terpercaya</p><p></p><p>Voltama&nbsp;menghadirkan&nbsp;berbagai&nbsp;produk&nbsp;kelistrikan&nbsp;berkualitas&nbsp;yang&nbsp;dirancang&nbsp;untuk&nbsp;mendukung&nbsp;keamanan,&nbsp;kenyamanan,&nbsp;dan&nbsp;keandalan&nbsp;instalasi&nbsp;listrik&nbsp;Anda.&nbsp;Pilih&nbsp;produk&nbsp;yang&nbsp;tepat&nbsp;untuk&nbsp;perlindungan&nbsp;maksimal&nbsp;dan&nbsp;performa&nbsp;yang&nbsp;tahan&nbsp;lama.</p><p></p><p>Karena&nbsp;keamanan&nbsp;listrik&nbsp;dimulai&nbsp;dari&nbsp;produk&nbsp;yang&nbsp;berkualitas&nbsp;dan&nbsp;pemasangan&nbsp;yang&nbsp;benar.&nbsp;⚡</p><p></p><p>Kategori:&nbsp;Tips&nbsp;Keamanan&nbsp;Listrik</p><p>Tag:&nbsp;keamanan&nbsp;listrik,&nbsp;korsleting&nbsp;listrik,&nbsp;tips&nbsp;listrik&nbsp;rumah,&nbsp;instalasi&nbsp;listrik&nbsp;aman,&nbsp;stop&nbsp;kontak,&nbsp;saklar&nbsp;listrik,&nbsp;kabel&nbsp;listrik,&nbsp;Voltama</p>','/uploads/articles/1780581870_6a2185eeee7ad.png',3,1,'2026-06-04 06:30:48','2026-06-04 11:10:32'),
(2,2,'Panduan Instalasi Listrik Rumah yang Aman dan Sesuai Standar','panduan-instalasi-listrik-rumah-yang-aman-dan-sesuai-standar','<p>Pelajari&nbsp;panduan&nbsp;instalasi&nbsp;listrik&nbsp;rumah&nbsp;yang&nbsp;aman,&nbsp;efisien,&nbsp;dan&nbsp;sesuai&nbsp;standar.&nbsp;Temukan&nbsp;tips&nbsp;memilih&nbsp;kabel,&nbsp;saklar,&nbsp;stop&nbsp;kontak,&nbsp;dan&nbsp;sistem&nbsp;proteksi&nbsp;listrik&nbsp;untuk&nbsp;rumah&nbsp;Anda.</p><p></p><p>⸻</p><p></p><p>Panduan&nbsp;Instalasi&nbsp;Listrik&nbsp;Rumah&nbsp;yang&nbsp;Aman&nbsp;dan&nbsp;Sesuai&nbsp;Standar</p><p></p><p>Instalasi&nbsp;listrik&nbsp;merupakan&nbsp;salah&nbsp;satu&nbsp;bagian&nbsp;terpenting&nbsp;dalam&nbsp;sebuah&nbsp;bangunan.&nbsp;Sistem&nbsp;kelistrikan&nbsp;yang&nbsp;dirancang&nbsp;dengan&nbsp;baik&nbsp;tidak&nbsp;hanya&nbsp;memastikan&nbsp;seluruh&nbsp;peralatan&nbsp;dapat&nbsp;berfungsi&nbsp;optimal,&nbsp;tetapi&nbsp;juga&nbsp;melindungi&nbsp;penghuni&nbsp;dari&nbsp;risiko&nbsp;korsleting,&nbsp;sengatan&nbsp;listrik,&nbsp;dan&nbsp;kebakaran.</p><p></p><p>Sayangnya,&nbsp;masih&nbsp;banyak&nbsp;instalasi&nbsp;listrik&nbsp;yang&nbsp;dibuat&nbsp;tanpa&nbsp;memperhatikan&nbsp;standar&nbsp;keamanan&nbsp;yang&nbsp;berlaku.&nbsp;Oleh&nbsp;karena&nbsp;itu,&nbsp;penting&nbsp;bagi&nbsp;setiap&nbsp;pemilik&nbsp;rumah&nbsp;untuk&nbsp;memahami&nbsp;dasar-dasar&nbsp;instalasi&nbsp;listrik&nbsp;yang&nbsp;benar.</p><p></p><p>Mengapa&nbsp;Instalasi&nbsp;Listrik&nbsp;yang&nbsp;Benar&nbsp;Sangat&nbsp;Penting?</p><p></p><p>Instalasi&nbsp;listrik&nbsp;yang&nbsp;baik&nbsp;memberikan&nbsp;berbagai&nbsp;manfaat,&nbsp;antara&nbsp;lain:</p><p></p><p>*&nbsp;Menjamin&nbsp;keamanan&nbsp;penghuni&nbsp;rumah</p><p>*&nbsp;Mengurangi&nbsp;risiko&nbsp;korsleting&nbsp;dan&nbsp;kebakaran</p><p>*&nbsp;Menghemat&nbsp;penggunaan&nbsp;energi&nbsp;listrik</p><p>*&nbsp;Memperpanjang&nbsp;usia&nbsp;peralatan&nbsp;elektronik</p><p>*&nbsp;Mempermudah&nbsp;perawatan&nbsp;dan&nbsp;pengembangan&nbsp;instalasi&nbsp;di&nbsp;masa&nbsp;depan</p><p></p><p>Investasi&nbsp;pada&nbsp;sistem&nbsp;kelistrikan&nbsp;yang&nbsp;berkualitas&nbsp;akan&nbsp;memberikan&nbsp;perlindungan&nbsp;jangka&nbsp;panjang&nbsp;bagi&nbsp;bangunan&nbsp;dan&nbsp;keluarga&nbsp;Anda.</p><p></p><p>⸻</p><p></p><p>1.&nbsp;Rencanakan&nbsp;Kebutuhan&nbsp;Listrik&nbsp;Sejak&nbsp;Awal</p><p></p><p>Sebelum&nbsp;melakukan&nbsp;pemasangan,&nbsp;buatlah&nbsp;perencanaan&nbsp;yang&nbsp;matang&nbsp;mengenai&nbsp;kebutuhan&nbsp;listrik&nbsp;rumah.</p><p></p><p>Beberapa&nbsp;hal&nbsp;yang&nbsp;perlu&nbsp;diperhatikan:</p><p></p><p>*&nbsp;Jumlah&nbsp;ruangan</p><p>*&nbsp;Posisi&nbsp;lampu</p><p>*&nbsp;Lokasi&nbsp;stop&nbsp;kontak</p><p>*&nbsp;Titik&nbsp;saklar</p><p>*&nbsp;Peralatan&nbsp;elektronik&nbsp;yang&nbsp;akan&nbsp;digunakan</p><p>*&nbsp;Kapasitas&nbsp;daya&nbsp;listrik&nbsp;PLN</p><p></p><p>Perencanaan&nbsp;yang&nbsp;baik&nbsp;akan&nbsp;menghindari&nbsp;penggunaan&nbsp;sambungan&nbsp;tambahan&nbsp;yang&nbsp;berlebihan&nbsp;di&nbsp;kemudian&nbsp;hari.</p><p></p><p>⸻</p><p></p><p>2.&nbsp;Pilih&nbsp;Kabel&nbsp;Listrik&nbsp;Sesuai&nbsp;Kapasitas&nbsp;Beban</p><p></p><p>Kabel&nbsp;merupakan&nbsp;komponen&nbsp;utama&nbsp;dalam&nbsp;instalasi&nbsp;listrik.&nbsp;Penggunaan&nbsp;ukuran&nbsp;kabel&nbsp;yang&nbsp;tidak&nbsp;sesuai&nbsp;dapat&nbsp;menyebabkan&nbsp;panas&nbsp;berlebih&nbsp;dan&nbsp;berpotensi&nbsp;menimbulkan&nbsp;kebakaran.</p><p></p><p>Rekomendasi&nbsp;umum:</p><p></p><p>Penggunaan&nbsp;Ukuran&nbsp;Kabel</p><p>Lampu&nbsp;1,5&nbsp;mm²</p><p>Stop&nbsp;Kontak&nbsp;Umum&nbsp;2,5&nbsp;mm²</p><p>AC&nbsp;dan&nbsp;Water&nbsp;Heater&nbsp;4&nbsp;mm²&nbsp;atau&nbsp;lebih</p><p>Instalasi&nbsp;Utama&nbsp;Disesuaikan&nbsp;dengan&nbsp;daya&nbsp;rumah</p><p></p><p>Gunakan&nbsp;kabel&nbsp;berkualitas&nbsp;yang&nbsp;memiliki&nbsp;standar&nbsp;keamanan&nbsp;dan&nbsp;daya&nbsp;tahan&nbsp;tinggi.</p><p></p><p>⸻</p><p></p><p>3.&nbsp;Gunakan&nbsp;Saklar&nbsp;dan&nbsp;Stop&nbsp;Kontak&nbsp;Berkualitas</p><p></p><p>Saklar&nbsp;dan&nbsp;stop&nbsp;kontak&nbsp;merupakan&nbsp;titik&nbsp;yang&nbsp;paling&nbsp;sering&nbsp;digunakan&nbsp;dalam&nbsp;instalasi&nbsp;listrik.</p><p></p><p>Pilih&nbsp;produk&nbsp;yang:</p><p></p><p>✔&nbsp;Tahan&nbsp;panas</p><p>✔&nbsp;Material&nbsp;berkualitas&nbsp;tinggi</p><p>✔&nbsp;Memiliki&nbsp;kontak&nbsp;listrik&nbsp;yang&nbsp;kuat</p><p>✔&nbsp;Mudah&nbsp;dipasang&nbsp;dan&nbsp;dirawat</p><p></p><p>Selain&nbsp;memberikan&nbsp;keamanan,&nbsp;produk&nbsp;berkualitas&nbsp;juga&nbsp;memberikan&nbsp;tampilan&nbsp;yang&nbsp;lebih&nbsp;modern&nbsp;dan&nbsp;elegan&nbsp;pada&nbsp;interior&nbsp;rumah.</p><p></p><p>⸻</p><p></p><p>4.&nbsp;Pasang&nbsp;MCB&nbsp;Sebagai&nbsp;Proteksi&nbsp;Utama</p><p></p><p>MCB&nbsp;(Miniature&nbsp;Circuit&nbsp;Breaker)&nbsp;berfungsi&nbsp;melindungi&nbsp;instalasi&nbsp;listrik&nbsp;dari:</p><p></p><p>*&nbsp;Arus&nbsp;berlebih</p><p>*&nbsp;Hubungan&nbsp;pendek&nbsp;(short&nbsp;circuit)</p><p>*&nbsp;Kerusakan&nbsp;peralatan&nbsp;listrik</p><p></p><p>Ketika&nbsp;terjadi&nbsp;gangguan,&nbsp;MCB&nbsp;akan&nbsp;memutus&nbsp;aliran&nbsp;listrik&nbsp;secara&nbsp;otomatis&nbsp;sehingga&nbsp;mencegah&nbsp;kerusakan&nbsp;yang&nbsp;lebih&nbsp;besar.</p><p></p><p>Tips:</p><p></p><p>Gunakan&nbsp;MCB&nbsp;dengan&nbsp;kapasitas&nbsp;yang&nbsp;sesuai&nbsp;dengan&nbsp;daya&nbsp;listrik&nbsp;rumah&nbsp;Anda.</p><p></p><p>⸻</p><p></p><p>5.&nbsp;Pisahkan&nbsp;Jalur&nbsp;Lampu&nbsp;dan&nbsp;Stop&nbsp;Kontak</p><p></p><p>Instalasi&nbsp;modern&nbsp;sebaiknya&nbsp;menggunakan&nbsp;jalur&nbsp;yang&nbsp;terpisah&nbsp;antara:</p><p></p><p>Jalur&nbsp;Penerangan</p><p></p><p>*&nbsp;Lampu&nbsp;ruang&nbsp;tamu</p><p>*&nbsp;Lampu&nbsp;kamar</p><p>*&nbsp;Lampu&nbsp;taman</p><p></p><p>Jalur&nbsp;Stop&nbsp;Kontak</p><p></p><p>*&nbsp;Televisi</p><p>*&nbsp;Kulkas</p><p>*&nbsp;Mesin&nbsp;cuci</p><p>*&nbsp;Peralatan&nbsp;elektronik&nbsp;lainnya</p><p></p><p>Keuntungan&nbsp;sistem&nbsp;ini:</p><p></p><p>*&nbsp;Lebih&nbsp;aman</p><p>*&nbsp;Memudahkan&nbsp;perawatan</p><p>*&nbsp;Gangguan&nbsp;pada&nbsp;satu&nbsp;jalur&nbsp;tidak&nbsp;memengaruhi&nbsp;seluruh&nbsp;rumah</p><p></p><p>⸻</p><p></p><p>6.&nbsp;Gunakan&nbsp;Sistem&nbsp;Grounding</p><p></p><p>Grounding&nbsp;berfungsi&nbsp;mengalirkan&nbsp;arus&nbsp;bocor&nbsp;ke&nbsp;tanah&nbsp;sehingga&nbsp;mengurangi&nbsp;risiko&nbsp;sengatan&nbsp;listrik.</p><p></p><p>Manfaat&nbsp;Grounding:</p><p></p><p>*&nbsp;Melindungi&nbsp;manusia&nbsp;dari&nbsp;sengatan&nbsp;listrik</p><p>*&nbsp;Melindungi&nbsp;peralatan&nbsp;elektronik</p><p>*&nbsp;Mengurangi&nbsp;risiko&nbsp;kerusakan&nbsp;akibat&nbsp;petir</p><p>*&nbsp;Meningkatkan&nbsp;keamanan&nbsp;instalasi</p><p></p><p>Grounding&nbsp;merupakan&nbsp;salah&nbsp;satu&nbsp;elemen&nbsp;wajib&nbsp;dalam&nbsp;instalasi&nbsp;listrik&nbsp;modern.</p><p></p><p>⸻</p><p></p><p>7.&nbsp;Perhatikan&nbsp;Kerapihan&nbsp;Instalasi</p><p></p><p>Selain&nbsp;aman,&nbsp;instalasi&nbsp;yang&nbsp;rapi&nbsp;juga&nbsp;lebih&nbsp;mudah&nbsp;diperiksa&nbsp;dan&nbsp;diperbaiki.</p><p></p><p>Gunakan:</p><p></p><p>*&nbsp;Pipa&nbsp;conduit</p><p>*&nbsp;Kabel&nbsp;tray</p><p>*&nbsp;Junction&nbsp;box</p><p>*&nbsp;Panel&nbsp;distribusi&nbsp;yang&nbsp;tertata</p><p></p><p>Hindari&nbsp;sambungan&nbsp;kabel&nbsp;terbuka&nbsp;yang&nbsp;dapat&nbsp;membahayakan&nbsp;pengguna.</p><p></p><p>⸻</p><p></p><p>8.&nbsp;Hindari&nbsp;Sambungan&nbsp;Kabel&nbsp;Berlebihan</p><p></p><p>Sambungan&nbsp;kabel&nbsp;yang&nbsp;terlalu&nbsp;banyak&nbsp;dapat&nbsp;menimbulkan:</p><p></p><p>*&nbsp;Penurunan&nbsp;kualitas&nbsp;koneksi</p><p>*&nbsp;Panas&nbsp;berlebih</p><p>*&nbsp;Risiko&nbsp;korsleting</p><p></p><p>Jika&nbsp;sambungan&nbsp;tidak&nbsp;dapat&nbsp;dihindari,&nbsp;gunakan&nbsp;konektor&nbsp;yang&nbsp;sesuai&nbsp;dan&nbsp;pastikan&nbsp;isolasi&nbsp;dilakukan&nbsp;dengan&nbsp;benar.</p><p></p><p>⸻</p><p></p><p>9.&nbsp;Lakukan&nbsp;Pengujian&nbsp;Setelah&nbsp;Instalasi</p><p></p><p>Sebelum&nbsp;digunakan&nbsp;secara&nbsp;penuh,&nbsp;lakukan&nbsp;pemeriksaan&nbsp;menyeluruh.</p><p></p><p>Pengujian&nbsp;meliputi:</p><p></p><p>*&nbsp;Tegangan&nbsp;listrik</p><p>*&nbsp;Fungsi&nbsp;MCB</p><p>*&nbsp;Fungsi&nbsp;saklar</p><p>*&nbsp;Fungsi&nbsp;stop&nbsp;kontak</p><p>*&nbsp;Sistem&nbsp;grounding</p><p></p><p>Langkah&nbsp;ini&nbsp;penting&nbsp;untuk&nbsp;memastikan&nbsp;seluruh&nbsp;instalasi&nbsp;bekerja&nbsp;dengan&nbsp;aman&nbsp;dan&nbsp;sesuai&nbsp;perencanaan.</p><p></p><p>⸻</p><p></p><p>10.&nbsp;Gunakan&nbsp;Jasa&nbsp;Teknisi&nbsp;Profesional</p><p></p><p>Pemasangan&nbsp;instalasi&nbsp;listrik&nbsp;memerlukan&nbsp;keahlian&nbsp;khusus&nbsp;dan&nbsp;pemahaman&nbsp;standar&nbsp;keselamatan.</p><p></p><p>Menggunakan&nbsp;teknisi&nbsp;profesional&nbsp;akan&nbsp;membantu:</p><p></p><p>*&nbsp;Memastikan&nbsp;pemasangan&nbsp;sesuai&nbsp;standar</p><p>*&nbsp;Mengurangi&nbsp;risiko&nbsp;kesalahan&nbsp;instalasi</p><p>*&nbsp;Meningkatkan&nbsp;keamanan&nbsp;jangka&nbsp;panjang</p><p>*&nbsp;Menghemat&nbsp;biaya&nbsp;perbaikan&nbsp;di&nbsp;masa&nbsp;depan</p><p></p><p>⸻</p><p></p><p>Kesimpulan</p><p></p><p>Instalasi&nbsp;listrik&nbsp;yang&nbsp;aman&nbsp;dimulai&nbsp;dari&nbsp;perencanaan&nbsp;yang&nbsp;tepat,&nbsp;pemilihan&nbsp;material&nbsp;berkualitas,&nbsp;serta&nbsp;pemasangan&nbsp;yang&nbsp;sesuai&nbsp;standar.&nbsp;Penggunaan&nbsp;kabel,&nbsp;saklar,&nbsp;stop&nbsp;kontak,&nbsp;dan&nbsp;sistem&nbsp;proteksi&nbsp;yang&nbsp;tepat&nbsp;akan&nbsp;memberikan&nbsp;kenyamanan&nbsp;sekaligus&nbsp;perlindungan&nbsp;bagi&nbsp;seluruh&nbsp;penghuni&nbsp;rumah.</p><p></p><p>Voltama&nbsp;–&nbsp;Berkualitas&nbsp;dan&nbsp;Terpercaya</p><p></p><p>Voltama&nbsp;menghadirkan&nbsp;berbagai&nbsp;produk&nbsp;kelistrikan&nbsp;berkualitas&nbsp;untuk&nbsp;kebutuhan&nbsp;rumah,&nbsp;gedung,&nbsp;maupun&nbsp;industri.&nbsp;Mulai&nbsp;dari&nbsp;kabel&nbsp;listrik,&nbsp;saklar,&nbsp;stop&nbsp;kontak,&nbsp;hingga&nbsp;aksesoris&nbsp;kelistrikan&nbsp;lainnya&nbsp;yang&nbsp;dirancang&nbsp;untuk&nbsp;memberikan&nbsp;keamanan,&nbsp;ketahanan,&nbsp;dan&nbsp;performa&nbsp;terbaik.</p><p></p><p>Karena&nbsp;instalasi&nbsp;listrik&nbsp;yang&nbsp;aman&nbsp;dimulai&nbsp;dari&nbsp;produk&nbsp;yang&nbsp;berkualitas.&nbsp;⚡</p><p></p><p>Kategori:&nbsp;Panduan&nbsp;Instalasi&nbsp;Listrik</p><p>Tag:&nbsp;instalasi&nbsp;listrik&nbsp;rumah,&nbsp;panduan&nbsp;instalasi&nbsp;listrik,&nbsp;kabel&nbsp;listrik,&nbsp;saklar&nbsp;listrik,&nbsp;stop&nbsp;kontak,&nbsp;MCB,&nbsp;grounding,&nbsp;Voltama,&nbsp;listrik&nbsp;aman,&nbsp;instalasi&nbsp;sesuai&nbsp;standar.</p>','/uploads/articles/1780581365_6a2183f508bd9.png',0,1,'2026-06-04 06:56:05','2026-06-04 06:56:05');
/*!40000 ALTER TABLE `articles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache`
--

DROP TABLE IF EXISTS `cache`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache`
--

LOCK TABLES `cache` WRITE;
/*!40000 ALTER TABLE `cache` DISABLE KEYS */;
INSERT INTO `cache` VALUES
('voltama-cache-admin@admin.com|146.75.132.28','i:2;',1780596815),
('voltama-cache-admin@admin.com|146.75.132.28:timer','i:1780596815;',1780596815),
('voltama-cache-yasin@baiturrahmantatyaasri.com|146.75.132.28','i:1;',1780596785),
('voltama-cache-yasin@baiturrahmantatyaasri.com|146.75.132.28:timer','i:1780596785;',1780596785);
/*!40000 ALTER TABLE `cache` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cache_locks`
--

DROP TABLE IF EXISTS `cache_locks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL,
  PRIMARY KEY (`key`),
  KEY `cache_locks_expiration_index` (`expiration`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cache_locks`
--

LOCK TABLES `cache_locks` WRITE;
/*!40000 ALTER TABLE `cache_locks` DISABLE KEYS */;
/*!40000 ALTER TABLE `cache_locks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catalog_categories`
--

DROP TABLE IF EXISTS `catalog_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `catalog_categories` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `sort_order` int(10) unsigned NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `catalog_categories_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalog_categories`
--

LOCK TABLES `catalog_categories` WRITE;
/*!40000 ALTER TABLE `catalog_categories` DISABLE KEYS */;
INSERT INTO `catalog_categories` VALUES
(1,'Kabel Bangunan','kabel-bangunan','/uploads/categories/cat_1780573397.png','Voltama menghadirkan produk kelistrikan yang aman  dengan kualitas bersertifikasi, memastikan  setiap daya tetap andal dan dibangun untuk  bertahan lama.',1,1,'2026-06-02 18:19:54','2026-06-04 04:43:17'),
(2,'Saklar','saklar','/uploads/categories/cat_1780573601.png','Voltama menghadirkan produk kelistrikan yang aman dengan kualitas bersertifikasi, memastikan setiap daya tetap andal dan dibangun untuk bertahan lama.',2,1,'2026-06-04 04:46:41','2026-06-04 04:46:41'),
(3,'Kabel Udara','kabel-udara','/uploads/categories/cat_1780582395.jpg','Voltama menghadirkan produk kelistrikan yang aman dengan kualitas bersertifikasi, memastikan setiap daya tetap andal dan dibangun untuk bertahan lama.',3,1,'2026-06-04 07:13:15','2026-06-04 07:13:31');
/*!40000 ALTER TABLE `catalog_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `catalogs`
--

DROP TABLE IF EXISTS `catalogs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `catalogs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `catalog_category_id` bigint(20) unsigned DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `image_path` varchar(255) DEFAULT NULL,
  `specifications` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`specifications`)),
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `order_position` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `catalogs_slug_unique` (`slug`),
  KEY `catalogs_catalog_category_id_foreign` (`catalog_category_id`),
  CONSTRAINT `catalogs_catalog_category_id_foreign` FOREIGN KEY (`catalog_category_id`) REFERENCES `catalog_categories` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `catalogs`
--

LOCK TABLES `catalogs` WRITE;
/*!40000 ALTER TABLE `catalogs` DISABLE KEYS */;
INSERT INTO `catalogs` VALUES
(1,1,'NYA 1,5 mm2 (kuning)','nya-15-mm2-kuning','N = Kabel inti tembaga\r\nY = Isolasi PVC\r\nA = Kabel tunggal\r\n\r\nBisa kita diartikan bahwa kabel NYA merupakan kabel tembaga tunggal dengan isolator terselubung dengan berbahan PVC. Pada umumnya, kabel ini sering digunakan dalam instalasi listrik rumah tinggal dan sistem tenaga.\r\n\r\nSpesifikasi ukuran diameter dari kabel NYA ini rata rata sekitar 1,5 mm – 2,5 mm. Isolator pembungkus kabel NYA memiliki warna merah, kuning, biru dan hitam yang berguna untuk memudahkan pemasangan jalur jaringan instalasi listrik.\r\n\r\nKalebihan : memiliki kabel inti tunggal yang mudah dan sederhana pada instalasi kabel listrik, sehingga jika ada tarikan kabel tertentu bisa dengan mudah dilakukan. Harga kabel NYA juga lebih terjangkau.','/uploads/catalogs/1780573790_6a21665edf315.png','{\"Sertifikasi\":\"SNI <>LMK<>\",\"Bahan Konduktor\":\"99.99 % Tembaga Murni\",\"Garansi\":\"10 Tahun\"}',1,0,'2026-06-04 04:27:00','2026-06-04 07:24:33'),
(2,1,'NYA 2,5 mm2 (kuning)','nya-25-mm2-kuning','N = Kabel inti tembaga\r\nY = Isolasi PVC\r\nA = Kabel tunggal\r\n\r\nBisa kita diartikan bahwa kabel NYA merupakan kabel tembaga tunggal dengan isolator terselubung dengan berbahan PVC. Pada umumnya, kabel ini sering digunakan dalam instalasi listrik rumah tinggal dan sistem tenaga.\r\n\r\nSpesifikasi ukuran diameter dari kabel NYA ini rata rata sekitar 1,5 mm – 2,5 mm. Isolator pembungkus kabel NYA memiliki warna merah, kuning, biru dan hitam yang berguna untuk memudahkan pemasangan jalur jaringan instalasi listrik.\r\n\r\nKalebihan : memiliki kabel inti tunggal yang mudah dan sederhana pada instalasi kabel listrik, sehingga jika ada tarikan kabel tertentu bisa dengan mudah dilakukan. Harga kabel NYA juga lebih terjangkau.','/uploads/catalogs/1780573824_6a216680abd2a.png','{\"Sertifikasi\":\"SNI <>LMK<>\",\"Bahan Konduktor\":\"99.99 % Tembaga Murni\",\"Garansi\":\"10 Tahun\"}',1,0,'2026-06-04 04:48:43','2026-06-04 07:24:26'),
(3,1,'NYA 1,5 mm2 (biru)','nya-15-mm2-biru','N = Kabel inti tembaga\r\nY = Isolasi PVC\r\nA = Kabel tunggal\r\n\r\nBisa kita diartikan bahwa kabel NYA merupakan kabel tembaga tunggal dengan isolator terselubung dengan berbahan PVC. Pada umumnya, kabel ini sering digunakan dalam instalasi listrik rumah tinggal dan sistem tenaga.\r\n\r\nSpesifikasi ukuran diameter dari kabel NYA ini rata rata sekitar 1,5 mm – 2,5 mm. Isolator pembungkus kabel NYA memiliki warna merah, kuning, biru dan hitam yang berguna untuk memudahkan pemasangan jalur jaringan instalasi listrik.\r\n\r\nKalebihan : memiliki kabel inti tunggal yang mudah dan sederhana pada instalasi kabel listrik, sehingga jika ada tarikan kabel tertentu bisa dengan mudah dilakukan. Harga kabel NYA juga lebih terjangkau.','/uploads/catalogs/1780573901_6a2166cdf143c.png','{\"Sertifikasi\":\"SNI <>LMK<>\",\"Bahan Konduktor\":\"99.99 % Tembaga Murni\",\"Garansi\":\"10 Tahun\"}',1,0,'2026-06-04 04:51:41','2026-06-04 07:24:20'),
(4,1,'NYA 2,5 mm2 (biru)','nya-25-mm2-biru','N = Kabel inti tembaga\r\nY = Isolasi PVC\r\nA = Kabel tunggal\r\n\r\nBisa kita diartikan bahwa kabel NYA merupakan kabel tembaga tunggal dengan isolator terselubung dengan berbahan PVC. Pada umumnya, kabel ini sering digunakan dalam instalasi listrik rumah tinggal dan sistem tenaga.\r\n\r\nSpesifikasi ukuran diameter dari kabel NYA ini rata rata sekitar 1,5 mm – 2,5 mm. Isolator pembungkus kabel NYA memiliki warna merah, kuning, biru dan hitam yang berguna untuk memudahkan pemasangan jalur jaringan instalasi listrik.\r\n\r\nKalebihan : memiliki kabel inti tunggal yang mudah dan sederhana pada instalasi kabel listrik, sehingga jika ada tarikan kabel tertentu bisa dengan mudah dilakukan. Harga kabel NYA juga lebih terjangkau.','/uploads/catalogs/1780573939_6a2166f3b7b87.png','{\"Sertifikasi\":\"SNI <>LMK<>\",\"Bahan Konduktor\":\"99.99 % Tembaga Murni\",\"Garansi\":\"10 Tahun\"}',1,0,'2026-06-04 04:52:19','2026-06-04 07:24:15'),
(5,1,'NYA 1,5 mm2 (hitam)','nya-15-mm2-hitam','N = Kabel inti tembaga\r\nY = Isolasi PVC\r\nA = Kabel tunggal\r\n\r\nBisa kita diartikan bahwa kabel NYA merupakan kabel tembaga tunggal dengan isolator terselubung dengan berbahan PVC. Pada umumnya, kabel ini sering digunakan dalam instalasi listrik rumah tinggal dan sistem tenaga.\r\n\r\nSpesifikasi ukuran diameter dari kabel NYA ini rata rata sekitar 1,5 mm – 2,5 mm. Isolator pembungkus kabel NYA memiliki warna merah, kuning, biru dan hitam yang berguna untuk memudahkan pemasangan jalur jaringan instalasi listrik.\r\n\r\nKalebihan : memiliki kabel inti tunggal yang mudah dan sederhana pada instalasi kabel listrik, sehingga jika ada tarikan kabel tertentu bisa dengan mudah dilakukan. Harga kabel NYA juga lebih terjangkau.','/uploads/catalogs/1780573987_6a21672356655.png','{\"Sertifikasi\":\"SNI <>LMK<>\",\"Bahan Konduktor\":\"99.99 % Tembaga Murni\",\"Garansi\":\"10 Tahun\"}',1,0,'2026-06-04 04:53:07','2026-06-04 07:24:08'),
(6,1,'NYA 2,5 mm2 (hitam)','nya-25-mm2-hitam','N = Kabel inti tembaga\r\nY = Isolasi PVC\r\nA = Kabel tunggal\r\n\r\nBisa kita diartikan bahwa kabel NYA merupakan kabel tembaga tunggal dengan isolator terselubung dengan berbahan PVC. Pada umumnya, kabel ini sering digunakan dalam instalasi listrik rumah tinggal dan sistem tenaga.\r\n\r\nSpesifikasi ukuran diameter dari kabel NYA ini rata rata sekitar 1,5 mm – 2,5 mm. Isolator pembungkus kabel NYA memiliki warna merah, kuning, biru dan hitam yang berguna untuk memudahkan pemasangan jalur jaringan instalasi listrik.\r\n\r\nKalebihan : memiliki kabel inti tunggal yang mudah dan sederhana pada instalasi kabel listrik, sehingga jika ada tarikan kabel tertentu bisa dengan mudah dilakukan. Harga kabel NYA juga lebih terjangkau.','/uploads/catalogs/1780574129_6a2167b1e2140.png','{\"Sertifikasi\":\"SNI <>LMK<>\",\"Bahan Konduktor\":\"99.99 % Tembaga Murni\",\"Garansi\":\"10 Tahun\"}',1,0,'2026-06-04 04:55:29','2026-06-04 07:24:00'),
(7,1,'NYA 1,5 mm2 (merah)','nya-15-mm2-merah','N = Kabel inti tembaga\r\nY = Isolasi PVC\r\nA = Kabel tunggal\r\n\r\nBisa kita diartikan bahwa kabel NYA merupakan kabel tembaga tunggal dengan isolator terselubung dengan berbahan PVC. Pada umumnya, kabel ini sering digunakan dalam instalasi listrik rumah tinggal dan sistem tenaga.\r\n\r\nSpesifikasi ukuran diameter dari kabel NYA ini rata rata sekitar 1,5 mm – 2,5 mm. Isolator pembungkus kabel NYA memiliki warna merah, kuning, biru dan hitam yang berguna untuk memudahkan pemasangan jalur jaringan instalasi listrik.\r\n\r\nKalebihan : memiliki kabel inti tunggal yang mudah dan sederhana pada instalasi kabel listrik, sehingga jika ada tarikan kabel tertentu bisa dengan mudah dilakukan. Harga kabel NYA juga lebih terjangkau.','/uploads/catalogs/1780574883_6a216aa387206.png','{\"Sertifikasi\":\"SNI <>LMK<>\",\"Bahan Konduktor\":\"99.99 % Tembaga Murni\",\"Garansi\":\"10 Tahun\"}',1,0,'2026-06-04 05:08:03','2026-06-04 07:23:51'),
(8,1,'NYA 2,5 mm2 (merah)','nya-25-mm2-merah','N = Kabel inti tembaga\r\nY = Isolasi PVC\r\nA = Kabel tunggal\r\n\r\nBisa kita diartikan bahwa kabel NYA merupakan kabel tembaga tunggal dengan isolator terselubung dengan berbahan PVC. Pada umumnya, kabel ini sering digunakan dalam instalasi listrik rumah tinggal dan sistem tenaga.\r\n\r\nSpesifikasi ukuran diameter dari kabel NYA ini rata rata sekitar 1,5 mm – 2,5 mm. Isolator pembungkus kabel NYA memiliki warna merah, kuning, biru dan hitam yang berguna untuk memudahkan pemasangan jalur jaringan instalasi listrik.\r\n\r\nKalebihan : memiliki kabel inti tunggal yang mudah dan sederhana pada instalasi kabel listrik, sehingga jika ada tarikan kabel tertentu bisa dengan mudah dilakukan. Harga kabel NYA juga lebih terjangkau.','/uploads/catalogs/1780574925_6a216acd05a7b.png','{\"Sertifikasi\":\"SNI <>LMK<>\",\"Bahan Konduktor\":\"99.99 % Tembaga Murni\",\"Garansi\":\"10 Tahun\"}',1,0,'2026-06-04 05:08:45','2026-06-04 07:23:44'),
(9,3,'NFA2X 2x10 mm2','nfa2x-2x10-mm2','Kabel NFA2X 2x10 mm adalah jenis kabel udara tegangan rendah (biasa disebut kabel Twisted atau SR/Service Drop) yang menggunakan konduktor aluminium. Kabel ini dirancang khusus untuk instalasi luar ruangan dan biasa digunakan oleh PLN sebagai sambungan dari tiang listrik ke rumah konsumen.','/uploads/catalogs/1780582478_6a21884ea088f.png','{\"Sertifikasi\":\"SNI <>LMK<>\",\"Bahan Konduktor\":\"99.99 % Tembaga Murni\",\"Garansi\":\"10 Tahun\"}',1,0,'2026-06-04 07:14:38','2026-06-04 07:23:30'),
(10,1,'NYY 2x1,5 mm2','nyy-2x15-mm2','N = Kabel inti tembaga\r\nY = Isolasi PVC\r\nY = Selubung luar Isolasi PVC\r\n\r\nKabel NYY merupakan kabel yang memiliki lebih dari satu inti tembaga dengan isolasi PVC dan selubung luar berbahan PVC. Kabel NYY bisa dibilang penyempurnaan dari kabel NYA dan NYM. Kabel ini cocok digunakan untuk instalasi listrik tetap seperti di bawah tanah ataupun tempat outdorr lain namun tetap harus diberikan perlindungan khusus seperti pipa.\r\n\r\nKabel NYY memiliki jumlah inti tembaga 2 , 3 atau 4 dengan lapisan isolasi PVC berwarna hitam. Bahan isolator untuk jenis kabel ini memiliki konstruksi yang lebih kuat dan kaku karena terdapat selubung tambahan dan berbahan anti gigitan tikus.\r\n\r\nKelebihan : kabel ini memiliki ketahanan yang sangat tinggi dan lebih aman, serta kabel bisa ditanam dibawah tanah.','/uploads/catalogs/1780582842_6a2189bab602e.png','{\"Sertifikasi\":\"SNI <>LMK<>\",\"Bahan Konduktor\":\"99.99 % Tembaga Murni\",\"Garansi\":\"10 Tahun\"}',1,0,'2026-06-04 07:20:42','2026-06-04 07:23:22'),
(11,1,'NYY 2x2,5 mm2','nyy-2x25-mm2','N = Kabel inti tembaga\r\nY = Isolasi PVC\r\nY = Selubung luar Isolasi PVC\r\n\r\nKabel NYY merupakan kabel yang memiliki lebih dari satu inti tembaga dengan isolasi PVC dan selubung luar berbahan PVC. Kabel NYY bisa dibilang penyempurnaan dari kabel NYA dan NYM. Kabel ini cocok digunakan untuk instalasi listrik tetap seperti di bawah tanah ataupun tempat outdorr lain namun tetap harus diberikan perlindungan khusus seperti pipa.\r\n\r\nKabel NYY memiliki jumlah inti tembaga 2 , 3 atau 4 dengan lapisan isolasi PVC berwarna hitam. Bahan isolator untuk jenis kabel ini memiliki konstruksi yang lebih kuat dan kaku karena terdapat selubung tambahan dan berbahan anti gigitan tikus.\r\n\r\nKelebihan : kabel ini memiliki ketahanan yang sangat tinggi dan lebih aman, serta kabel bisa ditanam dibawah tanah.','/uploads/catalogs/1780582921_6a218a097d8a1.png','{\"Sertifikasi\":\"SNI <>LMK<>\",\"Bahan Konduktor\":\"99.99 % Tembaga Murni\",\"Garansi\":\"10 Tahun\"}',1,0,'2026-06-04 07:22:01','2026-06-04 07:22:01'),
(12,1,'NYMHY 2x0,75 mm2 (hitam)','nymhy-2x075-mm2-hitam',NULL,'/uploads/catalogs/1780583376_6a218bd0db455.png','{\"Sertifikasi\":\"SNI <>LMK<>\",\"Bahan Konduktor\":\"99.99 % Tembaga Murni\",\"Garansi\":\"10 Tahun\"}',1,0,'2026-06-04 07:29:36','2026-06-04 07:29:36'),
(13,1,'NYMHY 2x1,5 mm2 (hitam)','nymhy-2x15-mm2-hitam',NULL,'/uploads/catalogs/1780583430_6a218c06a1c06.png','{\"Sertifikasi\":\"SNI <>LMK<>\",\"Bahan Konduktor\":\"99.99 % Tembaga Murni\",\"Garansi\":\"10 Tahun\"}',1,0,'2026-06-04 07:30:30','2026-06-04 07:30:30'),
(14,1,'NYMHY 2x0,75 mm2 (putih)','nymhy-2x075-mm2-putih',NULL,'/uploads/catalogs/1780583482_6a218c3a34089.png','{\"Sertifikasi\":\"SNI <>LMK<>\",\"Bahan Konduktor\":\"99.99 % Tembaga Murni\",\"Garansi\":\"10 Tahun\"}',1,0,'2026-06-04 07:31:22','2026-06-04 07:31:22'),
(15,1,'NYMHY 2x1,5 mm2 (putih)','nymhy-2x15-mm2-putih',NULL,'/uploads/catalogs/1780583522_6a218c62622c1.png','{\"Sertifikasi\":\"SNI <>LMK<>\",\"Bahan Konduktor\":\"99.99 % Tembaga Murni\",\"Garansi\":\"10 Tahun\"}',1,0,'2026-06-04 07:32:02','2026-06-04 07:32:02'),
(16,1,'NYM 2x1,5 mm2','nym-2x15-mm2','N = Kabel inti tembaga\r\nY = Isolasi PVC\r\nM = Inti kabel lebih dari satu\r\n\r\nKabel NYM merupakan kabel yang memiliki konduktor atau tembaga lebih dari satu dengan isolator terselubung dengan berbahan PVC. Kabel NYM sering digunakan khusus untuk pada instalasi tetap bangunan, dimana penempatannya biasanya di luar/di dalam tembok.\r\n\r\nUkuran kabel NYM sangat tergantung dari berapa jumlah inti kabel tembaga, bisa terdiri dari 2, 3, sampai 4 jika diperlukan untuk tambahan grounding. Warna lapisan isolator PVC pada kabel NYM biasanya putih atau abu-abu.\r\n\r\nKelebihan : memiliki Isolasi sebanyak 2 lapis, sehingga tingkat keamanan lebih baik dari kabel NYA. Kabel ini dapat digunakan pada area yang kering maupun basah.','/uploads/catalogs/1780583923_6a218df3a59be.png','{\"Sertifikasi\":\"SNI <>LMK<>\",\"Bahan Konduktor\":\"99.99 % Tembaga Murni\",\"Garansi\":\"10 Tahun\"}',1,0,'2026-06-04 07:34:06','2026-06-04 07:38:43'),
(17,1,'NYM 2x2,5 mm2','nym-2x25-mm2','N = Kabel inti tembaga\r\nY = Isolasi PVC\r\nM = Inti kabel lebih dari satu\r\n\r\nKabel NYM merupakan kabel yang memiliki konduktor atau tembaga lebih dari satu dengan isolator terselubung dengan berbahan PVC. Kabel NYM sering digunakan khusus untuk pada instalasi tetap bangunan, dimana penempatannya biasanya di luar/di dalam tembok.\r\n\r\nUkuran kabel NYM sangat tergantung dari berapa jumlah inti kabel tembaga, bisa terdiri dari 2, 3, sampai 4 jika diperlukan untuk tambahan grounding. Warna lapisan isolator PVC pada kabel NYM biasanya putih atau abu-abu.\r\n\r\nKelebihan : memiliki Isolasi sebanyak 2 lapis, sehingga tingkat keamanan lebih baik dari kabel NYA. Kabel ini dapat digunakan pada area yang kering maupun basah.','/uploads/catalogs/1780583952_6a218e104fb51.png','{\"Sertifikasi\":\"SNI <>LMK<>\",\"Bahan Konduktor\":\"99.99 % Tembaga Murni\",\"Garansi\":\"10 Tahun\"}',1,0,'2026-06-04 07:35:54','2026-06-04 07:39:12'),
(18,1,'NYM 3x1,5 mm2','nym-3x15-mm2','N = Kabel inti tembaga\r\nY = Isolasi PVC\r\nM = Inti kabel lebih dari satu\r\n\r\nKabel NYM merupakan kabel yang memiliki konduktor atau tembaga lebih dari satu dengan isolator terselubung dengan berbahan PVC. Kabel NYM sering digunakan khusus untuk pada instalasi tetap bangunan, dimana penempatannya biasanya di luar/di dalam tembok.\r\n\r\nUkuran kabel NYM sangat tergantung dari berapa jumlah inti kabel tembaga, bisa terdiri dari 2, 3, sampai 4 jika diperlukan untuk tambahan grounding. Warna lapisan isolator PVC pada kabel NYM biasanya putih atau abu-abu.\r\n\r\nKelebihan : memiliki Isolasi sebanyak 2 lapis, sehingga tingkat keamanan lebih baik dari kabel NYA. Kabel ini dapat digunakan pada area yang kering maupun basah.','/uploads/catalogs/1780584008_6a218e48e09fe.png','{\"Sertifikasi\":\"SNI <>LMK<>\",\"Bahan Konduktor\":\"99.99 % Tembaga Murni\",\"Garansi\":\"10 Tahun\"}',1,0,'2026-06-04 07:40:08','2026-06-04 07:40:08'),
(19,1,'NYM 3x2,5 mm2 (hitam)','nym-3x25-mm2-hitam','N = Kabel inti tembaga\r\nY = Isolasi PVC\r\nM = Inti kabel lebih dari satu\r\n\r\nKabel NYM merupakan kabel yang memiliki konduktor atau tembaga lebih dari satu dengan isolator terselubung dengan berbahan PVC. Kabel NYM sering digunakan khusus untuk pada instalasi tetap bangunan, dimana penempatannya biasanya di luar/di dalam tembok.\r\n\r\nUkuran kabel NYM sangat tergantung dari berapa jumlah inti kabel tembaga, bisa terdiri dari 2, 3, sampai 4 jika diperlukan untuk tambahan grounding. Warna lapisan isolator PVC pada kabel NYM biasanya putih atau abu-abu.\r\n\r\nKelebihan : memiliki Isolasi sebanyak 2 lapis, sehingga tingkat keamanan lebih baik dari kabel NYA. Kabel ini dapat digunakan pada area yang kering maupun basah.','/uploads/catalogs/1780584057_6a218e793a10a.png','{\"Sertifikasi\":\"SNI <>LMK<>\",\"Bahan Konduktor\":\"99.99 % Tembaga Murni\",\"Garansi\":\"10 Tahun\"}',1,0,'2026-06-04 07:40:57','2026-06-04 07:40:57'),
(20,1,'NYM 3x2,5 mm2 (putih)','nym-3x25-mm2-putih','N = Kabel inti tembaga\r\nY = Isolasi PVC\r\nM = Inti kabel lebih dari satu\r\n\r\nKabel NYM merupakan kabel yang memiliki konduktor atau tembaga lebih dari satu dengan isolator terselubung dengan berbahan PVC. Kabel NYM sering digunakan khusus untuk pada instalasi tetap bangunan, dimana penempatannya biasanya di luar/di dalam tembok.\r\n\r\nUkuran kabel NYM sangat tergantung dari berapa jumlah inti kabel tembaga, bisa terdiri dari 2, 3, sampai 4 jika diperlukan untuk tambahan grounding. Warna lapisan isolator PVC pada kabel NYM biasanya putih atau abu-abu.\r\n\r\nKelebihan : memiliki Isolasi sebanyak 2 lapis, sehingga tingkat keamanan lebih baik dari kabel NYA. Kabel ini dapat digunakan pada area yang kering maupun basah.','/uploads/catalogs/1780584098_6a218ea234260.png','{\"Sertifikasi\":\"SNI <>LMK<>\",\"Bahan Konduktor\":\"99.99 % Tembaga Murni\",\"Garansi\":\"10 Tahun\"}',1,0,'2026-06-04 07:41:38','2026-06-04 07:41:38'),
(21,1,'NYM 3x4 mm2','nym-3x4-mm2','N = Kabel inti tembaga\r\nY = Isolasi PVC\r\nM = Inti kabel lebih dari satu\r\n\r\nKabel NYM merupakan kabel yang memiliki konduktor atau tembaga lebih dari satu dengan isolator terselubung dengan berbahan PVC. Kabel NYM sering digunakan khusus untuk pada instalasi tetap bangunan, dimana penempatannya biasanya di luar/di dalam tembok.\r\n\r\nUkuran kabel NYM sangat tergantung dari berapa jumlah inti kabel tembaga, bisa terdiri dari 2, 3, sampai 4 jika diperlukan untuk tambahan grounding. Warna lapisan isolator PVC pada kabel NYM biasanya putih atau abu-abu.\r\n\r\nKelebihan : memiliki Isolasi sebanyak 2 lapis, sehingga tingkat keamanan lebih baik dari kabel NYA. Kabel ini dapat digunakan pada area yang kering maupun basah.','/uploads/catalogs/1780584134_6a218ec612c1e.png','{\"Sertifikasi\":\"SNI <>LMK<>\",\"Bahan Konduktor\":\"99.99 % Tembaga Murni\",\"Garansi\":\"10 Tahun\"}',1,0,'2026-06-04 07:42:14','2026-06-04 07:42:14');
/*!40000 ALTER TABLE `catalogs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `failed_jobs`
--

DROP TABLE IF EXISTS `failed_jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `failed_jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `failed_jobs`
--

LOCK TABLES `failed_jobs` WRITE;
/*!40000 ALTER TABLE `failed_jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `failed_jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hero_slides`
--

DROP TABLE IF EXISTS `hero_slides`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `hero_slides` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `image_path` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hero_slides`
--

LOCK TABLES `hero_slides` WRITE;
/*!40000 ALTER TABLE `hero_slides` DISABLE KEYS */;
INSERT INTO `hero_slides` VALUES
(1,'/uploads/hero-slides/hero_slide_1780569842_6a2156f2e60be.jpg',NULL,NULL,1,1,'2026-06-04 03:44:02','2026-06-04 03:44:24'),
(2,'/uploads/hero-slides/hero_slide_1780569884_6a21571c98be4.jpg',NULL,NULL,2,1,'2026-06-04 03:44:44','2026-06-04 03:44:44');
/*!40000 ALTER TABLE `hero_slides` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `job_batches`
--

DROP TABLE IF EXISTS `job_batches`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `job_batches`
--

LOCK TABLES `job_batches` WRITE;
/*!40000 ALTER TABLE `job_batches` DISABLE KEYS */;
/*!40000 ALTER TABLE `job_batches` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) unsigned NOT NULL,
  `reserved_at` int(10) unsigned DEFAULT NULL,
  `available_at` int(10) unsigned NOT NULL,
  `created_at` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `jobs_queue_index` (`queue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES
(1,'0001_01_01_000000_create_users_table',1),
(2,'0001_01_01_000001_create_cache_table',1),
(3,'0001_01_01_000002_create_jobs_table',1),
(4,'2026_05_25_084050_create_settings_table',1),
(5,'2026_05_25_084108_create_catalogs_table',1),
(6,'2026_05_25_084118_create_articles_table',1),
(7,'2026_05_25_084126_create_pages_table',1),
(8,'2026_05_25_084134_add_role_to_users_table',1),
(9,'2026_05_25_120001_create_catalog_categories_table',1),
(10,'2026_05_25_120002_create_article_categories_table',1),
(11,'2026_05_25_120003_add_category_to_catalogs_table',1),
(12,'2026_05_25_120004_add_category_to_articles_table',1),
(13,'2026_05_26_120001_create_testimonials_table',1),
(14,'2026_06_04_120001_create_hero_slides_table',2),
(15,'2026_06_04_234839_add_order_position_to_catalogs_table',3);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pages`
--

DROP TABLE IF EXISTS `pages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `pages` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `content` longtext DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pages_slug_unique` (`slug`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pages`
--

LOCK TABLES `pages` WRITE;
/*!40000 ALTER TABLE `pages` DISABLE KEYS */;
/*!40000 ALTER TABLE `pages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_reset_tokens`
--

DROP TABLE IF EXISTS `password_reset_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_reset_tokens`
--

LOCK TABLES `password_reset_tokens` WRITE;
/*!40000 ALTER TABLE `password_reset_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_reset_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) unsigned DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `sessions_user_id_index` (`user_id`),
  KEY `sessions_last_activity_index` (`last_activity`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES
('HhSZwAqEGckLlcrkEmdJh5z0f8jSeyldMa5Lvfns',1,'103.108.130.166','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36','YTo0OntzOjY6Il90b2tlbiI7czo0MDoibFRDM1BZQjVBTUlRTkx4RmFJNnNnbGFvSjBqY3VKWVN1YjJkcUxqSSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzU6Imh0dHBzOi8vdm9sdGFtYS5hbGFtaXRlY2hub2xvZ3kuY29tIjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO30=',1780595827),
('rg80RufZOsNTMtrMxkPoQgqWJNoYyikHJCKgqlZG',1,'146.75.132.29','Mozilla/5.0 (iPhone; CPU iPhone OS 18_7 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/26.5 Mobile/15E148 Safari/604.1','YTo0OntzOjY6Il90b2tlbiI7czo0MDoiaTA1bHVVd08yVDVuWVNtWG1ScW5IcFBoUVFWU1BIN1JGMXNWSHJ0eCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6NDE6Imh0dHBzOi8vdm9sdGFtYS5hbGFtaXRlY2hub2xvZ3kuY29tL2xvZ2luIjtzOjU6InJvdXRlIjtzOjU6ImxvZ2luIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6MTt9',1780597196),
('ZE5r5KgVtTdNN3YINxOPOYM0PhZEegfyQJYKej1R',1,'180.252.82.68','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36','YTo0OntzOjY6Il90b2tlbiI7czo0MDoiRnpSUnZCR1ZFcmRqMElCelJwZVhCU09Cd0Q5Y1RMNFg5TkxMbVdKcyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MzU6Imh0dHBzOi8vdm9sdGFtYS5hbGFtaXRlY2hub2xvZ3kuY29tIjtzOjU6InJvdXRlIjtzOjQ6ImhvbWUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjUwOiJsb2dpbl93ZWJfNTliYTM2YWRkYzJiMmY5NDAxNTgwZjAxNGM3ZjU4ZWE0ZTMwOTg5ZCI7aToxO30=',1780588192);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `settings`
--

DROP TABLE IF EXISTS `settings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `settings` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `key` varchar(255) NOT NULL,
  `value` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `settings_key_unique` (`key`)
) ENGINE=InnoDB AUTO_INCREMENT=100 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `settings`
--

LOCK TABLES `settings` WRITE;
/*!40000 ALTER TABLE `settings` DISABLE KEYS */;
INSERT INTO `settings` VALUES
(1,'website_title','Voltama - Berkualitas Terpercaya','2026-05-26 06:52:07','2026-06-02 18:38:29'),
(2,'website_logo','/uploads/settings/logo_1780585369.png','2026-05-26 06:52:07','2026-06-04 08:02:49'),
(3,'website_favicon','/uploads/settings/favicon_1780568797.png','2026-05-26 06:52:07','2026-06-04 03:26:37'),
(4,'section_hero_title_line1','SOLUSI KABEL','2026-05-26 06:52:07','2026-05-26 06:52:07'),
(5,'section_hero_title_line2','BERKUALITAS','2026-05-26 06:52:07','2026-05-26 06:52:07'),
(6,'section_hero_title_line3','UNTUK','2026-05-26 06:52:07','2026-05-26 06:52:07'),
(7,'section_hero_title_line4','INSTALASI MODERN','2026-05-26 06:52:07','2026-05-26 06:52:07'),
(8,'section_hero_desc','Voltama hadir sebagai solusi kelistrikan \r\nberkualitas dengan jaminan dan garansi.','2026-05-26 06:52:07','2026-06-02 18:12:23'),
(9,'hero_banner_path','/assets/Fix.png','2026-05-26 06:52:07','2026-05-26 06:52:07'),
(10,'hero_catalog_year','2026','2026-05-26 06:52:07','2026-05-26 06:52:07'),
(11,'footer_copyright','© 2026 PT. SinarIntan PutraNusa. All rights reserved.','2026-05-26 06:52:07','2026-06-02 18:38:29'),
(12,'footer_address','Jl. Industri Raya No. 09, RT.02/RW.04, Kelurahan Budi Mulya, Kecamatan Cikupa, Kabupaten Tangerang, Provinsi Banten, Indonesia - 15710','2026-05-26 06:52:07','2026-06-04 03:18:08'),
(13,'footer_phone','(021) 5961388','2026-05-26 06:52:07','2026-06-02 18:38:29'),
(14,'footer_email','info@voltama.id','2026-05-26 06:52:07','2026-05-26 06:52:07'),
(15,'footer_whatsapp','08123456789','2026-05-26 06:52:07','2026-06-04 03:46:36'),
(16,'footer_facebook','https://www.facebook.com/voltama','2026-05-26 06:52:07','2026-06-02 18:38:29'),
(17,'footer_instagram','https://www.instagram.com/voltama','2026-05-26 06:52:07','2026-06-02 18:38:29'),
(18,'footer_youtube','https://www.youtube.com/voltama','2026-05-26 06:52:07','2026-06-02 18:38:29'),
(19,'footer_certification_badge','SNI','2026-05-26 06:52:07','2026-05-26 06:52:07'),
(20,'footer_certification_text','Lembaga Sertifikasi Produk (LSPr)','2026-05-26 06:52:07','2026-05-26 06:52:07'),
(21,'footer_powered_by_text','Air Langit Bumi','2026-05-26 06:52:07','2026-06-01 05:47:58'),
(22,'footer_powered_by_link','https://www.airlangitbumi.com','2026-05-26 06:52:07','2026-06-01 05:47:58'),
(23,'facebook_pixel',NULL,'2026-05-26 06:52:07','2026-06-01 05:47:58'),
(24,'google_analytics','<!-- Google tag (gtag.js) -->\r\n<script async src=\"https://www.googletagmanager.com/gtag/js?id=G-G9GY3L8W6L\"></script>\r\n<script>\r\n  window.dataLayer = window.dataLayer || [];\r\n  function gtag(){dataLayer.push(arguments);}\r\n  gtag(\'js\', new Date());\r\n\r\n  gtag(\'config\', \'G-G9GY3L8W6L\');\r\n</script>','2026-05-26 06:52:07','2026-06-04 08:02:49'),
(25,'hero_garansi_tahun','10','2026-06-02 18:12:23','2026-06-02 18:12:23'),
(26,'hero_garansi_label','Tahun','2026-06-02 18:12:23','2026-06-02 18:12:23'),
(27,'hero_garansi_teks','RESMI','2026-06-02 18:12:23','2026-06-02 18:12:23'),
(28,'hero_badge_sni','SNI','2026-06-02 18:12:23','2026-06-02 18:12:23'),
(29,'hero_badge_lmk','LMK','2026-06-02 18:12:23','2026-06-02 18:12:23'),
(30,'hero_badge_tembaga','99.99% Tembaga Murni','2026-06-02 18:12:23','2026-06-02 18:12:23'),
(31,'section_tentang_heading',NULL,'2026-06-02 18:12:23','2026-06-02 18:12:23'),
(32,'section_tentang_sub',NULL,'2026-06-02 18:12:23','2026-06-02 18:12:23'),
(33,'section_tentang_desc','Voltama merupakan brand dari PT Sinarintan \r\nPutranusa yang juga merupakan perusahaan dari \r\nHensonic, menyediakan berbagai produk kabel \r\nlistrik, serta perlengkapan listrik.\r\nVoltama menghadirkan beragam pilihan tipe produk \r\nyang dapat disesuaikan dengan kebutuhan \r\npelanggan, dengan mengacu pada standar kualitas \r\nSNI dan menghadirkan 10 tahun garansi.','2026-06-02 18:12:23','2026-06-02 18:12:23'),
(34,'tentang_stat1_value','30+','2026-06-02 18:12:23','2026-06-04 03:36:05'),
(35,'tentang_stat1_label','BERPENGALAMAN','2026-06-02 18:12:23','2026-06-02 18:12:23'),
(36,'tentang_stat1_sub','Lebih dari 30 tahun di industri kelistrikan','2026-06-02 18:12:23','2026-06-04 03:36:05'),
(37,'tentang_stat2_value','20+','2026-06-02 18:12:23','2026-06-04 03:49:20'),
(38,'tentang_stat2_label','CHANNEL DISTRIBUSI','2026-06-02 18:12:23','2026-06-04 03:36:05'),
(39,'tentang_stat2_sub','Seluruh Indonesia','2026-06-02 18:12:23','2026-06-02 18:12:23'),
(40,'tentang_stat3_value','3+','2026-06-02 18:12:23','2026-06-04 03:49:20'),
(41,'tentang_stat3_label','SERTIFIKASI','2026-06-02 18:12:23','2026-06-04 03:49:20'),
(42,'tentang_stat3_sub','SNI & LMK','2026-06-02 18:12:23','2026-06-02 18:12:23'),
(43,'tentang_stat4_value','10','2026-06-02 18:12:23','2026-06-02 18:12:23'),
(44,'tentang_stat4_label','GARANSI PRODUK','2026-06-02 18:12:23','2026-06-02 18:12:23'),
(45,'tentang_stat4_sub','Hingga 10 Tahun','2026-06-02 18:12:23','2026-06-02 18:12:23'),
(46,'tentang_industri_judul','Tahan Lama, Tetap Terjaga','2026-06-02 18:12:23','2026-06-04 03:51:30'),
(47,'tentang_industri_sub','Voltama menghadirkan solusi instalasi yang mempertahankan kualitasnya, bahkan dalam  penggunaan jangka panjang.','2026-06-02 18:12:23','2026-06-04 04:12:42'),
(48,'section_features_heading','Standarisasi Kemanan Maksimal','2026-06-02 18:12:23','2026-06-04 04:12:42'),
(49,'section_features_sub','Berkualitas & Bergaransi','2026-06-02 18:12:23','2026-06-04 04:12:42'),
(50,'section_features_desc','Menghadirkan produk kelistrikan yang aman \r\ndengan kualitas bersertifikasi, memastikan \r\nsetiap daya tetap andal dan dibangun untuk \r\nbertahan lama.','2026-06-02 18:12:23','2026-06-04 04:12:42'),
(51,'features_card1_title','99.99 % Tembaga Murni','2026-06-02 18:12:23','2026-06-04 04:12:42'),
(52,'features_card1_desc','Menggunakan tembaga murni berkualitas tinggi tanpa campuran, memberikan tingkat penghantar arus listrik yang stabil dan efisiensi konsumsi daya maksimal.','2026-06-02 18:12:23','2026-06-04 04:12:42'),
(53,'features_card2_title','Isolator PVC Tahan Panas','2026-06-02 18:12:23','2026-06-02 18:12:23'),
(54,'features_card2_desc','Bahan pelindung PVC kelas premium dengan elastisitas tinggi dan daya tahan termal yang kuat, melindungi kawat tembaga dari kerusakan akibat panas tinggi.','2026-06-02 18:12:23','2026-06-04 04:12:42'),
(55,'features_card3_title','Garansi Mutu Bersertifikasi','2026-06-02 18:12:23','2026-06-02 18:12:23'),
(56,'features_card3_desc','Semua tipe kabel diuji ketat secara laboratoris dan telah lolos sertifikasi SNI, LMK, serta SPLN guna menjamin keamanan maksimal instalasi.','2026-06-02 18:12:23','2026-06-04 04:12:42'),
(57,'section_produk_heading','Solusi Instalasi Kelistrikan','2026-06-02 18:12:23','2026-06-04 04:12:42'),
(58,'section_produk_sub','Untuk Segala Kebutuhan','2026-06-02 18:12:23','2026-06-04 04:12:42'),
(59,'section_produk_desc','Digunakan oleh 50.000+ pelanggan di seluruh Indonesia.\r\nLebih dari 3.000 instalasi aktif di 14 provinsi.','2026-06-02 18:12:23','2026-06-04 04:12:42'),
(60,'produk_btn1_text','Jelajahi Produk','2026-06-02 18:12:23','2026-06-04 04:12:42'),
(61,'produk_btn2_text','Hubungi Sales','2026-06-02 18:12:23','2026-06-02 18:12:23'),
(62,'produk_card_kiri_label','BEST SELLER','2026-06-02 18:12:23','2026-06-04 04:12:42'),
(63,'produk_card_kiri_nama','Kabel NYM Voltama','2026-06-02 18:12:23','2026-06-04 04:12:42'),
(64,'produk_card_kiri_desc','Kabel NYM menggunakan konduktor tembaga murni sebagai inti penghantar, dilapisi isolasi PVC per \r\ninti, lalu dilindungi selubung luar PVC yang tahan terhadap gesekan dan kelembapan ringan.','2026-06-02 18:12:23','2026-06-04 04:14:50'),
(65,'produk_card_kanan_label','PRODUK PREMIUM','2026-06-02 18:12:23','2026-06-04 04:12:42'),
(66,'produk_card_kanan_nama','Kabel NYY Voltama','2026-06-02 18:12:23','2026-06-04 04:12:42'),
(67,'produk_card_kanan_desc','Kabel instalasi rumah standar dengan isolasi PVC tebal, aman digunakan di dinding.','2026-06-02 18:12:23','2026-06-04 04:12:42'),
(68,'section_video_heading',NULL,'2026-06-02 18:12:23','2026-06-02 18:12:23'),
(69,'section_video_sub',NULL,'2026-06-02 18:12:23','2026-06-02 18:12:23'),
(70,'section_video_desc',NULL,'2026-06-02 18:12:23','2026-06-02 18:12:23'),
(71,'video_youtube_url',NULL,'2026-06-02 18:12:23','2026-06-02 18:12:23'),
(72,'video_durasi','02:45 Mins Video','2026-06-02 18:12:23','2026-06-02 18:12:23'),
(73,'video_checklist_1','Produk memiliki konduktivitas listrik yang baik, dengan lapisan isolasi yang kuat  dan tahan terhadap kondisi lingkungan yang berbeda.','2026-06-02 18:12:23','2026-06-04 04:22:13'),
(74,'video_checklist_2','Menyediakan produk yang berlisensi dan memenuhi standar yang berlaku.','2026-06-02 18:12:23','2026-06-04 04:22:13'),
(75,'video_checklist_3','Tersebar di penjuru Indonesia dengan distributor offline bisa lebih dua di satu kota.','2026-06-02 18:12:23','2026-06-04 04:22:13'),
(76,'video_checklist_4','Tim profesional dan fasilitas produksi lengkap untuk menjamin kualitas dan kepuasan  pelanggan.','2026-06-02 18:12:23','2026-06-04 04:22:13'),
(77,'video_dark_card1_title','User-Centric Quality','2026-06-02 18:12:23','2026-06-02 18:12:23'),
(78,'video_dark_card1_desc',NULL,'2026-06-02 18:12:23','2026-06-02 18:12:23'),
(79,'video_dark_card2_title','Scalable Safety','2026-06-02 18:12:23','2026-06-02 18:12:23'),
(80,'video_dark_card2_desc',NULL,'2026-06-02 18:12:23','2026-06-02 18:12:23'),
(81,'video_dark_card3_title','Security-First Material','2026-06-02 18:12:23','2026-06-02 18:12:23'),
(82,'video_dark_card3_desc',NULL,'2026-06-02 18:12:23','2026-06-02 18:12:23'),
(83,'video_dark_card4_title','Innovation-Driven','2026-06-02 18:12:23','2026-06-02 18:12:23'),
(84,'video_dark_card4_desc',NULL,'2026-06-02 18:12:23','2026-06-02 18:12:23'),
(85,'section_katalog_heading',NULL,'2026-06-02 18:12:23','2026-06-02 18:12:23'),
(86,'section_katalog_desc',NULL,'2026-06-02 18:12:23','2026-06-02 18:12:23'),
(87,'section_promo_heading',NULL,'2026-06-02 18:12:23','2026-06-02 18:12:23'),
(88,'section_promo_desc',NULL,'2026-06-02 18:12:23','2026-06-02 18:12:23'),
(89,'section_testimonial_heading',NULL,'2026-06-02 18:12:23','2026-06-02 18:12:23'),
(90,'section_testimonial_desc',NULL,'2026-06-02 18:12:23','2026-06-02 18:12:23'),
(91,'section_artikel_heading',NULL,'2026-06-02 18:12:23','2026-06-02 18:12:23'),
(92,'section_artikel_desc',NULL,'2026-06-02 18:12:23','2026-06-02 18:12:23'),
(93,'certifications','[{\"name\":\"SNI\",\"logo\":\"\\/uploads\\/settings\\/certifications\\/cert_1780568826_6a2152faa69bf.png\"},{\"name\":\"LMK\",\"logo\":\"\\/uploads\\/settings\\/certifications\\/cert_1780568855_6a215317206f0.png\"},{\"name\":\"ISO 9001:2015\",\"logo\":\"\\/uploads\\/settings\\/certifications\\/cert_1780568886_6a215336ce42d.png\"}]','2026-06-04 03:27:06','2026-06-04 03:28:06'),
(94,'ecommerce_stores','[{\"name\":\"Tokopedia\",\"link\":\"https:\\/\\/www.tokopedia.com\\/voltama\",\"logo\":\"\\/uploads\\/settings\\/ecommerce\\/store_1780568938_6a21536a0af07.png\"},{\"name\":\"Shopee\",\"link\":\"https:\\/\\/www.shopee.id\\/voltama\",\"logo\":\"\\/uploads\\/settings\\/ecommerce\\/store_1780568966_6a2153869e1eb.png\"},{\"name\":\"Tiktok Shop\",\"link\":\"https:\\/\\/www.tiktok.com\\/voltama\",\"logo\":\"\\/uploads\\/settings\\/ecommerce\\/store_1780568990_6a21539ed0900.png\"}]','2026-06-04 03:28:58','2026-06-04 03:29:50'),
(95,'hero_slide_interval','4','2026-06-04 03:36:05','2026-06-04 03:36:05'),
(96,'section_tentang_foto_pabrik','/uploads/settings/section_tentang_foto_pabrik_1780569696.jpg','2026-06-04 03:36:05','2026-06-04 03:41:36'),
(97,'section_tentang_foto_industri','/uploads/settings/section_tentang_foto_industri_1780575151.png','2026-06-04 03:36:05','2026-06-04 05:12:31'),
(98,'section_produk_card_kiri','/uploads/settings/section_produk_card_kiri_1780571562.png','2026-06-04 04:12:42','2026-06-04 04:12:42'),
(99,'section_produk_card_kanan','/uploads/settings/section_produk_card_kanan_1780571562.png','2026-06-04 04:12:42','2026-06-04 04:12:42');
/*!40000 ALTER TABLE `settings` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testimonials`
--

DROP TABLE IF EXISTS `testimonials`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `testimonials` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `role` varchar(255) DEFAULT NULL,
  `quote` text NOT NULL,
  `avatar_path` varchar(255) DEFAULT NULL,
  `sort_order` tinyint(3) unsigned NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testimonials`
--

LOCK TABLES `testimonials` WRITE;
/*!40000 ALTER TABLE `testimonials` DISABLE KEYS */;
/*!40000 ALTER TABLE `testimonials` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'editor',
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(1,'Admin Voltama','admin@voltama.id','admin','2026-05-26 07:06:20','$2y$12$.dUby7i9a6TlpkHu1mijxu0f/ULpuDmRd4NLpz874eSAq367pe2m2','gtyic8M78XKy9zLJzGjlJrt8o3yodONmXmSAVsTZf4WsR69RLHE9SAF4QmnN','2026-05-26 06:52:07','2026-05-26 07:06:20'),
(2,'Editor Voltama','editor@voltama.id','editor','2026-05-26 07:06:20','$2y$12$0EnHIOy4U4IkGO0pcnulA.cUCs.Z/mHTWfnwqPFj8t8.dmh03hUaK',NULL,'2026-05-26 06:52:07','2026-05-26 07:06:20');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*M!100616 SET NOTE_VERBOSITY=@OLD_NOTE_VERBOSITY */;

-- Dump completed on 2026-06-05  1:20:18
