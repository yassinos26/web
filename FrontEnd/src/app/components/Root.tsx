import { Outlet } from "react-router";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function Root() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "linear-gradient(135deg, #FDF2F8 0%, #F3E8FF 50%, #EFF6FF 100%)" }}>
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
