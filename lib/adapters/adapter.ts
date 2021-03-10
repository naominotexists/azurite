import { Azurite } from "../azurite.ts";
import { AzuriteAdapterConfig } from "../types.ts";

export class AzuriteAdapter {
  public parent: Azurite;
  private config: AzuriteAdapterConfig;

  public constructor(parent: Azurite, config: AzuriteAdapterConfig) {
    this.parent = parent;

    this.config = { extension: config.extension };
  }

  public get(key: string) {
    throw new Error(
      `Method 'get' not specified in adapter '${this.constructor.name}'`,
    );
  }

  public set(key: string, value: any) {
    throw new Error(
      `Method 'set' not specified in adapter '${this.constructor.name}'`,
    );
  }

  public delete(key: string) {
    throw new Error(
      `Method 'delete' not specified in adapter '${this.constructor.name}'`,
    );
  }

  public find(fn: Function) {
    throw new Error(
      `Method 'find' not specified in adapter '${this.constructor.name}'`,
    );
  }

  public init() {
    return "{}";
  }

  get extension() {
    return this.config.extension;
  }
}
