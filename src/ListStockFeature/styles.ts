import { StyleSheet } from 'react-native';

const StockStyles = StyleSheet.create({
    titleStyle:{
        fontWeight: "bold",
        color: '#004D40',
        fontSize: 16,    
        marginTop: 5,    
    },

    subtitleView: {
      flexDirection: 'column',
      paddingTop: 10,
      marginLeft: 5,
      marginBottom: 5,

       
    },
    lastSaleText: {
        fontSize: 12,
        color: '#004D40',
        textAlign: "justify",
        marginLeft: 5,
        marginBottom: 1
 
    },
    lastSaleValue:{
        fontSize: 14,
        fontWeight: "bold",
        color: '#004D40',
        textAlign: "justify",
        marginLeft: 1,
        marginTop: -5,
         

  
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
    },
    revenueValueRed:{
        fontSize: 18,
        fontWeight: "bold",
        color: "#e20f00"
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