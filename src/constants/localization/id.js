
export default function indonesian() {
    return {
        languange: {
            name: 'indonesia',
            initial:'ID'
        },
        default:{
            nameOfMonths: ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'],
            alertDialogConfirmButtonText: "Oke",
            alertDialogCancelButtonText: "Batal",
            alertLogoutTitleText: "Keluar dari sistem",
            alertLogoutBodyText: "Apakah Anda yakin keluar?",
            alertLogoutText: "Keluar",
            alertConfirmTitle: "Apakah Anda yakin?",
            anErrorOccured: "Terjadi kesalahan",
            editText: "Sunting",
            addText: "Tambah",
            saveText: "Simpan",
            sendText: "Kirim",
            savedText: "Data berhasil disimpan",
            importText:"Import",
            deleteText:"Hapus",
            helpButtonLabel: "Bantuan",
            retryText: "Coba Lagi",
            detailText: "Rincian",
            returnText: "Kembali"
        },
        errors:{
            failedToSaveText: "Data gagal disimpan",
            failedToDelete: "Data gagal dihapus",
            internalError: 'Internal server error, silahkan laporkan ini ke admin aplikasi ini',
            duplicateData: "Data duplikat, silahkan periksa kembali",
            emailDuplicate: "Surel(E-mail) telah ada didalam sistem, tidak dapat menambahkan data",
            classNotFound: "Data kelas tidak ditemukan",
            prodiNotFound: "Prodi tidak ditemukan",
            deleteUrlInvalid: "Delete URL tidak valid",
            noDataSelected: "Tidak ada data yang dipilih",
            deleteItemsError: 'Gagal menghapus data',
            dataExist: 'Data telah ada di database'
        },
        success:{
            deleteItemsSuccess: 'Data berhasil dihapus'
        },
        appBar: {
            notificationTooltipText: "Pemberitahuan",
            showMenuTooltipText: "Tampilkan menu",
            hideMenuTooltipText: "Sembunyikan menu",
            toggleMiniMenu: "Tampilkan / sembunyikan menu",
            settingMiniMenuText: "Pengaturan"
        },
        components:{
            sendBatchInvoice: {
                dialogTitle: "Kirim Tagihan Massal",
                dialogContentText: "Silahkah untuk mengisi kriteria dibawah ini",
                classFormHelper: "Anda dapat memilih kelas lebih dari 1 kelas",
                classFormLabel:"Daftar Kelas",
                prodiFormLabel: "Daftar Prodi",
                prodiFormHelper: "Anda dapat memilih prodi lebih dari 1 prodi. Kolom isian prodi tidak wajib.",
                alertConfirmText: "Apakah Anda yakin ingin mengirim tagihan?",
                alertWarningText: "Siswa yang telah menerima tagihan dengan data pembayaran ini tidak akan menerima tagihan",
                invoiceSended: "Tagihan berhasil dikirim",
                invoiceFailedToSend: "Tagihan gagal dikirim",
                includeBeasiswaLabel: "Dengan status 'Beasiswa'",
                includeBeasiswaHelper: "Jika dihidupkan maka mahasiswa yang berjenis 'Mahasiswa'akan dimasukan kedalam daftar penerima tagihan"
            }
        },
        login: {
            usernamePasswordWrongText: "Nama pengguna atau kata sandi salah",
            loginForbiddenText: "Akun ini tidak mempunyai hak akses"
        },
        table: {
            refresh: "Segarkan",
            dialogDeleteTitle: "Hapus yang dipilih",
            dialogDeleteConfirmMessage: "Apakah Anda yakin ingin menghapus data yang dipilih?",
            columns: {
                student: {
                    NIS: "No. Induk",
                    firstName:"Nama depan",
                    lastName:"Nama belakang",
                    fullName: "Nama lengkap",
                    type: "Jenis",
                    email:"Surel(E-mail)",
                    password:"Kata sandi",
                    repeatPassword:"Ulangi kata sandi",
                    mismatchPassword:"Kata sandi tidak sama",
                    emptyPassword: "Kata sandi kosong",
                    status:"Status",
                    class: "Kelas",
                    registerYear: "Tahun masuk",
                    helperRegisterYearCantChange: "Tahun masuk akan terisi otomatis berdasarkan kelas yang dipilih",
                    prodi: "Prodi",
                    action: "Aksi"
                },
                class: {
                    name: "Nama kelas",
                    semester: "Semester",
                    angkatan: "Angkatan",
                    action: "Aksi"
                },
                payment:{
                    registerDate: "Tanggal",
                    admin:"Administrator",
                    type: "Jenis Pembayaran",
                    typeHelper: "Subjek / Judul untuk tagihan",
                    price: "Nominal",
                    priceHelper: "Contoh: 100000",
                    priceHelperNoEdit:"Kolom ini tidak dapat disunting",
                    description: "Deskripsi",
                    action: "Aksi",
                    adminCantChanged: "Administrator akan terisi secara otomatis dengan Email Anda",
                    adminDefault: "Administrator akan tetap terisi oleh data awal"
                }
            }
        },
        about: {
            officialWebsiteText: "Situs resmi",
            findUsText: "Temukan Kami"
        },
        username: "Nama pengguna",
        password: "Kata sandi",
        togglePasswordVisibilityText:"Tampilkan/sembunyikan kata sandi",
        forgotPasswordButtonText: "Lupa kata sandi?",
        panel: {
            menu:{
                dashboardText: "Beranda",
                paymentText: "Pembayaran",
                invoicesText: "Tagihan",
                studentListText: "Mahasiswa",
                classListText: "Kelas / Angkatan",
                billText: "Tagihan"
            },
            pages:{
                dashboard:{
                    welcomeMessage: "Selamat Datang"
                },
                student:{
                    titlePage:"Daftar Mahasiswa",
                    addStudentTitle:"Tambah Mahasiswa",
                    addStudentDescription: "Silahkan isi form dibawah ini",
                    editStudentTitle:"Sunting Mahasiswa",
                    editStudentDescription: "Silahkan sunting isian dibawah ini"
                },
                class:{
                    titlePage: "Daftar Kelas / Angkatan",
                    addClassTitle:"Tambah Kelas / Angkatan",
                    addClassDescription: "Silahkan isi form dibawah ini",
                    editClassTitle: "Sunting Kelas / Angkatan",
                    editClassDescription: "Silahkan sunting isian dibawah ini",
                    warningDeleteItem: "Data tidak akan terhapus jika terdapat mahasiswa yang berada di kelas yang akan dihapus"
                },
                payment: {
                    titlePage: "Daftar Pembayaran",
                    addPaymentTitle:"Tambah Pembayaran",
                    addPaymentDescription: "Silahkan isi form dibawah ini",
                    editPaymentTitle: "Edit Pembayaran",
                    editPaymentDescription: "Silahkan sunting isian dibawah ini",
                    warningDeleteItem: "Data tidak akan terhapus jika data pembayaran ini mempunyai data tagihan"
                },
                paymentWithId: {
                    titlePage: "Rincian Pembayaran",
                    invoiceTableTitle: "Daftar Tagihan",
                    sendBatchInvoice: "Kirim tagihan massal"
                }
            }
        },
        buttonToggleDarkMode:{
            lightModeText: "Modus terang",
            darkModeText: "Modus gelap",
            switchToLightText: "Ganti ke modus terang",
            switchToDarkText: "Ganti ke modus gelap"
        },
        buttonSwitchLanguageTooltipText:"Switch Language",
        accountInformationButtonText:"Informasi akun",
        loginBoxTopMessage: "Silahkan masuk untuk melanjutkan",
        loginBoxUsernameHelperText: "Maksimal 50 karakter dengan kombinasi huruf dan angka tanpa spasi",
        loginBoxPasswordHelperText: "Maksimal 50 karakter dengan kombinasi huruf, angka dan simbol tanpa spasi",
        loginBoxButtonText: "Masuk"
    }
}