import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { makeStyles } from '@rneui/themed'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { PaymentDetails, UserOnboardingParamList } from '../../../types'
import { CardForm } from '@stripe/stripe-react-native'
import Rounded from '../../../components/atoms/Buttons/Rounded/Rounded'
import { isNull } from 'lodash'
import AppCardForm from '../../../components/organisms/Forms/PaymentMethods/Card'
import useOnBoarding from '../../../hooks/useOnBoarding'
import MobileMoneyForm from '../../../components/organisms/Forms/PaymentMethods/MobileMoney'
import useToast from '../../../hooks/useToast'


type Props = NativeStackScreenProps<UserOnboardingParamList, "SelectedPaymentMethod">

const useStyles = makeStyles((theme)=>{
    return {
        container: {
            flex: 1,
            backgroundColor: "white",
            paddingHorizontal: 20,
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
            height: "100%",
            paddingTop: 40
        },
        labelText: {
            color: theme.colors.title,
            fontSize: 20,
            fontWeight: '400',
            fontFamily: 'Lato_400Regular',
            marginVertical: 20
        },
        topContainer: {
            width: "100%",

        },
        bottomContainer: {
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
        }
    }
})


/**
 * @note for the onboarding flow, only the card details need to be collected, other payment
 *         methods will be added later
 * 
 */
const SelectedPaymentMethod = (props: Props) => {
  const toast = useToast()
  const styles = useStyles()
  const [details, setDetails] = useState<Partial<PaymentDetails>|null>(null)
  const { setPaymentMethod } = useOnBoarding()



  const handleCard = () => {
    if (isNull(details)) return toast({
        type: "error",
        message: "Please enter your card details"
    })
    props.route.params?.payment_method && setPaymentMethod({
        type: props.route.params?.payment_method,
        details
    })
    props.navigation.navigate("SelectPaymentMethod",
    {
        payment_method_added: true
    })
        
   }


    


  const handleMobileMoneyPaymentMethod = (data: Partial<PaymentDetails> | null, error?: string) => {
    if(isNull(data)) return toast({
        type: "error",  
        message: "Please enter your mobile money details"
    })
    if(error){
        // error already handled in the form
        return
    }
    setPaymentMethod({
        type: "mobile_money",
        details: data
    })
    props.navigation.navigate("SelectPaymentMethod",
    {
        payment_method_added: true
    })
  }

  return (
    <View style={styles.container} >

        {
            props.route.params?.payment_method === 'mobile_money' ? (
                <MobileMoneyForm
                    onDone={handleMobileMoneyPaymentMethod}
                />
            ) : 
            props.route?.params?.payment_method === 'card' ? (
                <>
                    <View style={styles.topContainer} >
                        <Text style={styles.labelText}>Card Details</Text>
                        <AppCardForm
                            onCardAdded={setDetails}
                            customStyles={{
                                paddingVertical: 20
                            }}
                        /> 
                    </View>
                    <View style={styles.bottomContainer} >
                        <Rounded
                            disabled={
                                isNull(details)
                            }
                            onPress={handleCard}
                        >
                            Done
                        </Rounded>
                    </View>
                </>
            ) :
            null //for now, will add other payment methods later
        }

        
        

    
    </View>
  )
}

export default SelectedPaymentMethod