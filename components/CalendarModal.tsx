import { LightMode } from 'assets/colors/LightMode'
import { useFontFromContext } from 'context/FontProvider'
import PropTypes from 'prop-types'
import React from 'react'
import { Modal, StyleSheet, TouchableOpacity, View } from 'react-native'
import DatePicker from 'react-native-ui-datepicker'
import IconMA from 'react-native-vector-icons/MaterialIcons'

export default function CalendarModal( { modal, showModal, modalDate, setModalDate }: any ) {
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
    gap: 10,
  },
  "modalButton": {
    padding: 10,
    borderRadius: 10,
    backgroundColor: LightMode.black
  },
})

CalendarModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  modalDate: PropTypes.any.isRequired,
  setModalDate: PropTypes.func.isRequired
}