export const tableDetailInfo = [
    {
        tableNo:1,
        status:"vacant"
    },{
        tableNo:2,
        status:"occupied",
        pax:1,
        orderStatus:false,
        billStatus:"pending"
    },{
        tableNo:3,
        status:"occupied",
        pax:5,
        orderStatus:true,
        orderDetail:[{itemId:1, foodName:"momo", price:90,qty:1},{itemId:2, foodName:"sameybaji", price:90,qty:3},{itemId:3, foodName:"dachula", price:90,qty:1}],
        billStatus:"pending"
    },
    {
        tableNo:4,
        status:"occupied",
        pax:6,
        orderStatus:true,
        orderDetail:[{itemId:1, foodName:"momo", price:90,qty:1},{itemId:2, foodName:"sameybaji", price:90,qty:3},{itemId:3, foodName:"dachula", price:90,qty:1}],
        billStatus:"paid"
    },
    {
        tableNo:5,
        status:"vacant",
    }
]