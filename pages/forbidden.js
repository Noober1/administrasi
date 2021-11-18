import { Button, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { PageHead } from '../src/components/atoms'
import useLocalization from '../src/lib/useLocalization'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import Link from 'next/link'

const Forbidden = () => {
    const {forbiddenPage, default:defaultText} = useLocalization()

    return (
        <>
            <PageHead
                title={forbiddenPage.pageTitle}
            />
            <Box className="flex h-screen items-center justify-between">
				<div className="mx-auto grid grid-cols-1">
					<div className="mx-auto mb-5">
						<img src="/error.png" alt="Error" className="h-40 m-0"/>
					</div>
					<Typography variant="h5" gutterBottom>
                        {forbiddenPage.pageMessage}
					</Typography>
					<div className="mx-auto">
                        <Link href='/'>
                            <Button variant="contained" startIcon={<ArrowBackIcon/>}>
                                {defaultText.returnText}
                            </Button>
                        </Link>
					</div>
				</div>
			</Box>
        </>
    )
}

export default Forbidden
