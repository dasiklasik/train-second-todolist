import {AddItemForm} from "./AddItemForm";
import {action} from "@storybook/addon-actions";

export default {
    title: 'AddItemForm',
    component: AddItemForm
}

export const AddItemFormBaseExample = (props: any) => {
    return <AddItemForm addItem={action('clicked')}/>
}