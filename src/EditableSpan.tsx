import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    changeTitle: (title: string) => void
}
export const EditableSpan = ({
                                 title,
                                 changeTitle,
                                 ...props
                             }: EditableSpanPropsType) => {
    const [editMode, setEditMode] = useState(false)
    const [value, setValue] = useState(title)


    const changeInputValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const changeModeOnHandler = () => {
        setEditMode(true)
    }

    const changeModeOffHandler = () => {
        setEditMode(false)
        changeTitle(value)
    }

    const onEnterHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setEditMode(false)
            changeTitle(value)
        }
    }

    return (
        <>
            {editMode ? <TextField
                    variant="standard"
                    value={value}
                    onChange={changeInputValueHandler}
                    onBlur={changeModeOffHandler}
                    onKeyPress={onEnterHandler} autoFocus/>
                : <span onDoubleClick={changeModeOnHandler}>{title}</span>}
        </>
    )
}