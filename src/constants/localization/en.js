
export default function english() {
    return {
        languange: {
            name: 'english',
            initial:'EN'
        },
        default:{
            nameOfMonths: ['January','February','March','April','May','June','July','August','September','October','November','December'],
            alertDialogConfirmButtonText: "OK",
            cancelText: "Cancel",
            alertLogoutTitleText: "Logout from system",
            alertLogoutBodyText: "Are you sure want to logout?",
            alertLogoutText: "Logout",
            alertConfirmTitle: "Are you sure?",
            chooseDateAndTime: "Choose date and time",
            anErrorOccured: "An error occured",
            editText: "Edit",
            selectText: "Choose",
            noSelectedText: "No data selected",
            addText: "Add",
            saveText: "Save",
            sendText: "Send",
            savedText: "Data has been saved",
            importText:"Import",
            deleteText:"Delete",
            helpButtonLabel: "Help",
            retryText: "Try again",
            detailText: "Detail",
            returnText: "Back",
            closeText: "Close"
        },
        errors:{
            failedToSaveText: "Data failed to save",
            failedToDelete: "Data failed to delete",
            internalError: 'Internal server error, please report to your administrator',
            duplicateData: "Data duplicate, please check and try again",
            emailDuplicate: "Email already exist, unable to add the data",
            classNotFound: "Class not found",
            prodiNotFound: "Prodi not found",
            noDataSelected: "No data selected",
            deleteUrlInvalid: "Delete URL not valid",
            deleteItemsError: 'Deleting item(s) failed',
            dataExist: 'Data already exist in database'
        },
        success:{
            deleteItemsSuccess: 'Item(s) has been deleted'
        },
        appBar: {
            notificationTooltipText: "Notification",
            showMenuTooltipText: "Show menu",
            hideMenuTooltipText: "Hide menu",
            toggleMiniMenu: "Show / hide menu",
            settingMiniMenuText: "Settings"
        },
        components:{
            sendBatchInvoice: {
                dialogTitle: "Send Batch Invoice",
                dialogContentText: "Please fill the criteria(s) below",
                classFormHelper: "You can choose the class more than one data",
                classFormLabel:"Class List",
                prodiFormLabel: "Prodi List",
                prodiFormHelper: "You can choose the prodi more than one data. This field isn't required.",
                alertConfirmText: "Are you sure want to send the invoices?",
                alertWarningText: "Student will not received the invoice if he/she has been received this invoice",
                invoiceSended: "Invoice sended",
                invoiceFailedToSend: "Invoice failed to send",
                includeBeasiswaLabel: "With 'Beasiswa' student type",
                includeBeasiswaHelper: "If turned on, the student of the type 'Mahasiswa' will be added to the list of invoice recipients"
            },
            invoiceDetailDialog: {
                dialogTitle: "Invoice Detail",
                code: "Invoice",
                sentTo: "Send to",
                status: "Payment status",
                statusPaid:"Paid",
                statusConfirming:"Verifying",
                statusInvalid:"Invalid",
                statusUnpaid:"Unpaid",
                statusUnknown: "Unknown",
                paymentMethod: "Payment Method",
                accountNumber: "Account number",
                paymentType: "Payment Name",
                paymentDescription: "Payment Description",
                paymentPrice: "Price",
                paymentTotal: "Total",
                destinationAccount: "Destination account",
                chooseDestinationAccount: "Choose destination account",
                invoiceDate: "Invoice date",
                transactionDate: "Transaction date",
                verificationDate: "Verification date",
                refNumber: "Ref number",
                refNumberHelper: "The Ref number is listed in the transaction details when you make a transfer",
                picture: "Picture",
                actionSendPaymentDetail: "Send receipt",
                actionResendPaymentDetail: "Resend receipt",
                actionPrint: "Print",
                sendReceiptContentText: "Please fill this form below. If you have sent proof of transfer, the data that will be sent at this time will update the invoice data.",
                senderName: "Sender Name",
                senderNameHelper: "Account owner name",
                sendReceiptSuccess: "Send receipt success",
                sendReceiptFailed: "Send receipt failed",
                pickImage: "Choose image"
            },
            uploader: {
                uploadFileSuccess: "Uploading file success",
                uploadFileFailed: "Uploading file failed",
                uploadText: "Upload"
            }
        },
        login: {
            usernamePasswordWrongText: "Username or password incorrect",
            loginForbiddenText: "This account has no permission"
        },
        forbiddenPage: {
            pageTitle: "Forbidden",
            pageMessage: "You don't have permission to access the page"
        },
        table: {
            refresh: "Refresh",
            dialogDeleteTitle: "Delete selected",
            dialogDeleteConfirmMessage: "Are you sure want to delete selected item(s)?",
            columns: {
                student: {
                    NIS: "NIS",
                    firstName:"First Name",
                    lastName:"Last Name",
                    fullName: "Full Name",
                    type: "Type",
                    email:"E-mail",
                    password:"Password",
                    repeatPassword:"Retype Password",
                    mismatchPassword:"Password mismatch",
                    emptyPassword: "Password empty",
                    status:"Status",
                    class: "Class",
                    registerYear: "Register Year",
                    helperRegisterYearCantChange: "Register year will filled automatically based on selected Class",
                    prodi: "Prodi",
                    action: "Action"
                },
                class: {
                    name: "Class name",
                    semester: "Semester",
                    angkatan: "Angkatan",
                    status: "Status",
                    statusActive: "Active",
                    statusInactive: "Inactive",
                    action: "Action"
                },
                payment:{
                    registerDate: "Date",
                    admin:"Administrator",
                    type: "Payment Type",
                    typeHelper: "Subject / Title for payment detail",
                    price: "Price",
                    priceHelper: "Example: 100000",
                    priceHelperNoEdit:"This field cannot be edited",
                    description: "Description",
                    action: "Action",
                    adminCantChanged: "Administrator will be filled automatically with your email",
                    adminDefault: "Administrator will still be filled with initial data"
                },
                invoice: {
                    code: "Invoice",
                    date: "Invoice Date",
                    paymentMethod: "Payment Method",
                    studentFullName: "Student Name",
                    destinationAccount: "Dest. Account",
                    statusPaid:"Paid",
                    statusConfirming:"Verifying",
                    statusInvalid:"Invalid",
                    statusUnpaid:"Unpaid",
                    statusUnknown: "Unknown",
                    status: "Status",
                    price: "Price",
                    action: "Action",
                    actionDetail: "Detail"
                }
            }
        },
        about: {
            officialWebsiteText: "Official Website",
            findUsText: "Find Us"
        },
        username: "Username",
        password: "Password",
        togglePasswordVisibilityText:"Tampilkan/sembunyikan kata sandi",
        forgotPasswordButtonText: "Forgot your password?",
        panel: {
            menu:{
                dashboardText: "Dashboard",
                paymentText: "Payment",
                invoicesText: "Invoice",
                studentListText: "Student List",
                classListText: "Class List"
            },
            pages:{
                dashboard:{
                    titlePage: "Dashboard",
                    welcomeMessage: "Welcome back"
                },
                student:{
                    titlePage:"Student List",
                    addStudentTitle:"Add Student",
                    addStudentDescription: "Please fill this form below",
                    editStudentTitle:"Edit Student",
                    editStudentDescription: "Please edit these fields below"
                },
                class:{
                    titlePage: "Class / Angkatan List",
                    addClassTitle:"Add Kelas / Angkatan",
                    addClassDescription: "Please fill this form below",
                    editClassTitle: "Edit Kelas / Angkatan",
                    editClassDescription: "Please edit these fields below",
                    warningDeleteItem: "Data would not be deleted if there are student(s) with a same class exist"
                },
                payment: {
                    titlePage: "Payment List",
                    addPaymentTitle:"Add Payment",
                    addPaymentDescription: "Please fill this form below",
                    editPaymentTitle: "Edit Payment",
                    editPaymentDescription: "Please edit these fields below",
                    warningDeleteItem: "Data would not be deleted if there invoice data with this payment data exist"
                },
                paymentWithId: {
                    titlePage: "Payment detail",
                    invoiceTableTitle: "Invoices",
                    sendBatchInvoice: "Send Batch Invoice"
                },
                invoice:{
                    titlePage: "Invoices"
                },
                invoiceWithCode: {
                    titlePage: "Invoice Detail"
                }
            }
        },
        buttonToggleDarkMode:{
            lightModeText: "Light Mode",
            darkModeText: "Dark Mode",
            switchToLightText: "Switch to light mode",
            switchToDarkText: "Switch to dark mode"
        },
        buttonSwitchLanguageTooltipText:"Ubah bahasa",
        accountInformationButtonText:"Account information",
        loginBoxTopMessage: "Please login to continue",
        loginBoxUsernameHelperText: "Max 50 characters with letter and number combination without space",
        loginBoxPasswordHelperText: "Max 50 characters with letter, number and symbol combination without space",
        loginBoxButtonText: "Login"
    }
}