const nCol = 288;
const nRow = 14;

let data = [];

for (let x = 0; x < nCol; x++) {
  for (let y = 0; y < nRow; y++) {
    data.push({
      x: x,
      y: y,
      value: Math.random() * 40,
    });
  }
}

export { data };
