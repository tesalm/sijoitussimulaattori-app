import { StyleSheet } from 'react-native';

const StockStyles = StyleSheet.create({
    titleStyle:{
        fontWeight: "bold",
        color: '#004D40',
        fontSize: 16,    
        marginTop: 8, 
        marginLeft: 16   
    },

    subtitleView: {
      flexDirection: 'column',
      marginTop: 8,
      marginLeft: 16,
      marginBottom: 8,

       
    },
    lastSaleText: {
        fontSize: 12,
        color: '#004D40',
        textAlign: "justify",
        marginBottom: 1
 
    },
    lastSaleValue:{
        fontSize: 14,
        fontWeight: "bold",
        color: '#004D40',
        textAlign: "left",     
        marginTop: -5,
        marginLeft: -4

         
    },

    rightTitleView:{
        flexDirection: 'column'

    },
    revenueText:{
        fontSize: 10,
        color: '#004D40',
    },
    revenueValueGreen:{
        fontSize: 18,
        fontWeight: "bold",
        color: '#54c242',
        marginLeft: 16
    },
    revenueValueRed:{
        fontSize: 18,
        fontWeight: "bold",
        color: "#e20f00",
        marginLeft: 16
    },
    listItemWhite:{
        backgroundColor: "white",
        height: 80    
    },
    listItemGrey:{
        backgroundColor: "grey",
        height: 80    
    },
});

export{StockStyles}