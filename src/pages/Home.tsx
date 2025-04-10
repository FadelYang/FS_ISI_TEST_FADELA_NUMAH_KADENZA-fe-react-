import { useEffect, useState } from "react";
import PageTitle from "./PageTitle";
import { Todo } from '../types/Todo';


const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);
  const [onGoingTodos, setOngoingTodos] = useState<Todo[]>([]);

  const getTodos = async(isCompeted: boolean) => {
    const url = `${import.meta.env.VITE_BACKEND_URL}/todos/?is_completed=${isCompeted}`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to get todo: ${response}`);
      }
      const json = await response.json();
      if (isCompeted) {
        setCompletedTodos(json);
      } else {
        setOngoingTodos(json)
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getTodos(true);
    getTodos(false);
    setIsLoading(false);
  }, []);

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col justify-center max-w-[580px] w-full px-4">
        <PageTitle />

        <div className="flex flex-col items-center mt-5 gap-3">
          <div className="flex flex-col justify-start w-full gap-2">
            <h2 className="text-base font-bold">Ongoing Task</h2>
            <div>
              {onGoingTodos.map((todo) => (
                <p>{todo.title}</p>
              ))}
            </div>
          </div>
          <div className="flex flex-col justify-start w-full gap-2">
            <h2 className="text-base font-bold">Complete Task</h2>
            <div>
              {completedTodos.map((todo) => (
                <p>{todo.title}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
