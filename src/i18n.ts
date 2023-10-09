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
    heightChart: {
      title: string;
    };
  };
  analytics: {
    title: string;
    description: string;
    updatedAtFn: (updatedAtStr: string) => string;
    overviewTab: {
      title: string;
      table: {
        titles: string[];
        columns: string[];
      };
    };
    detailsTab: {
      title: string;
      table: {
        columns: string[];
      };
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
      heightChart: {
        title: "身長",
      },
    },
    analytics: {
      title: "アナリティクス",
      description: "The analytics include the view counts of the following videos:\nthe LEAP HIGH stage fancams, the 1 min PR videos and the LEAP HIGH eye contact videos.\nThe view counts are updated every hour.",
      updatedAtFn: (updatedAtStr: string) => `${updatedAtStr} に更新されました`,
      overviewTab: {
        title: "映像アナリティクス (OVERVIEW)",
        table: {
          titles: [
            "LEAP HIGH ステージ映像 (2023-09-03)",
            "1分PR映像 (2023.09.04)",
            "アイコンタクト映像 (2023-09-28)",
            "A-Fクラス分け評価 (2023-10-05)",
            "パクパク早食い対決 (2023-10-08)",
          ],
          columns: [
            "#",
            "映像",
            "再生回数",
          ],
        },
      },
      detailsTab: {
        title: "映像アナリティクス (DETAILS)",
        table: {
          columns: [
            "#",
            "練習生",
            "LEAP HIGH ステージ映像",
            "1分PR映像",
            "LEAP HIGH アイコンタクト映像",
            "パクパク早食い対決",
          ],
        },
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
        title: "Birthyear",
      },
      heightChart: {
        title: "Height",
      },
    },
    analytics: {
      title: "ANALYTICS",
      description: "The analytics include the view counts of the following videos:\nthe LEAP HIGH stage fancams, the 1 min PR videos and the LEAP HIGH eye contact videos.\nThe view counts are updated every hour.",
      updatedAtFn: (updatedAtStr: string) => `Updated at ${updatedAtStr}`,
      overviewTab: {
        title: "VIDEO ANALYTICS (OVERVIEW)",
        table: {
          titles: [
            "LEAP HIGH FANCAM (2023-09-03)",
            "1 MIN PR (2023.09.04)",
            "EYE CONTACT (2023-09-28)",
            "LEVEL DIVISION TEST (2023-10-05)",
            "SPEED EATING (2023-10-08)",
          ],
          columns: [
            "#",
            "VIDEO",
            "VIEWS",
          ],
        },
      },
      detailsTab: {
        title: "VIDEO ANALYTICS (DETAILS)",
        table: {
          columns: [
            "#",
            "TRAINEE",
            "LEAP HIGH FANCAM",
            "1 MIN PR",
            "EYE CONTACT",
            "SPEED EATING",
          ],
        },
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
      heightChart: {
        title: "身高",
      },
    },
    analytics: {
      title: "數據分析",
      description: "The analytics include the view counts of the following videos:\nthe LEAP HIGH stage fancams, the 1 min PR videos and the LEAP HIGH eye contact videos.\nThe view counts are updated every hour.",
      updatedAtFn: (updatedAtStr: string) => `更新於 ${updatedAtStr}`,
      overviewTab: {
        title: "影片數據分析 (OVERVIEW)",
        table: {
          titles: [
            "LEAP HIGH 舞台直拍 (2023-09-03)",
            "1分鐘PR影片 (2023.09.04)",
            "LEAP HIGH 眼神交流影片 (2023-09-28)",
            "A-F分級評價 (2023-10-05)",
            "吃甜甜圈對決 (2023-10-08)",
          ],
          columns: [
            "#",
            "影片",
            "觀看次數",
          ],
        },
      },
      detailsTab: {
        title: "影片數據分析 (DETAILS)",
        table: {
          columns: [
            "#",
            "練習生",
            "LEAP HIGH 舞台直拍",
            "1分鐘PR影片",
            "LEAP HIGH 眼神交流影片",
            "吃甜甜圈對決",
          ],
        },
      }
    },
  },
};
