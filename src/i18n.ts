type Content = {
  header: {
    items: string[];
  };
  home: {
    title: string;
  };
  characteristics: {
    title: string;
  };
  analytics: {
    title: string;
  };
};

export const CONTENTS: {[lang: string]: Content} = {
  "ja": {
    header: {
      items: [
        "トップ",
        "メンバー特徴",
        "アナリティクス",
      ],
    },
    home: {
      title: "PRODUCE 101 JAPAN THE GIRLS 推しメンメーカー",
    },
    characteristics: {
      title: "メンバー特徴",
    },
    analytics: {
      title: "アナリティクス",
    },
  },
  "en": {
    header: {
      items: [
        "HOME",
        "CHARACTERISTICS",
        "ANALYTICS",
      ],
    },
    home: {
      title: "PRODUCE 101 JAPAN THE GIRLS RANKER",
    },
    characteristics: {
      title: "CHARACTERISTICS",
    },
    analytics: {
      title: "ANALYTICS",
    },
  },
  "zh": {
    header: {
      items: [
        "首頁",
        "成員特徵",
        "數據分析",
      ],
    },
    home: {
      title: "PRODUCE 101 JAPAN THE GIRLS 出道組金字塔",
    },
    characteristics: {
      title: "成員特徵",
    },
    analytics: {
      title: "數據分析",
    },
  },
};
