import { v4 as uuidv4 } from 'uuid'

const mockData = [
    {
        id: uuidv4(),
        title: ' 📃 To do',
        addNewOption: true,
        tasks: [
            {
                id: uuidv4(),
                title: 'Learn JavaScript'
            },
            {
                id: uuidv4(),
                title: 'Learn Git'
            },
            {
                id: uuidv4(),
                title: 'Learn Python'
            },{
                id: uuidv4(),
                title: 'Add task',
                addNewOption: true
            }
        ]
    },
    {
        id: uuidv4(),
        title: 'Development',
        addNewOption: false,
        tasks: [
            {
                id: uuidv4(),
                title: 'Learn CSS'
            },
            {
                id: uuidv4(),
                title: 'Learn Golang'
            }
        ]
    },
    {
        id: uuidv4(),
        title: 'Testing',
        addNewOption: false,
        tasks: [
            {
                id: uuidv4(),
                title: 'Learn HTML'
            }
        ]
    },
    {
        id: uuidv4(),
        title: 'Done',
        addNewOption: false,
        tasks: [
            {
                id: uuidv4(),
                title: 'Done HTML'
            },
            {
                id: uuidv4(),
                title: 'Done CSS'
            }
        ]
    }
]

export default mockData