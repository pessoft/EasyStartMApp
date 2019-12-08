export class BitOperation {
    static Add(item1, item2) {
        return item1 | item2
    }

    static isHas(item, itemCheck) {
        return (item & itemCheck) == itemCheck
    }
}