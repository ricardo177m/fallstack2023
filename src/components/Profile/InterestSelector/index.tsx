"use client";

import { useEffect, useState } from "react";
import { Interest } from "@prisma/client";
import { Reorder } from "framer-motion";

import { BASE_URL } from "@/services/api";

interface InterestSelectorProps {
  userInterests: string[];
  setUserInterests: (interests: string[]) => void;
  scrollable?: boolean;
}

const InterestSelector: React.FC<InterestSelectorProps> = ({
  setUserInterests,
  userInterests,
  scrollable = false,
}) => {
  const [interests, setInterests] = useState<Interest[]>([]);

  async function fetchInterests() {
    const res = await fetch(BASE_URL + "/interests");
    const json = await res.json();
    setInterests(json);
  }

  useEffect(() => {
    fetchInterests();
  }, []);

  const orderedInterests = interests.sort((a, b) => {
    if (userInterests.includes(a.name)) return -1;
    if (userInterests.includes(b.name)) return 1;
    return 0;
  });

  return (
    <Reorder.Group
      axis="x"
      values={orderedInterests}
      onReorder={(values) => setInterests(values)}
      className={`flex w-full flex-wrap gap-x-6 gap-y-4 ${
        scrollable && "h-52 overflow-y-scroll pt-4"
      }`}
    >
      {orderedInterests.map((interest) => (
        <Reorder.Item
          onClick={() =>
            !userInterests.includes(interest.name) &&
            setUserInterests([...userInterests, interest.name])
          }
          key={interest.name}
          className={`relative cursor-pointer rounded-xl px-3 py-1 text-black ${
            userInterests.includes(interest.name)
              ? "bg-orange-300/80"
              : "bg-slate-200"
          }`}
          value={interest.name}
        >
          {interest.name}
          {userInterests.includes(interest.name) && (
            <button
              onClick={() =>
                setUserInterests(
                  userInterests.filter((i) => i !== interest.name)
                )
              }
              className="absolute -right-1 -top-1 z-20 flex h-4 w-4 items-center justify-center rounded-full bg-red-400/80 text-xs  text-white"
            >
              X
            </button>
          )}
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
};

export default InterestSelector;
