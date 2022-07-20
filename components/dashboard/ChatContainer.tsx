import React from "react";
import { Card } from "./Card";

const ChatContainer = ({ contacts, chatMain=null, userDetails }: { contacts: any, chatMain: any, userDetails: any }) => {
  return (
    <>
      <div className="w-full h-full py-10">
        <Card>
          <div className=" w-full h-full bg-accent rounded-lg">
            <div className="flex flex-row h-full overflow-hidden rounded-lg">
              <div className="basis-3/12 bg-base-200">{contacts}</div>
              <div className="basis-6/12 bg-base-200">{chatMain}</div>
              <div className="basis-3/12 py-5 px-10">{userDetails}</div>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
};

export default ChatContainer;
