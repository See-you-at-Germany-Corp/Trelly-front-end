export const createOn = () => ({
    type: 'ON'
})

export const createOff = () => ({
    type: 'OFF'
})

export const setBackground = (picture) => ({
    type: 'SET_BACKGROUND',
    picture
}) 
 
export const setName = (name) => ({
    type: 'SET_NAME',
    name
}) 