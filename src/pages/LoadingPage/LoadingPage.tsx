import { LoadingSpinner } from "@deskpro/app-sdk";
import { useSetTitle } from "../../hooks";
import { useLoadingApp } from "./hooks";
import type { FC } from "react";

const LoadingPage: FC = () => {
  useSetTitle();

  useLoadingApp();

  return (
    <LoadingSpinner/>
  );
};

export { LoadingPage };
