import { Outlet } from "react-router-dom";

import classses from './App.module.css';


function App() {

  return (
      <div className={classses.app}>
      <h1>Stats GitHub</h1>
      <Outlet />
    </div>
  )
}

export default App
