"use client";

import { useRouter } from "next/navigation";

const CreateButton = () => {
  const router = useRouter();

  const handleCreate = () => {
    router.push("/club/type-selection");
  };

  return (
    <button onClick={handleCreate} className="border-2 p-2 border-black">
      생성
    </button>
  );
};

export default CreateButton;
