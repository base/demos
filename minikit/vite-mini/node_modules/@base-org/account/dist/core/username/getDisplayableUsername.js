export async function getDisplayableUsername(address) {
    return truncateAddress(address);
}
function truncateAddress(address, length = 4) {
    return `${address.slice(0, 2 + length)}...${address.slice(-length)}`;
}
//# sourceMappingURL=getDisplayableUsername.js.map