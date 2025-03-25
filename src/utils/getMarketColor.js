/*
마켓 코드에 따라 특정 색상을 반환
코드의 첫 번째 글자를 기준으로 미리 정의된 색상 팔레트에서 색상 가져옴
백엔드에서 전달받은 코드 값에 따라 UI 색상을 동적으로 적용
*/


const COLORS = { //색상 팔레트 정의
  purple: "#d19fe9",
  green: "#7cd9c2",
  yellow: "#f7d16f",
};

function getMarketColor(code = "000") { //마켓 코드에 따라 색상 반환
  const firstCode = code.charAt(0);
  switch (firstCode) {
    case 3:
    case 9:
      return COLORS.green;
    case 5:
      return COLORS.yellow;
    case 1:
    case 7:
    case 8:
    default:
      return COLORS.green;
  }
}

export default getMarketColor;
