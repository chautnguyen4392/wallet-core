import { AssetTypes, ChainId } from '../../../types';
import { NearChain } from '../../NonEvmChain';

export default new NearChain({
  id: ChainId.Near,
  name: 'Near',
  code: 'NEAR',
  color: '#000000',

  nativeAsset: [
    {
      name: 'Near',
      chain: ChainId.Near,
      type: AssetTypes.native,
      code: 'NEAR',
      priceSource: { coinGeckoId: 'near' },
      color: '#000000',
      decimals: 24,
    },
  ],

  isEVM: false,
  hasTokens: false,
  isMultiLayered: false,

  averageBlockTime: 5,
  safeConfirmations: 10,
  txFailureTimeoutMs: 300_000,

  network: {
    name: 'Near Mainnet',
    coinType: '397',
    isTestnet: false,
    networkId: 'mainnet',
    rpcUrls: ['https://near-mainnet.infura.io/v3/37efa691ffec4c41a60aa4a69865d8f6'],
  },
  explorerViews: [
    {
      tx: 'https://explorer.near.org/transactions/{hash}',
      address: 'https://explorer.near.org/accounts/{hash}',
    },
  ],

  multicallSupport: false,
  ledgerSupport: false,

  EIP1559: false,
  gasLimit: {
    send: {
      native: 10_000_000_000_000,
    },
  },
  fees: {
    unit: 'TGas',
    magnitude: 1e12,
  },
  supportCustomFees: true,
});
