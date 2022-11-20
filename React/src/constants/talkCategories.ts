import { colorwaysTheme } from "theme/ColorwaysTheme";
import { ImPriceTag } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import { CgArrowsExpandLeft } from "react-icons/cg";
import { FaBlackTie } from "react-icons/fa";
import { RiBarChartHorizontalLine } from "react-icons/ri";

export const talkCategories = [
  {
    fullname: "Identity Check",
    name: "id",
    icon: FaBlackTie,
    color: colorwaysTheme.orange,
  },
  {
    fullname: "Legit Check",
    name: "lc",
    icon: FaCheck,
    color: colorwaysTheme.red,
  },
  {
    fullname: "Price Check",
    name: "pc",
    icon: ImPriceTag,
    color: colorwaysTheme.green,
  },
  {
    fullname: "Fit Check",
    name: "fit",
    icon: CgArrowsExpandLeft,
    color: colorwaysTheme.blue,
  },
  {
    fullname: "Inne",
    name: "other",
    icon: RiBarChartHorizontalLine,
    color: colorwaysTheme.purple,
  },
];
