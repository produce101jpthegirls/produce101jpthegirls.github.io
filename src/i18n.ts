type I18nContent = {
  header: {
    items: string[];
  };
  home: {
    title: string;
    description: string;
    selectionPanel: {
      title: string;
    };
  };
  characteristics: {
    title: string;
    description: string;
    mbtiChart: {
      title: string;
    };
    birthyearChart: {
      title: string;
    };
  };
  analytics: {
    title: string;
    description: string;
    viewCountTable: {
      title: string;
      updatedAtFn: (updatedAtStr: string) => string;
      columns: string[];
    };
  };
};

export const CONTENTS: { [lang: string]: I18nContent } = {
  "ja": {
    header: {
      items: [
        "トップ",
        "特徴",
        "アナリティクス",
      ],
    },
    home: {
      title: "PRODUCE 101 JAPAN THE GIRLS 推しメンメーカー",
      description: "初めて羽ばたいた101人の少女たちが デビューを目指して集ました\n夢の花道に向かって駆け抜ける 彼女たちを応援していきましょう",
      selectionPanel: {
        title: "推しメンバー",
      },
    },
    characteristics: {
      title: "特徴",
      description: "Visualiztion of the MBTI and birthyear distributions.",
      mbtiChart: {
        title: "MBTI",
      },
      birthyearChart: {
        title: "生まれ年",
      },
    },
    analytics: {
      title: "アナリティクス",
      description: "The analytics include the view counts of the following videos:\nthe LEAP HIGH stage fancams, the 1 min PR videos and the LEAP HIGH eye contact videos.\nThe view counts are updated every hour.",
      viewCountTable: {
        title: "映像アナリティクス",
        updatedAtFn: (updatedAtStr: string) => `${updatedAtStr} に更新されました`,
        columns: [
          "#",
          "練習生",
          "LEAP HIGH ステージ映像",
          "1分PR映像",
          "LEAP HIGH アイコンタクト映像",
        ],
      },
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
      description: "初めて羽ばたいた101人の少女たちが デビューを目指して集ました\n夢の花道に向かって駆け抜ける 彼女たちを応援していきましょう",
      selectionPanel: {
        title: "MY TOP 11",
      },
    },
    characteristics: {
      title: "CHARACTERISTICS",
      description: "Visualiztion of the MBTI and birthyear distributions.",
      mbtiChart: {
        title: "MBTI",
      },
      birthyearChart: {
        title: "Birthyears",
      },
    },
    analytics: {
      title: "ANALYTICS",
      description: "The analytics include the view counts of the following videos:\nthe LEAP HIGH stage fancams, the 1 min PR videos and the LEAP HIGH eye contact videos.\nThe view counts are updated every hour.",
      viewCountTable: {
        title: "VIDEO ANALYTICS",
        updatedAtFn: (updatedAtStr: string) => `Updated at ${updatedAtStr}`,
        columns: [
          "#",
          "TRAINEE",
          "LEAP HIGH FANCAM",
          "1 MIN PR",
          "EYE CONTACT",
        ],
      },
    },
  },
  "zh": {
    header: {
      items: [
        "首頁",
        "特色",
        "數據分析",
      ],
    },
    home: {
      title: "PRODUCE 101 JAPAN THE GIRLS 出道組金字塔",
      description: "101位初次展翅的少女們，以出道為目標齊聚一堂\n讓我們一起在背後應援她們，祝福女孩們順利走花路吧🌸",
      selectionPanel: {
        title: "我的出道組合",
      },
    },
    characteristics: {
      title: "特色",
      description: "Visualiztion of the MBTI and birthyear distributions.",
      mbtiChart: {
        title: "MBTI",
      },
      birthyearChart: {
        title: "出生年份",
      },
    },
    analytics: {
      title: "數據分析",
      description: "The analytics include the view counts of the following videos:\nthe LEAP HIGH stage fancams, the 1 min PR videos and the LEAP HIGH eye contact videos.\nThe view counts are updated every hour.",
      viewCountTable: {
        title: "影片數據分析",
        updatedAtFn: (updatedAtStr: string) => `更新於 ${updatedAtStr}`,
        columns: [
          "#",
          "練習生",
          "LEAP HIGH 舞台影片",
          "1分鐘PR影片",
          "LEAP HIGH 眼神交流影片",
        ],
      }
    },
  },
};
