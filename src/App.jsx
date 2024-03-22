import {useState} from 'react'

function FormAdd(){
    const [actionList, setActionList] = useState(() => {
        const storedActionList = localStorage.getItem('actionList')
        const parsedActionList = JSON.parse(storedActionList)
        return parsedActionList !== null ? parsedActionList : []
    })
    const [value, setValue] = useState('')

    const handleAdd = (event) => {
        event.preventDefault()

        if(value === ""){
            return
        }

        const copyActionList = [...actionList, value]

        setActionList(copyActionList)
        localStorage.setItem('actionList', JSON.stringify(copyActionList))
        setValue('')
    }

    const handleDelete = ({index}) => {
        const copyActionList = actionList.filter((_, arrayIndex) => arrayIndex !== index)

        setActionList(copyActionList)
        localStorage.setItem('actionList', JSON.stringify(copyActionList))
    }


    return (<>
        <form onSubmit={handleAdd}>
            <label>
                Action: <input value={value} onChange={(event) => {setValue(event.target.value)}} />
            </label>
            <button type="submit">Add</button>
        </form>
        <div>
            {actionList.map((action, index) => {
                return <li key={index}>{action} <button onClick={() => {handleDelete({index})}}>X</button></li>
            })}
        </div>
    </>)
}



function App() {
    return (<>
        <FormAdd />
    </>)
}

export default App
