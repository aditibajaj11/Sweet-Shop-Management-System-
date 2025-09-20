import React from "react";

export const Link: React.FC<any> = ({ children }) => <a>{children}</a>;
export const NavLink: React.FC<any> = ({ children }) => <a>{children}</a>;
export const MemoryRouter: React.FC<any> = ({ children }) => <div>{children}</div>;
export const BrowserRouter: React.FC<any> = ({ children }) => <div>{children}</div>;
export const useNavigate = () => jest.fn();
export const useLocation = () => ({ pathname: "/" });
export const useParams = () => ({});
export const useMatch = () => null;
export default {
  Link,
  NavLink,
  MemoryRouter,
  BrowserRouter,
};
