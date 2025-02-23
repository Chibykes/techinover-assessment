interface PriorityBadgeInterface {
  variant: "high" | "medium" | "low";
}

const background: Record<PriorityBadgeInterface["variant"], string> = {
  high: "#EBFAE2",
  medium: "#EEF3FF",
  low: "#FDF2F2",
};

const color: Record<PriorityBadgeInterface["variant"], string> = {
  high: "#4F9C20",
  medium: "#3069FE",
  low: "#EC5962",
};

const PriorityBadge = ({ variant }: PriorityBadgeInterface) => {
  return (
    <div
      className="inline-block w-fit rounded-sm p-2 py-1 text-xs font-medium uppercase"
      style={{ background: background[variant], color: color[variant] }}
    >
      {variant}
    </div>
  );
};

export default PriorityBadge;
