import { useSelector } from 'react-redux'
import { selectNoPersistConfig } from './redux/slices/noPersistConfigSlice'

function useProfile() {
    const { profile } = useSelector(selectNoPersistConfig)
    return profile
}

export default useProfile
