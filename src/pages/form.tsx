import React from "react";
import { useForm, ValidationError } from "@formspree/react";

export default function form(): JSX.Element {
  const [state, handleSubmit] = useForm("contact");

  return (
    <div className="h-auto w-1/2 mt-10 mx-auto bg-white p-8 rounded-md">
      <h1 className="text-3xl font-bold mb-4">ご意見・ご要望など</h1>
      {state.succeeded ? (
        <p>ご協力ありがとうございます!</p>
      ) : (
        <form onSubmit={handleSubmit} className="mb-4 flex flex-col">
          <label htmlFor="email" className="font-bold mb-2">
            メールアドレス
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="appearance-none border border-gray-200 p-2 focus:outline-none focus:border-gray-500 rounded-md"
          />
          <div className="text-red-500">
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
          </div>
          <label htmlFor="message" className="font-bold mt-4 mb-2">
            メッセージ
          </label>
          <textarea
            id="message"
            name="message"
            className="appearance-none w-full border border-gray-200 p-2 h-40 focus:outline-none focus:border-gray-500 rounded-md"
          />
          <div className="text-red-500">
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
          </div>
          <button
            type="submit"
            disabled={state.submitting}
            className={`mt-6 px-6 py-2 text-xs font-medium leading-6 text-center text-white duration-200 bg-black rounded shadow hover:opacity-70 focus:outline-none w-auto ${
              state.submitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {state.submitting ? "送信中..." : "送信"}
          </button>
        </form>
      )}
    </div>
  );
}
