import { Parcel, ParcelList } from "../types";

export function getUniqueParcelList(deliveryList: Parcel[]): ParcelList[] {
    const summaryMap: Map<string, ParcelList> = new Map();
  
    deliveryList.forEach(parcelIterating => {
      const uniqueParcel = parcelIterating;
  
      if (summaryMap.has(uniqueParcel.deliveryDate)) {
        const summary = summaryMap.get(uniqueParcel.deliveryDate);
        if (summary !== undefined) {
          summary.nItems += parcelIterating.itemsCount;
          summary.carriers += 1;
        }
      } else {
        const summary: ParcelList = {
          parcel: uniqueParcel,
          nItems: parcelIterating.itemsCount,
          carriers: 1
        };
        summaryMap.set(uniqueParcel.deliveryDate, summary);
      }
    });
  
    return Array.from(summaryMap.values());
  }