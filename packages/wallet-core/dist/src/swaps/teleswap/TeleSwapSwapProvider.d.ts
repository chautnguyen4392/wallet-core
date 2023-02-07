import { Transaction } from '@chainify/types';
import BN from 'bignumber.js';
import { ActionContext } from '../../store';
import { Asset, Network, SwapHistoryItem, WalletId } from '../../store/types';
import { SwapProvider } from '../SwapProvider';
import { BaseSwapProviderConfig, EstimateFeeRequest, NextSwapActionRequest, QuoteRequest, SwapRequest, SwapStatus } from '../types';
export interface TeleSwapSwapProviderConfig extends BaseSwapProviderConfig {
    QuickSwapRouterAddress: string;
    QuickSwapFactoryAddress: string;
}
export declare enum TeleSwapTxTypes {
    WRAP = "WRAP",
    SWAP = "SWAP"
}
export interface TeleSwapSwapHistoryItem extends SwapHistoryItem {
    swapTx: Transaction;
    swapTxHash: string;
    approveTxHash: string;
    exchangeApproveTxHash: string;
    exchangeTxHash: string;
    exchangedTeleBTCAmount: BN;
    numberOfBitcoinConfirmations: number;
    userBitcoinAddress: string;
}
declare class TeleSwapSwapProvider extends SwapProvider {
    config: TeleSwapSwapProviderConfig;
    constructor(config: TeleSwapSwapProviderConfig);
    getSupportedPairs(): Promise<never[]>;
    isSwapSupported(from: Asset, to: Asset, network: Network): boolean;
    getQuote({ network, from, to, amount }: QuoteRequest): Promise<{
        fromAmount: string;
        toAmount: string;
    }>;
    sendBitcoinSwap({ quote, network, walletId, }: {
        quote: TeleSwapSwapHistoryItem;
        network: Network;
        walletId: WalletId;
    }): Promise<{
        status: string;
        swapTxHash: string;
        swapTx: Transaction<any>;
        numberOfBitcoinConfirmations: number;
    }>;
    sendBurn({ quote, network, walletId, }: {
        quote: TeleSwapSwapHistoryItem;
        network: Network;
        walletId: WalletId;
    }): Promise<{
        status: string;
        swapTxHash: string;
        swapTx: Transaction<any>;
        userBitcoinAddress: string;
    }>;
    sendExchange({ quote, network, walletId, }: {
        quote: TeleSwapSwapHistoryItem;
        network: Network;
        walletId: WalletId;
    }): Promise<{
        status: string;
        exchangeTxHash: string;
        exchangedTeleBTCAmount: BN;
    }>;
    approveForExchange({ quote, network, walletId, }: {
        quote: TeleSwapSwapHistoryItem;
        network: Network;
        walletId: WalletId;
    }): Promise<{
        status: string;
        exchangeApproveTxHash: string;
    }>;
    approveForBurn({ quote, network, walletId, }: {
        quote: TeleSwapSwapHistoryItem;
        network: Network;
        walletId: WalletId;
    }): Promise<{
        status: string;
        approveTxHash: string;
    }>;
    sendSwap({ network, walletId, swap }: NextSwapActionRequest<TeleSwapSwapHistoryItem>): Promise<{
        status: string;
        swapTxHash: string;
        swapTx: Transaction<any>;
        numberOfBitcoinConfirmations: number;
    } | {
        status: string;
        exchangeApproveTxHash: string;
    } | {
        status: string;
        approveTxHash: string;
    } | undefined>;
    newSwap({ network, walletId, quote }: SwapRequest<TeleSwapSwapHistoryItem>): Promise<{
        id: string;
        fee: number;
    } | {
        status: string;
        swapTxHash: string;
        swapTx: Transaction<any>;
        numberOfBitcoinConfirmations: number;
        id: string;
        fee: number;
    } | {
        status: string;
        exchangeApproveTxHash: string;
        id: string;
        fee: number;
    } | {
        status: string;
        approveTxHash: string;
        id: string;
        fee: number;
    }>;
    estimateFees({ network, walletId, asset, txType, quote, feePrices, max }: EstimateFeeRequest): Promise<{
        [x: string]: BN;
    } | null>;
    getMin(quote: QuoteRequest): Promise<BN>;
    getTokenAddress(asset: Asset, network: Network): string | undefined;
    waitForBitcoinConfirmations({ swap, network, walletId }: NextSwapActionRequest<TeleSwapSwapHistoryItem>): Promise<{
        endTime: number;
        status: string;
        numberOfBitcoinConfirmations: number;
    } | undefined>;
    waitForReceive({ swap, network, walletId }: NextSwapActionRequest<TeleSwapSwapHistoryItem>): Promise<{
        endTime: number;
        status: string;
        numberOfBitcoinConfirmations: number;
    } | undefined>;
    waitForApproveConfirmations({ swap, network, walletId }: NextSwapActionRequest<TeleSwapSwapHistoryItem>): Promise<{
        endTime: number;
        status: string;
    } | undefined>;
    waitForExchangeApproveConfirmations({ swap, network, walletId }: NextSwapActionRequest<TeleSwapSwapHistoryItem>): Promise<{
        endTime: number;
        status: string;
    } | undefined>;
    waitForExchangeConfirmations({ swap, network, walletId }: NextSwapActionRequest<TeleSwapSwapHistoryItem>): Promise<{
        endTime: number;
        status: string;
        exchangedTeleBTCAmount: BN;
    } | undefined>;
    waitForBurnConfirmations({ swap, network, walletId }: NextSwapActionRequest<TeleSwapSwapHistoryItem>): Promise<{
        endTime: number;
        status: string;
        toAmount: string;
    } | undefined>;
    waitForBurnBitcoinConfirmations({ swap, network }: NextSwapActionRequest<TeleSwapSwapHistoryItem>): Promise<{
        endTime: number;
        status: string;
    } | undefined>;
    performNextSwapAction(store: ActionContext, { network, walletId, swap }: NextSwapActionRequest<TeleSwapSwapHistoryItem>): Promise<Partial<{
        endTime: number;
        status: string;
    }> | undefined>;
    protected _getStatuses(): Record<string, SwapStatus>;
    protected _txTypes(): typeof TeleSwapTxTypes;
    protected _fromTxType(): string | null;
    protected _toTxType(): string | null;
    protected _timelineDiagramSteps(): string[];
    protected _totalSteps(): number;
    private _chooseLockerAddress;
    private getChainIdNumber;
    private getFees;
    private getOutputAmountAndPath;
    private changeEndianness;
    private getTargetNetworkConnectionInfo;
    private _getOpReturnData;
}
export { TeleSwapSwapProvider };
