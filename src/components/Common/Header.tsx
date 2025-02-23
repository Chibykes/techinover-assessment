import moment from "moment";
import { useContext } from "react";
import { CgSearch } from "react-icons/cg";
import {
  HiArrowSmLeft,
  HiArrowSmRight,
  HiOutlineMenuAlt1,
} from "react-icons/hi";
import { CreateAppLevelContext } from "../../contexts/app";

const Header = () => {
  const { state, setState } = useContext(CreateAppLevelContext);
  const previousDay = () => {
    setState?.((n) => ({
      ...n,
      currentDate: moment(n?.currentDate || undefined)
        .subtract(1, "day")
        .format(),
    }));
  };

  const nextDay = () => {
    setState?.((n) => ({
      ...n,
      currentDate: moment(n?.currentDate || undefined)
        .add(1, "day")
        .format(),
    }));
  };

  return (
    <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
      <div className="flex w-full items-center justify-between gap-4 lg:justify-start">
        <div className="flex items-center gap-4">
          <button
            className="cursor-pointer"
            onClick={() =>
              setState?.((n) => ({ ...n, showSidebar: !n.showSidebar }))
            }
          >
            <HiOutlineMenuAlt1
              size={24}
              strokeWidth={2.5}
              className="lg:hidden"
            />
          </button>
          <h1 className="text-3xl font-semibold">
            {moment(state?.currentDate || undefined).format("D MMMM YYYY")}
          </h1>
        </div>

        <div className="flex items-center justify-between gap-4 lg:justify-start">
          <button
            className="border-date-change-border grid h-[40px] w-[40px] cursor-pointer place-content-center rounded-full border"
            onClick={previousDay}
          >
            <HiArrowSmLeft size={24} />
          </button>
          <button
            className="border-date-change-border grid h-[40px] w-[40px] cursor-pointer place-content-center rounded-full border"
            onClick={nextDay}
          >
            <HiArrowSmRight size={24} />
          </button>
        </div>
      </div>

      <div className="relative w-full lg:min-w-[250px]">
        <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
          <CgSearch className="text-icon-primary" />
        </div>
        <input
          type="text"
          id="input-group-1"
          className="block w-full rounded-lg border border-gray-300 p-2.5 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500"
          placeholder="Search"
          onChange={(e) =>
            setState?.((n) => ({ ...n, search: e.target.value }))
          }
        />
      </div>
    </div>
  );
};

export default Header;
