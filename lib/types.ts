import { AzuriteAdapter } from "./adapters/adapter.ts";
import { Azurite } from "./azurite.ts";

export interface IAzuriteAdapter {
  new (parent: Azurite): AzuriteAdapter;
}

export interface AzuriteConfig {
  directory?: string;
  file?: string;
  path?: string;
  adapter?: IAzuriteAdapter;
}

export interface AzuriteAdapterConfig {
  extension: string;
}
