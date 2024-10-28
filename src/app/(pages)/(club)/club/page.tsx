import CreateButton from "./_components/CreateButton";
import OneTimeClubList from "./_components/OneTimeClubList";
import RegularClubList from "./_components/RegularClubList";

const ClubCreatePage = () => {
  return (
    <div>
      <div className="container bg-gray-200 flex justify-end">
        <CreateButton />
      </div>
      <div className="container">
        <RegularClubList />
        <OneTimeClubList />
      </div>
    </div>
  );
};

export default ClubCreatePage;
