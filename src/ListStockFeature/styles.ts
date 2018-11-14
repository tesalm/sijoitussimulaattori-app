import { StyleSheet } from 'react-native';
import {scale, verticalScale, moderateScale} from 'react-native-size-matters'
const StockStyles = StyleSheet.create({
    
    titleStyle:{
        fontWeight: "bold",
        color: '#004D40',
        fontSize: 16,    
        marginTop: verticalScale(8),
        marginLeft: scale(8)   
    },
    subtitleView: {
      flexDirection: 'column',
      marginTop: verticalScale(12),
      marginLeft: scale(8),
      //marginBottom: verticalScale(4),     
    },
    lastSaleText: {
        fontSize: 12,
        color: '#004D40',
        textAlign: "justify",
        marginBottom: verticalScale(0)
 
    },
    lastSaleValue:{
        fontSize: 14,
        fontWeight: "bold",
        color: '#004D40',
        textAlign: "justify",   
        marginTop: verticalScale(-2),
        marginLeft: scale(-3)
    },
    rightTitleView:{
        flexDirection: 'column',
        marginLeft: scale(8)
    },
    revenueText:{
        fontSize: 12,
        color: '#004D40',
    },
    revenueValueGreen:{
        fontSize: 18,
        fontWeight: "bold",
        color: '#54c242',
        textAlign: 'center'     
    },
    revenueValueRed:{
        fontSize: 18,
        fontWeight: "bold",
        color: "#e20f00",
        textAlign: 'center'
    },
    loadingView:{
        flex: 1,
        justifyContent: 'center'
    }

});

export{StockStyles}