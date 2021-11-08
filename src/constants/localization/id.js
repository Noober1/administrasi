
export default function indonesian() {
    return {
        languange: {
            name: 'indonesia',
            initial:'ID'
        },
        default:{
            alertDialogConfirmButtonText: "Oke",
            alertDialogCancelButtonText: "Batal",
            alertLogoutTitleText: "Keluar dari sistem",
            alertLogoutBodyText: "Apakah Anda yakin keluar?",
            alertLogoutText: "Keluar",
            anErrorOccured: "Terjadi kesalahan",
            editText: "Sunting",
            addText: "Tambah",
            saveText: "Simpan",
            savedText: "Data berhasil disimpan",
            importText:"Import",
            deleteText:"Hapus",
            helpButtonLabel: "Bantuan",
            retryText: "Coba Lagi"
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
            deleteItemsError: 'Gagal menghapus data'
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
                    semster: "Semester",
                    angkatan: "Angkatan",
                    action: "Aksi"
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
                invoicesText: "Invoice",
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
                    warningDeleteItem: "Data tidak akan terhapus terdapat mahasiswa yang berada di kelas yang akan dihapus"
                },
                payment: {
                    titlePage: "Daftar pembayaran"
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