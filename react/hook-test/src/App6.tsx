import { memo, useCallback, useEffect, useState } from "react";

function Aaa() {
    const [,setNum] = useState(1);

    const [count, setCount] = useState(2);


    useEffect(() => {
        setInterval(()=> {
            setNum(Math.random());
        }, 2000)
    },[]);

    useEffect(() => {
        setTimeout(()=> {
            setCount(Math.random());
        }, 2000)
    }, []);
  
  const testFn = useCallback(() => { 
    console.log('111', 111);
  }, [])

    return <div>
        <MemoBbb count={count} callback={testFn}></MemoBbb>
    </div>
} 

interface BbbProps {
  count: number;
  callback: () => void;
}

function Bbb(props: BbbProps) {
    console.log('bbb render');

    return <h2>{props.count}</h2>
}

const MemoBbb = memo(Bbb);

export default Aaa;
