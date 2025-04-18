const BASE_URL = "https://yj901.github.io/kuora-db/db";

export const resolveImage = (path) => {
  // 상대 경로에서 ./ 제거하고 붙여서 완전한 URL로
  const cleanPath = path.replace(/^\.\//, ""); // "./imgs/a.jpg" → "imgs/a.jpg"
  return `${BASE_URL}/${cleanPath}`;
};
