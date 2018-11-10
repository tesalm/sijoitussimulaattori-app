import { StyleSheet } from 'react-native';

const StockStyles = StyleSheet.create({
    titleStyle:{
        fontWeight: "bold",
        color: '#004D40',
        fontSize: 20,    
        marginTop: 5,    
    },

    subtitleView: {
      flexDirection: 'column',
      paddingTop: 10,
      marginLeft: 5,
      marginBottom: 5,
       
    },
    lastSaleText: {
        fontSize: 11,
        color: '#004D40',
        textAlign: "justify",
        marginLeft: 5,
        marginBottom: 1
 
    },
    lastSaleValue:{
        fontSize: 15,
        color: '#004D40',
        textAlign: "justify",
        marginLeft: 0,
        marginTop: -5 

  
    },

    rightTitleView:{
        flexDirection: 'column'

    },
    revenueText:{
        fontSize: 10,
        color: '#004D40',
    },
    revenueValue:{
        fontSize: 25,
        color: 'green',
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