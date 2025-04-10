import React from "react";
import EventSlide from "../../components/Eventslide/Eventslide";
import "./Event.scss";
import EventTop from "../../components/EventsComp/EventTop";
import EventProfiles from "../../components/EventsComp/EventProfiles";
import EventDesinger from "../../components/EventsComp/EventDesinger";
import EventProducts from "../../components/EventsComp/EventProducts";

const Event = () => {
  return (
    <>
      <div className="bread">
        <p>HOME &gt; EVENT</p>
      </div>
      <EventTop />
      <EventProfiles />
      <EventDesinger />
      <section className="event_furniture">
        <div className="inner1500">
          <div className="desc_wrap">
            <p className="desc">
              이번 컬렉션에서,&nbsp;
              <br />
              그가 바라보는 선과 공간의 언어, 그리고 하이엔드 가구의 정수를
              마주해 보세요.
            </p>
            <p className="desc">
              가구를 넘어선 조형적 가치와 생활 속 오브제로서의 존재감을&nbsp;
              <br />
              지금 이 공간에서 경험하실 수 있습니다.
            </p>
          </div>
          <EventSlide />
          <EventProducts />
        </div>
      </section>
    </>
  );
};

export default Event;
