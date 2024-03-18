import Header from "@/components/Header";
import "../globals.css";
export default function DashboardLayout({ children }) {
  return (
    <html>
      <body className="h-screen bg-[#F6F8F9]">
        <Header />
        {children}
      </body>
    </html>
  );
}
