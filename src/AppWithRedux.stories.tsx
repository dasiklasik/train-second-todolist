import {AppWithRedux} from "./AppWithRedux";
import {ReduxStoreProviderDecorator} from "./stories/ReduxStoreProviderDecorator";

export default {
    title: 'App with Redux',
    component: AppWithRedux,
    decorators: [ReduxStoreProviderDecorator]
}

export const AppWithReduxExample = () => {
    return (
        <AppWithRedux/>
    )
}

AppWithReduxExample.stories = {
    name: 'AppWithReduxExample'
}