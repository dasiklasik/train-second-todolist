import React, {useState, KeyboardEvent, ChangeEvent} from "react";

type SuperTitlePropsType = {
    title: string
    todolistId: string
    taskId?: string
    changeTitle: (todolistId: string, title: string, taskId?: string) => void
}

export const SuperTitle = ({
                        title,
                        changeTitle,
                        todolistId,
                        taskId,
                        ...props
                    }: SuperTitlePropsType) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [value, setValue] = useState<string>(title)

    const onDoubleClickHandler = () => {
        setEditMode(true)
    }

    const onBlurHandler = () => {
        setEditMode(false)
    }

    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (taskId) {
                changeTitle(todolistId, value, taskId)
            } else {
                changeTitle(todolistId, value)
            }
            setEditMode(false)
        }
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    return (
        <>
            {!editMode ? <span onDoubleClick={onDoubleClickHandler}>{value}</span> :
                <input
                    value={value}
                    onBlur={onBlurHandler}
                    onChange={onChangeHandler}
                    onKeyPress={onEnterHandler}/>}
        </>
    )
}