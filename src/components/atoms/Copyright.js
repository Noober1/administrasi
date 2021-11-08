import { Link, Typography } from "@mui/material";

const Copyright = (props) => {
	return (
		<Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright ©'}
            {new Date().getFullYear()}
            {' - '}
            <Link color="inherit" underline="none" target="_blank" href="https://mui.com/">
                {process.env.NEXT_PUBLIC_COMPANY_NAME}
            </Link>
            {'.'}
		</Typography>
	);
}

export default Copyright