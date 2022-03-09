
export default function indonesian() {
    return {
        languange: {
            name: 'indonesia',
            initial:'ID'
        },
        default:{
            nameOfMonths: ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember'],
            alertDialogConfirmButtonText: "Oke",
            cancelText: "Batal",
            loadingText: "Memuat...",
            alertLogoutTitleText: "Keluar dari sistem",
            alertLogoutBodyText: "Apakah Anda yakin keluar?",
            alertLogoutText: "Keluar",
            alertConfirmTitle: "Apakah Anda yakin?",
            chooseDateAndTime: "Pilih tanggal dan waktu",
            anErrorOccured: "Terjadi kesalahan",
            editText: "Sunting",
            selectText: "Pilih",
            noSelectedText: "Tidak ada yang dipilih",
            addText: "Tambah",
            saveText: "Simpan",
            sendText: "Kirim",
            savedText: "Data berhasil disimpan",
            importText:"Import",
            deleteText:"Hapus",
            helpButtonLabel: "Bantuan",
            retryText: "Coba Lagi",
            detailText: "Rincian",
            returnText: "Kembali",
            closeText: "Tutup",
            noMessageText: "Tidak ada pesan"
        },
        errors:{
            unknownError: "Error tidak diketahui",
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
            dataExist: 'Data telah ada di database',
            imageNotFound: 'Gambar tidak ditemukan',
            ERR_PAYMENT_HAVE_INVOICE: 'Pembayaran mempunyai data tagihan'
        },
        success:{
            deleteItemsSuccess: 'Data berhasil dihapus',
            deleteItemSuccessWithRange: (deleted,total) => {
                return `${deleted || 0} data telah dihapus dari ${total || 0} data dipilih`
            }
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
            },
            templateUploader: {
                allowedFormatText: "Format yang didukung",
                helperText: "Klik disini atau seret berkas anda ke sini untuk memilih berkas",
                dropFileHereText: "Jatuhkan berkas anda disini!",
                closeImporterText: "Tutup file importer",
                fileTemplateDownloadText: "Klik disini untuk unduh sampel template",
                uploadButtonText: "Unggah",
                fileFormatErrorText: "Ada berkas yang tidak sesuai dengan ketentuan (ukuran berkas, format berkas, dll)",
                maxSizeText: "Maksimal ukuran berkas",
                uploadingText: "Menggunggah",
                successUploadTitle: "Unggah berhasil",
                successUploadText: "Template berhasil diunggah",
                errorUploadTitle: "Unggah gagal",
                errorUploadText: "Template gagal diunggah, lihat pesan error dibawah ini:",
                errorDataText: "Error data"
            },
            findInvoiceDialog: {
                dialogTitle: "Cari Tagihan",
                dialogContentText: "Anda bisa mencari tagihan disini",
                searchInputPlaceholder: "Masukan nomor tagihan, nama depan ataupun nama belakang dengan panjang minimal 3 karakter",
                errorTooShort: "Data telalu pendek, panjang minimal 3 karakter",
                invoiceTable: {
                    code: "No. Tagihan",
                    student: "Nama mahasiswa",
                    status: "Status",
                    detailButton: "Rincian",
                    action: "Aksi"
                }
            },
            invoiceDetailDialog: {
                dialogTitle: "Rincian Tagihan",
                code: "No. Tagihan",
                sentTo: "Ditujukan kepada",
                status: "Status pembayaran",
                statusPaid:"Lunas",
                statusConfirming:"Menunggu Verifikasi",
                statusInvalid:"Invalid",
                statusUnpaid:"Belum Lunas",
                statusUnknown: "Tidak diketahui",
                statusPending: "Pending",
                paymentMethod: "Metode Pembayaran",
                paymentType: "Nama Pembayaran",
                paymentDescription: "Deskripsi Pembayaran",
                paymentPrice: "Nominal",
                paymentTotal: "Total",
                accountNumber: "No. Rekening",
                destinationAccount: "Tujuan rekening",
                chooseDestinationAccount: "Pilih Tujuan rekening",
                invoiceDate: "Tanggal tagihan",
                paymentHistoryButtonText:"Riwayat Transaksi",
                emptyPaymentHistory:"Tidak ada riwayat transaksi",
                transactionDate: "Tanggal transaksi",
                verificationDate: "Tanggal verifikasi",
                refNumber: "No. Ref",
                refNumberHelper: "Nomor Ref tercantum pada rincian transaksi ketika Anda melakukan transfer",
                picture: "Gambar",
                actionSendPaymentDetail: "Kirim Bukti Transfer",
                actionResendPaymentDetail: "Kirim Ulang Bukti",
                actionPrint: "Cetak",
                sendReceiptContentText: "Silahkan isi form dibawah ini. Jika Anda pernah mengirim bukti transfer, maka data yang akan dikirim saat ini akan memperbarui data tagihan",
                senderName: "Nama Pengirim",
                senderNameHelper: "Nama pemilik nomor rekening",
                sendReceiptSuccess: "Pengiriman bukti berhasil",
                sendReceiptFailed: "Pengiriman bukti gagal",
                pickImage: "Pilih gambar",
                invoiceRemaining: "Tersisa",
                otherDetail: "Rincian lainnya"
            },
            uploader: {
                uploadFileSuccess: "Unggah berkas berhasil",
                uploadFileFailed: "Unggah berkas gagal",
                uploadText: "Unggah"
            },
            verifyOrManualDialog: {
                verifyTitle: "Verifikasi Pembayaran",
                verifyMessage: "Pastikan untuk memeriksa data yang diterima sebelum melakukan verifikasi.",
                verifyConfirmingVerify: "Apakah Anda yakin ingin ingin verifikasi tagihan?",
                verifyButton: "Verifikasi",
                verifyOptionsText: "Opsi Verifikasi",
                verifyNominal: "Nominal",
                manualTitle: "Pembayaran Manual",
                paymentMethodText:"Metode Pembayaran",
                paymentMethodManualText:"Manual",
                paymentMethodTransferText:"Transfer",
                detail: "Rincian",
                picture: "Gambar",
                clickToView: "Click untuk melihat gambar",
                accountNumber: "Nomor Rekening",
                sender: "Atas Nama",
                payer: "Pembayar",
                administrator: "Administrator",
                refNumber: "No. Ref",
                maxNominal: "Maks. Nominal"
            }
        },
        login: {
            usernamePasswordWrongText: "Nama pengguna atau kata sandi salah",
            loginForbiddenText: "Akun ini tidak mempunyai hak akses"
        },
        forbiddenPage: {
            pageTitle: "Forbidden",
            pageMessage: "Anda tidak mempunyai akses untuk mengakses halaman"
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
                    status: "Status",
                    statusActive: "Aktif",
                    statusInactive: "Nonaktif",
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
                    sendBatchInvoiceButton: "Kirim Tagihan",
                    adminCantChanged: "Administrator akan terisi secara otomatis dengan Email Anda",
                    adminDefault: "Administrator akan tetap terisi oleh data awal"
                },
                invoice: {
                    code: "No. Tagihan",
                    date: "Tanggal Tagihan",
                    paymentMethod: "Metode Pembayaran",
                    studentFullName: "Nama Mahasiswa",
                    destinationAccount: "Tujuan Rekening",
                    statusPaid:"Lunas",
                    statusConfirming:"Verifikasi",
                    statusInvalid:"Invalid",
                    statusUnpaid:"Belum Lunas",
                    statusUnknown: "Tidak diketahui",
                    statusPending: "Pending",
                    status: "Status",
                    price: "Nominal",
                    action: "Aksi",
                    actionPrint: "Cetak",
                    actionVerify: "Verifikasi",
                    actionManualPay: "Bayar Manual",
                    actionDetail: "Rincian"
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
                paymentText: "Jenis Pembayaran",
                invoicesText: "Transaksi",
                studentListText: "Mahasiswa",
                classListText: "Kelas / Angkatan"
            },
            pages:{
                dashboard:{
                    titlePage: "Beranda",
                    welcomeMessage: "Selamat Datang",
                    paidText: "Lunas",
                    verifyingText: "Verifikasi",
                    pendingText: "Pending",
                    invalidText: "Invalid",
                    unpaidText: "Belum dibayar",
                    totalText: "Total",
                    statisticTitle: "Statistik",
                    toolsTitle: "Peralatan",
                    toolsFindInvoice: "Cari tagihan",
                    paidDescriptionText: "Jumlah tagihan lunas",
                    verifyingDescriptionText: "Jumlah tagihan menunggu verifikasi",
                    pendingDescriptionText: "Jumlah tagihan dibayar sebagian",
                    invalidDescriptionText: "Jumlah tagihan invalid",
                    unpaidDescriptionText: "Jumlah tagihan belum dibayar",
                    totalDescriptionText: "Jumlah semua tagihan"
                },
                student:{
                    titlePage:"Daftar Mahasiswa",
                    addStudentTitle:"Tambah Mahasiswa",
                    addStudentDescription: "Silahkan isi form dibawah ini",
                    editStudentTitle:"Sunting Mahasiswa",
                    editStudentDescription: "Silahkan sunting isian dibawah ini",
                    templateUploaderTitle: "Unggah template mahasiswa",
                    templateUploaderDescription: "Anda dapat menambah mahasiswa dengan template disini. Catatan: Untuk kolom 'kelas' dan 'prodi' harus diisi dengan kode yang sudah ditentukan. Kode 'kelas' dan 'prodi' dapat ditemukan pada menu 'Kelas' dan 'Prodi'. Kolom 'tahun masuk' harus diisi dengan tahun masuk sesuai dengan kelas yang diisi. Pastikan semua kolom terisi dengan benar.",
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
                    sendBatchInvoice: "Kirim tagihan massal",
                    deleteWarningMessage: "Data yang sudah memiliki riwayat transaksi tidak dapat dihapus"
                },
                invoice:{
                    titlePage: "Daftar Transaksi"
                },
                invoiceWithCode: {
                    titlePage: "Rincian Tagihan",
                    printText: "Cetak",
                    detailText: "Rincian",
                    settingText: "Sunting",
                    verificationText: "Verifikasi",
                    manualPayText: "Bayar manual"
                }
            }
        },
        buttonToggleDarkMode:{
            lightModeText: "Modus terang",
            darkModeText: "Modus gelap",
            switchToLightText: "Ganti ke modus terang",
            switchToDarkText: "Ganti ke modus gelap"
        },
        findInvoiceButtonText: "Cari tagihan",
        buttonSwitchLanguageTooltipText:"Switch Language",
        accountInformationButtonText:"Informasi akun",
        loginBoxTopMessage: "Silahkan masuk untuk melanjutkan",
        loginBoxUsernameHelperText: "Maksimal 50 karakter dengan kombinasi huruf dan angka tanpa spasi",
        loginBoxPasswordHelperText: "Maksimal 50 karakter dengan kombinasi huruf, angka dan simbol tanpa spasi",
        loginBoxButtonText: "Masuk"
    }
}