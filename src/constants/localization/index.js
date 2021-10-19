import id from './id'
import en from './en'

const localization = (language = 'id') => {
    const availableLanguage = ['en','id']
    const indonesian = id()
    const english = en()
    const local = {
        ...indonesian,
        ...english
    }
    return language == 'id' ? indonesian : language == 'en' ? local : indonesian
}

export default localization