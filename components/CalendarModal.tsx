import { View, Modal, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import DatePicker from 'react-native-ui-datepicker'
import { useFontFromContext } from 'context/FontProvider'
import dayjs from 'dayjs'
import { LightMode } from 'assets/colors/LightMode'
import IconMA from 'react-native-vector-icons/MaterialIcons'
import PropTypes from 'prop-types'

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
            headerTextStyle={{ fontFamily: "fjalla", fontSize: 24 }}
            headerButtonSize={ 20 }
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
              size={ 36 }
              color={ LightMode.black }
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
    flex: 0.5,
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
    backgroundColor: LightMode.white
  },
})

CalendarModal.propTypes = {
  modal: PropTypes.bool.isRequired,
  showModal: PropTypes.func.isRequired,
  modalDate: PropTypes.any.isRequired,
  setModalDate: PropTypes.func.isRequired
}