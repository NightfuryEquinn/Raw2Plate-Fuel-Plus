import { LightMode } from 'assets/colors/LightMode'
import { useFontFromContext } from 'context/FontProvider'
import PropTypes from 'prop-types'
import React from 'react'
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import DropDownPicker from 'react-native-dropdown-picker'
import DatePicker from 'react-native-ui-datepicker'
import IconMA from 'react-native-vector-icons/MaterialIcons'

export default function AddRecipeToPlannerModal( { modal, showModal, modalDate, setModalDate, openDrop, dropValue, dropItems, setOpenDrop, setDropValue, save }: any ) {
  const { fontsLoaded } = useFontFromContext()

  if ( !fontsLoaded ) {
    return null
  }
  
  return (
    <Modal
      animationType="fade"
      transparent={ true }
      visible={ modal }
      onRequestClose={ showModal }
    >
      <View style={ s.modalContainer }>
        <View style={ s.modalContent }>
          <View style={ s.modalHint }>
            <Text style={ s.modalHeading }>Add this Recipe to Planner?</Text>
            <Text style={ s.hint }>Select a meal and date for this recipe to be included.</Text>
          </View>
          <DropDownPicker 
            open={ openDrop }
            value={ dropValue }
            items={ dropItems }
            setOpen={ setOpenDrop }
            setValue={ setDropValue }
            placeholder="Choose Meal"
            textStyle={{
              fontFamily: "cantarell"
            }}
          />

          <DatePicker
            mode="single"
            date={ modalDate }
            onChange={ ( { date }: any ) => setModalDate( date ) }
            calendarTextStyle={{ fontFamily: "fjalla" }}
            selectedTextStyle={{ fontFamily: "fjalla" }}
            selectedItemColor={ LightMode.black }
            headerTextStyle={{ fontFamily: "fjalla", fontSize: 16 }}
            headerButtonSize={ 16 }
            headerButtonColor={ LightMode.black }
            todayTextStyle={{ fontFamily: "fjalla" }}
            weekDaysTextStyle={{ fontFamily: "fjalla" }}
          />

          <View style={ s.buttonContainer }>
            <TouchableOpacity
              activeOpacity={ 0.5 }
              onPress={ showModal }
              style={ s.modalButton }
            >
              <IconMA 
                name="close"
                size={ 24 }
                color={ LightMode.white }
              />
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={ 0.5 }
              onPress={ save }
              style={ s.modalButton }
            >
              <IconMA 
                name="check"
                size={ 24 }
                color={ LightMode.white }
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const s = StyleSheet.create({
  "modalContainer": {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: LightMode.halfBlack
  },
  "modalContent": {
    margin: 20,
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    backgroundColor: LightMode.white,
    gap: 20,
  },
  "modalHeading": {
    fontFamily: "fjalla",
    fontSize: 24,
    color: LightMode.black
  },
  "buttonContainer": {
    flexDirection: "row",
    gap: 30,
    justifyContent: "center",
    alignContent: "center"
  },
  "modalButton": {
    padding: 10,
    borderRadius: 10,
    backgroundColor: LightMode.black
  },
  "modalHint": {
    gap: 5,
    justifyContent: "center",
    alignItems: "center"
  },
  "hint": {
    fontFamily: "cantarell",
    fontSize: 12,
    color: LightMode.lightBlack,
    textAlign: "center"
  },
})

AddRecipeToPlannerModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  modalDate: PropTypes.any.isRequired,
  setModalDate: PropTypes.func.isRequired,
  openDrop: PropTypes.bool.isRequired,
  dropValue: PropTypes.string.isRequired,
  dropItems: PropTypes.any.isRequired,
  setOpenDrop: PropTypes.func.isRequired,
  setDropValue: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired
}