import { useEffect, useState } from "react";
import PageTitle from "./PageTitle";
import { Todo } from "../types/Todo";
import TodoCard from "./TodoCard";

const Home = () => {
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [onGoingTodos, setOngoingTodos] = useState<Todo[]>([]);

  const getTodos = async (isCompeted: boolean) => {
    const url = `${
      import.meta.env.VITE_BACKEND_URL
    }/todos/?is_completed=${isCompeted}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to get todo: ${response}`);
      }
      const json = await response.json();
      if (isCompeted) {
        setCompletedTodos(json);
      } else {
        setOngoingTodos(json);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getTodos(true);
    getTodos(false);
  }, []);

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col justify-center max-w-[580px] w-full px-4">
        <PageTitle props={{ onGoingTodos, setOngoingTodos }} />

        <div className="flex flex-col items-center mt-5 gap-3">
          <div className="flex flex-col justify-start w-full gap-2">
            <h2 className="text-base font-bold">Ongoing Task</h2>
            <div className='flex flex-col gap-2'>
              {onGoingTodos.map((todo) => (
                <TodoCard
                  props={{
                    id: todo.id,
                    title: todo.title,
                    created_at: todo.created_at,
                    is_complete: todo.is_completed,
                    setOngoingTodos,
                    onGoingTodos,
                    completedTodos,
                    setCompletedTodos
                  }}
                />
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-start w-full gap-2">
            <h2 className="text-base font-bold">Complete Task</h2>
            <div className='flex flex-col gap-2'>
              {completedTodos.map((todo) => (
                <TodoCard
                  props={{
                    id: todo.id,
                    title: todo.title,
                    created_at: todo.created_at,
                    is_completed: todo.is_completed,
                    setOngoingTodos,
                    onGoingTodos,
                    completedTodos,
                    setCompletedTodos
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
