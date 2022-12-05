import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { makeStyles, ThemeConsumer } from '@rneui/themed'
import { ScrollView } from 'react-native-gesture-handler';
import { Image } from '@rneui/base';
import CarTypeIcon from "../../../assets/icons/car-type.svg"
import CarSeatIcon from "../../../assets/icons/car-seat.svg"
import CarIcon from "../../../assets/icons/car.svg"


interface IProps {

}

type Props = IProps;

const useStyles = makeStyles((theme, props: Props)=>{
    return {
        container: {
            alignItems: "center",
            justifyContent: "flex-start",
            width: "100%"
        },
        headerTitle: {
            fontWeight: "700",
            fontSize: 16,
            lineHeight: 19,
            marginBottom: 10
        },
        carSlideContainer: {
            width: "100%",
            height: 80,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
        },
        carSlide: {
            width: 110,
            height: 80,
            borderRadius: 10,
            overflow: "hidden",
            marginRight: 5
        },
        carImage: {
            width: 110,
            height: 80,
        },
        extraCarInfo: {
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
        },
        infoContainer: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",

        },
        leftInfoContainer: {
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-start",
            width: 60
        },
        title: {
            color: theme.colors.black,
            fontSize: 14,
            fontWeight: "500",
            marginLeft: 5
        },
        value: {
            color: theme.colors.grey3,
            fontSize: 14,
            fontWeight: "500",
        },
        scrollView: {
            width: 350,
            height: 80,
            marginBottom: 10
        }

    }
})

const BookingCarDetails = (props: Props) => {

    const styles = useStyles(props)

  return (
    <ThemeConsumer>
        {({theme})=>(
            <View
            style={styles.container}
            >
                <Text style={styles.headerTitle}>Car Name</Text>
                <ScrollView style={styles.scrollView} horizontal  >
                    {
                        [1,2,3,4, 5,6,7]?.map((_, index)=>(
                            <View key={index} style={styles.carSlide} >
                                <Image
                                    style={styles.carImage}
                                    source={require(`../../../assets/images/car1.png`)}
                                />
                            </View>
                        ))
                    }
                </ScrollView>
                <View
                    style={styles.extraCarInfo}
                >   
                    <View style={styles.infoContainer} >
                        <View style={styles.leftInfoContainer} >
                            <CarTypeIcon width={12} height={12} fill={theme.colors.primary} />
                            <Text style={styles.title} >
                                Type
                            </Text>
                        </View>
                        <Text style={styles.value} >
                            SUV
                        </Text>
                    </View>

                    <View style={styles.infoContainer} >
                        <View style={styles.leftInfoContainer} >
                            <CarSeatIcon width={12} height={12} fill={theme.colors.primary} />
                            <Text style={styles.title} >
                                Seats
                            </Text>
                        </View>
                        <Text style={styles.value} >
                            5
                        </Text>
                    </View>

                    <View style={styles.infoContainer} >
                        <View style={styles.leftInfoContainer} >
                            <CarIcon width={12} height={12} fill={theme.colors.primary} />
                            <Text style={styles.title} >
                                Color
                            </Text>
                        </View>
                        <Text style={styles.value} >
                            Blue Grey
                        </Text>
                    </View>
                </View>
            </View>
        )}
        
    </ThemeConsumer>
  )
}

export default BookingCarDetails
