export const siteConfig = {
  name: "Blufacade",
  tagline: "Inspiring Skylines",
  description: "At Blufacade, we specialize in delivering innovative, high-quality façade solutions that redefine the visual identity and performance of modern buildings.",
  url: "https://www.blufacade.com",
  
  contact: {
    phone: "9994162996",
    email: "blufacadein@gmail.com",
    address: "#35/39, S5, Avyaya Apartments, East Tambaram, Chennai - 600059",
  },
  
  branches: ["Chennai", "Madurai", "Dindigul"],
  
  social: {
    instagram: "https://www.instagram.com/blufacade_/",
    linkedin: "https://www.linkedin.com/company/blufacade/",
    facebook: "https://www.facebook.com/Blufacade",
  },
  
  services: [
    {
      id: "acp",
      title: "ACP (Aluminium Composite Panel)",
      description: "Premium aluminium composite panels for modern building exteriors with excellent durability and aesthetic appeal.",
      icon: "Building2",
    },
    {
      id: "aluminium-doors-windows",
      title: "Aluminium Doors and Windows",
      description: "High-quality aluminium doors and windows designed for durability, energy efficiency, and modern aesthetics.",
      icon: "DoorOpen",
    },
    {
      id: "structural-glazing",
      title: "Structural Glazing",
      description: "Advanced structural glazing systems that create seamless glass facades with superior weather resistance.",
      icon: "Layers",
    },
    {
      id: "hpl",
      title: "HPL (High-Pressure Laminate)",
      description: "Durable high-pressure laminate cladding solutions for exterior and interior applications.",
      icon: "LayoutGrid",
    },
    {
      id: "dgu-semi-unitised",
      title: "DGU Semi Unitised",
      description: "Double glazed unit semi-unitised systems for enhanced thermal and acoustic insulation.",
      icon: "Square",
    },
    {
      id: "canopy-work",
      title: "Canopy Work",
      description: "Custom canopy solutions that provide shelter while enhancing architectural beauty.",
      icon: "Umbrella",
    },
    {
      id: "glass-partition",
      title: "Glass Partition",
      description: "Elegant glass partition systems for modern office spaces and commercial interiors.",
      icon: "PanelLeft",
    },
    {
      id: "spider-glazing",
      title: "Spider Glazing",
      description: "Innovative spider glazing systems for stunning frameless glass facades.",
      icon: "Sparkles",
    },
  ],
  
  themeColors: {
    primary: "#014a74",
    secondary: "#f58420",
    background: "#fefaf6",
    dark: "#012d47",
    lightBlue: "#0369a1",
  },
}

export type SiteConfig = typeof siteConfig
