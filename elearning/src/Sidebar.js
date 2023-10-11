import {
  FaUserCircle,
  FaHeart,
  FaShoppingCart,
  FaQuestionCircle,
} from "react-icons/fa";

export const SidebarData = [
  {
    title: "Edit profile",
    icon: <FaUserCircle></FaUserCircle>,
    link: "/profile",
  },
  {
    title: "Favorites",
    icon: <FaHeart></FaHeart>,
    link: "/favorites",
  },
  {
    title: "Completed Purchase",
    icon: <FaShoppingCart></FaShoppingCart>,
    link: "/completedPurchase",
  },
  {
    title: "Quizzes",
    icon: <FaQuestionCircle></FaQuestionCircle>,
    link: "/quiz",
  },
];
