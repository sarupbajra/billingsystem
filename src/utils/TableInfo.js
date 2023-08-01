import momo from "../assets/FoodImage/momo2.png";
import chyang from "../assets/FoodImage/chyang.png";
import yomari from "../assets/FoodImage/yomari.png";
import samumicha from "../assets/FoodImage/sapu-mhicha.png";


export const tableDetailInfo = [
    
    {
        
        tableNo:1,
        status:"vacant" 
        
    },{
        tableNo:2,
        status:"vacant"
        // pax:1,
        // orderStatus:false,
        // billStatus:"pending"
    },{
        tableNo:3,
        status:"vacant"
        // tableNo:3,
        // status:"occupied",
        // pax:5,
        // orderStatus:true,
        // orderDetail:[{itemId:1, foodName:"momo", price:90,qty:1},{itemId:2, foodName:"sameybaji", price:90,qty:3},{itemId:3, foodName:"dachula", price:90,qty:1}],
        // billStatus:"pending"
    },
    {
        tableNo:4,
          status:"vacant" 
        // tableNo:4,
        // status:"occupied",
        // pax:6,
        // orderStatus:true,
        // orderDetail:[{itemId:1, foodName:"momo", price:90,qty:1},{itemId:2, foodName:"sameybaji", price:90,qty:3},{itemId:3, foodName:"dachula", price:90,qty:1}],
       
    },
    {
        tableNo:5,
        status:"vacant",
    }
]

export const foodMenuItems = [
    { itemId: 1, foodName: "Momo", price: 90, src: momo },
    { itemId: 2, foodName: "Chyang", price: 80, src: chyang},
    { itemId: 3, foodName: "Yomari", price: 90, src: yomari},
    { itemId: 4, foodName: "Samumicha", price: 90, src :samumicha },
  ];