import React from "react";

const EventTop = () => {
  return (
    <section className="sub_event_top">
      <div className="inner">
        <div className="banner_bg">
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
