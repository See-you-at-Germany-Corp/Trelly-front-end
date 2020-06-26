export const createOn = () => ({
    type: 'ON'
})

export const createOff = () => ({
    type: 'OFF'
})

export const setBackground = (color_code) => ({
    type: 'SET_BACKGROUND',
    color_code
}) 
 
export const setName = (name) => ({
    type: 'SET_NAME',
    name
}) 