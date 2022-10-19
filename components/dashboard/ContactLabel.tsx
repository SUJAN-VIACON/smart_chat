import Image from "next/image";

const ContactLabel = ({ user, }: { user: any; }) => {

  return (
    <>
      <div className="bg-accent-content px-7 py-4 mb-1">
        <div className=" flex justify-between">
          <div className=" flex">
            <Image
              src={
                user.photo_url ??
                `https://avatars.dicebear.com/api/human/${user.name}.svg`
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
              <p className="text-neutral-content">Ux designer</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactLabel;
