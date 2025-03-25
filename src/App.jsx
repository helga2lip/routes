import styles from './App.module.css'
import { EditPage } from './EditPage/EditPage';
import { MainPage } from './MainPage'
import { NotFoundPage } from './NotFoundPage';
import { TaskPage } from './TaskPage/TaskPage'
import { Routes, Route } from 'react-router-dom';

export function App() {
  return (
    <div className={styles.app}>
      <div className={styles.appContainer}>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/task/:id" element={<TaskPage />} />
          <Route path="/task/:id/:edit?" element={<EditPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
    </div>
  )
}