// Example TypeScript file demonstrating proper ABI import usage
// This file shows how frontend components should import and use contract ABIs

import CartelCoreABI from '~/lib/abi/CartelCore.json';
import CartelPotABI from '~/lib/abi/CartelPot.json';
import CartelSharesABI from '~/lib/abi/CartelShares.json';

// Example: Using with wagmi hooks
// import { useContractRead, useContractWrite } from 'wagmi';

// const CARTEL_CORE_ADDRESS = process.env.NEXT_PUBLIC_CARTEL_CORE_ADDRESS as `0x${string}`;

// Example contract read
// const { data: joinFee } = useContractRead({
//   address: CARTEL_CORE_ADDRESS,
//   abi: CartelCoreABI,
//   functionName: 'JOIN_FEE',
// });

// Example contract write
// const { write: joinCartel } = useContractWrite({
//   address: CARTEL_CORE_ADDRESS,
//   abi: CartelCoreABI,
//   functionName: 'join',
//   args: [referrerAddress],
// });

export { CartelCoreABI, CartelPotABI, CartelSharesABI };
