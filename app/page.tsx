import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="overflow-hidden">
        <div className="flex-1 padding-x pt-36">
          <h1>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            <br /> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s</h1>
        </div>
      </main>
    </>
  );
}
