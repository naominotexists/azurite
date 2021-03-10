import { AzuriteConfig } from "./types.ts";
import { AzuriteAdapter } from "./adapters/adapter.ts";
import { ensureFileSync, join } from "./deps.ts";

export class Azurite {
  private config: AzuriteConfig;
  private adapter: AzuriteAdapter;

  public constructor(config: AzuriteConfig) {
    let { adapter, file, directory } = config;

    this.config = {};

    if (!file) file = "db";
    if (!directory) directory = Deno.cwd();

    if (directory.startsWith("/")) {
      this.config.directory = directory;
    } else {
      this.config.directory = join(Deno.cwd(), directory);
    }

    this.adapter = adapter ? new adapter(this) : new AzuriteAdapter(this, {
      extension: "json",
    });

    if (file.endsWith(this.adapter.extension)) {
      this.config.file = file;
    } else {
      this.config.file = `${file}.${this.adapter.extension}`;
    }

    this.config.path = join(this.config.directory, this.config.file);
    console.log(this.config.path);

    this.ensure();
  }

  private ensure() {
    let path: string = this.config.path ? this.config.path : "";
    try {
      const stat = Deno.lstatSync(path);
    } catch (err) {
      if (err instanceof Deno.errors.NotFound) {
        ensureFileSync(path);

        Deno.writeTextFileSync(path, this.adapter.init());
      } else throw err;
    }
  }

  public get(key: string) {
    return this.adapter.get(key);
  }

  public delete(key: string) {
    return this.adapter.delete(key);
  }

  public find(fn: Function) {
    return this.adapter.find(fn);
  }

  public set(key: string, value: any) {
    return this.adapter.set(key, value);
  }

  get path() {
    return this.config.path;
  }
}
