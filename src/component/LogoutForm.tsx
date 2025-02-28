import { doSociallogout } from "@/app/api/actions";

const LogoutForm =  () => {
  return (
    <form action={doSociallogout}>
      <button
        type="submit"
        className=" border-red-600 border-2 p-1 rounded-md mb-2  hover:bg-red-500"
      >
        SignOut
      </button>
    </form>
  );
};

export default LogoutForm;
