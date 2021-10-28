import { hideSpinner, selectNoPersistConfig } from '../../../lib/redux/slices/noPersistConfigSlice';
import { useDispatch, useSelector } from 'react-redux';
import { SpinnerBackdrop } from '../../atoms';
import { useEffect } from 'react';

const MainSpinner = () => {
    const config = useSelector(selectNoPersistConfig)
    const dispatch = useDispatch()
    const handleOnClick = () => {
        if(!config.spinner.hideOnClick) return
        dispatch(hideSpinner())
    }

    if (process.env.NODE_ENV == 'development') {
        useEffect(() => {
            console.log('Components > MainSpinner ',config)
        }, [config])
    }

    return (
        <SpinnerBackdrop
            open={config.spinner.showSpinner}
            onBackdropClick={handleOnClick}
        />
    )
}

export default MainSpinner
