// import { Red_Hat_Display } from "next/font/google";

// const font = Red_Hat_Display({
//   subsets: ["latin"],
// });

interface HeadlineComponentArgs {
  children: React.ReactNode;
}

export function Headline(args: HeadlineComponentArgs) {
  // Placeholder in case we want to use a different font
  return <h1 className="drop-shadow-2xl">{args.children}</h1>;
}
