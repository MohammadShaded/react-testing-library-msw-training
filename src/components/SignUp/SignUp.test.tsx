import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { setupServer } from "msw/node";
import SignUp from "./";
import { handlers } from "./handlers";
import { debug } from "jest-preview";
// Setting up the mock server
const server = setupServer(...handlers);

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("SignUp Component", () => {
  describe("Validation", () => {
    it("should display validation errors for invalid email", async () => {
      render(<SignUp />);
      // type an invalid email and blur the field to trigger validation
      await userEvent.type(screen.getByLabelText(/Email Address/i), "not-an-email");
      await userEvent.tab();

      expect(await screen.findByText(/Enter a valid email/i)).toBeInTheDocument();
    });

    it("should display validation errors for short password", async () => {
      render(<SignUp />);
      // type a short password and blur to trigger validation
      await userEvent.type(screen.getByLabelText(/Password/i), "123");
      await userEvent.tab();

      expect(
        await screen.findByText(/Password should be of minimum 8 characters length/i)
      ).toBeInTheDocument();
    });

    it("should display success message on successful sign-up", async () => {
      render(<SignUp />);
      // fill valid values and submit; default handler returns success
      await userEvent.type(screen.getByLabelText(/User Name/i), "alice");
      await userEvent.type(screen.getByLabelText(/Email Address/i), "alice@example.com");
      await userEvent.type(screen.getByLabelText(/Password/i), "password123");
      await userEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

      expect(await screen.findByText(/Sign Up Successfully!/i)).toBeInTheDocument();
    });

    it("should display error message on sign-up failure", async () => {
      // override handler to return 422 error using the project's msw http API
      const msw = require("msw");
      server.use(
        msw.http.post("https://api.realworld.io/api/users", () => {
          return msw.HttpResponse.json(
            { errors: { email: ["has already been taken"] } },
            { status: 422 }
          );
        })
      );

      render(<SignUp />);
      await userEvent.type(screen.getByLabelText(/User Name/i), "bob");
      await userEvent.type(screen.getByLabelText(/Email Address/i), "bob@example.com");
      await userEvent.type(screen.getByLabelText(/Password/i), "password123");
      await userEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

      expect(await screen.findByText(/Error Signing Up!/i)).toBeInTheDocument();
    });
  });

  describe("Form Interaction", () => {
    it("should enable Sign Up button when form is valid", async () => {
      render(<SignUp />);
      // initially disabled
      const signUpButton = screen.getByRole("button", { name: /Sign Up/i });
      expect(signUpButton).toBeDisabled();

      // fill valid values
      await userEvent.type(screen.getByLabelText(/User Name/i), "carol");
      await userEvent.type(screen.getByLabelText(/Email Address/i), "carol@example.com");
      await userEvent.type(screen.getByLabelText(/Password/i), "validpassword");

      await waitFor(() => expect(screen.getByRole("button", { name: /Sign Up/i })).toBeEnabled());
    });

    it("should disable Sign Up button when form is invalid", async () => {
      render(<SignUp />);
      // still disabled when fields are empty
      await waitFor(() => expect(screen.getByRole("button", { name: /Sign Up/i })).toBeDisabled());

      // fill username and password valid but email invalid -> form invalid
      await userEvent.type(screen.getByLabelText(/User Name/i), "frank");
      await userEvent.type(screen.getByLabelText(/Password/i), "validpassword");
      await userEvent.type(screen.getByLabelText(/Email Address/i), "not-an-email");
      await userEvent.tab();

      await waitFor(() => expect(screen.getByRole("button", { name: /Sign Up/i })).toBeDisabled());
    });

    it("should update form fields on user input", async () => {
      render(<SignUp />);
      const username = screen.getByLabelText(/User Name/i) as HTMLInputElement;
      const email = screen.getByLabelText(/Email Address/i) as HTMLInputElement;
      const password = screen.getByLabelText(/Password/i) as HTMLInputElement;

      await userEvent.type(username, "delta");
      await userEvent.type(email, "delta@example.com");
      await userEvent.type(password, "somepassword");

      expect(username.value).toBe("delta");
      expect(email.value).toBe("delta@example.com");
      expect(password.value).toBe("somepassword");
    });

    it("should redirect user to home page after successful signup", async () => {
      render(<SignUp />);
      // submit valid data and expect HomePage content (Features) to appear
      await userEvent.type(screen.getByLabelText(/User Name/i), "eve");
      await userEvent.type(screen.getByLabelText(/Email Address/i), "eve@example.com");
      await userEvent.type(screen.getByLabelText(/Password/i), "password123");
      await userEvent.click(screen.getByRole("button", { name: /Sign Up/i }));

      // wait for the success snackbar, then assert the SignUp heading is gone
      await screen.findByText(/Sign Up Successfully!/i);
      await waitFor(() => expect(screen.queryByRole("heading", { name: /Sign up/i })).not.toBeInTheDocument());
    });
  });
});
