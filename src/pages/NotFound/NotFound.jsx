import { useNavigate } from "react-router-dom";
import "./NotFound.scss";

const NotFound = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <div className="notfound_wrapper">
      <div className="notfound_content">
        <div className="notfound_icon">
          <i className="fa-solid fa-couch"></i>
        </div>
        <h2 className="notfound_title">페이지를 찾을 수 없습니다</h2>
        <p className="notfound_description">
          지금 입력하신 주소의 페이지는 사라졌거나 다른 페이지로 변경되었습니다.
        </p>
        <p className="notfound_guide">주소를 다시 확인해 주세요.</p>
        <div className="notfound_buttons">
          <button onClick={handleGoBack} className="btn_back">
            <i className="fa-solid fa-angle-left"></i>
            이전 페이지
          </button>
          <button onClick={handleGoHome} className="btn_home">
            <i className="fa-solid fa-house"></i>
            홈으로 가기
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
