const sidebar = [
    {
        id:'loginstatus',
        name:'login'
    },
    {
        id:'homeid',
        name:'home'
    },
    {
        id:'aboutid',
        name:'about'
    },
    {
        id:'profileid',
        name:'profile'
    }
   
];
const logo = {
    
    imageUrl: "http://localhost:3000/img/elogo.jpg", 
    title: 'Buy Z0ne'
};


const productdetais = [
  {
    img: "http://localhost:3000/img/airpods.jpg",
    productName: "airpods",
    productPrice: "PRICE RS.300/-",
    description: {
      BatteryLife: "Up to 30 hours",
      Connectivity: "Bluetooth 5.0",
      NoiseCancellation: "Yes,no",
      ChargingPort: "USB-C",
    },
  },
  {
    img: "http://localhost:3000/img/laptop.jpg",
    productName: "laptop",
    productPrice: "PRICE RS.300/-",
    description: {
      Processor: "Intel Core i7-13700H, 13th Gen",
      RAM: "16GB DDR5",
      Storage: "1TB SSD",
      Display: "15.6-inch 4K UHD+ (3840 x 2400) InfinityEdge Touch display",
      Graphics: "NVIDIA GeForce RTX 4070 8GB GDDR6",
      OperatingSystem: "Windows 11 Home",
      Ports: "Thunderbolt 4, USB-A 3.2, HDMI 2.1, SD card reader, audio jack",
    },
  },
  {
    img: "http://localhost:3000/img/phone.jpg",
    productName: "phone",
    productPrice: "PRICE RS.500/-",
    description: {
      DesignandDisplay:
        "Describe the phone's sleek design, screen size, resolution, and display technology",
      CameraSystem:
        "Emphasize the advanced camera features, such as sensor size, image stabilization, video recording capabilitie",
      Performance:
        "Explain the power of the A-series chip, highlighting its speed and efficiency for gaming, multitasking, and AI-powered features",
      Battery:
        "Mention the battery capacity and estimated usage time for typical daily tasks.",
    },
  },
  {
    img: "http://localhost:3000/img/shoe.jpg",
    productName: "shoe",
    productPrice: "PRICE RS.700/-",
    description: {
      Style: "Casual, athletic, formal",
      Material: "synthetic",
      Color: "Specify colors available",
      Sizes: "Include size chart and sizing information",
    },
  },
  {
    img: "http://localhost:3000/img/watchmodel.jpg",
    productName: "watch",
    productPrice: "PRICE RS.1300/-",
    description: {
      CaseMaterial: " Detail the case material",
      Crystal: "Describe the type of crystal",
      StrapBracelet:
        "Detail the material, style, and closure mechanism of the strap or bracelet",
      WaterResistance: "Specify the water resistance rating ",
      DialFeatures: "Describe the dial color, complications",
    },
  },
  {
    img: "http://localhost:3000/img/makeup.jpg",
    productName: "makeup",
    productPrice: "PRICE RS.3300/-",
    description: {
      ProductVariety: "foundation, mascara, lipstick",
      ProductInformation:
        "Each product listing includes a description highlighting its benefits, ingredients",
      Makeup: "facial cosmetics, as eye shadow or lipstick",
      Features: "a feature of objects that makes them pleasurable to perceive",
    },
  },
  {
    img: "http://localhost:3000/img/tv.jpg",
    productName: "tv",
    productPrice: "PRICE RS.3500/-",
    description: {
      Model: "SAMSUNG TV",
      Display: "42.6-inch FHD+ (1920 x 1200) IPS",
      GraphicsCard: "NVIDIA GeForce RTX 4060",
      Features: "Smart Android TV",
      PortsandConnectivity: "Thunderbolt 4, USB-A, HDMI",
    },
  },
  {
    img: "http://localhost:3000/img/womendress.jpg",
    productName: "clothes",
    productPrice: "PRICE RS.24300/-",
    description: {
      liklelook: "Eye-catching",
      design: "Unique",
      brandstype: "Luxurious",
      coloe: "brown",
    },
  },
];



module.exports={
    sidebar,
    logo,
    productdetais,
}