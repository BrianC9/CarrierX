import { View, Text } from "react-native";
import { COLORS, SIZES } from "../constants";
import { Parcel } from "../types";
interface ParcelSlotProps {
  parcel: Parcel;
}
function ParcelSlot({ parcel }: ParcelSlotProps) {
  return (
    <View style={{flex:1, flexDirection:'row'}}>
      <View style={{flex:1, flexDirection:'column'}}>
        <Text style={{fontSize:SIZES.large}}>Parcel List {parcel.deliveryDate}</Text>
        <Text style={{fontSize:SIZES.small,color:COLORS.gray}}>X carriers will pick up the parcel on {parcel.pickupDate}</Text>
        <Text style={{fontSize:SIZES.small,color:COLORS.gray}}>{parcel.itemsCount} items</Text>
      </View>
      <Text style={{fontSize:SIZES.small}}>{parcel.pickupDate}</Text>
    </View>
  );
}

export default ParcelSlot;
