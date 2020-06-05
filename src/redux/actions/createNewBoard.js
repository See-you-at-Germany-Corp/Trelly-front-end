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

export const setName = (name) => ({
    type: 'SET_NAME',
    name
}) 