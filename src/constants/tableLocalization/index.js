import tableId from "./id"
import tableEn from "./en"

const tableLocalization = (type = 'ID') => type === 'ID' ? tableId : tableEn

export default tableLocalization