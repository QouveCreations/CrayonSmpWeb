export const footerConfig = {
  columnGap: "100px",
  columns: [
    {
      id: "demo_features",
      enabled: false,
      title: "demo_features",
      items: [
        { text: "Rules", url: "/rules" },
        {
          text: "Color",
          url: "https://www.colorhexa.com/ff0040",
          externalIcon: true,
          color: "#ff0040",
          hoverColor: "#ff0040"
        },
        { text: "Status", url: "https://status.crayonsmp.net", externalIcon: true },
      ]
    },
    
    {
      id: "community",
      enabled: true,
      title: "Community",
      items: [
        { text: "Discord", url: "https://discord.gg/XxbGMFe8Hg", externalIcon: true },
        { text: "GitHub", url: "https://github.com/CrayonSMP", externalIcon: true },
        { text: "Instagram", url: "https://instagram.com/crayonsmp_qooper", externalIcon: true },
        { text: "Youtube", url: "https://www.youtube.com/@CrayonSMP-OTH", externalIcon: true }
      ]
    },
    {
      id: "legal",
      enabled: true,
      title: "Legal",
      items: [
        { text: "Imprint", url: "/imprint" },
        { text: "Rules & Terms", url: "/rules" },
      ]
    },
  ]
};
