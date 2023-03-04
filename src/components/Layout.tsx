import React, { FC } from "react";

interface LayoutProps {
  children?: React.ReactNode;
  mode?: boolean;
}

const Layout: FC<LayoutProps> = ({ children, mode }) => {
  return (
    <div
      className={`flex flex-col min-h-screen ${
        mode ? "bg-slate-600 text-slate-200" : "bg-white text-black"
      }`}
    >
      <div className="flex-1">{children}</div>
    </div>
  );
};

export default Layout;
