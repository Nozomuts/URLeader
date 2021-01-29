import { useForm, ValidationError } from "@formspree/react";

export default function form() {
  const [state, handleSubmit] = useForm("contact");

  return (
    <div className="w-full max-w-2xl px-6 py-10 md:px-12 md:mt-10 mx-auto bg-white p-8 rounded-md">
      <h1 className="title pb-4">ご意見・ご要望など</h1>
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
            className="input"
            aria-label="メールアドレス"
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
            className="w-full h-40 input"
            aria-label="メッセージ"
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
            className={`button text-white bg-black mt-6 ${
              state.submitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
            aria-label="送信"
          >
            {state.submitting ? "送信中..." : "送信"}
          </button>
        </form>
      )}
    </div>
  );
}
