async function getETHPrice() {
  try {
    const response = await fetch(
      "https://api.coinbase.com/v2/prices/ETH-USD/spot"
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    const amount = data.data.amount;
    return amount;
  } catch (error) {
    console.error("Error fetching ETH price:", error);
    return "0";
  }
}
export {
  getETHPrice
};
//# sourceMappingURL=getETHPrice.js.map
