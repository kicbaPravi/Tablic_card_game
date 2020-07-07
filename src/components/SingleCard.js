import React from "react";
import { connect, useDispatch } from "react-redux";
import { clickOnCard } from "../store/actions/index";

const SingleCard = ({ cardObject, order, type }) => {
  const { image } = cardObject;

  const dispatch = useDispatch();

  return (
    <div>
      <img
        src={image}
        alt="image_card"
        onClick={() => dispatch(clickOnCard(cardObject, order, type))}
      />
    </div>
  );
};

export default connect(null, { clickOnCard })(SingleCard);
