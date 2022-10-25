import React from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { TwitterTimelineEmbed } from "react-twitter-embed";

type Props = {};

function Widgets({}: Props) {
  return (
    <div className="hidden px-2 mt-2 md:cols-span-3">
      <div className="flex items-center space-x-2 bg-gray-100 p-3 rounded-full mt-3">
        <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search"
          className="bg-transparent flex-1 outline-none"
        />
      </div>
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName="elonmusk"
        options={{ height: 1000 }}
      />
    </div>
  );
}

export default Widgets;
