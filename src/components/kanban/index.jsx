import './kanban.scss'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import mockData from '../../mockData'
import { useState } from 'react'
import Card from '../card'
import { v4 as uuidv4 } from 'uuid'

const Kanban = () => {
    const [data, setData] = useState(mockData)
    const [openNewTask, toggleNewTask] = useState(false)
    const [newTask, setTask] = useState('')
    const onDragEnd = result => {
        if (!result.destination) return
        const { source, destination } = result

        if (source.droppableId !== destination.droppableId) {
            const sourceColIndex = data.findIndex(e => e.id === source.droppableId)
            const destinationColIndex = data.findIndex(e => e.id === destination.droppableId)

            const sourceCol = data[sourceColIndex]
            const destinationCol = data[destinationColIndex]

            const sourceTask = [...sourceCol.tasks]
            const destinationTask = [...destinationCol.tasks]

            const [removed] = sourceTask.splice(source.index, 1)
            destinationTask.splice(destination.index, 0, removed)

            data[sourceColIndex].tasks = sourceTask
            data[destinationColIndex].tasks = destinationTask

            setData(data)
        }
    }

    const addNewTask = (id, task) => {
        const newData = data
        newData.map((d) => {
            if(d.id === id){
                let tasks = [{id: uuidv4(), title: task}, ...d.tasks]
                d.tasks = tasks
            }
            return true;
        })

        setData([...newData])
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <div className="kanban">
                {
                    data.map(section => (
                        <>
                            <Droppable
                                key={section.id}
                                droppableId={section.id}
                            >
                                {(provided) => (
                                    <div
                                        {...provided.droppableProps}
                                        className='kanban__section'
                                        ref={provided.innerRef}
                                    >
                                        <div className="kanban__section__title">
                                            {section.title}
                                        </div>
                                        <div className="kanban__section__content">
                                            {
                                                section.tasks.map((task, index) => {
                                                    if (!task.addNewOption) {
                                                        return <Draggable
                                                            key={task.id}
                                                            draggableId={task.id}
                                                            index={index}
                                                        >
                                                            {(provided, snapshot) => (
                                                                <div
                                                                    ref={provided.innerRef}
                                                                    {...provided.draggableProps}
                                                                    {...provided.dragHandleProps}
                                                                    style={{
                                                                        ...provided.draggableProps.style,
                                                                        opacity: snapshot.isDragging ? '0.5' : '1'
                                                                    }}
                                                                >
                                                                    <Card>
                                                                        {task.title}
                                                                    </Card>
                                                                </div>
                                                            )}
                                                        </Draggable>
                                                    } else {
                                                        return (!openNewTask) 
                                                        ? <div className="add_new_task" onClick={() => toggleNewTask(true)}> {task.title} </div>
                                                        : <div className='inputContainer_add_new_task'>
                                                            <span> Add New Task </span><br />
                                                            <input type="text" placeholder='Add Your task...' onChange={(e) => setTask(e.target.value)}/>
                                                            <div className="btn_container">
                                                              <div onClick={() => addNewTask(section.id, newTask)}> Add </div>
                                                              <div onClick={() => toggleNewTask(false)}> Close </div>
                                                            </div>
                                                        </div>
                                                    }

                                                })
                                            }
                                            {provided.placeholder}
                                        </div>
                                    </div>
                                )}
                            </Droppable>
                        </>
                    ))
                }
            </div>
        </DragDropContext>
    )
}

export default Kanban