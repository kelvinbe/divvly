import { StyleSheet, Text, View } from 'react-native'
import React, {useRef, useReducer} from 'react'
import { makeStyles } from '@rneui/themed'
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { BottomSheetParamList } from '../../../types'
import BookingScreen from './BottomSheetScreens/BookingScreen'
import PaymentBottomSheet from './BottomSheetScreens/PaymentBottomSheet'
import AuthorizationBottomSheet from './BottomSheetScreens/AuthorizationCode'
import DriveCardButton from '../../molecules/DriveCardButton/DriveCardButton'
import AnimatedScrollList from '../AnimatedScrollList/AnimatedScrollList'
import ModifyBookingBottomSheet from './BottomSheetScreens/ModifyBooking'
import CancelBookingBottomSheet from './BottomSheetScreens/CancelBooking'



interface IProps {
    onClose: ()=>void,
    onOpen: ()=>void,
    inReservation?: boolean
}

interface IState {
    open: boolean,
    authorizationOpen: boolean,
    paymentOpen: boolean,
    modifyBooking: boolean,
    cancelBooking: boolean
}

type Props = IProps;

const useStyles = makeStyles((theme, props: Props)=> ({
    container: {
        paddingHorizontal: 10,
        backgroundColor: theme.colors.white,
        height: 1000
        },
    backdropContainer: {
        backgroundColor: "red",
        width: "100%",
        height: 1000,
    },
    mapContainer: {
        width: "100%",
        height: "100%",
        position: "absolute",
        alignItems: "center",
        justifyContent: "flex-end"
    },
    vehiclesScrollContainer: {
        width: "80%",
        backgroundColor: "transparent",
        paddingVertical: 20
    }
}))

const BottomSheetNavigator = createNativeStackNavigator<BottomSheetParamList>()

const initialState: IState = {
    open: false,
    authorizationOpen: false,
    paymentOpen: false,
    modifyBooking: false,
    cancelBooking: false
}

const reducer = (state: IState, action: any) => {
    switch(action.type) {
        case "openAuthorizationCode":
            return {
                ...state,
                authorizationOpen: true
            }
        case "openSelectPaymentMethod":
            return {
                ...state,
                paymentOpen: true
            }
        case "closeAuthorizationBottomSheet":
            return {
                ...state,
                authorizationOpen: false
            }
        case "closePaymentBottomSheet":
            return {
                ...state,
                paymentOpen: false
            }
        case "openBottomSheet":
            return {
                ...state,
                open: true
            }
        case "closeBottomSheet":
            return {
                ...state,
                open: false
            }
        case "modifyBooking":
            return {
                ...state,
                modifyBooking: true
            }
        case "cancelBooking":
            return {
                ...state,
                cancelBooking: true
            }
        case "closeModifyBooking":
            return {
                ...state,
                modifyBooking: false
            }
        case "closeCancelBooking":
            return {
                ...state,
                cancelBooking: false
            }

        default:
            return state
    }
}

const MapScreenBottomSheet = (props: Props) => {

    const [state, dispatchAction] = useReducer(reducer, {...initialState, open: props.inReservation ? true : false})
    const snapPoints = ["90%"]
    const bottomSheetRef = useRef<BottomSheet>(null)
    const styles = useStyles(props)


    const openAuthorizationCode = () => {
        dispatchAction({type: "openAuthorizationCode"})
    }

    const openSelectPaymentMethod = () => {
        dispatchAction({type: "openSelectPaymentMethod"})
    }

    const closeAuthorizationBottomSheet = () => {
        dispatchAction({type: "closeAuthorizationBottomSheet"})
    }

    const closePaymentBottomSheet = () => {
        dispatchAction({type: "closePaymentBottomSheet"})
    }

    const openBottomSheet = (index: number) => {
        props.onOpen()
        dispatchAction({type: "openBottomSheet"})
        
    }

    const closeBottomSheet = () => {
        props.onClose()
        dispatchAction({type: "closeBottomSheet"})
    }

    const openModifyBooking = () => {
        dispatchAction({type: "modifyBooking"})
    }

    const openCancelBooking = () => {
        dispatchAction({type: "cancelBooking"})
    }

    const closeModifyBooking = () => {
        dispatchAction({type: "closeModifyBooking"})
    }

    const closeCancelBooking = () => {
        dispatchAction({type: "closeCancelBooking"})
    }

  return (
    <View 
        style={styles.mapContainer}
     >
        { state.open && <BottomSheet
            ref={bottomSheetRef}
            snapPoints={snapPoints}
            enablePanDownToClose={props?.inReservation ? false : true}
            index={0}
            onClose={closeBottomSheet}
        >
            <BottomSheetView style={styles.container} >
                <BookingScreen 
                    openAuthorization={openAuthorizationCode}
                    openSelectPaymentMethod={openSelectPaymentMethod}
                    isReservation={props.inReservation}
                    openCancelReservation={openCancelBooking}
                    openModifyReservation={openModifyBooking}
                />
            </BottomSheetView>
            
        </BottomSheet>}
        { state.paymentOpen && <PaymentBottomSheet closeBottomSheet={closePaymentBottomSheet} />}
        { state.authorizationOpen && <AuthorizationBottomSheet closeBottomSheet={closeAuthorizationBottomSheet} />}
        {
            state.modifyBooking && <ModifyBookingBottomSheet closeBottomSheet={closeModifyBooking} />
        }
        {
            state.cancelBooking && <CancelBookingBottomSheet closeBottomSheet={closeCancelBooking} />
        }
        { !state.open && <View style={styles.vehiclesScrollContainer} >
            {/* <DriveCardButton onPress={openBottomSheet} /> */}
            <AnimatedScrollList handleSelect={openBottomSheet} />
        </View>}
    </View>
    
  )
}

export default MapScreenBottomSheet