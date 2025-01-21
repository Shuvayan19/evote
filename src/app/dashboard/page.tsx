
import { auth } from "@/auth";
import { redirect } from "next/navigation";

import Image from "next/image";
import LogoutForm from "@/component/LogoutForm";

const page = async () => {
  const session = await auth();
  if (!session?.user) {
    
    redirect("/signin");
  }
  return (
    <div>
      Welcome{session.user.name}
      {session.user.image&&<Image
        src={session.user.image as string}
        alt="description"
        width={300}
        height={300}
        className="rounded-2xlS"
      />}
      <LogoutForm/>
    </div>
  );
};

export default page;
