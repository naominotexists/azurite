# Azurite

An expandable database module for Deno. This module is currently in a trial
version. Inspired by [v2db](https://github.com/v30xy/v2db).

# Example

```ts
import {
	Azurite,
	AzuriteAdapter,
	JSONAdapter
} from "https://deno.land/x/azurite@0.0.1/mod.ts";

const db = new Azurite({
  file: "test", /* Azurite will automatically add the file extension */
  adapter: JSONAdapter,
});

/* set */
db.set("hello", "world");

/* get */
db.get("hello"); //> world

/* delete */
db.delete("hello");
db.get("hello"); //> null

/* find */
db.set("data1", { a: 10 });
db.set("data2", { a: 12 });

db.find((d: any) => d.a === 10); //> ["data1", { a: 10 }]
```

# Create your own adapter

```ts
class MyAdapter extends AzuriteAdapter {
  public constructor(parent: Azurite) {
    super(parent, {
      extension: "txt", /* the extension of the database file */
    });

    this.parent = parent;
  }

  public get(key: string) {
    /* pull data from database and return */
  }

  public set(key: string, value: any) {
    /* assign the value to the given key */
  }
}

const db = new Azurite({
  file: "test",
  adapter: MyAdapter,
});
```
