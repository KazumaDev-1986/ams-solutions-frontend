import { describe, test, expect } from "vitest";
import { createProductDetail } from "../../data/models/ProductDetail";

describe("ProductDetail Model", () => {
  const mockProductDetailData = {
    id: "test-id",
    brand: "Test Brand",
    model: "Test Model",
    price: "100",
    imgUrl: "https://test.com/image.jpg",
    networkTechnology: "GSM / HSPA / LTE",
    networkSpeed: "HSPA 42.2/11.5 Mbps  LTE Cat4 150/50 Mbps",
    gprs: "Yes",
    edge: "Yes",
    announced: "2016  August",
    status: "Available. Released 2016  October",
    dimentions: "191.7 x 101 x 9.4 mm",
    weight: "260",
    sim: "Dual SIM",
    displayType: "IPS LCD",
    displayResolution: "7.0 inches",
    displaySize: "720 x 1280 pixels",
    os: "Android 6.0",
    cpu: "Quad-core 1.3 GHz",
    chipset: "Mediatek MT8735",
    gpu: "Mali-T720MP2",
    externalMemory: "microSD",
    internalMemory: ["16 GB", "32 GB"],
    ram: "2 GB RAM",
    primaryCamera: ["13 MP", "autofocus"],
    secondaryCmera: ["2 MP", "720p"],
    speaker: "Yes",
    audioJack: "Yes",
    wlan: ["Wi-Fi 802.11 a/b/g/n", "Wi-Fi Direct"],
    bluetooth: ["4.0", "A2DP"],
    gps: "Yes with A-GPS",
    nfc: "",
    radio: "FM radio",
    usb: "microUSB 2.0",
    sensors: ["Accelerometer", "proximity"],
    battery: "Non-removable Li-Ion 3400 mAh",
    colors: ["Black"],
    options: {
      colors: [{ code: 1000, name: "Black" }],
      storages: [
        { code: 2000, name: "16 GB" },
        { code: 2001, name: "32 GB" },
      ],
    },
  };

  test("should create a product detail with valid data", () => {
    const productDetail = createProductDetail(mockProductDetailData);
    expect(productDetail).toEqual(mockProductDetailData);
  });

  test("should handle missing optional fields", () => {
    const productDetail = createProductDetail({
      id: "test-id",
      brand: "Test Brand",
      model: "Test Model",
      price: "100",
      imgUrl: "https://test.com/image.jpg",
    });

    expect(productDetail).toEqual({
      id: "test-id",
      brand: "Test Brand",
      model: "Test Model",
      price: "100",
      imgUrl: "https://test.com/image.jpg",
      networkTechnology: undefined,
      networkSpeed: undefined,
      gprs: undefined,
      edge: undefined,
      announced: undefined,
      status: undefined,
      dimentions: undefined,
      weight: undefined,
      sim: undefined,
      displayType: undefined,
      displayResolution: undefined,
      displaySize: undefined,
      os: undefined,
      cpu: undefined,
      chipset: undefined,
      gpu: undefined,
      externalMemory: undefined,
      internalMemory: undefined,
      ram: undefined,
      primaryCamera: undefined,
      secondaryCmera: undefined,
      speaker: undefined,
      audioJack: undefined,
      wlan: undefined,
      bluetooth: undefined,
      gps: undefined,
      nfc: undefined,
      radio: undefined,
      usb: undefined,
      sensors: undefined,
      battery: undefined,
      colors: undefined,
      options: undefined,
    });
  });

  test("should not modify the input data", () => {
    const inputData = { ...mockProductDetailData };
    createProductDetail(inputData);
    expect(inputData).toEqual(mockProductDetailData);
  });
});
