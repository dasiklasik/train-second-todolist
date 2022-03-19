import {Button, IconButton, TextField} from "@mui/material";
import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {AddBox} from "@mui/icons-material";

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
            <TextField value={value}
                       onChange={onChangeHandler}
                       onKeyPress={onEnterHandler}
                // className={error ? "error" : ""}
                       variant="standard"
                       error={!!error}
                       helperText={error}

            />
            <IconButton onClick={addItemHandler} color={'primary'}>
                <AddBox/>
            </IconButton>
        </div>
    )
}