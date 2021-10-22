import React from 'react'
import { AlertDialog, LoginBox } from '../src/components/organisms'
import { Link } from '@mui/material'
import { ButtonSwitchLanguage, ButtonToggleDarkMode, Link as NextLink } from '../src/components/atoms'
import { connect, useDispatch } from 'react-redux'
import useLocalization from '../src/lib/useLocalization'

const Index = () => {
    const dispatch = useDispatch()
    const strings = useLocalization()

    return (
        <div className="w-screen h-screen flex items-center text-center flex-col justify-center">
            <div className="mb-2">
                <ButtonToggleDarkMode
                    variant="icon"
                />
                <ButtonSwitchLanguage
                    variant="icon"
                />
            </div>
            <div className="grid grid-cols-1 mx-auto">
                <LoginBox/>
                <div className="grid grid-cols-2 px-3">
                    <div className="text-left">
                        <NextLink variant="body1" underline="none" className="cursor-pointer" href="/test">
                            {strings.forgotPasswordButtonText}
                        </NextLink>
                        {/* <AlertDialog
                            showCancelButton={true}
                            showConfirmButton={false}
                            title="Lupa kata sandi"
                            cancelLabel={strings.default.alertDialogConfirmButtonText}
                            content="Sistem ini belum tersedia"
                        >
                            <Link variant="body1" underline="none" href="#">{strings.forgotPasswordButtonText}</Link>
                        </AlertDialog> */}
                    </div>
                    <div className="text-right">
                        <AlertDialog
                            showCancelButton={true}
                            showConfirmButton={false}
                            title="Informasi Akun"
                            cancelLabel={strings.default.alertDialogConfirmButtonText}
                            content="Sistem ini menggunakan akun Moodle, Silahkan untuk login menggunakan akun Moodle"
                        >
                            <Link variant="body1" underline="none" className="cursor-pointer">{strings.accountInformationButtonText}</Link>
                        </AlertDialog>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(state => state)(Index)
