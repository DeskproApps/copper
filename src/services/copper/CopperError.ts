import type { CopperAPIError } from "./types";

export type InitData = {
  status: number,
  data: CopperAPIError,
};

class CopperError extends Error {
  status: number;
  data: CopperAPIError;

  constructor({ status, data }: InitData) {
    const message = "Copper Api Error";
    super(message);

    this.data = data;
    this.status = status;
  }
}

export { CopperError };
