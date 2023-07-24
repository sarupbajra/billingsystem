import React from 'react'

// import React,{useState,useEffect} from 'react'
// import { tableDetailInfo } from "../utils/TableInfo";
import Card from "../component/Card";

export default function FoodItems() {
    // const [tableDetail, setTableDetail] = useState([]);
    // useEffect(() => {
    //     console.log("detail", tableDetailInfo);
    //     setTableDetail(tableDetailInfo);
    // }, []);

  return (
    // <div style={{ className: "vacantTable" }}>
    // <h2> Vacant Table </h2>

    // <div >
    //   {tableDetail.map((item, index) => {
    //     return <Card title={item.tableNo} tableStatus={item.status} />;
    //   })}
    // </div>
    // </div>
    <>
    <div><Card /></div>
    </>
  );
}