import { useState } from "react";
import { Todo } from "../types/Todo";

const PageTitle = ({ props }: any) => {
  const {
    onGoingTodos,
    setOngoingTodos,
    todoTitle,
    setTodoTitle,
    isUpdateButtonShow,
    setIsUpdateButtonShow,
    selectedTodo,
    setIsNeedFetch,
  } = props;
  const [isLoading, setIsLoading] = useState(false);

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

      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const updateTodo = async () => {
    const isConfirmed = confirm("Are you sure?");
    if (!isConfirmed) {
      return;
    }
    console.log({ selectedTodo });

    const todoId = Number(selectedTodo.id);
    const url = `${import.meta.env.VITE_BACKEND_URL}/todos/${todoId}`;
    const data: Todo = {
      ...selectedTodo,
      title: todoTitle,
    };
    try {
      setIsLoading(true);
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to update a todo: ${response}`);
      }

      setIsLoading(false);
      setIsUpdateButtonShow(false);
      setIsNeedFetch(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-5xl">Task Management</h1>
      <div>
        <form
          action="#"
          className="flex flex-col gap-5"
          onSubmit={isUpdateButtonShow ? updateTodo : createTodo}
        >
          <div className="flex flex-col">
            <label htmlFor="todoTitle" className="text-base text-[#0f0f0f]">
              title
            </label>
            <input
              type="text"
              id="todoTitle"
              value={todoTitle}
              className="border-[0.5px] border-black w-[580px] h-[47px] rounded-[10px] px-5"
              onChange={(e) => setTodoTitle(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-center gap-2">
            {isUpdateButtonShow ? (
              <>
                <div>
                  <button
                    className="bg-[#FFB46F] py-2 px-4 rounded-[10px] cursor-pointer hover:bg-[#c9a17b]"
                    type="submit"
                  >
                    Update Task
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    className="bg-[#FF6F6F] py-2 px-4 rounded-[10px] cursor-pointer hover:bg-[#885959]"
                    onClick={(e) => {
                      setIsUpdateButtonShow(false);
                      setTodoTitle("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <div>
                  <button
                    className="bg-[#6FCBFF] py-2 px-4 rounded-[10px] cursor-pointer hover:bg-[#8bbbdaca]"
                    type="submit"
                  >
                    Add Task
                  </button>
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default PageTitle;
