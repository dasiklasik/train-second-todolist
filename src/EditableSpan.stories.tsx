import {action} from "@storybook/addon-actions";
import { v1 } from "uuid";
import { Task } from "./Task";
import {EditableSpan} from "./EditableSpan";

export default {
    title: 'Editable Span',
    component: EditableSpan
}

export const EditableSpanExample = (props: any) => {
    return <>
        <EditableSpan title={'some title'} onChange={action('title changed')}/>
    </>
}