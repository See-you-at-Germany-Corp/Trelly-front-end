export const createOn = () => ({
    type: 'ON'
})

export const createOff = () => ({
    type: 'OFF'
})

export const setBackground = (background) => ({
    type: 'SET_BACKGROUND',
    background
}) 

export const setCurrent = (ref) => ({
    type: 'SET_REF',
    ref
}) 