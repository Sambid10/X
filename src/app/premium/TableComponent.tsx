import {
  Table,
  TableBody,
  
  TableCell,
  
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import SimpleToolTip from "../_components/SimpleToolTip";

const invoices = [
  {
    invoice: "Grok 2 AI Assistant",
    basic: "",
    premiumPlus: "✔",
    premium: "✔",
    icon: <InfoCircledIcon className="h-4 w-4" />,
    tooltipinfo:
      "Grok 2 is a leading AI assistant built into X that can help you answer questions, write code, do research, and generate images.",
  },
  {
    invoice: "Ads",
    basic: "No reduction",
    premiumPlus: "Fully ad-free",
    premium: "Half in For You & Following",
    innericon: <InfoCircledIcon className="h-4 w-4" />,
    tooltipinfo:
      "See the full amount of ads in the For You and Following timelines.",
    secondtooltipinfo:
      "See approximately half the ads in the For You and Following timelines.",
    thirdtooltipinfo:
      "Enjoy an ad-free experience, with occasional branded content in less common areas.",
  },
  {
    invoice: "Reply boost",
    basic: "Smallest",
    premiumPlus: "Larger",
    premium: "Largest",
  },
  {
    invoice: "Radar",
    icon: <InfoCircledIcon className="h-4 w-4" />,
    tooltipinfo:
      "Experience real-time trends like never before. Access to Radar will roll out in phases to Premium+ members in the US starting on October 17, 2024.",
    basic: "",
    premiumPlus: "✔",
    premium: "✔",
  },
  {
    invoice: "Edit post",
    basic: "✔",
    premiumPlus: "✔",
    premium: "✔",
  },
  {
    invoice: "Longer posts",
    basic: "✔",
    premiumPlus: "✔",
    premium: "✔",
  },
  {
    invoice: "Undo post",
    basic: "✔",
    premiumPlus: "✔",
    premium: "✔",
  },
  {
    invoice: "Download videos",
    basic: "✔",
    premiumPlus: "✔",
    premium: "✔",
  },
  {
    invoice: "Background video playback",
    basic: "✔",
    premiumPlus: "✔",
    premium: "✔",
  },
];

const invoices1 = [
  {
    invoice: "Write Articles",
    basic: "",
    premiumPlus: "✔",
    premium: "✔",
  },
  {
    invoice: "Get paid to post",
    basic: "",
    premiumPlus: "✔",
    premium: "✔",
  },
  {
    invoice: "Creator Subscriptions",
    basic: "",
    premiumPlus: "✔",
    premium: "✔",
  },
  {
    invoice: "Media Studio",
    basic: "",
    premiumPlus: "✔",
    premium: "✔",
  },
  {
    invoice: "Analytics",
    basic: "",
    premiumPlus: "✔",
    premium: "✔",
  },
  {
    invoice: "Post longer videos",
    basic: "✔",
    premiumPlus: "✔",
    premium: "✔",
  },
];

const invoices2 = [
  {
    invoice: "Highlights tab",
    basic: "✔",
    premiumPlus: "✔",
    premium: "✔",
  },
  {
    invoice: "Bookmark folders",
    basic: "✔",
    premiumPlus: "✔",
    premium: "✔",
  },
  {
    invoice: "App icons",
    basic: "✔",
    premiumPlus: "✔",
    premium: "✔",
  },
];

export function TableComponent() {
  return (
    <>
      <Table className="mt-8">
        <TableHeader>
          <TableRow className="lg:text-[1.3rem] text-[1rem] w-[100%]">
            <TableHead className="w-[40%] hidden md:flex md:items-center whitespace-nowrap ">Enhanced Experience</TableHead>
            <TableHead className="w-[20%]">Basic</TableHead>
            <TableHead className="w-[20%]">Premium</TableHead>
            <TableHead className="w-[20%]">Premium +</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="lg:text-[1.1rem] text-[0.8rem]">
          {invoices.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium hidden  text-gray-200 md:flex md:items-center md:gap-2">
                {invoice.invoice}
                {invoice.icon && (
                  <SimpleToolTip
                    className="bg-black px-6 shadow-[0_0_10px_2px_rgba(255,255,255,0.8)] text-gray-200 text-base"
                    title={invoice.tooltipinfo}
                  >
                    <span className="cursor-pointer px-1 py-1 hover:bg-[#121212] rounded-full ease-in duration-200 transition-colors ">
                      {invoice.icon}
                    </span>
                  </SimpleToolTip>
                )}
              </TableCell>
              <TableCell>
              <div className="flex items-center gap-2">
              {invoice.basic}
              {invoice.innericon && (
                  <SimpleToolTip
                    className="bg-black px-6 shadow-[0_0_10px_2px_rgba(255,255,255,0.8)] text-gray-200 text-base"
                    title={invoice.tooltipinfo}
                  >
                    <span className="cursor-pointer px-1 py-1 hover:bg-[#121212] rounded-full ease-in duration-200 transition-colors ">
                      {invoice.innericon}
                    </span>
                  </SimpleToolTip>
                )}
              </div>
              
              </TableCell>
              <TableCell>
              <div className="flex items-center whitespace-pre-wrap gap-2">
              {invoice.premium}
              {invoice.innericon && (
                  <SimpleToolTip
                    className="bg-black px-6 shadow-[0_0_10px_2px_rgba(255,255,255,0.8)] text-gray-200 text-base"
                    title={invoice.secondtooltipinfo}
                  >
                    <span className="cursor-pointer px-1 py-1 hover:bg-[#121212] rounded-full ease-in duration-200 transition-colors ">
                      {invoice.innericon}
                    </span>
                  </SimpleToolTip>
                )}
                </div>
              </TableCell>
              <TableCell>
              <div className="flex items-center gap-2">
              {invoice.premiumPlus}
              {invoice.innericon && (
                  <SimpleToolTip
                    className="bg-black px-6 shadow-[0_0_10px_2px_rgba(255,255,255,0.8)] text-gray-200 text-base"
                    title={invoice.thirdtooltipinfo}
                  >
                    <span className="cursor-pointer px-1 py-1 hover:bg-[#121212] rounded-full ease-in duration-200 transition-colors ">
                      {invoice.innericon}
                    </span>
                  </SimpleToolTip>
                )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Table className="mt-12">
        <TableHeader>
          <TableRow className="lg:text-[1.3rem] text-[1rem]">
          <TableHead className="w-[40%] hidden md:flex md:items-center whitespace-nowrap  ">Creater Hub</TableHead>
            <TableHead className="w-[20%]">Basic</TableHead>
            <TableHead className="w-[20%]">Premium</TableHead>
            <TableHead className="w-[20%]">Premium +</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices1.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium text-gray-200 hidden md:flex md:items-center md:gap-2">
                {invoice.invoice}
              </TableCell>
              <TableCell>{invoice.premium}</TableCell>
              <TableCell>{invoice.premiumPlus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Table className="mt-12">
        <TableHeader>
          <TableRow className="lg:text-[1.3rem] text-[1rem]">
          <TableHead className="w-[40%] hidden md:flex md:items-center whitespace-nowrap  ">Customization</TableHead>
            <TableHead className="w-[20%]">Basic</TableHead>
            <TableHead className="w-[20%]">Premium</TableHead>
            <TableHead className="w-[20%]">Premium +</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices2.map((invoice) => (
            <TableRow key={invoice.invoice}>
              <TableCell className="font-medium text-gray-200 hidden md:flex md:items-center md:gap-2">
                {invoice.invoice}
              </TableCell>
              <TableCell>{invoice.basic}</TableCell>
              <TableCell>{invoice.premium}</TableCell>
              <TableCell>{invoice.premiumPlus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
