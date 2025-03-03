// utils/colorUtils.js
const getRandomColor = () => {
  const colors = [
    "#F94144",
    "#F3722C",
    "#F9C74F",
    "#90BE6D",
    "#577590",
    "#277DA1",
    "#4D908E",
    "#F9844A",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

module.exports = getRandomColor; // Export function
