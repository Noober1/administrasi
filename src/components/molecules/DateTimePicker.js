import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTime from '@mui/lab/MobileDateTimePicker';
import idLocale from 'date-fns/locale/id'
import enLocale from 'date-fns/locale/en-US'
import PropTypes from 'prop-types'
import { useState } from 'react';
import useLocalization from '../../lib/useLocalization';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';

const locale = {
    ID: idLocale,
    EN: enLocale
}

const DateTimePicker = ({value, label, valueGetter, helperText}) => {
    const { languange, default:defaultText } = useLocalization()
    const [dateValue, setDateValue] = useState(value);

    return (
        <LocalizationProvider locale={locale[languange.initial]} dateAdapter={AdapterDateFns}>
            <DateTime
                InputAdornmentProps={<AccessAlarmIcon/>}
                cancelText={defaultText.cancelText}
                okText={defaultText.alertDialogConfirmButtonText}
                renderInput={(props) => (
                    <TextField helperText={helperText} {...props}/>
                )}
                label={label || defaultText.chooseDateAndTime}
                value={dateValue}
                onChange={(newValue) => {
                    setDateValue(newValue);
                    if (typeof valueGetter == 'function') {
                        valueGetter(newValue)
                    }
                }}
            />
        </LocalizationProvider>
    );
}

DateTimePicker.defaultProps = {
    value: new Date()
}

DateTimePicker.propTypes = {
    value: PropTypes.instanceOf(Date),
    valueGetter: PropTypes.func
}

export default DateTimePicker