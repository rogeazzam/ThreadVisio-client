import "./globals.css";

export const metadata = {
  title: "ThreadVisio Clothes shop",
  description: "Create your own cloth.",
};

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className='relative'>
        {children}
      </body>
    </html>
  );
}
