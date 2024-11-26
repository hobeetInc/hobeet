declare global {
  interface Window {
    daum: {
      Postcode: new (config: {
        oncomplete: (data: {
          userSelectedType: string;
          roadAddress: string;
          jibunAddress: string;
          bname: string;
          buildingName: string;
          apartment: string;
          zonecode: string;
        }) => void;
      }) => {
        open: () => void;
      };
    };
  }
}

export {}
