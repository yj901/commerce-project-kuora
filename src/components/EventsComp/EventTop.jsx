import React from "react";
import Bg from "../../assets/imgs/events/event_top_banner2.jpg";

const EventTop = () => {
  return (
    <section className="sub_event_top">
      <div className="inner">
        <div className="banner_bg">
          <img src={Bg} alt="banner" />
          <div className="txt_wrap">
            <h3>SPECIAL EXHIBITION</h3>
            <hr />
            <p>
              DESIGNER <span>ELIAS KLEMENS</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default React.memo(EventTop);
