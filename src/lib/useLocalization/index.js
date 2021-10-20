import { useSelector } from 'react-redux'
import { localization } from '../../constants'
import { selectConfig } from '../redux/slices/configSlice'

function useLocalization() {
    const { language } = useSelector(selectConfig)
    const strings = localization(language || 'id')
    return strings
}

export default useLocalization
