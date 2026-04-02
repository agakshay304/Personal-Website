import { PropsWithChildren } from "react";
import Cursor from "./Cursor";
import Navbar from "./Navbar";
import SocialRail from "./SocialRail";
import SmoothScroller from "./SmoothScroller";

const AppLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="app-layout">
      <Cursor />
      <Navbar />
      <SocialRail />
      <SmoothScroller>{children}</SmoothScroller>
    </div>
  );
};

export default AppLayout;
