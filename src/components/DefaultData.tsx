type DataType =
  | '404'
  | '502'
  | 'emptyFolder'
  | 'connectError'
  | 'noFile'
  | 'noMessage'
  | 'noTeam'
  | 'searchNull'
  | 'update';
// 缺省图
export default ({ type }: { type: DataType }) => {
  // const uploadImage = require(`../assets/image/illustration/${type}.png`)
  return (
    <div
      className={'flex flex_align flex_justify'}
      style={{ width: '100%', height: '100%' }}
    >
      <img src={require(`../assets/image/illustration/${type}.png`)} alt="" />
    </div>
  );
};
