
export default function english() {
    return {
        languange: {
            name: 'english',
            initial:'EN'
        },
        default:{
            alertDialogConfirmButtonText: "OK",
            alertDialogCancelButtonText: "Cancel",
            alertLogoutTitleText: "Logout from system",
            alertLogoutBodyText: "Are you sure want to logout?",
            alertLogoutText: "Logout",
            anErrorOccured: "An error occured",
            editText: "Edit",
            deleteText:"Delete"
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
            columns: {
                student: {
                    NIS: "NIS",
                    fullName: "Full Name",
                    status: "Status",
                    type: "Type",
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
                    titlePage:"Student List"
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