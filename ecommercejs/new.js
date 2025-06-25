const highlight = document.getElementById("highlight");
// const highlightId="#highlight";
const productList = document.getElementById("productList");

const categery = [
  {
    img: "elctronic.jpg",
    text: "electronic",
  },
  {
    img: "women.jpg",
    text: "Womens",
  },
  {
    img: "mens.jpg",
    text: "Mens",
  },
];

function displayhigh(arrays) {
  arrays.forEach((images) => {
    const categeryProduct = document.createElement("div");
    categeryProduct.setAttribute("class", "boxsize");
    const categeryimage = document.createElement("img");
    categeryimage.setAttribute("class", "elecimage");
    const categerytext = document.createElement("p");
    categerytext.setAttribute("class", "text");
    categeryimage.src = `../img/${images.img}`;
    categerytext.textContent = images.text;

    categeryProduct.appendChild(categeryimage);
    categeryProduct.appendChild(categerytext);
    highlight.appendChild(categeryProduct);
  });
}

displayhigh(categery);

const productdetais = [
  {
    img: "airpods.jpg",
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
    img: "laptop.jpg",
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
    img: "phone.jpg",
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
    img: "shoe.jpg",
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
    img: "watchmodel.jpg",
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
    img: "makeup.jpg",
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
    img: "tv.jpg",
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
    img: "womendress.jpg",
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

productdetais.forEach((list) => {
  // Convert description object (if present) into list items

  const allDetails = document.createElement("div");
  allDetails.innerHTML = `   
    <div class="cover">
      <i class="toggleButton" style="cursor: pointer; font-size: 24px;" data-added="false">♥</i>
      <img src="../img/${list.img}" class="productdetailsimg">
      <h4>${list.productName}</h4>
      <h6>${list.productPrice}</h6>
      
    </div>
  `;

  productList.appendChild(allDetails);

  const images = allDetails.querySelector(".productdetailsimg");

  images.addEventListener("click", () => {
    productDescription(list);
  });
});

const indualDetail = document.getElementById("indualDetails");

function productDescription(products) {
  let descriptionHTML = "";
  if (products.description) {
    descriptionHTML = `
      <ul>
        ${Object.entries(products.description)
          .map(([key, value]) => {
            return `<li><strong>${key}:</strong> ${value}</li>`;
          })
          .join("")}
      </ul>
    `;
  }
  // productList.style.display = "none";
  productList.classList.add("hidden");
  // indualDetail.style.display = "block";
  indualDetail.classList.remove("hidden");
  indualDetail.innerHTML = `
        <div class="alter">
            <img src="../img/${products.img}">
            <p>${products.productName}</p>
            <h3>${products.productPrice}</h3>
            ${descriptionHTML}
         
                <button class="button1">SHOP NOW</button>
                <button id="button2">BACK</button>
        </div>
        `;
  // Back Button Function

  indualDetail.scrollIntoView({ behavior: "smooth" });
  document.getElementById("button2").addEventListener("click", () => {
    indualDetail.style.display = "none";
    productList.style.display = "grid";
    productList.scrollIntoView({ behavior: "smooth" });
  });
}

// burger button functions

const burgerbutton = document.getElementById("burgerbutton");

const buttondetails = document.getElementById("buttondetails");

burgerbutton.addEventListener("mouseover", () => {
  buttondetails.style.display = "block";
});

burgerbutton.addEventListener("mouseout", () => {
  buttondetails.style.display = "none";
});

buttondetails.addEventListener("mouseover", () => {
  buttondetails.style.display = "block";
});

buttondetails.addEventListener("mouseout", () => {
  buttondetails.style.display = "none";
});

const buttons = document.querySelectorAll(".toggleButton");

const display = document.getElementById("cart-count");

let count = 0;
let isAdded = false;

// Track toggle state

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    // Read the button's current state
    let isAdded = button.getAttribute("data-added") === "true";

    if (!isAdded) {
      count++;
      button.setAttribute("data-added", "true");
      button.style.color = "red";
    } else {
      count--;
      button.setAttribute("data-added", "false");
      button.style.color = "black";
    }

    display.textContent = count;
  });
});
