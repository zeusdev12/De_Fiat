import Web3 from "web3";
import { Contracts } from "./lib/contracts";
import { Account } from "./lib/accounts";
import Addresses from "../constants/addresses";
import { provider } from "web3-core";

export class DeFiat {
  web3: Web3;
  contracts: Contracts;
  accounts: Account[] = [];
  DefiatAddress: string;
  DefiatLpAddress: string;
  PointsAddress: string;
  PointsLpAddress: string;
  GovernanceAddress: string;
  SecondAddress: string;
  SecondLpAddress: string;
  RugSanctuaryAddress: string;
  OracleAddress: string;
  TetherAddress: string;
  CircleAddress: string;
  CircleLpAddress: string;
  AnyStakeAddress: string;
  RegulatorAddress: string;
  VaultAddress: string;
  AnyStakeV2Address: string;
  VaultV2Address: string;

  constructor(provider: provider, networkId: number, options?: any) {
    var realProvider: any;

    if (typeof provider === "string") {
      if (provider.includes("wss")) {
        realProvider = new Web3.providers.WebsocketProvider(
          provider,
          options.ethereumNodeTimeout || 10000
        );
      } else {
        realProvider = new Web3.providers.HttpProvider(
          provider,
          options.ethereumNodeTimeout || 10000
        );
      }
    } else {
      realProvider = provider;
    }

    this.web3 = new Web3(realProvider);

    if (options.defaultAccount) {
      this.web3.eth.defaultAccount = options.defaultAccount;
    }
    this.contracts = new Contracts(realProvider, networkId, this.web3, options);

    this.DefiatAddress = Addresses.DeFiat[networkId];
    this.DefiatLpAddress = Addresses.DeFiatLp[networkId];
    this.PointsAddress = Addresses.Points[networkId];
    this.PointsLpAddress = Addresses.PointsLp[networkId];
    this.GovernanceAddress = Addresses.Governance[networkId];
    this.SecondAddress = Addresses.Second[networkId];
    this.SecondLpAddress = Addresses.SecondLp[networkId];
    this.RugSanctuaryAddress = Addresses.RugSanctuary[networkId];
    this.OracleAddress = Addresses.Oracle[networkId];
    this.TetherAddress = Addresses.USDT[networkId];
    this.AnyStakeAddress = Addresses.AnyStake[networkId];
    this.AnyStakeV2Address = Addresses.AnyStakeV2[networkId];
    this.RegulatorAddress = Addresses.Regulator[networkId];
    this.VaultAddress = Addresses.Vault[networkId];
    this.VaultV2Address = Addresses.VaultV2[networkId];
    this.CircleAddress = Addresses.Circle[networkId];
    this.CircleLpAddress = Addresses.CircleLp[networkId];
  }

  addAccount(address: string) {
    this.accounts.push(new Account(this.contracts, address));
  }

  setProvider(provider: any, networkId: number) {
    this.web3.setProvider(provider);
    // this.contracts.setProvider(provider, networkId);
    // this.operation.setNetworkId(networkId)
  }

  setDefaultAccount(account: string) {
    this.web3.eth.defaultAccount = account;
    this.contracts.setDefaultAccount(account);
  }

  getDefaultAccount() {
    return this.web3.eth.defaultAccount;
  }
}
