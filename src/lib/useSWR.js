import fetchAPI from './fetchApi'
import swr from 'swr'

const useSWR = (url,token) => {
    const fetcher = link => fetchAPI({
        url: link,
        headers:{
            "Authorization" : `Bearer ${token}`
        }
    })
    .then(res => res)
    return swr(url, fetcher)
}

export default useSWR