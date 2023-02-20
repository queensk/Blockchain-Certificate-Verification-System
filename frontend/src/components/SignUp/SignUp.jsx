import React from "react";
import TextInput from "../TextInput/TextInput";

export default function SignUpInput() {
  return (
    <form>
      <div>
        <h1>Sign Up</h1>
      </div>
      <TextInput
        label="first name"
        type="text"
        name="name"
        placeholder="First Name"
        value=""
        setValue=""
      />
      <TextInput
        label="Last name"
        type="text"
        name="name"
        placeholder="Last Name"
        value=""
        setValue=""
      />
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
      <button className="btn_login button-block">Sign Up</button>
    </form>
  );
}
