
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
            importText:"Import",
            deleteText:"Hapus",
            helpButtonLabel: "Bantuan",
            retryText: "Coba Lagi"
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
                    addStudentDescription: "Silahkan isi form dibawah ini"
                },
                class:{
                    titlePage: "Daftar kelas / Angkatan"
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