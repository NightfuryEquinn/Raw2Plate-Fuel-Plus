import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';
import * as BackgroundFetch from 'expo-background-fetch';
import * as Notifications from 'expo-notifications';
import * as TaskManager from 'expo-task-manager';

const TIMER_BACKGROUND_TASK = "timer-background-task"

TaskManager.defineTask(TIMER_BACKGROUND_TASK, async () => {
  try {
    const currentTime = dayjs()
    const timers = await AsyncStorage.getItem( "@timers" )

    if ( timers ) {
      const parsedTimers = JSON.parse( timers ) 

      // Filter expired timers and trigger notifications
      const activeTimers = parsedTimers.filter(( timer: any ) => {
        if ( currentTime >= timer.endTime ) {
          triggerNotification( timer )

          return false
        }

        return true
      })

      await AsyncStorage.setItem( "@timers", JSON.stringify( activeTimers ) )

      return BackgroundFetch.BackgroundFetchResult.NewData
    }
  } catch ( error ) {
    return BackgroundFetch.BackgroundFetchResult.Failed
  }
})

// Register background task
export const registerBackgroundTask = async () => {
  try {
    await BackgroundFetch.registerTaskAsync( TIMER_BACKGROUND_TASK, {
      minimumInterval: 1,
      stopOnTerminate: false,
      startOnBoot: true,
    })
  } catch ( error ) {
    // console.log( "Error registering background task: ", error )
    throw error
  }
}

// Trigger notification
export const triggerNotification = async ( timer: any ) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Task: ${ timer.purpose }`,
      body: "Time's up. Continue to work! Chop, chop, chop!"
    },
    trigger: null
  })
}