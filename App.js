import React, {Component} from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import configureStore from './src/store/configureStore';

class App extends Component {
    render = () => {
        return (
            <Provider store={configureStore.store}>
                <PersistGate
                    loading={null}
                    persistor={configureStore.persistor}>
                    <AppNavigator />
                </PersistGate>
            </Provider>
        );
    };
}

export default App;
