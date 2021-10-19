import React from 'react'
import { AlertDialog, LoginBox } from '../src/components/organisms'
import { Link } from '@mui/material'
import { localization } from '../src/constants'
import { useSelector } from 'react-redux'

const Index = () => {
    const local = localization()

    return (
        <div className="w-screen h-screen flex items-center text-center">
            <div className="grid grid-cols-1 mx-auto">
                <LoginBox/>
                <div className="grid grid-cols-2 px-3">
                    <div className="text-left">
                        <Link variant="body1" underline="none" onClick={() => setLang('en')}>Lupa kata sandi?</Link>
                        {/* <AlertDialog
                            showCancelButton={true}
                            showConfirmButton={false}
                            title="Lupa kata sandi"
                            cancelLabel={local.default.alertDialogConfirmButtonText}
                            content="Sistem ini belum tersedia"
                        >
                            <Link variant="body1" underline="none" href="#">{local.forgotPasswordButtonText}</Link>
                        </AlertDialog> */}
                    </div>
                    <div className="text-right">
                        <AlertDialog
                            showCancelButton={true}
                            showConfirmButton={false}
                            title="Informasi Akun"
                            cancelLabel={local.default.alertDialogConfirmButtonText}
                            content="Sistem ini menggunakan akun Moodle, Silahkan untuk login menggunakan akun Moodle"
                        >
                            <Link variant="body1" underline="none">{local.accountInformationButtonText}</Link>
                        </AlertDialog>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Index
