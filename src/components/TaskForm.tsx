import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { ITask } from "../interfaces/Task";
import styles from "./styles/TaskForm.module.css";

export interface ITaskFormProps {
  btnText: string;
  taskList: ITask[];
  setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
  task?: ITask | null;
  handleUpdate?(id: number, title: string, desc: string): void;
}

export function TaskForm({
  btnText,
  taskList,
  setTaskList,
  task,
  handleUpdate,
}: ITaskFormProps) {
  const [id, setId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [desc, setDesc] = useState<string>("");

  useEffect(() => {
    if (task) {
      setId(task.id);
      setTitle(task.title);
      setDesc(task.desc);
    }
  }, [task]);

  const handleAddTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!title || !desc) {
      alert("Por favor, preencha todos os campos");
      return;
    }

    if (handleUpdate) {
      handleUpdate(id, title, desc);
    } else {
      const id: number = Math.floor(Math.random() * 1000);
      const newTask: ITask = {
        id,
        title,
        desc,
      };

      setTaskList!([...taskList, newTask]);

      setTitle("");
      setDesc("");
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else {
      setDesc(e.target.value);
    }
  };

  return (
    <form onSubmit={handleAddTask} className={styles.form}>
      <div className={styles.input_container}>
        <label htmlFor="title">Titulo:</label>
        <input
          type="text"
          name="title"
          placeholder="Título da tarefa"
          value={title}
          autoComplete="off"
          onChange={handleInputChange}
        />
      </div>
      <div className={styles.input_container}>
        <label htmlFor="description">Descrição:</label>
        <input
          type="text"
          name="desc"
          placeholder="Descrição da tarefa"
          value={desc}
          autoComplete="off"
          onChange={handleInputChange}
        />
      </div>
      <input type="submit" value={btnText} />
    </form>
  );
}
