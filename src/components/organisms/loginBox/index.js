import { Alert, Button, Paper, TextField, Typography } from '@mui/material'
import LoginIcon from '@mui/icons-material/Login'
import localization from '../../../constants/localization'

const handleSubmitForm = event => {
    event.preventDefault()
    console.log('submitted')
}

const LoginBox = () => {

    const local = localization()

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
                {local.loginBoxTopMessage}
            </Alert>
            <TextField
                className="mb-5"
                fullWidth
                label={local.username}
                variant="outlined"
                helperText={local.loginBoxUsernameHelperText}
                inputProps={{
                    maxLength:20
                }}
                name="username"
                required
            />
            <TextField
                className="mb-5"
                fullWidth
                label={local.password}
                variant="outlined"
                helperText={local.loginBoxPasswordHelperText}
                name="password"
                type="password"
                inputProps={{
                    maxLength:50
                }}
                required
            />
            <Button
                size="large"
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<LoginIcon/>}
                className="w-full"
            >
                {local.loginBoxButtonText}
            </Button>
        </Paper>
    )
}

export default LoginBox