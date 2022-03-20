import React, { useState } from "react";
import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Modal } from "./components/Modal";
import styles from "./components/styles/App.module.css";
import { TaskForm } from "./components/TaskForm";
import { TaskList } from "./components/TaskList";
import { ITask } from "./interfaces/Task";

function App() {
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null);

  const deleteTask = (id: number) => {
    setTaskList(taskList.filter((task) => task.id !== id));
  };

  const toggleModal = (screen: boolean) => {
    const modal = document.querySelector("#modal");
    if (screen) {
      modal!.classList.remove("hide");
    } else {
      modal!.classList.add("hide");
    }
  };

  const editTask = (task: ITask): void => {
    toggleModal(true);
    setTaskToUpdate(task);
  };

  const updateTask = (id: number, title: string, desc: string) => {
    const updatedTask: ITask = { id, title, desc };

    const upadtedItems = taskList.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTaskList(upadtedItems);

    toggleModal(false);
  };
  return (
    <div>
      <Modal
        children={
          <TaskForm
            btnText="Editar tarefa"
            taskList={taskList}
            task={taskToUpdate}
            handleUpdate={updateTask}
          />
        }
      />
      <Header />
      <main className={styles.main}>
        <div>
          <h2>Suas tarefas:</h2>
          <TaskForm
            btnText="Criar Tarefa"
            taskList={taskList}
            setTaskList={setTaskList}
          />
        </div>
        <div>
          <h2>Suas tarefas</h2>
          <TaskList
            handleDelete={deleteTask}
            taskList={taskList}
            editTask={editTask}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
