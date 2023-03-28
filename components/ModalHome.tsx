import React from 'react'
import { Modal, SafeAreaView, View, TextInput, TouchableOpacity,Text } from 'react-native'
import { SelectList } from 'react-native-dropdown-select-list'
import { COLORS, SIZES, FONT, SHADOWS } from '../constants'
import carrierList from "../data/carriers_mm.json";
interface ModalHomeProps{
    modalVisible:boolean,
    hideModal:Function | any,
    parcelID:string,
    setParcelID:Function,
    carrierSelected:string
    setCarrierSelected:Function
    handleAddParcel:Function | any
}
function ModalHome({modalVisible,hideModal,parcelID,setParcelID,carrierSelected,setCarrierSelected,handleAddParcel}:ModalHomeProps) {
    const optionsData = carrierList.map(item => {
        return {
          key: item.id.$oid, value:item.id.$oid.toLocaleUpperCase()
        }
      })
  return (
    <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={hideModal}
        
      >
        <SafeAreaView
          style={{
            backgroundColor: "#000000aa",
            flex: 1,
            flexDirection: "column-reverse",
          }}
          
        >
          <View
            style={{
              height: "40%",
              backgroundColor: COLORS.lightWhite,
              opacity: 1,
              padding: SIZES.medium,
              borderTopLeftRadius: SIZES.medium,
              borderTopRightRadius: SIZES.medium,
              gap: 10,
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: SIZES.xLarge,
                fontFamily: FONT.medium,
                textAlign: "center",
              }}
            >
              Parcel and Carrier Information
            </Text>
            <View style={{ gap: SIZES.medium }}>
              <View
                style={{
                  borderWidth: 2,
                  borderColor: COLORS.gray2,
                  borderRadius: SIZES.xSmall / 2,
                }}
              >
                <Text
                  style={{
                    position: "absolute",
                    bottom: 45,
                    left: 10,
                    backgroundColor: COLORS.lightWhite,
                    paddingHorizontal: SIZES.xSmall,
                    color: COLORS.gray,
                    zIndex: 100,
                    fontSize:SIZES.small,

                  }}
                >
                  Parcel id
                </Text>
                <TextInput
                  placeholder="641DB7B2FC13"
                  value={parcelID}
                  onChangeText={(text)=>setParcelID(text)}
                  style={{
                    backgroundColor: COLORS.lightWhite,
                    fontSize: SIZES.large,
                    padding: SIZES.small + 2,
                  }}
                ></TextInput>
              </View>
                <Text
                  style={{
                    position: "absolute",
                    bottom: 115,
                    left: 10,
                    backgroundColor: COLORS.lightWhite,
                    paddingHorizontal: SIZES.xSmall,
                    color: COLORS.gray,
                    fontSize:SIZES.small,
                    zIndex: 100,
                  }}
                >
                  Carrier
                </Text>
                <SelectList

                  setSelected={setCarrierSelected}
                  data={optionsData}
                  save="value"
                  search={false}
                  placeholder='HET32R0GR6NA'
                  fontFamily={FONT.medium}
                  boxStyles={{borderWidth:2, borderColor:COLORS.gray2,borderRadius:SIZES.small/2}}
                  inputStyles={{fontFamily:FONT.medium,fontSize:SIZES.large,color:COLORS.gray2}}
                />
              <TouchableOpacity
                style={{
                  backgroundColor: COLORS.red,
                  padding: SIZES.medium,
                  ...SHADOWS.medium,
                }}
                onPress={handleAddParcel}
              >
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: SIZES.large,
                    color: COLORS.lightWhite,
                  }}
                >
                  ADD
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>
  )
}

export default ModalHome