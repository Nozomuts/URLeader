import React from "react";

export const AddForm = (): JSX.Element => {
  return (
    <form className="flex flex-col mb-6 max-w-2xl">
      <label
        htmlFor="label"
        className="border border-gray-200 rounded-md flex-col flex p-2 focus-within:border-gray-500 mb-6"
      >
        <input
          type="text"
          id="label"
          className="p-2 focus:outline-none h-10"
          placeholder="URLを入力"
        />
        <div>
          <input
            type="datetime-local"
            className="border border-gray-200 m-2 p-2 focus:outline-none focus:bg-gray-100 focus:border-gray-500 rounded-md h-10 w-60 cursor-pointer"
          />
          <input
            type="text"
            className="border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-md h-10 mr-3"
            placeholder="メモ"
          />
        </div>
      </label>
      <button
        className={`px-6 py-2 text-xs font-medium leading-6 text-center text-white duration-200 bg-black rounded shadow hover:opacity-70 focus:outline-none w-auto`}
        type="submit"
      >
        追加
      </button>
    </form>
  );
};
