const Items = ({ Icon, Text }) => {
  return (
    <>
      <div className='sidebar__small__items'>
        {Icon}
        <p>{Text}</p>
      </div>
    </>
  );
};

export default Items;
