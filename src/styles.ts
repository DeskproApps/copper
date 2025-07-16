import { DeskproAppTheme } from "@deskpro/app-sdk";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledLink = styled(Link)<DeskproAppTheme>`
  all: unset;
  font-size: 12px;
  color: ${({ theme, to }) =>
    to ? theme.colors.cyan100 : theme.colors.grey100};
  text-decoration: none;
  font-weight: 500;
  cursor: ${({ to }) => (to ? "pointer" : "default")};
`;
