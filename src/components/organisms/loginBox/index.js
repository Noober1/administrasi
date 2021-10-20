import { Alert, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Paper, TextField, Typography } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import localization from '../../../constants/localization'
import { connect } from 'react-redux'
import { selectConfig } from '../../../lib/redux/slices/configSlice'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'

{/* <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl> */}

const LoginBox = () => {
    const config = useSelector(selectConfig)
    const strings = localization(config.language)
    const [loginValue, setloginValue] = useState({
        username: '',
        password: ''
    })
    const [showPassword, setshowPassword] = useState(false)

    const handleSubmitForm = event => {
        event.preventDefault()
        console.log('submitted')
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
                            <IconButton
                                aria-label={strings.togglePasswordVisibilityText}
                                onClick={toggleShowPassword}
                                onMouseDown={event => event.preventDefault()}
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
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

export default connect(state => state)(LoginBox)