
const daftarKelas = [
    "X TKJA", "X TKJB", "X TKJC",
    "X TP A", "X TP B", "X AKL",
    "XI TKJ A", "XI TKJ B", "XI TKJ C",
    "XI TKJ D", "XI TP A", "XI TP B", "XI AKL",
    "XII TKJ A", "XII TKJ B", "XII TKJ C",
    "XII TKJ D", "XII TKJ E", "XII AKL"
];

const daftarMapel = [
    "Dasar-dasar Teknik Jaringan Komputer dan Telekomunikasi",
    "K3LH dan Budaya Kerja Industri",
    "Profesi dan Kewirausahaan (Job-profile & Technopreneur)",
    "Perencanaan dan Pengalamatan Jaringan",
    "Teknologi Jaringan Kabel dan Nirkabel",
    "Keamanan Jaringan",
    "Pemasangan dan Konfigurasi Perangkat Jaringan",
    "Administrasi Sistem Jaringan",
    "Teknik Gambar",
    "Pengelasan OAW",
    "Pengelasan SMAW",
    "Pengelasan FCAW",
    "Pengelasan GTAW",
    "Mutu Pengelasan",
    "PAI",
    "Bahasa Indonesia",
    "Bahasa Inggris",
    "Matematika",
    "Sejarah",
    "PKN",
    "Mulok Keagamaan",
    "Seni Budaya",
    "Prakarya",
    "Informatika",
    "IPA",
    "IPS"
];

let daftarKarya = [
    {
        judul: "Perancangan Topologi Jaringan",
        nama: "Rizky Pratama",
        kelas: "XI TKJ A",
        mapel: "Teknologi Jaringan Kabel dan Nirkabel",
        deskripsi: "Rancangan topologi jaringan untuk laboratorium sekolah.",
        gambar: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80"
    },
    {
        judul: "Poster Kreativitas Siswa",
        nama: "Nadia Putri",
        kelas: "X TKJB",
        mapel: "Seni Budaya",
        deskripsi: "Poster digital hasil karya siswa.",
        gambar: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?auto=format&fit=crop&w=800&q=80"
    },
    {
        judul: "Laporan Praktik K3LH",
        nama: "Dimas Saputra",
        kelas: "XI TP A",
        mapel: "K3LH dan Budaya Kerja Industri",
        deskripsi: "Dokumentasi kegiatan pembelajaran praktik.",
        gambar: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?auto=format&fit=crop&w=800&q=80"
    }
];

// Mengisi pilihan kelas dan mapel
function isiPilihan(id, daftar, teksAwal) {
    const elemen = document.getElementById(id);

    daftar.forEach(item => {
        const opsi = document.createElement("option");
        opsi.value = item;
        opsi.textContent = item;
        elemen.appendChild(opsi);
    });
}

isiPilihan("filterKelas", daftarKelas, "Semua Kelas");
isiPilihan("filterMapel", daftarMapel, "Semua Mapel");
isiPilihan("kelasInput", daftarKelas, "Pilih kelas");
isiPilihan("mapelInput", daftarMapel, "Pilih mata pelajaran");

function tampilkanKarya() {
    const areaGaleri = document.getElementById("galleryGrid");

    areaGaleri.innerHTML = "";

    const kataKunci = document
        .getElementById("searchInput")
        .value.toLowerCase().trim();

    const kelasDipilih = document.getElementById("filterKelas").value;
    const mapelDipilih = document.getElementById("filterMapel").value;

    const hasil = daftarKarya.filter(karya => {
        const cocokKata =
            karya.judul.toLowerCase().includes(kataKunci) ||
            karya.nama.toLowerCase().includes(kataKunci);

        const cocokKelas =
            kelasDipilih === "" || karya.kelas === kelasDipilih;

        const cocokMapel =
            mapelDipilih === "" || karya.mapel === mapelDipilih;

        return cocokKata && cocokKelas && cocokMapel;
    });

    hasil.forEach(karya => {
        const kartu = document.createElement("article");
        kartu.className = "work-card";

        const gambar = document.createElement("img");
        gambar.className = "work-cover";
        gambar.src = karya.gambar;
        gambar.alt = "Sampul karya " + karya.judul;

        const isi = document.createElement("div");
        isi.className = "work-content";

        const judul = document.createElement("h3");
        judul.textContent = karya.judul;

        const pemilik = document.createElement("p");
        pemilik.textContent = karya.nama + " · " + karya.kelas;

        const mapel = document.createElement("div");
        mapel.className = "work-meta";
        mapel.textContent = karya.mapel;

        const deskripsi = document.createElement("p");
        deskripsi.textContent = karya.deskripsi;

        isi.append(judul, pemilik, mapel, deskripsi);
        kartu.append(gambar, isi);
        areaGaleri.appendChild(kartu);
    });

    document.getElementById("emptyMessage").hidden = hasil.length > 0;

    document.getElementById("totalKarya").textContent =
        daftarKarya.length;

    document.getElementById("totalSiswa").textContent =
        new Set(daftarKarya.map(karya => karya.nama)).size;

    document.getElementById("totalMapel").textContent =
        new Set(daftarKarya.map(karya => karya.mapel)).size;
}

// Jalankan pencarian dan filter
document.getElementById("searchInput")
    .addEventListener("input", tampilkanKarya);

document.getElementById("filterKelas")
    .addEventListener("change", tampilkanKarya);

document.getElementById("filterMapel")
    .addEventListener("change", tampilkanKarya);

// Menu responsif
document.getElementById("menuToggle")
    .addEventListener("click", function () {
        document.getElementById("mainNav").classList.toggle("open");
    });

// Tampilkan karya saat halaman dibuka
tampilkanKarya();

document.getElementById("uploadForm")
    .addEventListener("submit", function (event) {
        event.preventDefault();

        const formData = new FormData(this);

        const karyaBaru = {
            judul: formData.get("judul").trim(),
            nama: formData.get("nama").trim(),
            kelas: formData.get("kelas"),
            mapel: formData.get("mapel"),
            deskripsi: formData.get("deskripsi").trim(),

            // Gambar demo diganti placeholder teks.
            // Upload gambar sungguhan kita buat di tahap berikutnya.
            gambar: "assets/cover-placeholder.svg"
        };

        daftarKarya.unshift(karyaBaru);

        tampilkanKarya();

        document.getElementById("formMessage").textContent =
            "Karya berhasil ditambahkan ke galeri demo pada halaman ini.";

        this.reset();
    });
