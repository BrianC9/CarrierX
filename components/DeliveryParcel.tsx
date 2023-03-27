import { useRouter } from "expo-router";
import React from "react";
import { TouchableOpacity, View, Text, Image,StyleSheet } from "react-native";
import { COLORS, FONT, icons, SIZES } from "../constants";
import { Parcel } from "../types";
interface DeliveryParcelProps {
  parcel: Parcel;
  isDelivered: boolean;
  isLast:boolean
}
function DeliveryParcel({ parcel, isDelivered,isLast }: DeliveryParcelProps) {
    const router = useRouter()
    const handleRoute =()=>{
        router.push(`/parcel-details/${parcel.id.$oid}`)
    }
  return (
    <TouchableOpacity disabled={isDelivered} onPress={handleRoute}>
      <View style={{flexDirection:'row',justifyContent:"space-between",alignItems:'center',padding:SIZES.medium, borderBottomWidth:!isLast ? 2:0,borderBottomColor:COLORS.gray2}}>
        <View style={{width:50,height:50,padding:SIZES.xSmall,backgroundColor:'rgba(223, 0, 0, 0.1)',alignItems:'center',justifyContent:'center',borderRadius:SIZES.xSmall}}>
        <Image source={icons.truck} resizeMode='contain'  />
        </View>
        <View>
        <Text style={{fontFamily:FONT.medium}}>{parcel.id.$oid.toLocaleUpperCase()} Parcel List</Text>
        <Text style={styles.secondaryText}>MRW</Text>
        <Text style={styles.secondaryText}>{parcel.itemsCount} items to be picked up</Text>
        </View>
        <Text style={[ styles.secondaryText,{color: isDelivered ? COLORS.gray2:COLORS.red, }]}>{isDelivered ? 'Delivered'.toLocaleUpperCase():'Delivery'.toLocaleUpperCase()}</Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
    secondaryText :{
        fontSize: SIZES.small, color: COLORS.gray,fontFamily:FONT.medium
    }
})
export default DeliveryParcel;
