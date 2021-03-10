import {
  Azurite,
  AzuriteAdapter,
  JSONAdapter,
} from "https://deno.land/x/azurite@0.0.1/mod.ts";
import { join } from "../lib/deps.ts";

const db = new Azurite({
  file: "test",
  adapter: JSONAdapter,
});
