import { useSearchParams, useRouter, Stack } from "expo-router";
import { View, Text, SafeAreaView, FlatList } from "react-native";
import { COLORS, FONT, SIZES } from "../../constants";
import parcelLists from "../../data/parcels_mm.json";
import { Parcel } from "../../types";
import { formatDate } from "../../utils/formatDate";

function ParcelList() {
  const params = useSearchParams();
  const item = parcelLists.find(
    (parcelList: Parcel) => parcelList.id.$oid === params.deliveryDate
  );
  const ParcelsForThatDate = parcelLists.filter(parcel => parcel.deliveryDate === item?.deliveryDate)
  console.log(ParcelsForThatDate.length);
  console.log(params);
  return (
    <SafeAreaView style={{backgroundColor:COLORS.lightWhite,flex:1,padding:SIZES.medium}}>
      <Stack.Screen
        options={{
          title: `Parcel List ${formatDate(item?.deliveryDate ??'').toLocaleDateString()}`,
          headerShadowVisible: false,
          headerTitleStyle: {
            fontSize: SIZES.xLarge + 4,
            fontFamily: FONT.medium,
          },
          headerStyle: {
            backgroundColor: COLORS.lightWhite,
          
          },
          headerTitleAlign:'left'

        }}
      />
      <Text>{params.nItems} to be picked up</Text>
    </SafeAreaView>
  );
}

export default ParcelList;
