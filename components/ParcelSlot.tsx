import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { COLORS, SIZES } from "../constants";
import { Parcel, ParcelList } from "../types";
import { formatDate } from "../utils/formatDate";
interface ParcelSlotProps {
  parcelList: ParcelList;
  isLast: boolean;
}
function ParcelSlot({ parcelList, isLast }: ParcelSlotProps) {
  const { parcel, nItems, nParcelsThatDay, carriers } = parcelList;

  return (
    <TouchableOpacity>
    <View style={!isLast ? styles.container : {...styles.container,borderBottomWidth:0}}>
      <View style={{ flex: 1, flexDirection: "column" }}>
        <Text style={{ fontSize: SIZES.large }}>
          Parcel List {formatDate(parcel.deliveryDate).toLocaleDateString()}
        </Text>
        <Text style={{ fontSize: SIZES.small, color: COLORS.gray }}>
          {carriers} carrier{carriers > 1 && "s"} will pick up the parcel on{" "}
          {formatDate(parcel.pickupDate).toLocaleDateString()}
        </Text>
        <Text style={{ fontSize: SIZES.small, color: COLORS.gray }}>
          {nItems} item{nItems > 1 && "s"}
        </Text>
      </View>
      <Text style={{ fontSize: SIZES.small, color: "red" }}>
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
    paddingVertical: SIZES.medium,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.gray2,
  }
  
});
export default ParcelSlot;
