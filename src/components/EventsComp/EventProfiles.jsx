import React from "react";

const EventProfiles = () => {
  return (
    <>
      <section className="event_profile epf1">
        <div className="inner1500">
          <dl>
            <dt className="txt">
              <h5>Furniture Designer & Creator</h5>
              <h4>Elias Klemens</h4>
              <p>
                형태를 넘어 시간과 공간을 디자인하는 장인의 철학은&nbsp;
                <br />
                소재의 본질과 선의 미학을 탐구하며,&nbsp;
                <br />
                일상의 오브제를 예술적 조형으로 완성한다.
              </p>
              <p>
                그의 작업은 간결하지만 결코 단순하지 않고&nbsp;
                <br />
                고요하지만 공간 속에서 선명히 존재한다.
              </p>
            </dt>
            <dd className="img">
              <figure className="img1"></figure>
            </dd>
          </dl>
        </div>
      </section>
      <section className="event_profile epf2">
        <div className="inner1500">
          <dl>
            <dt className="txt">
              <p>
                정교한 비례, 섬세한 균형,&nbsp;
                <br />
                그리고 곡선과 직선의 조형적 대비가 만들어내는 긴장감은&nbsp;
                <br />
                그의 작품에 고유한 리듬과 생명력을 부여한다.
              </p>
              <p>
                손끝의 온기가 깃든 작품들은&nbsp;
                <br />
                시간이 흐를수록 더 깊어지는 아름다움을 지니며&nbsp;
                <br />
                사용자에게 조용한 영감을 건넨다.
              </p>
            </dt>
            <dd className="img">
              <figure className="img2"></figure>
            </dd>
          </dl>
        </div>
      </section>
    </>
  );
};

export default React.memo(EventProfiles);
