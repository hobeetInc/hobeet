//페이먼트 버튼 props
export type PaymentButtonProps = {
  clubType: boolean;
  clubId: number;
  agreeChecked: boolean;
};

// 에그팝 데이터 타입
export type EggPopData = {
  one_time_club_name: string;
  one_time_club_location: string;
  one_time_club_date_time: string;
  one_time_image: string | null;
  one_time_tax: number;
  m_category: {
    m_c_name: string;
  };
};

// 에그클럽 데이터 타입
export type EggClubData = {
  r_c_notification_name: string;
  r_c_notification_location: string;
  r_c_notification_date_time: string;
  r_c_notification_image: string;
  r_c_notification_tax: number;
  r_c_id:
    | {
        m_c_id: {
          m_c_name: string;
        };
      }
    | {
        m_c_id: Array<{
          m_c_name: string;
        }>;
      };
};

// 에그팝 지불 타입
export type EggPopPay = {
  o_t_c_kakaopay_cid: string;
  o_t_c_kakaopay_tid: string;
};

// 에그 클럽 지불 타입
export type EggClubPay = {
  r_c_notification_kakaopay_cid: string;
  r_c_notification_kakaopay_tid: string;
};

// 에그팝 참가비 없는 버전
export type EggPopDataNoTax = {
  one_time_club_name: string;
  one_time_club_location: string;
  one_time_club_date_time: string;
  one_time_image: string | null;
  m_category: {
    m_c_name: string;
  };
};

// 에그클럽 참가비 없는 버전
export type EggClubDataNoTax = {
  r_c_notification_name: string;
  r_c_notification_location: string;
  r_c_notification_date_time: string;
  r_c_notification_image: string;
  r_c_id: {
    m_c_id: {
      m_c_name: string;
    };
  };
};
