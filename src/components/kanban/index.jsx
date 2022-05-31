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
    const [showFilter, setToogleFilter] = useState(false)

    const [filterData, setFilterData] = useState('')
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
        if(task === '') return ;
        const newData = data
        newData.map((d) => {
            if (d.id === id) {
                let tasks = [{ id: uuidv4(), title: task }, ...d.tasks]
                d.tasks = tasks
            }
            return true;
        })

        setData([...newData])
        setTask('')
        toggleNewTask(false)
    }

    const handleFilterOptions = val => {
          if(val === false){
            setFilterData('')
          }
          setToogleFilter(val)
    }
    return (
        <div className="container">
            <div className='left-container'>
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
                                                                // NOTE: filter is active
                                                                if (task.title.toLowerCase().includes(filterData) === false) return false;
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
                                                                    ? <div className="add_new_task" onClick={() => toggleNewTask(true)} key={task.id}> {task.title} </div>
                                                                    : <div className='inputContainer_add_new_task' key={task.id}>
                                                                        <span> Add New Task </span><br />
                                                                        <input type="text" placeholder='Add Your task...' onChange={(e) => setTask(e.target.value.toLowerCase().trim())} />
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
            </div>
            <div className='right-container'>
                <div className="kaban_board_options">
                    <div className='kaban_board_filter' onClick={() => setToogleFilter(!showFilter)}>
                        Filter
                    </div>
                    <div>Show Menu</div>
                </div>
                {
                    showFilter &&
                    <div className='kaban_filter'>
                        <div className='filter_title'> <span>Filter</span>
                            <i class="fa fa-times" aria-hidden="true" onClick={() => handleFilterOptions(false)}></i></div><br />
                        <div className='keyword'>Keyboard</div>
                        <input type="text" placeholder="Enter a keyword" onChange={(e) => setFilterData(e.target.value)} /><br />
                        <span className="input_info">Search card, member, labels, and more...</span>
                        <div>
                            Comming Soon...
                        </div>
                    </div>
                }



            </div>
        </div>

    )
}

export default Kanban