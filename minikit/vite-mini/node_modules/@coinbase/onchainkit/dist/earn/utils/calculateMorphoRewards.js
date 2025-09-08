function calculateMorphoRewards(data) {
  const nativeApy = data.netApyWithoutRewards;
  const otherRewards = data.rewards.reduce(
    (acc, reward) => acc + reward.supplyApr,
    0
  );
  const morphoApy = data.netApy - (nativeApy + otherRewards);
  return morphoApy;
}
export {
  calculateMorphoRewards as default
};
//# sourceMappingURL=calculateMorphoRewards.js.map
