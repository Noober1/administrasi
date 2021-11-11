
export default function english() {
    return {
        languange: {
            name: 'english',
            initial:'EN'
        },
        default:{
            nameOfMonths: ['January','February','March','April','May','June','July','August','September','October','November','December'],
            alertDialogConfirmButtonText: "OK",
            alertDialogCancelButtonText: "Cancel",
            alertLogoutTitleText: "Logout from system",
            alertLogoutBodyText: "Are you sure want to logout?",
            alertLogoutText: "Logout",
            anErrorOccured: "An error occured",
            editText: "Edit",
            addText: "Add",
            saveText: "Save",
            savedText: "Data has been saved",
            importText:"Import",
            deleteText:"Delete",
            helpButtonLabel: "Help",
            retryText: "Try again",
            detailText: "Detail"
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
        login: {
            usernamePasswordWrongText: "Username or password incorrect",
            loginForbiddenText: "This account has no permission"
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
                    semster: "Semester",
                    angkatan: "Angkatan",
                    action: "Action"
                },
                payment:{
                    registerDate: "Date",
                    admin:"Administrator",
                    type: "Payment Type",
                    price: "Price",
                    description: "Description",
                    action: "Action"
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
                classListText: "Class List",
                billText: "Bill"
            },
            pages:{
                dashboard:{
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
                    addClassTitle:"Tambah Kelas / Angkatan",
                    addClassDescription: "Please fill this form below",
                    editClassTitle: "Edit Kelas / Angkatan",
                    editClassDescription: "Please edit these fields below",
                    warningDeleteItem: "Data would not be deleted if there are student(s) with a same class exist"
                },
                payment: {
                    titlePage: "Payment List",
                    warningDeleteItem: "Data would not be deleted if there invoice data with this payment data exist"
                },
                paymentWithId: {
                    titlePage: "Payment detail"
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