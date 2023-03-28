import { useRouter } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS, FONT, SIZES } from "../constants";
import { ParcelList } from "../types";
import { formatDate } from "../utils/formatDate";
interface ParcelSlotProps {
  parcelList: ParcelList;
  isLast: boolean;
  
}
function ParcelSlot({ parcelList, isLast }: ParcelSlotProps) {
  const { parcel, nItems, carriers } = parcelList;
const router = useRouter()
const handleRoute = ()=>{
  router.push(`/parcel-list/${parcel.id.$oid}?nItems=${nItems}`)
}

  return (
    <TouchableOpacity onPress={handleRoute}>
    <View style={!isLast ? styles.container : {...styles.container,borderBottomWidth:0}}>
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Text style={{ fontSize: SIZES.large ,fontFamily:FONT.medium}}>
          Parcel List {formatDate(parcel.deliveryDate).toLocaleDateString()}
        </Text>
        <Text style={{ fontSize: SIZES.small, color: COLORS.gray,fontFamily:FONT.light }}>
          {carriers} carrier{carriers > 1 && "s"} will pick up the parcel on{" "}
          {formatDate(parcel.pickupDate).toLocaleDateString()}
        </Text>
        <Text style={{ fontSize: SIZES.small, color: COLORS.gray }}>
          {nItems} item{nItems > 1 && "s"}
        </Text>
      </View>
      <Text style={{ fontSize: SIZES.small, color: "red", fontFamily:FONT.medium }}>
        {formatDate(parcel.pickupDate).toLocaleDateString()}
      </Text>
    </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems:'center',
    paddingVertical: SIZES.medium,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.gray2,
   
  }
  
});
export default ParcelSlot;
