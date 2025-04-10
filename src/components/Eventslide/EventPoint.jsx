import React, { useRef, useState, useEffect } from "react";
import ReactDOM from "react-dom";
import EventPointView from "./EventPointView";
import "./Eventslide.scss";

const OutsideElement = ({ position, children, slideContainerRef }) => {
  if (!position) return null;

  return slideContainerRef.current
    ? ReactDOM.createPortal(
        <div
          className="outsideElement"
          style={{
            position: "absolute",
            top: `${position.top}px`,
            left: `${position.left}px`,
          }}
        >
          {children}
        </div>,
        slideContainerRef.current
      )
    : null;
};

const EventPoint = ({ leftView, topView, slideContainerRef }) => {
  const pointRef = useRef(null);
  const [position, setPosition] = useState(null);
  const [isOriginalSlide, setIsOriginalSlide] = useState(true); // 원본 여부 확인

  useEffect(() => {
    const updatePosition = () => {
      if (pointRef.current && slideContainerRef.current) {
        const slideElement = pointRef.current.closest(".slick-slide");

        // slick에서 클론된 슬라이드인지 체크
        const isClone =
          slideElement && slideElement.classList.contains("slick-cloned");

        setIsOriginalSlide(!isClone); // 원본 슬라이드만 활성화

        if (isClone) return; // 복제된 슬라이드면 좌표 업데이트 안 함

        const pointRect = pointRef.current.getBoundingClientRect();
        const slideRect = slideContainerRef.current.getBoundingClientRect();

        // 🛠 Slick `transform` 영향 보정
        const slickTransform = getComputedStyle(
          slideContainerRef.current
        ).transform;
        let transformX = 0;

        if (slickTransform !== "none") {
          const matrixValues = slickTransform.match(/matrix.*\((.+)\)/);
          if (matrixValues) {
            transformX = parseFloat(matrixValues[1].split(", ")[4]);
          }
        }

        // `left` 보정: 슬라이드 내부 기준 좌표 사용
        const adjustedLeft = pointRect.left - slideRect.left - transformX;

        setPosition({
          top: pointRect.top - slideRect.top,
          left: adjustedLeft,
        });
      }
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    return () => window.removeEventListener("resize", updatePosition);
  }, [pointRef, slideContainerRef]);

  if (!isOriginalSlide) return null; // 복제된 슬라이드라면 렌더링 X

  return (
    <div
      className="productPoint"
      ref={pointRef}
      style={{ top: `${topView}%`, left: `${leftView}%` }}
    >
      <div className="bigCirPoint">
        <div className="smallCirPoint"></div>
      </div>
      {position && (
        <OutsideElement
          position={position}
          slideContainerRef={slideContainerRef}
        >
          <EventPointView />
        </OutsideElement>
      )}
    </div>
  );
};

export default EventPoint;
