import { Parcel, ParcelList } from "../types"

export const formatDate = (dateWOFormat: string): Date => {
  const splittedDate = dateWOFormat.split('/')
  return new Date(Number(splittedDate[2]), Number(splittedDate[0]) - 1, Number(splittedDate[1]))
}

interface Order {
  id: number;
  deliveryDate: string;
  items: {
    name: string;
    quantity: number;
    price: number;
  }[];
}



export function getUniqueParcelList(deliveryList: Parcel[]): ParcelList[] {
  const summaryMap: Map<string, ParcelList> = new Map();

  deliveryList.forEach(parcelIterating => {
    const uniqueParcel = parcelIterating;

    if (summaryMap.has(uniqueParcel.deliveryDate)) {
      const summary = summaryMap.get(uniqueParcel.deliveryDate);
      if (summary !== undefined) {
        summary.nItems += parcelIterating.itemsCount;
        summary.nParcelsThatDay += 1;
        summary.carriers += 1;
      }
    } else {
      const summary: ParcelList = {
        parcel: uniqueParcel,
        nItems: parcelIterating.itemsCount,
        nParcelsThatDay: 1,
        carriers: 1
      };
      summaryMap.set(uniqueParcel.deliveryDate, summary);
    }
  });

  return Array.from(summaryMap.values());
}
