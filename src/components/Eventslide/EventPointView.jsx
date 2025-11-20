import React from "react";
import { Link } from "react-router-dom";
import "./Eventslide.scss";

const EventPointView = React.memo(({ data }) => {
  if (!data) return null;
  return (
    <div className="point_viewBox">
      <figure>
        <img src={data?.img.thumbnailImg[0]} alt={data?.title} />
      </figure>
      <div className="txt">
        <h5>{data?.title}</h5>
        <p>{data?.info.designer}</p>
      </div>
      <Link to={`/detail?id=${data.info.code}`}>
        <div className="productGoBtn">
          <p>TO THE PRODUCT</p>
        </div>
      </Link>
    </div>
  );
});

export default EventPointView;
