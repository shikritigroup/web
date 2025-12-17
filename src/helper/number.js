export const displayNo = (text) => {
  const lan = localStorage.getItem("userLanguage");
  const digits = [
    { key: "0", value: "০" },
    { key: "1", value: "১" },
    { key: "2", value: "২" },
    { key: "3", value: "৩" },
    { key: "4", value: "৪" },
    { key: "5", value: "৫" },
    { key: "6", value: "৬" },
    { key: "7", value: "৭" },
    { key: "8", value: "৮" },
    { key: "9", value: "৯" },
  ];

  if (text && lan === "be") {
    digits.forEach((digit) => {
      text = text.replaceAll(digit.key, digit.value);
    });
  }
  return text;
};
