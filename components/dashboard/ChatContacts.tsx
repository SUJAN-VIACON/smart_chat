import React from "react";
import { BsSearch } from "react-icons/bs";
import ContactLabel from "./ContactLabel";

const ChatContacts = () => {
  return (
    <section>
      <div className="bg-accent-content px-7 py-5">
        <div className="flex">
          <BsSearch size={17} />
          <label className=" ml-3">Search</label>
        </div>
      </div>

      <div className="mt-10">
       <ContactLabel/>
      </div>
    </section>
  );
};

export default ChatContacts;
