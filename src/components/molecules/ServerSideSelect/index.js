import React, { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import CircularProgress from '@mui/material/CircularProgress'
import { useFetchApi } from '../../../lib'
import { useSelector } from 'react-redux'
import { selectAuth } from '../../../lib/redux/slices/authSlice'
import PropTypes from 'prop-types'
import { useDebounce, useEffectOnce, useUpdateEffect } from 'react-use'

/**
 * Selection with value from API
 * @param {string} url - URL API
 * @param {string} optionLabel - Index label from API response for selection label
 * @param {string} optionValue - Index label from API response for selection value
 * @param {string} label - Component Label
 * @param {string} onChange - onChange event, parameter: event, newOptionValue, newObjectValue
 * @returns {null}
 */
const ServerSideSelect = ({url, optionValue, optionLabel, label, onChange, required, className, value:initValue}) => {
	const auth = useSelector(selectAuth)
	const [open, setOpen] = useState(false)
	const [value, setvalue] = useState('')
	const [initValueDone, setinitValueDone] = useState(false)
	const [tempSearchText, settempSearchText] = useState('')
	const [searchText, setsearchText] = useState('')
	const [options, setOptions] = useState([])
	
	const [data, fetchLoading, isFetchError, fetchErrorMessage] = useFetchApi(url + `?search=${searchText}`,{
		url: url + `?search=${searchText}`,
		headers: {
			Authorization: 'Bearer ' + auth.authToken
		}
	})

	const loading = open && fetchLoading;

	useEffect(() => {
		if (data) {
			setOptions(data.data)
		}
	}, [data, open])

	useUpdateEffect(() => {
		if (options.length > 0 && !initValueDone && initValue) {
			let getDataFromFetchedData = options.find(item => item[optionValue] == initValue)
			if (getDataFromFetchedData) {
				setvalue(getDataFromFetchedData)
			}
		}
	}, [options])

	if (process.env.NODE_ENV === 'development') {
		useEffect(() => {
			console.log('Component > ServerSideSelect: Fetch', data, fetchLoading, fetchErrorMessage,fetchErrorMessage)
			console.log('Component > ServerSideSelect: isLoading', loading)
		}, [data, fetchLoading, fetchErrorMessage,fetchErrorMessage])
	}

	useEffect(() => {
		if (!open || fetchLoading) {
			setOptions([]);
		}
	}, [open]);

	const handleOnChange = (event, newValue) => {
		if (process.env.NODE_ENV === 'development') {
			console.log('Components > ServerSideSelect: handleOnChange newValue', newValue)
		}
		if (typeof onChange === 'function') {
			try {
				onChange(event, newValue[optionValue], newValue)
				setvalue(newValue)
			} catch (error) {
				onChange(event, '', {})
				setvalue({})
			}
		}
	}

	const handleInputChange = (event) => settempSearchText(event.target.value)

	useDebounce(() => {
		setsearchText(tempSearchText)
	}, 1000, [tempSearchText])

	return (
		<Autocomplete
			className={className}
			fullWidth
			open={open}
			value={value}
			onChange={handleOnChange}
			onOpen={() => {
				setOpen(true);
			}}
			onClose={() => {
				setOpen(false);
			}}
			isOptionEqualToValue={(option, value) => option[optionValue] === value[optionValue] || value == ''}
			getOptionLabel={(option) => option[optionLabel] || ''}
			options={options}
			loading={loading}
			renderInput={(params) => (
				<TextField
					onChange={handleInputChange}
					{...params}
					label={label}
					required={required}
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<>
								{loading ? <CircularProgress color="inherit" size={20} /> : null}
								{params.InputProps.endAdornment}
							</>
						),
					}}
				/>
			)}
		/>
	);
}

ServerSideSelect.defaultProps = {
	url: '/student',
	optionValue: 'id',
	optionLabel: 'fullName',
	label: 'Siswa',
	required: false
}

ServerSideSelect.propTypes = {
	url: PropTypes.string.isRequired,
	optionValue: PropTypes.string.isRequired,
	optionLabel: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	className: PropTypes.string,
	onChange: PropTypes.func,
	required: PropTypes.bool
}

export default ServerSideSelect