export default function english() {
  return {
    languange: {
      name: "english",
      initial: "EN",
    },
    default: {
      nameOfMonths: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
      alertDialogConfirmButtonText: "OK",
      downloadText: "Download",
      loadingText: "Loading...",
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
      importText: "Import",
      deleteText: "Delete",
      helpButtonLabel: "Help",
      retryText: "Try again",
      detailText: "Detail",
      returnText: "Back",
      closeText: "Close",
      noMessageText: "No message",
    },
    errors: {
      unknownError: "Unknown error",
      failedToSaveText: "Data failed to save",
      failedToDelete: "Data failed to delete",
      internalError:
        "Internal server error, please report to your administrator",
      duplicateData: "Data duplicate, please check and try again",
      emailDuplicate: "Email already exist, unable to add the data",
      classNotFound: "Class not found",
      prodiNotFound: "Prodi not found",
      noDataSelected: "No data selected",
      deleteUrlInvalid: "Delete URL not valid",
      deleteItemsError: "Deleting item(s) failed",
      dataExist: "Data already exist in database",
      imageNotFound: "Image not found",
      ERR_PAYMENT_HAVE_INVOICE: "Payment have invoice(s)",
    },
    success: {
      deleteItemsSuccess: "Item(s) has been deleted",
      deleteItemSuccessWithRange: (deleted, total) => {
        return `${deleted || 0} data deleted from ${total || 0} data selected`;
      },
    },
    appBar: {
      notificationTooltipText: "Notification",
      showMenuTooltipText: "Show menu",
      hideMenuTooltipText: "Hide menu",
      toggleMiniMenu: "Show / hide menu",
      settingMiniMenuText: "Settings",
    },
    components: {
      sendBatchInvoice: {
        dialogTitle: "Send Batch Invoice",
        dialogContentText: "Please fill the criteria(s) below",
        classFormHelper: "You can choose the class more than one data",
        classFormLabel: "Class List",
        prodiFormLabel: "Prodi List",
        prodiFormHelper:
          "You can choose the prodi more than one data. This field isn't required.",
        alertConfirmText: "Are you sure want to send the invoices?",
        alertWarningText:
          "Student will not received the invoice if he/she has been received this invoice",
        invoiceSended: "Invoice sended",
        invoiceFailedToSend: "Invoice failed to send",
        includeBeasiswaLabel: "With 'Beasiswa' student type",
        includeBeasiswaHelper:
          "If turned on, the student of the type 'Mahasiswa' will be added to the list of invoice recipients",
      },
      templateUploader: {
        allowedFormatText: "Allowed format",
        helperText: "Click here or drag and drop file(s) here to choose file",
        dropFileHereText: "Drop your file(s) here!",
        closeImporterText: "Close file importer",
        fileTemplateDownloadText: "Click here to download sample template",
        uploadButtonText: "Upload",
        fileFormatErrorText:
          "Some file(s) doen't meet criteria(file size, file format, etc)",
        maxSizeText: "Maximum file size",
        uploadingText: "Uploading",
        successUploadTitle: "Upload success",
        successUploadText: "Template has been uploaded",
        errorUploadTitle: "Upload failed",
        errorUploadText: "Template failed to upload, see message below:",
        errorDataText: "Error data",
      },
      findInvoiceDialog: {
        dialogTitle: "Find Invoice(s)",
        dialogContentText: "You can find invoice here with invoice number",
        searchInputPlaceholder:
          "Type your invoice, first name or last name here with 3 characters or more for search invoice",
        errorTooShort: "Character you typed is too short, minimal 3 characters",
        invoiceTable: {
          code: "Invoice",
          student: "Student Name",
          status: "Status",
          detailButton: "Detail",
          action: "Action",
        },
      },
      invoiceDetailDialog: {
        dialogTitle: "Invoice Detail",
        code: "Invoice",
        sentTo: "Send to",
        status: "Payment status",
        statusPaid: "Paid",
        statusConfirming: "Verifying",
        statusInvalid: "Invalid",
        statusUnpaid: "Unpaid",
        statusPending: "Pending",
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
        paymentHistoryButtonText: "Payment History",
        emptyPaymentHistory: "No payment history",
        transactionDate: "Transaction date",
        transactionDateHelper: "Transaction date from bank transfer proof",
        verificationDate: "Verification date",
        refNumber: "Ref number",
        refNumberHelper:
          "The Ref number is listed in the transaction details when you make a transfer",
        picture: "Picture",
        actionSendPaymentDetail: "Send receipt",
        actionResendPaymentDetail: "Resend receipt",
        actionPrint: "Print",
        sendReceiptContentText:
          "Please fill this form below. If you have sent proof of transfer, the data that will be sent at this time will update the invoice data.",
        senderName: "Sender Name",
        senderNameHelper: "Account owner name",
        sendReceiptSuccess: "Send receipt success",
        sendReceiptFailed: "Send receipt failed",
        pickImage: "Choose image",
        invoiceRemaining: "Remaining",
        otherDetail: "Other detail",
      },
      uploader: {
        uploadFileSuccess: "Uploading file success",
        uploadFileFailed: "Uploading file failed",
        uploadText: "Upload",
      },
      verifyOrManualDialog: {
        verifyTitle: "Verify Payment",
        verifyMessage:
          "Make sure to check the data carefully before verifying.",
        verifyConfirmingVerify: "Are you sure want to verify?",
        verifyButton: "Verify",
        verifyOptionsText: "Verification Options",
        verifyNominal: "Nominal",
        manualTitle: "Manual Payment",
        paymentMethodText: "Payment Method",
        paymentMethodManualText: "Manual",
        paymentMethodTransferText: "Transfer",
        detail: "Detail",
        picture: "Picture",
        clickToView: "Click to view image",
        accountNumber: "Account Number",
        sender: "From",
        payer: "Payer",
        administrator: "Administrator",
        refNumber: "Ref Number",
        maxNominal: "Max. Nominal",
      },
    },
    login: {
      usernamePasswordWrongText: "Username or password incorrect",
      loginForbiddenText: "This account has no permission",
    },
    forbiddenPage: {
      pageTitle: "Forbidden",
      pageMessage: "You don't have permission to access the page",
    },
    table: {
      refresh: "Refresh",
      dialogDeleteTitle: "Delete selected",
      dialogDeleteConfirmMessage:
        "Are you sure want to delete selected item(s)?",
      columns: {
        student: {
          NIS: "NIS",
          firstName: "First Name",
          lastName: "Last Name",
          fullName: "Full Name",
          type: "Type",
          email: "E-mail",
          password: "Password",
          repeatPassword: "Retype Password",
          mismatchPassword: "Password mismatch",
          emptyPassword: "Password empty",
          status: "Status",
          class: "Class",
          registerYear: "Register Year",
          helperRegisterYearCantChange:
            "Register year will filled automatically based on selected Class",
          prodi: "Prodi",
          action: "Action",
        },
        class: {
          code: "Class code",
          name: "Class name",
          semester: "Semester",
          angkatan: "Angkatan",
          status: "Status",
          statusActive: "Active",
          statusInactive: "Inactive",
          action: "Action",
        },
        payment: {
          registerDate: "Date",
          admin: "Administrator",
          type: "Payment Type",
          typeHelper: "Subject / Title for payment detail",
          price: "Price",
          priceHelper: "Example: 100000",
          priceHelperNoEdit: "This field cannot be edited",
          description: "Description",
          action: "Action",
          sendBatchInvoiceButton: "Send Invoices",
          adminCantChanged:
            "Administrator will be filled automatically with your email",
          adminDefault: "Administrator will still be filled with initial data",
        },
        invoice: {
          code: "Invoice",
          date: "Invoice Date",
          paymentMethod: "Payment Method",
          studentFullName: "Student Name",
          destinationAccount: "Dest. Account",
          statusPaid: "Paid",
          statusConfirming: "Verifying",
          statusInvalid: "Invalid",
          statusUnpaid: "Unpaid",
          statusPending: "Pending",
          statusUnknown: "Unknown",
          status: "Status",
          price: "Price",
          action: "Action",
          actionPrint: "Print",
          actionVerify: "Verify",
          actionManualPay: "Manual Pay",
          actionDetail: "Detail",
        },
      },
    },
    about: {
      officialWebsiteText: "Official Website",
      findUsText: "Find Us",
    },
    username: "Username",
    password: "Password",
    togglePasswordVisibilityText: "Tampilkan/sembunyikan kata sandi",
    forgotPasswordButtonText: "Forgot your password?",
    panel: {
      menu: {
        dashboardText: "Dashboard",
        paymentText: "Payment",
        invoicesText: "Invoice",
        studentListText: "Student List",
        classListText: "Class List",
      },
      pages: {
        dashboard: {
          titlePage: "Dashboard",
          welcomeMessage: "Welcome",
          paidText: "Paid",
          verifyingText: "Verifying",
          pendingText: "Pending",
          invalidText: "Invalid",
          unpaidText: "Unpaid",
          totalText: "Total",
          statisticTitle: "Statistic",
          toolsTitle: "Tools",
          toolsFindInvoice: "Find invoice",
          paidDescriptionText: "Paid invoice(s)",
          verifyingDescriptionText: "Verifying invoice(s)",
          pendingDescriptionText: "Partially paid invoice(s)",
          invalidDescriptionText: "Invalid invoice(s)",
          unpaidDescriptionText: "Unpaid invoice(s)",
          totalDescriptionText: "All invoice(s)",
        },
        student: {
          titlePage: "Student List",
          addStudentTitle: "Add Student",
          addStudentDescription: "Please fill this form below",
          editStudentTitle: "Edit Student",
          editStudentDescription: "Please edit these fields below",
          templateUploaderTitle: "Upload student template",
          templateUploaderDescription:
            "You can insert student with template here. Note: 'kelas' and 'prodi' should be filled with the class code and prodi code respectively. You can find the 'kelas' code and 'prodi' code in Class and Prodi menu. 'tahun' field should be filled with 'tahun_masuk' based on the selected class.",
        },
        class: {
          titlePage: "Class / Angkatan List",
          addClassTitle: "Add Kelas / Angkatan",
          addClassDescription: "Please fill this form below",
          editClassTitle: "Edit Kelas / Angkatan",
          editClassDescription: "Please edit these fields below",
          warningDeleteItem:
            "Data would not be deleted if there are student(s) with a same class exist",
        },
        payment: {
          titlePage: "Payment List",
          addPaymentTitle: "Add Payment",
          addPaymentDescription: "Please fill this form below",
          editPaymentTitle: "Edit Payment",
          editPaymentDescription: "Please edit these fields below",
          warningDeleteItem:
            "Data would not be deleted if there invoice data with this payment data exist",
        },
        paymentWithId: {
          titlePage: "Payment detail",
          invoiceTableTitle: "Invoices",
          sendBatchInvoice: "Send Batch Invoice",
          deleteWarningMessage:
            "Data with transaction history will not be deleted",
        },
        invoice: {
          titlePage: "Invoices",
        },
        invoiceWithCode: {
          titlePage: "Invoice Detail",
          printText: "Print",
          detailText: "Detail",
          settingText: "Setting",
          verificationText: "Verification",
          manualPayText: "Manual payment",
        },
      },
    },
    buttonToggleDarkMode: {
      lightModeText: "Light Mode",
      darkModeText: "Dark Mode",
      switchToLightText: "Switch to light mode",
      switchToDarkText: "Switch to dark mode",
    },
    findInvoiceButtonText: "Find Invoice",
    buttonSwitchLanguageTooltipText: "Ubah bahasa",
    accountInformationButtonText: "Account information",
    loginBoxTopMessage: "Please login to continue",
    loginBoxUsernameHelperText:
      "Max 50 characters with letter and number combination without space",
    loginBoxPasswordHelperText:
      "Max 50 characters with letter, number and symbol combination without space",
    loginBoxButtonText: "Login",
  };
}
