import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BoardContextProvider } from './contexts/BoardContext.tsx'
import { GameContextProvider } from './contexts/GameContext.tsx'

const app = (
  <React.StrictMode>
    <GameContextProvider>
      <BoardContextProvider>
          <App />
      </BoardContextProvider>
    </GameContextProvider>
  </React.StrictMode>
)

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(app)
