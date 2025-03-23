import { Button } from '../../Button/Button'
import styles from './ToDo.module.css'
import { Link } from 'react-router-dom';

export function ToDo(props) {

  return <li className={styles.listItem}>
    <div className={styles.todoText}>
      <Link to={`/task/${props.todo.id}`}>{props.todo.title}</Link>
    </div>
  </li>
}