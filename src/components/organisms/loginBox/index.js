import { Alert, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, Typography } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Tooltip } from '../../atoms'
import useLocalization from '../../../lib/useLocalization'
import { useDispatch } from 'react-redux'
import { hideSpinner, setSpinnerHideOnClick, showSpinner } from '../../../lib/redux/slices/noPersistConfigSlice'

const LoginBox = () => {
    const dispatch = useDispatch()
    const strings = useLocalization()
    const [loginValue, setloginValue] = useState({
        username: '',
        password: ''
    })
    const [showPassword, setshowPassword] = useState(false)

    const handleSubmitForm = event => {
        event.preventDefault()
        dispatch(showSpinner(true))
        setTimeout(() => {
            dispatch(hideSpinner())
        }, 3000);
    }

    const formChangeHandler = event => setloginValue({
        ...loginValue,
        [event.target.name]: event.target.value
    })

    const toggleShowPassword = () => setshowPassword(!showPassword)

    return(
        <Paper
            component="form"
            className="max-w-md p-5 mb-2"
            onSubmit={handleSubmitForm}
            autoComplete="off"
        >
            <Typography
                variant="h4"
                gutterBottom
            >
                Administrasi
            </Typography>
            <Alert
                severity="info"
                className="mb-5"
            >
                {strings.loginBoxTopMessage}
            </Alert>
            <TextField
                className="mb-5"
                fullWidth
                name="username"
                value={loginValue.username}
                onChange={formChangeHandler}
                label={strings.username}
                variant="outlined"
                helperText={strings.loginBoxUsernameHelperText}
                inputProps={{
                    maxLength:20
                }}
                name="username"
                required
                autoFocus
            />
            <FormControl
                variant="outlined"
                className="mb-5"
                fullWidth
            >
                <InputLabel htmlFor="login-box-password">{strings.password}</InputLabel>
                <OutlinedInput
                    id="login-box-password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={loginValue.password}
                    onChange={formChangeHandler}
                    endAdornment={
                        <InputAdornment position="end">
                            <Tooltip
                                title={strings.togglePasswordVisibilityText}
                                arrow
                            >
                                <IconButton
                                    aria-label={strings.togglePasswordVisibilityText}
                                    onClick={toggleShowPassword}
                                    onMouseDown={event => event.preventDefault()}
                                >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </Tooltip>
                        </InputAdornment>
                    }
                    inputProps={{
                        maxLength:50
                    }}
                    label="Password"
                    required
                />
                <FormHelperText>
                    {strings.loginBoxPasswordHelperText}
                </FormHelperText>
            </FormControl>
            <Button
                size="large"
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<LoginIcon/>}
                className="w-full"
            >
                {strings.loginBoxButtonText}
            </Button>
        </Paper>
    )
}

export default LoginBox