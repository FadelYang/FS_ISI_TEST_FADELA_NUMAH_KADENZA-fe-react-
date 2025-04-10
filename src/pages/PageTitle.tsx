const PageTitle = () => {
  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-5xl">Task Management</h1>
      <div>
        <form action="#" className="flex flex-col gap-5">
          <div className="flex flex-col">
            <label htmlFor="todoTitle" className="text-base text-[#0f0f0f]">
              title
            </label>
            <input
              type="text"
              id="todoTitle"
              className="border-[0.5px] border-black w-[580px] h-[47px] rounded-[10px] px-5"
            />
          </div>
          <div className="flex justify-center">
            <button className="bg-[#6FCBFF] py-2 px-4 rounded-[10px] cursor-pointer hover:bg-[#8bbbdaca]">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PageTitle;
