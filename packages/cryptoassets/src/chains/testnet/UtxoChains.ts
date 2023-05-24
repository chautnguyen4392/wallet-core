import { ChainId, ChainsMap } from '../../types';

import BitcoinChain from './utxo/bitcoin';
import YacoinChain from './utxo/yacoin';

export const TESTNET_UTXO_CHAINS: ChainsMap = {
  [ChainId.Bitcoin]: BitcoinChain,
  [ChainId.Yacoin]: YacoinChain,
};
