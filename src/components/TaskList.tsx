import React from "react";
import { ITask } from "../interfaces/Task";
import styles from "./styles/TaskList.module.css";

export interface ITaskList {
  taskList: ITask[];
  handleDelete(id: number): void;
  editTask(task: ITask): void;
}

export function TaskList({ taskList, handleDelete, editTask }: ITaskList) {
  return (
    <>
      {taskList.length == 0 ? (
        <p>Nenhuma tarefa registrada</p>
      ) : (
        <ul>
          {taskList.map((task) => (
            <li key={task.id} className={styles.task}>
              <div className={styles.details}>
                <h4> {task.title} </h4>
                <p> {task.desc} </p>
              </div>
              <div className={styles.actions}>
                <i
                  className="bi bi-pencil"
                  onClick={() => {
                    editTask(task);
                  }}
                ></i>
                <i
                  className="bi bi-trash"
                  onClick={() => {
                    handleDelete(task.id);
                  }}
                ></i>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
