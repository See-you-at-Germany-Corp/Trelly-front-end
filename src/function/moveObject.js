const testList = [
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

moveObj(testList, 1, -1)

export default function moveObj(obj, source = 1, dest = 4) {

    if (source < dest) {
        const [before, center, after] = [obj.slice(0, source), obj.slice(source + 1, dest + 1), obj.slice(dest + 1)]
        console.log([...before, ...center, obj[source], ...after]);
    }
    else {
        const [before, center, after] = [obj.slice(0, dest), obj.slice(dest, source), obj.slice(source + 1)]
        console.log([...before, obj[source], ...center, ...after]);
    }
}