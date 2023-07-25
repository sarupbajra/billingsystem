import React, {useState} from 'react'
import MainButton from '../component/MainButton';
export default function Quantity() {
    
    const [count,setCount] = useState(0);
    const handleButtonClick = (action) => {
        const countAsNumber = parseInt(count, 10);
        if (action=== '+') {
            setCount(countAsNumber + 1);
        }
        else if (action === '-' && countAsNumber > 0) {
            setCount(countAsNumber - 1);
          }
    }
  return (
    <>
    <div>{count}</div>
    <div>
        <MainButton title="+" onClick={()=>handleButtonClick("+")} />
        <MainButton title="-" onClick={()=>handleButtonClick("-")} />
    </div>
    </>
  )
}
