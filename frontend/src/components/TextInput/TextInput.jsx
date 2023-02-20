import React from "react";

export default function TextInput({
  label,
  type,
  name,
  placeholder,
  value,
  setValue,
}) {
  return (
    <>
      <label htmlFor={`${label}`}>
        {/* {`${label}`} */}
        <br />
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          required
          onChange={(e) => setValue(e.target.value)}
        />
      </label>
      <br />
    </>
  );
}
