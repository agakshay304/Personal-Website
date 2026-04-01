import { PropsWithChildren } from "react";
import Cursor from "./Cursor";
import Navbar from "./Navbar";
import SocialRail from "./SocialRail";

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="app-layout">
      <Cursor />
      <Navbar />
      <SocialRail />
      <main>{children}</main>
    </div>
  );
};

export default AppLayout;
