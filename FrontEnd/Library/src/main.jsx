import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import store, { persistor } from './Redux/store';
import { PersistGate } from 'redux-persist/integration/react';
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Provider store={store}>
    
  <PersistGate loading={null} persistor={persistor}>

  <StrictMode>
    <App />
  </StrictMode>,
  </PersistGate>
  </Provider>
  </BrowserRouter>
)
