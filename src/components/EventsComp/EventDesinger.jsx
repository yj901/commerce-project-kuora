import React from "react";
import Banner from "../../assets/imgs/events/event_designer_banner.jpg";
import useScrollAni from "../../hook/useScrollAni";

const EventDesinger = () => {
  const [ref, isVisible] = useScrollAni(0.1);
  return (
    <section className="event_designer_banner">
      <img
        src={Banner}
        alt="Designer"
        ref={ref}
        className={`${isVisible ? "ani" : null}`}
      />
      <div>
        <p className="saying">
          "가구는 머무는 물건이 아니라, <br />
          <span>시간을 담는 조각</span>이다."
        </p>
        <p className="name">— Elias Klemens</p>
      </div>
    </section>
  );
};

export default React.memo(EventDesinger);
