interface HeadlineComponentArgs {
  children: React.ReactNode;
}

export function Headline(args: HeadlineComponentArgs) {
  return <h1 className="drop-shadow-2xl">{args.children}</h1>;
}
