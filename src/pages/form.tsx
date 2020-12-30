import React from "react";
import { useForm, ValidationError } from "@formspree/react";

export default function form(): JSX.Element {
  const [state, handleSubmit] = useForm("contact");

  return (
    <>
      <div className="pt-28"></div>
      <div className=" h-auto w-2/3 my-10 mx-auto bg-white">
        {state.succeeded ? (
          <p>ご協力ありがとうございます!</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email Address</label>
            <input id="email" type="email" name="email" />
            <ValidationError
              prefix="Email"
              field="email"
              errors={state.errors}
            />
            <textarea id="message" name="message" />
            <ValidationError
              prefix="Message"
              field="message"
              errors={state.errors}
            />
            <button type="submit" disabled={state.submitting}>
              Submit
            </button>
          </form>
        )}
      </div>
    </>
  );
}
