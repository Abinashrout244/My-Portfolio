export function renderMessage(blocks) {
  // plain string means it's a nav link — handled outside
  if (typeof blocks === "string") return null;

  // group consecutive tags together in one flex row
  const grouped = [];
  let tagBuffer = [];

  const flushTags = () => {
    if (tagBuffer.length) {
      grouped.push({ type: "tag-group", items: tagBuffer });
      tagBuffer = [];
    }
  };

  for (const block of blocks) {
    if (block.type === "tag") {
      tagBuffer.push(block.value);
    } else {
      flushTags();
      grouped.push(block);
    }
  }
  flushTags();

  return (
    <div className="space-y-2">
      {grouped.map((block, i) => {
        switch (block.type) {
          case "heading":
            return (
              <p
                key={i}
                className="text-sm font-bold text-red-400 tracking-wide"
              >
                {block.value}
              </p>
            );

          case "field":
            return (
              <p key={i} className="text-sm">
                <span className="font-semibold text-amber-400">
                  {block.label}:
                </span>{" "}
                {block.value && (
                  <span className="text-white/80">{block.value}</span>
                )}
              </p>
            );

          case "url":
            return (
              <a
                key={i}
                href={block.value}
                target="_blank"
                rel="noopener noreferrer"
                className="block truncate text-xs text-red-300 underline underline-offset-2 hover:text-red-200 transition-colors"
              >
                {block.value}
              </a>
            );

          case "text":
            return (
              <p key={i} className="text-sm text-white/75 leading-relaxed">
                {block.value}
              </p>
            );

          case "numbered":
            return (
              <div key={i} className="flex items-center gap-2">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-600/30 text-xs font-bold text-red-400">
                  {block.num}
                </span>
                <span className="text-sm font-medium text-amber-300">
                  {block.value}
                </span>
              </div>
            );

          case "tag-group":
            return (
              <div key={i} className="flex flex-wrap gap-1.5">
                {block.items.map((tag, j) => (
                  <span
                    key={j}
                    className="rounded-full border border-red-500/30 bg-red-500/10 px-2.5 py-0.5 text-xs font-medium text-red-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            );

          case "divider":
            return <div key={i} className="border-t border-white/8 my-1" />;

          default:
            return null;
        }
      })}
    </div>
  );
}
