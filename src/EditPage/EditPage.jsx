import { useEffect, useState } from 'react';
import styles from './EditPage.module.css'
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '../Button/Button';

export function EditPage() {

  const [task, setTask] = useState();
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputText, setInputText] = useState('');

  const params = useParams();
  const navigate = useNavigate();

  const fetchTask = () => {
    setIsLoading(true);
    fetch(`http://localhost:3005/todos/${params.id}`)
      .then((loadedData) => loadedData.json())
      .then((loadedTask) => {
        setTask(loadedTask);
        setInputText(loadedTask.title);
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    fetchTask();
  }, []);

  const editToDo = (id) => {

    if (!inputText) {
      return
    }

    fetch(`http://localhost:3005/todos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        id: id,
        title: inputText,
      }),
    })
      .then(() => {
        goBack();
      })
      .finally(() => setIsUpdating(false));
  }

  const onChangeInput = (event) => {
    setInputText(event.target.value);
  }

  const goBack = () => {
    navigate(-1)
  }

  return <>
    {isLoading
      ? 'Loading...'
      : <> {task && <div className={styles.editTask}>
        <div className={styles.editBlock}>
          <input className={styles.editInput} onChange={onChangeInput} type="text" placeholder='Введите задачу' value={inputText} />
          <Button onClick={() => editToDo(params.id)} disabled={isUpdating} className={styles.editButton}>Сохранить</Button>
          <Button onClick={goBack} className={styles.deleteButton}>Отмена</Button>
        </div>
      </div>
      }
      </>
    }
  </>
}