import Sidebar from "@/components/Sidebar/Sidebar";
import HeaderPerfil from "@/components/HeaderPerfil/HeaderPerfil";
import SearchBar from "@/components/SearchBar/SearchBar";
import Cards from "@/components/Cards/Cards";
import "./globals.css";
import { title } from "process";

export const metadata = {
  title: "Admin Dashboard",
  description: "Admin Dashboard",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex">

        <Sidebar />
        <HeaderPerfil />
        <Cards />

          {children}
          
          
      </body>
    </html>
  );
}