interface FilterSectionProps {
  title: string;
  items: { label: string; value: string }[];
  selected: string[];
  onToggle: (value: string) => void;
  className?: string;
  titleClassName?: string;
  buttonClassName?: string;
}

export default function FilterSection({
  title,
  items,
  selected,
  onToggle,
  className = "",
  titleClassName = "subtitle sm:mt-8 sm:mb-4 mb-2.5 uppercase",
  buttonClassName = "",
}: FilterSectionProps) {
  return (
    <>
      <h3 className={titleClassName}>{title}</h3>
      <ul className={className}>
        {items.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => onToggle(value)}
            className={`button-style transition-colors ${buttonClassName} ${
              selected.includes(value)
                ? "bg-[var(--green)] text-white"
                : ""
            }`}
          >
            {label}
          </button>
        ))}
      </ul>
    </>
  );
}
