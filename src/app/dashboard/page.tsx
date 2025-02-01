import { auth } from "@/auth";
import { redirect } from "next/navigation";

import Image from "next/image";
import LogoutForm from "@/component/LogoutForm";

const page = async () => {
  const session = await auth();
  if (!session?.user) {
    redirect("/auth/signin");
  }
  return (
    <div className="flex flex-col ">
      <span className="flex  flex-row justify-between m-2">
        <div>
          Welcome{" "}
          <span className="text-red-400 font-bold ml-2">{session.user.email}</span>
        </div>
        <div>Your ID : <span className="text-black-400 font-bold ml-2">{session.user.id}</span></div>
      </span>
      <div className="flex flex-col justify-center items-center ">
        {session.user.image && (
          <Image
            src={session.user.image as string}
            alt="description"
            width="150"
            height="150"
            className="rounded-full size-32"
          />
        )}
        <div className="m-2 text-3xl flex flex-col">
          HEY!!
          <span>{session.user.name}</span>
          <span className="ml-8 mt-1">
            <LogoutForm />
          </span>
        </div>
      </div>
    </div>
  );
};

export default page;
