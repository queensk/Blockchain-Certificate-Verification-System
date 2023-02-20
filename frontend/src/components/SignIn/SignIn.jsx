import React from "react";
import TextInput from "../TextInput/TextInput";

export default function SignIn() {
  return (
    <form>
      <div>
        <h1>Sign In</h1>
      </div>
      <TextInput
        label="email"
        type="email"
        name="email"
        placeholder="email"
        value=""
        setValue=""
      />
      <TextInput
        label="password"
        type="password"
        name="password"
        placeholder="********"
        value=""
        setValue=""
      />
      <button className="btn_login button-block">Sign In</button>
    </form>
  );
}
