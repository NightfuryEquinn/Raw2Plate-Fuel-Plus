import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { useFontFromContext } from 'context/FontProvider'
import { LightMode } from 'assets/colors/LightMode'
import DatePicker from 'react-native-ui-datepicker'
import PropTypes from 'prop-types'
import IconMA from 'react-native-vector-icons/MaterialIcons'

export default function AddRecipeToTrackerModal( { modal, showModal, modalDate, setModalDate, save }: any ) {
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
            <Text style={ s.modalHeading }>Track Recipe Calories?</Text>
            <Text style={ s.hint }>Select a date to record the calories of this recipe.</Text>
          </View>
          
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

AddRecipeToTrackerModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  modalDate: PropTypes.any.isRequired,
  setModalDate: PropTypes.func.isRequired,
  save: PropTypes.func.isRequired
}