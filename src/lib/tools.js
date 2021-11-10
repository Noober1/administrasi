String.prototype.stringReplace = function(findArray, replaceArray){
    var i, regex = [], map = {}, str = this; 
    for( i=0; i<findArray.length; i++ ){ 
      regex.push( findArray[i].replace(/([-[\]{}()*+?.\\^$|#,])/g,'\\$1') );
      map[findArray[i]] = replaceArray[i]; 
    }
    regex = regex.join('|');
    str = str.replace( new RegExp( regex, 'g' ), function(matched){
      return map[matched];
    });
    return str;
}

/**
 * 
 * @param {string} date - Date
 * @param {string} format - Format pattern: d = date, m = month number, y = 2 digit year, M = month text, h = hour(s), i = minute(s), s = second(s)
 * @param {array} localization - Months localization array
 * @returns - Return formatted date
 */
const dateFormatting = (date, format, localization) => {

    if(typeof format !== 'string') {
        format = 'd M y'
    }

    try {
        const newDate = date ? new Date(date) : new Date()
        const addZero = number => number <= 9 ? '0'+9 : number;

        const date = newDate.getDate()
        const month = newDate.getMonth()
        const year = newDate.getFullYear()
        const hour = newDate.getHours()
        const minute = newDate.getMinutes()
        const second = newDate.getSeconds()
        const nama_bulan = Array.isArray(localization) ? localization : ['Januari','Februari','Maret','April','Mei','Juni','Juli','Agustus','September','Oktober','November','Desember']
        const find = ['d','m','y','M','h','i','s']
        
        const replace = [
            addZero(date),
            month,
            year,
            nama_bulan[month],
            addZero(hour),
            addZero(minute),
            addZero(second)]

        return format.stringReplace(find,replace)
    } catch (error) {
        console.log(error)
        return false
    }
}


const rupiahFormatting = (value) => {
    if (typeof value !== 'number') return false
    const format = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    })

    return format.format(value)
}

/**
 * String randomizer
 * @param {number} length - length of random string
 * @returns {string} - Returning random generated string with letter and number combination
 */
const randomString = (length) => {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
   return result;
}

export default { 
    dateFormatting,
    rupiahFormatting,
    randomString
}