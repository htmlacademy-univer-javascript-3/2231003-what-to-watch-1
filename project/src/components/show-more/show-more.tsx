import React from 'react';

type Props = {
  onClick: () => void,
};

const ShowMore: React.FC<Props> = (props) => {
  const {onClick} = props;

  return (
    <div className="catalog__more">
      <button className="catalog__button" type="button" onClick={onClick}>Show more</button>
    </div>
  );
};

export default ShowMore;
