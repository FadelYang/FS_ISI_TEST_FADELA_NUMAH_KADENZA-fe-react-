import { useState } from "react";
import { Todo } from "../types/Todo";

const PageTitle = ({ props }: any) => {
  const { onGoingTodos, setOngoingTodos } = props;
  const [isLoading, setIsLoading] = useState(false);
  const [todoTitle, setTodoTitle] = useState("");

  const createTodo = async () => {
    const isConfirmed = confirm("Are you sure?");
    if (!isConfirmed) {
      return;
    }
    setIsLoading(true);
    const url = `${import.meta.env.VITE_BACKEND_URL}/todos`;
    const data: Todo = {
      title: todoTitle,
      is_completed: false,
      created_at: new Date().toISOString(),
    };
    setOngoingTodos([...onGoingTodos, data]);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to create new todo: ${response}`);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-5xl">Task Management</h1>
      <div>
        <form action="#" className="flex flex-col gap-5" onSubmit={createTodo}>
          <div className="flex flex-col">
            <label htmlFor="todoTitle" className="text-base text-[#0f0f0f]">
              title
            </label>
            <input
              type="text"
              id="todoTitle"
              className="border-[0.5px] border-black w-[580px] h-[47px] rounded-[10px] px-5"
              onChange={(e) => setTodoTitle(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-center">
            <button
              className="bg-[#6FCBFF] py-2 px-4 rounded-[10px] cursor-pointer hover:bg-[#8bbbdaca]"
              type="submit"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PageTitle;
