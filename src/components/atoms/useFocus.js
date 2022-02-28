import { useRef } from "react"

const useFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => {
        if (typeof htmlElRef?.current?.focus == 'function') {
            htmlElRef.current.focus()
        }
    }

    return [ htmlElRef, setFocus ] 
}

export default useFocus