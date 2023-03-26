import { View, Text } from "react-native";
import { COLORS, SIZES } from "../constants";
import { Parcel, ParcelList } from "../types";
import { formatDate } from "../utils/formatDate";
interface ParcelSlotProps {
  parcelList: ParcelList;
}
function ParcelSlot({ parcelList }: ParcelSlotProps) {
  const {parcel,nItems,nParcelsThatDay,carriers} = parcelList
  
  return (
    <View style={{flex:1, flexDirection:'row'}}>
      <View style={{flex:1, flexDirection:'column'}}>
        <Text style={{fontSize:SIZES.large}}>Parcel List {formatDate(parcel.deliveryDate).toLocaleDateString()}</Text>
        <Text style={{fontSize:SIZES.small,color:COLORS.gray}}>{carriers} carrier{carriers> 1 && 's'} will pick up the parcel on {formatDate(parcel.pickupDate).toLocaleDateString()}</Text>
        <Text style={{fontSize:SIZES.small,color:COLORS.gray}}>{nItems} items</Text>
      </View>
      <Text style={{fontSize:SIZES.small,color:'red'}}>{formatDate(parcel.pickupDate).toLocaleDateString()}</Text>
    </View>
  );
}

export default ParcelSlot;
