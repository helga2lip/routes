import { ToDoList } from './ToDoList/ToDoList'
import styles from './App.module.css'
import { useEffect, useState } from 'react';
import { Button } from './Button/Button';

export function MainPage() {
  const [todos, setTodos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [addText, setAddText] = useState('');
  const [filterText, setFilterText] = useState('');
  const [filterKey, setFilterKey] = useState('');
  const [isCreating, setIsCreating] = useState(false);
  const [isSorted, setIsSorted] = useState(false);

  const fetchTodos = (isSorted = false) => {
    setIsLoading(true);
    fetch(`http://localhost:3005/todos${isSorted ? '?_sort=title' : ''}`)
      .then((loadedData) => loadedData.json())
      .then((loadedToDos) => {
        setTodos(loadedToDos);
      })
      .finally(() => setIsLoading(false));
  }

  useEffect(() => {
    fetchTodos();
  }, []);

  const addToDo = () => {
    setIsCreating(true);
    fetch('http://localhost:3005/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify({
        id: Date.now(),
        title: addText,
      }),
    })
      .then((response) => {
        return response.json();
      })
      .then((todo) => {
        setTodos([...todos, todo])
        setAddText('')
      }

      )
      .finally(() => setIsCreating(false));
  }

  const sortToDo = () => {
    setIsSorted(!isSorted)
    fetchTodos(!isSorted)
  }

  const filterTodo = () => {
    setFilterKey(filterText)
  }

  const onAddInputChange = (event) => {
    setAddText(event.target.value);
  }

  const filteredTodos = todos.filter((todo) => {
    return todo.title.toLowerCase().includes(filterKey.toLowerCase())
  })

  return (
    <div>
      <header className={styles.header}>
        <input className={styles.addInput} type="text" onChange={onAddInputChange} value={addText} placeholder='Добавьте задачу' />
        <Button onClick={addToDo} disabled={isCreating} className={styles.addButton}>Добавить</Button>
      </header>
      {isLoading
        ? <div className='loader'>Loading...</div>
        : <ToDoList todos={filteredTodos}
          onSortToDo={sortToDo}
          onFilterToDo={filterTodo}
          isSorted={isSorted}
          filterText={filterText}
          setFilterText={setFilterText} />
      }
    </div>
  )
}
