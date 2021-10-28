import { Alert, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, Typography } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Tooltip } from '../../atoms'
import useLocalization from '../../../lib/useLocalization'
import { useDispatch } from 'react-redux'
import { hideSpinner,  showSpinner } from '../../../lib/redux/slices/noPersistConfigSlice'
import { selectAuth, setAuthToken } from '../../../lib/redux/slices/authSlice'
import fetchAPI from '../../../lib/fetchApi'
import { useSelector } from 'react-redux'

const LoginBox = () => {
    const dispatch = useDispatch()
    const strings = useLocalization()
    const [loginValue, setloginValue] = useState({
        username: '',
        password: ''
    })
    const [showPassword, setshowPassword] = useState(false)
    const [loginError, setloginError] = useState({
        isError: false,
        code:'',
        message:''
    })

    const handleSubmitForm = event => {
        event.preventDefault()
        dispatch(showSpinner(true))
        fetchAPI({
            url: '/auth/login',
            method: 'POST',
            data: {
                ...loginValue,
                app:'administrasi'
            }
        }).then(result => {
            dispatch(setAuthToken(result.accessToken))
            setloginError({
                isError:false,
                code:'',
                message:''
            })
        })
        .catch(error => {
            if (error?.response?.data) {
                const { data } = error.response
                if (data.code === 'WRONG_AUTH') {
                    setloginError({
                        code:data.code,
                        message:strings.login.usernamePasswordWrongText,
                        isError:true
                    })
                } else if (data.code === 'NO_PERMISSION') {
                    setloginError({
                        code:data.code,
                        message:strings.login.loginForbiddenText,
                        isError:true
                    })
                } else {
                    setloginError({
                        message:`${strings.default.anErrorOccured}: ${data.code}`,
                        code:data.code,
                        isError:true
                    })
                }
            } else {
                setloginError({
                    isError:true,
                    code:'UNKNOWN_LOGIN_ERROR',
                    message:'[UNKNOWN_LOGIN_ERROR]'
                })
            }
            dispatch(hideSpinner())
        })
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
                severity={loginError.isError ? 'error' : 'info'}
                className="mb-5"
            >
                {loginError.isError ? loginError.message : strings.loginBoxTopMessage}
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
                    maxLength:50
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