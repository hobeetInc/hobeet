import Link from "next/link";

const CreateButton = () => {
  return (
    <Link href={"/club"} className="border-2 p-2 border-black">
      생성
    </Link>
  );
};

export default CreateButton;
