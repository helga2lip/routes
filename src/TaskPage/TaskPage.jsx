import { useEffect, useState } from 'react';
import styles from './TaskPage.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../Button/Button';

export function TaskPage() {

  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [task, setTask] = useState();
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTask = () => {
      setIsLoading(true);
      fetch(`http://localhost:3005/todos/${params.id}`)
        .then((loadedData) => loadedData.json())
        .then((loadedTask) => {
          setTask(loadedTask);
        })
        .finally(() => setIsLoading(false));
    }

    fetchTask();
  }, []);



  const deleteToDo = (id) => {
    setIsDeleting(true);

    fetch(`http://localhost:3005/todos/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        goBack();
      })
      .finally(() => setIsDeleting(false));
  }

  const goBack = () => {
    navigate(-1)
  }

  const goToEdit = () => {
    navigate(`edit`)
  }

  return (
    <>
      {isLoading
        ? 'Loading...'
        : <> {task &&
          <div className={styles.task}>
            <div className={styles.buttons}>
              <Button onClick={goBack} className={styles.backButton}>Назад</Button>
              <Button onClick={goToEdit} className={styles.editButton}>Редактировать</Button>
              <Button onClick={() => deleteToDo(params.id)} disabled={isDeleting} className={styles.deleteButton}>Удалить</Button>
            </div>
            <div className={styles.taskTitle}>
              {task.title}
            </div>
          </div>
        }
        </>
      }
    </>
  )
}