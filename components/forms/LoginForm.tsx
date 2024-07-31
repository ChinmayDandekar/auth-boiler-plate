"use client";

import { LoginFormErrorTypes, LoginFormTypes } from "@/lib/types/forms";
import { useState } from "react";

type InputType = {
  name: string;
  label: string;
  type: string;
};
const inputs: InputType[] = [
  {
    name: "email",
    label: "Email",
    type: "email",
  },
  {
    name: "password",
    label: "Password",
    type: "password",
  },
];

const isValidEmail = (email: string) => {
  // Define the regular expression pattern for a valid email address
  const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // Test the input email against the pattern
  return pattern.test(email);
};
const isValidPassword = (password: string): string | null => {
  if (password.length <= 6) return "Password should be more than 6 characters";
  return null;
};

const LoginForm = () => {
  const [formValues, setFormValues] = useState<LoginFormTypes>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<
    Record<keyof LoginFormTypes, string | null>
  >({
    email: "",
    password: "",
  });

  const validateForm = () => {
    const errors: LoginFormErrorTypes = {
      email: isValidEmail(formValues.email) ? null : "Enter Valid Email",
      password: isValidPassword(formValues.password),
    };
    setErrors(errors);
    const hasErrors = Object.values(errors).some((error) => error !== null);
    return !hasErrors;
  };

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    // Validate Form here
    const isFormValid = validateForm();
    console.log(isFormValid);
    if (!isFormValid) return;

    // Run Fetch Requst to Backend Here
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify(formValues),
      });
    } catch (error) {
      console.log("Error while Fetching\n", error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newFormValues = { ...formValues, [name]: value };
    console.log(newFormValues);
    setFormValues(newFormValues);
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)} action="post">
      {inputs.map((input: InputType, index) => (
        <div key={index} className="flex flex-col ">
          <label htmlFor="email">{input.label}</label>
          <input
            name={input.name}
            onChange={(e) => handleChange(e)}
            type={input.type}
            className="border border-solid border-black p-2"
          />
          <p>{errors[input.name as keyof LoginFormTypes]}</p>
        </div>
      ))}
      <button type="submit" className="bg-gray-500 active:bg-gray-600 p-2">
        Submit
      </button>
    </form>
  );
};

export default LoginForm;
