import Image from "next/image";

const ContactLabel = ({ user, isActive = false }: { user: any, isActive: any }) => {

  return (
    <>
      <div className={`bg-accent-content px-7 py-4 mb-1 ${isActive ? " shadow-lg border-r border-indigo-50" : ""}`}>
        <div className=" flex justify-between">
          <div className=" flex">
            <Image
              src={
                user?.profileImage ??
                user?.photo_url ?? `https://avatars.dicebear.com/api/human/${user.name}.svg`
              }
              alt=""
              width={50}
              height={50}
              className=" w-10 rounded-full"
            />
            <div className="ml-5">
              <h1 className=" text-lg line-h text-center text-neutral">
                {user.name}
              </h1>
              <p className="text-neutral-content">{user?.about != '' && user?.about ? user?.about : "no about"}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactLabel;
