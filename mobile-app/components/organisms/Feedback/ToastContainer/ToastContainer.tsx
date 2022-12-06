import { StatusBar, View } from 'react-native'
import React from 'react'
import { makeStyles } from '@rneui/themed'
import { useSelector } from 'react-redux'
import { RootState } from '../../../../store/slices'
import { selectMessages } from '../../../../store/slices/notificationsSlice'
import Toast from '../../../molecules/Feedback/Toast/Toast'
import { IToast } from '../../../../types'


const useStyles = makeStyles((theme, props) => ({
    container: {
        width: "100%",
        height: "100%",
        position: "absolute",
        top: 0,
        left: 0,
        alignItems: "center",
        justifyContent: "flex-start",
        marginTop: StatusBar.currentHeight,
        padding: 10
    }
}))

const ToastContainer = () => {
    const styles = useStyles()
    const messages = useSelector<RootState>(selectMessages) as IToast[]


  return (
    <View style={styles.container} >
        {
            messages?.map((message, index)=>{
                return (
                    <Toast
                        key={index}
                        {
                            ...message
                        }
                    />
                )
            })
        }
    </View>
  )
}

export default ToastContainer