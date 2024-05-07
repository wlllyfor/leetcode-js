import { useEffect, useRef } from 'react'

function App() {
  const ref = useRef<HTMLDivElement>(null);

  function getTotalOffsetTop(element: HTMLElement) {
    let totalOffsetTop = 0;
    while (element) {
      if(totalOffsetTop > 0) {
        totalOffsetTop += element.clientTop;
      }
      totalOffsetTop += element.offsetTop;
      element = element.offsetParent as HTMLElement;
    }
    return totalOffsetTop;
  }

  useEffect(() => {
    console.log('offsetTop', ref.current?.offsetTop);
    console.log('clientTop', ref.current?.clientTop);

    console.log('totol offsetTop', getTotalOffsetTop(ref.current!))
      
  }, []);

  return (
    <div>
      <div style={
        {
          position: 'relative',
          margin: '100px',
          padding: '200px',
          border: '10px solid blue'
        }
      }>
        <div id="box" ref={ref} style={{
          border: '20px solid #000',
          width: '100px',
          height: '100px',
          background: 'pink',
        }}>
        </div>
      </div>
    </div>
  )
}

export default App
