export const isPlaceholderValue = (value: string) =>
  value.includes("<<") && value.includes(">>");
