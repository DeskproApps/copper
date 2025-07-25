import { lightTheme } from "@deskpro/deskpro-ui";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import { ErrorFallback } from "./ErrorFallback";
import { CopperError } from "@/services/copper";


function renderErrorPage(error: unknown) {
  const props = {
    error: error,
    componentStack: "test stack",
    eventId: "test-id",
    resetError: () => { },
  };

  return render(
    <ThemeProvider theme={lightTheme}>
      <ErrorFallback {...props} />
    </ThemeProvider>
  )
}

const genericMessage = "An unknown error occurred."

describe("ErrorFallbackPage", () => {
  describe("Invalid Errors", () => {
    it("should render a generic message when non-errors are thrown", () => {
      renderErrorPage({})
      expect(screen.getByText(genericMessage)).toBeInTheDocument()
    })

    it("should render a generic message when a valid error is thrown with no message", () => {
      renderErrorPage(new Error())
      expect(screen.getByText(genericMessage)).toBeInTheDocument()
    })

    it("should render a generic message when a valid error is thrown with an empty message", () => {
      renderErrorPage(new Error("         "))
      expect(screen.getByText(genericMessage)).toBeInTheDocument()
    })
  })

  describe("Errors", () => {
    it("should accurately render valid error messages when they are thrown", () => {
      renderErrorPage(new Error("Testing Copper"))
      expect(screen.getByText("Testing Copper")).toBeInTheDocument()
    })
  })

  describe("Copper Errors", () => {
    it("should prioritise the error message if available", () => {
      renderErrorPage(new CopperError( { status: 400, data: { message: "I should be helpful" } }))
      expect(screen.getByText("I should be helpful")).toBeInTheDocument()
    })

    it("should fallback to the error message if the api message isn't a string", () => {
      renderErrorPage(new CopperError( { status: 0, data: { message: 5173 as unknown as string } }))
      expect(screen.getByText("Copper Api Error")).toBeInTheDocument()
    })

    it("should fallback to the error message if there is no api message", () => {
      renderErrorPage(new CopperError( { status: 0, data: {} }))
      expect(screen.getByText("Copper Api Error")).toBeInTheDocument()
    })
  })

})