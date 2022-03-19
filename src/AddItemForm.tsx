import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (title: string) => void

}
export const AddItemForm = ({
                                addItem,
                                ...props
                            }: AddItemFormPropsType) => {

    const [value, setValue] = useState<string>('')
    const [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
        setError(null)
    }

    const addItemHandler = () => {
        let taskTitle = value.trim()
        if (taskTitle !== '') {
            addItem(taskTitle)
            setValue('')
        } else {
            setError('Title is required!')
        }
    }

    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {

        if (e.key === "Enter") {
            let taskTitle = value.trim()
            if (taskTitle !== '') {
                addItem(taskTitle)
                setValue('')
            } else {
                setError('Title is required!')
            }
        }
    }

    return (
        <div>
            <input className={error ? 'errorBorder' : ''} value={value} onChange={onChangeHandler}
                   onKeyPress={onEnterHandler}/>
            <button onClick={addItemHandler}>+</button>
            {error ? <div className={'error'}>{error}</div> : <></>}
        </div>
    )
}