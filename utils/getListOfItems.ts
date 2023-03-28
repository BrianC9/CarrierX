import { ID, Item } from "../types"
import itemList from '../data/items_mm.json'

export function getListOfItems(ids: ID[]): Item[] {
    const listOfItems: Item[] = []
    ids.forEach(id => {
        listOfItems.push(itemList.find(item => item.id.$oid === id.$oid))
    })
    return listOfItems
}