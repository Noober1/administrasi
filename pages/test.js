import { Button, Typography } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { SpinnerBackdrop } from '../src/components/atoms'
import { AlertDialog } from '../src/components/organisms'
import Panel from '../src/components/templates/panel'
import { hideSpinner, showSpinner } from '../src/lib/redux/slices/noPersistConfigSlice'
import { useSWR } from '../src/lib'
import { useSelector } from 'react-redux'
import { selectAuth } from '../src/lib/redux/slices/authSlice'

const TestPage = () => {
    const dispatch = useDispatch()
    const auth = useSelector(selectAuth)
    const { data, error } = useSWR('/auth/profile', auth.authToken)

    return (
        <div>
            <Typography
                variant="h4"
            >
                Main spinner
            </Typography>
            <div className="grid grid-cols-4">
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => dispatch(showSpinner())}
                >
                    Show Main Spinner
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => {
                        dispatch(showSpinner(true))
                        setTimeout(() => {
                            dispatch(hideSpinner())
                        }, 5000);
                    }}
                >
                    Show Main Spinner (disable dismiss on click)
                </Button>
            </div>
            <Typography
                variant="h4"
            >
                Main spinner
            </Typography>
            <div className="grid grid-cols-4">
                <AlertDialog
                    content="manakutau"
                    onConfirm={() => {
                        dispatch(showSpinner())
                    }}
                >
                    <Button>
                        AlertDialog
                    </Button>
                </AlertDialog>
            </div>
        </div>
    )
}

TestPage.getLayout = (page) => (
    <Panel>
        {page}
    </Panel>
)

export default TestPage
