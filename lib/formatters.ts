import formatDuration from "format-duration";

export const formatTime = (timeInSecond = 0) => {
  return formatDuration(timeInSecond * 1000);
};

export const formatDate = (date: String) => {
  const newDate = new Date(date);

  return newDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};
