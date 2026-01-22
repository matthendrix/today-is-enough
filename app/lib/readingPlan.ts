export const readingPlan = [
  "Psalm 23",
  "Matthew 5",
  "Psalm 27",
  "Mark 4",
  "Psalm 46",
  "Luke 15",
  "Psalm 91",
  "John 10",
  "Psalm 16",
  "Matthew 6",
  "Psalm 121",
  "Mark 5",
  "Psalm 139",
  "Luke 10",
  "Psalm 103",
  "John 15",
  "Psalm 62",
  "Matthew 11",
  "Psalm 34",
  "Mark 10",
  "Psalm 84",
  "Luke 12",
  "Psalm 19",
  "John 6",
  "Psalm 40",
  "Matthew 14",
  "Psalm 130",
  "Mark 2",
  "Psalm 73",
  "Luke 24",
  "Psalm 90",
];

export const themeKey = "today-is-enough.theme";
export const translationKey = "today-is-enough.translation";

export const bibleTranslations = [
  { id: "NIV", label: "NIV (New International Version)" },
  { id: "ESV", label: "ESV (English Standard Version)" },
  { id: "NLT", label: "NLT (New Living Translation)" },
  { id: "NKJV", label: "NKJV (New King James Version)" },
  { id: "KJV", label: "KJV (King James Version)" },
  { id: "CSB", label: "CSB (Christian Standard Bible)" },
];

export const formatDateKey = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const formatLongDate = (date: Date) =>
  new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);

export const getReferenceForDate = (date: Date) => {
  const startOfYear = new Date(date.getFullYear(), 0, 1);
  const diff = date.getTime() - startOfYear.getTime();
  const dayIndex = Math.floor(diff / 86400000);
  return readingPlan[dayIndex % readingPlan.length];
};

export const getReadKey = (dateKey: string) => `today-is-enough.read.${dateKey}`;

export const getNoteKey = (dateKey: string) => `today-is-enough.note.${dateKey}`;
