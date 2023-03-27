import { useSearchParams, useRouter, Stack } from "expo-router";
import { View, Text, SafeAreaView, FlatList } from "react-native";
import DeliveryParcel from "../../components/DeliveryParcel";
import ParcelDetails from "../../components/ParcelDetails";
import ParcelSlot from "../../components/ParcelSlot";
import { COLORS, FONT, SIZES } from "../../constants";
import parcelLists from "../../data/parcels_mm.json";
import { Item, Parcel } from "../../types";
import { formatDate, getListOfItems } from "../../utils/formatDate";

function ParcelList() {
  const params = useSearchParams();
  const item = parcelLists.find(
    (parcelList: Parcel) => parcelList.id.$oid === params.oid
  );
  const listOfItems = getListOfItems(item?.items ?? [])

  return (
    <SafeAreaView style={{backgroundColor:COLORS.lightWhite,flex:1,padding:SIZES.medium}}>
      <Stack.Screen
        options={{
          title: `${params.oid?.toString().toLocaleUpperCase()} Parcel List`,
          headerShadowVisible: false,
          headerTitleStyle: {
            fontSize: SIZES.medium + 4,
            fontFamily: FONT.medium,
          },
          headerStyle: {
            backgroundColor: COLORS.lightWhite,
          
          },
          headerTitleAlign:'left'

        }}
      />
      <Text>{params.nItems} to be picked up</Text>
      {listOfItems.map((item,index) => <ParcelDetails key={item.id.$oid} isLast={index === listOfItems.length -1} item={item}/>)}
    </SafeAreaView>
  );
}

export default ParcelList;
