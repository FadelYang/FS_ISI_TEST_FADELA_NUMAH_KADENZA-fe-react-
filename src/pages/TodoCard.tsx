import { X, Check, Pencil } from "lucide-react";
import { Todo } from "../types/Todo";

const formatDateTime = (dateTime: Date) => {
  const date = new Date(dateTime);
  const formatted = date
    .toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(",", "");

  return formatted;
};

const TodoCard = ({ props }: any) => {
  const {
    id,
    title,
    created_at,
    is_completed,
    setOngoingTodos,
    onGoingTodos,
    completedTodos,
    setCompletedTodos,
    setIsNeedFetch,
    setTodoTitle,
    setIsUpdateButtonShow,
    setSelectedTodo,
  } = props;

  const deleteTodo = async (todoId: number, todoData: Todo) => {
    const isConfirmed = confirm("are you sure want to delete this todo?");

    if (!isConfirmed) return;
    
    if (todoId !== todoData.id) return;

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/todos/${todoData.id}`;

      const response = await fetch(url, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete todo ${response}`);
      }

      if (todoData.is_completed) {
        setCompletedTodos(
          completedTodos.filter((todo: Todo) => todo.id !== todoData.id)
        );
      } else {
        setOngoingTodos(onGoingTodos.filter((todo: Todo) => todo.id !== todoData.id));
      }
      alert("Success deleted todo");
    } catch (error) {
      console.error(error);
      alert("Something wrong, failed to delete todo");
    }
  };

  const changeTodoCompleteStatus = async (todoId: number, todoData: Todo) => {
    const isConfirmed = confirm("Are you sure?");    

    if (!isConfirmed) return;
    

    const updatedTodoData = {
      ...todoData,
      is_completed: !todoData.is_completed,
    };

    try {
      const url = `${import.meta.env.VITE_BACKEND_URL}/todos/${todoData.id}`;
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_completed: updatedTodoData.is_completed }),
      });

      if (!response.ok) {
        throw new Error("Failed to change todo status");
      }

      alert("Success changing todo status");

      setIsNeedFetch(true);
    } catch (error) {
      console.error("Error changing todo status:", error);
      alert("Something went wrong, failed to change todo status");
    }
  };

  return (
    <div className="flex justify-between bg-[#D0D0D0] rounded-[10px] pt-4 px-3 pb-3">
      <div className="flex flex-col gap-2">
        <div className="flex gap-1 items-center">
          <p>{title}</p>
          <div
            className="hover:cursor-pointer text-gray-500 hover:text-gray-700"
            onClick={() => {
              setTodoTitle(title);
              setIsUpdateButtonShow(true);
              setSelectedTodo({
                id,
                title,
                is_completed,
                created_at,
              });
            }}
          >
            <Pencil size={15} />
          </div>
        </div>
        <p>{formatDateTime(created_at)}</p>
      </div>
      <div className="flex items-center gap-1">
        <div
          className="border-2 border-black rounded-full hover:cursor-pointer"
          onClick={() =>
            deleteTodo(id, {
              id: id,
              title,
              is_completed,
              created_at,
            })
          }
        >
          <X size={15} />
        </div>
        <div
          className={`border-2 border-black rounded-full hover:cursor-pointer ${
            !is_completed ? "bg-white w-5 h-5" : "bg-[#D0D0D0]"
          }`}
          onClick={() =>
            changeTodoCompleteStatus(id, {
              id: id,
              title,
              is_completed,
              created_at,
            })
          }
        >
          {is_completed ? (
            <>
              <Check size={15} />
            </>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
