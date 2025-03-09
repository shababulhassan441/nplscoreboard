import { MdSportsCricket } from "react-icons/md";
import { CgPlayButtonO } from "react-icons/cg";
import { RiTeamLine } from "react-icons/ri";
import { IoManSharp } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { MdOutlineSettings } from "react-icons/md";



const CardsData = [
  {
    title: "Create match",
    icon: <MdSportsCricket size={28} color="#0066FF" />,
    linkto:"/matches/create-match"
  },
  {
    title: "Matches",
    icon: <CgPlayButtonO  size={28} color="#0066FF" />,
     linkto:"/matches"
  },
  {
    title: "Team",
    icon: <RiTeamLine size={28} color="#0066FF" />,
     linkto:"/teams"
  },
  {
    title: "Players",
    icon: <IoManSharp size={28} color="#0066FF" />,
     linkto:"/players"
  },
  {
    title: "History",
    icon: <FaHistory size={28} color="#0066FF" />,
     linkto:"/history"
  },
  {
    title: "Settings",
    icon: <MdOutlineSettings size={28} color="#0066FF" />,
 linkto:"/settings"
  },
];


export default CardsData