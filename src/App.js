import React from 'react';
import './App.css';
import { Provider } from 'react-redux'
import DashboardContainer from './components/DashboardContainer'
import { createStore } from 'redux'
import { rootReducer } from './reducers'
import 'bootstrap/dist/css/bootstrap.min.css'

const store = createStore(rootReducer)

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <DashboardContainer/>
      </Provider>
    </div>
  )
}

export default App
