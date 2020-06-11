/* -------------------------------- Unit test ------------------------------- */
/* const testList = [
    {
        id: 0,
        name: 'A',
    },
    {
        id: 1,
        name: 'B',
    },
    {
        id: 2,
        name: 'C',
    },
    {
        id: 3,
        name: 'D',
    },
    {
        id: 4,
        name: 'E',
    },
    {
        id: 5,
        name: 'F',
    },
]
moveObj(testList, 1, -1)*/

function moveItem(obj, source, dest) {
    if (source < dest) {
        const [before, center, after] = [obj.slice(0, source), obj.slice(source + 1, dest + 1), obj.slice(dest + 1)]
        return [...before, ...center, obj[source], ...after]
    }
    else {
        const [before, center, after] = [obj.slice(0, dest), obj.slice(dest, source), obj.slice(source + 1)]
        return [...before, obj[source], ...center, ...after]
    }
}

function insertItem(obj, index, item) {
    return obj.splice(index, 0, item)
}

function deleteItem(obj, index) {
    return obj.splice(index, 1)
}

export { moveItem, insertItem, deleteItem }