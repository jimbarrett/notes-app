import { NoteProvider } from "./context/NoteContext";
import "./globals.css";
import { Lato } from "next/font/google";
import Header from "./components/Header";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata = {
  title: "Notetracker App",
  description: "NextJS app to take quick notes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <NoteProvider>
          <main className="flex min-h-screen flex-col">
            <Header />
            {children}
          </main>
        </NoteProvider>
      </body>
    </html>
  );
}
