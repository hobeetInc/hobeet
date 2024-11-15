// 주소 데이터 타입
export interface AddressData {
  zonecode: string; // 우편주소
  address: string; // 기본주소
  detailAddress: string; // 상세주소
}

// 다음 우편주소 데이터 타입
export interface DaumPostcodeData {
  userSelectedType: string; // 사용자가 선택한 주소 타입
  roadAddress: string; // 도로명 주소
  jibunAddress: string; // 지번 주소
  bname: string; // 법정동/법정리 이름
  buildingName: string; // 건물명
  apartment: string; // 아파트 여부
  zonecode: string; // 우편번호
}
