const BASE_URL = "https://yj901.github.io/kuora-db/db";

export const resolveImage = (path) => {
  // 상대 경로에서 ./ 제거하고 붙여서 완전한 URL로
  const cleanPath = path.replace(/^\.\//, ""); // "./imgs/a.jpg" → "imgs/a.jpg"
  return `${BASE_URL}/${cleanPath}`;
};

// // Webpack : src/db/imgs 내부 이미지 모두 읽기
// const context = require.context("../db/imgs", true, /\.(jpe?g|png|webp)$/i);

// // 이미지 경로 매핑 객체 생성
// const imageMap = context.keys().reduce((acc, key) => {
//   const cleanKey = key.replace("./", "");
//   acc[`./imgs/${cleanKey}`] = context(key);
//   return acc;
// }, {});

// // JSON에 있는 경로 문자열을 실제 이미지 경로로 변환해주는 함수
// export const resolveImage = (path) => {
//   return imageMap[path] || null;
// };
