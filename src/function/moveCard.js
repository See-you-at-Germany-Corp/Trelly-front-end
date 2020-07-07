function findItem(obj, id, type) {
    return obj.findIndex(element => (
        element.id === parseInt(id.split(type)[1])
    ));
}

function moveItem(obj, source, dest) {
    const shift = dest - source

    if (shift > 0) {
        for (let i = source + 1; i <= dest; i++) {
            obj[i].order_number -= 1
        }
    }
    else {
        for (let i = dest; i < source; i++) {
            obj[i].order_number += 1
        }
    }
    obj[source].order_number += shift
    return obj
}

function insertItem(obj, index, item) {
    return obj.splice(index, 0, item)
}

function deleteItem(obj, index) {
    return obj.splice(index, 1)
}

export { moveItem, insertItem, deleteItem, findItem }