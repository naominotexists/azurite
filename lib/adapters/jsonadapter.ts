import { Azurite } from "../azurite.ts";
import { AzuriteAdapter } from "./adapter.ts";

export class JSONAdapter extends AzuriteAdapter {
  public constructor(parent: Azurite) {
    super(parent, {
      extension: "json",
    });
    this.parent = parent;
  }

  private getData() {
    return JSON.parse(Deno.readTextFileSync(this.path()));
  }

  private setData(data: object) {
    return Deno.writeTextFileSync(this.path(), JSON.stringify(data));
  }

  public get(key: string) {
    const data = this.getData();

    return data[key] ? data[key] : null;
  }

  public delete(key: string) {
    const data = this.getData();

    delete data[key];

    this.setData(data);

    return data;
  }

  public set(key: string, value: any) {
    const data = this.getData();
    data[key] = value;
    this.setData(data);

    return data;
  }

  public find(fn: Function) {
    const data = this.getData();

    for (const item of Object.entries(data)) {
      if (fn(item[1])) {
        return item;
      }
    }

    return null;
  }

  public init() {
    return "{}";
  }

  public path(): string {
    return this.parent.path ? this.parent.path : "";
  }
}
