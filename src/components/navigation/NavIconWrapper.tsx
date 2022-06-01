import { Children, ReactNode } from "react";

export const NavIconWrapper = ({
  children,
  pathname,
  match,
}: {
  children?: ReactNode;
  pathname: string;
  match: string;
}) => {
  if (!children) return <></>;
  const count = Children.count(children);
  if (count < 2) return children;

  if (pathname === match) {
    return children[0];
  } else {
    return children[1];
  }
};
