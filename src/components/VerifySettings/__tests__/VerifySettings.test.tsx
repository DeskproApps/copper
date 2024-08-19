import { cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { render, mockUserContext } from "@deskpro/app-testing-utils";
import { mockAccount, mockAuthError } from "@/testing";
import { VerifySettings } from "../VerifySettings";
import type { Props } from "../VerifySettings";

const renderVerifySettings = (props?: Partial<Props>) => render((
  <VerifySettings
    isLoading={props?.isLoading || false}
    settings={props?.settings || mockUserContext.settings}
    error={props?.error || null}
    account={props?.account || null}
    onVerifySettings={props?.onVerifySettings || jest.fn()}
  />
), { wrappers: { theme: true } });

describe("VerifySettings", () => {
  afterEach(() => {
    jest.clearAllMocks();
    cleanup();
  });

  test("render", async () => {
    const { findByRole } = renderVerifySettings();
    expect(await findByRole("button", { name: /Verify Settings/i })).toBeInTheDocument();
  });

  test("should show the verified message", async () => {
    const { findByText } = renderVerifySettings({
      account: mockAccount as never,
    });

    expect(await findByText(/Verified as <Kyivan Rus>/i)).toBeInTheDocument();
  });

  test("should show the failed message", async () => {
    const { findByText } = renderVerifySettings({
      error: mockAuthError.error,
    });
    expect(await findByText(/authentication error/i)).toBeInTheDocument();
  });

  test("should trigger onVerifySettings", async () => {
    const onVerifySettings = jest.fn();
    const { findByRole } = renderVerifySettings({ onVerifySettings });
    const verifyButton = await findByRole("button", { name: /Verify Settings/i });

    await userEvent.click(verifyButton as Element);

    expect(onVerifySettings).toHaveBeenCalledTimes(1);
  });
});
