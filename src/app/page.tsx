
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="bg-red-400 font-bold text-3xl p-4 w-6/12 mb-4 ">
        Hello world{" "}
      </h1>
      <Link
        className="p-2 border-2 border-green-400 rounded-lg text-2xl font-semibold hover:bg-green-500 "
        href={"/auth/signin"}
      >
        SignIn
      </Link>
    </div>
  );
}
