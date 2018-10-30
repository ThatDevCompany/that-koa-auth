# That Simple ObjectStore

##  Overview
An object persistance interface for That Simple Model

### Examples of its use
More detailed documentation to follow

```
const objectStore = new SOMETHINGObjectStore()
const myObject = new MyModel()

objectStore.put(myObject)
objectStore.get(MyModel, "primaryKey", "secondaryKey")
objectStore.query(MyModel, {})
objectStore.remove(myObject)
```
