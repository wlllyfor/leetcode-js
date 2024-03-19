import { createCurrentGameData, getRestNum } from '../utils/index';

function Detail() {
  const curGameData = createCurrentGameData();
  const restNum = getRestNum();
  console.log('curGameData', curGameData);
  return (
    <div className="detail">
      剩余：{ restNum }
    </div>
  );
}

export default Detail;