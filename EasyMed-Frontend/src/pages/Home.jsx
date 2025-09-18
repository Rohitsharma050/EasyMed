export default function Home() {
  return (
    <>
      <div>
  <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-4">
    <div className="text-center md:text-left ml-15">
      <h1 className="text-5xl font-bold">
        Welcome to <span className="text-blue-500 text-6xl">EasyMed</span>
      </h1>

      <p className="text-lg mt-4 text-gray-500 font-sans">
        Effortless appointment scheduling, prescriptions <br /> and health records - all in one place. <br />
        Your trusted partner for smarter, faster, and easier medical management.
      </p>
    </div>
    <img
      className="w-150 p-20 mt-10 rounded-br-xl animate-float"
      src="../src/assets/home.png"
      alt=""
    />
  </div>
</div>

    </>
  );
}
