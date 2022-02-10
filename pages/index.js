import React, { useEffect, useState } from 'react'
import { AlertDialog, LoginBox } from '../src/components/organisms'
import { Link } from '@mui/material'
import { ButtonSwitchLanguage, ButtonToggleDarkMode, Link as NextLink, PageHead, SpinnerBackdrop } from '../src/components/atoms'
import { connect, useDispatch } from 'react-redux'
import useLocalization from '../src/lib/useLocalization'
import { useSelector } from 'react-redux'
import { selectAuth } from '../src/lib/redux/slices/authSlice'
import { useRouter } from 'next/router'
import { hideSpinner } from '../src/lib/redux/slices/noPersistConfigSlice'
import { Box } from '@mui/system'

const Index = () => {
    const [loading, setloading] = useState(true)
    const strings = useLocalization()
    const dispatch = useDispatch()
    const auth = useSelector(selectAuth)
    const router = useRouter()

    useEffect(() => {
        if (auth) {
            if (auth.authToken) {
                router.push('/dashboard')
            } else {
                dispatch(hideSpinner())
                setloading(false)
            }
        }
    }, [auth])
    
    if (loading) {
        return(
            <SpinnerBackdrop/>
        )
    }

    return (
        <>
            <PageHead
                title={''}
            />
            <Box
                sx={{
                    backgroundColor: (theme) =>
						theme.palette.mode === 'light'
						? theme.palette.grey[100]
						: theme.palette.grey[900]
                }}
                className="w-screen h-screen flex items-center text-center flex-col justify-center"
            >
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
                            {/* <NextLink variant="body1" underline="none" className="cursor-pointer" href="/test">
                                {strings.forgotPasswordButtonText}
                            </NextLink> */}
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
                                title={strings.accountInformationButtonText}
                                cancelLabel={strings.default.alertDialogConfirmButtonText}
                                content="Silahkan untuk menghubungi administrator sistem untuk informasi lebih lanjut"
                            >
                                <Link variant="body1" underline="none" className="cursor-pointer">{strings.accountInformationButtonText}</Link>
                            </AlertDialog>
                        </div>
                    </div>
                </div>
            </Box>
        </>
    )
}

export default connect(state => state)(Index)
