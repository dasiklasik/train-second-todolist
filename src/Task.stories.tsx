import {action} from "@storybook/addon-actions";
import { v1 } from "uuid";
import { Task } from "./Task";

export default {
    title: 'Task',
    component: Task
}

export const TaskExample = (props: any) => {
    return <>
        <Task
            task={{id: '1', title: 'task', isDone: false}}
            removeTask={action('remove task')}
            changeTaskTitle={action('change task title')}
            changeTaskStatus={action('change task status')}
            todolistsID={'1'}/>

        <Task
            task={{id: '2', title: 'task2', isDone: true}}
            removeTask={action('remove task')}
            changeTaskTitle={action('change task title')}
            changeTaskStatus={action('change task status')}
            todolistsID={'1'}/>
    </>
}