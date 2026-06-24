import Navbar from "@/app/components/Navbar";
import Search from "../components/Search";
import AuthModalWrapper from "../components/AuthModalWrapper";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: "flex" }}>
      <Navbar />
      <div
        style={{
          marginLeft: "220px",
          flex: 1,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Search />
        <main>{children}</main>
      </div>
      <AuthModalWrapper />
    </div>
  );
}
