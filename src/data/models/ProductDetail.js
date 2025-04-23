import { createProduct } from "./Product";

/**
 * @typedef {Object} ProductOption
 * @property {number} code - Option code
 * @property {string} name - Option name
 */

/**
 * @typedef {Object} ProductOptions
 * @property {ProductOption[]} colors - Color options
 * @property {ProductOption[]} storages - Storage options
 */

/**
 * @typedef {Object} ProductDetail
 * @property {string} id - Unique product identifier
 * @property {string} brand - Product brand
 * @property {string} model - Product model
 * @property {string} price - Product price
 * @property {string} imgUrl - Product image URL
 * @property {string} networkTechnology - Network technology
 * @property {string} networkSpeed - Network speed
 * @property {string} gprs - GPRS support
 * @property {string} edge - EDGE support
 * @property {string} announced - Announcement date
 * @property {string} status - Product status
 * @property {string} dimentions - Product dimensions
 * @property {string} weight - Product weight
 * @property {string} sim - SIM type
 * @property {string} displayType - Display type
 * @property {string} displayResolution - Display resolution
 * @property {string} displaySize - Display size
 * @property {string} os - Operating system
 * @property {string} cpu - CPU
 * @property {string} chipset - Chipset
 * @property {string} gpu - GPU
 * @property {string} externalMemory - External memory
 * @property {string[]} internalMemory - Internal memory options
 * @property {string} ram - RAM
 * @property {string[]} primaryCamera - Primary camera
 * @property {string[]} secondaryCmera - Secondary camera
 * @property {string} speaker - Speaker
 * @property {string} audioJack - Audio jack
 * @property {string[]} wlan - WiFi
 * @property {string[]} bluetooth - Bluetooth
 * @property {string} gps - GPS
 * @property {string} nfc - NFC
 * @property {string} radio - Radio
 * @property {string} usb - USB
 * @property {string[]} sensors - Sensors
 * @property {string} battery - Battery
 * @property {string[]} colors - Available colors
 * @property {ProductOptions} options - Configuration options
 */

/**
 * Creates a ProductDetail instance
 * @param {Object} data - Product data
 * @returns {ProductDetail}
 */
export const createProductDetail = (data) => ({
  ...createProduct(data),
  networkTechnology: data.networkTechnology,
  networkSpeed: data.networkSpeed,
  gprs: data.gprs,
  edge: data.edge,
  announced: data.announced,
  status: data.status,
  dimentions: data.dimentions,
  weight: data.weight,
  sim: data.sim,
  displayType: data.displayType,
  displayResolution: data.displayResolution,
  displaySize: data.displaySize,
  os: data.os,
  cpu: data.cpu,
  chipset: data.chipset,
  gpu: data.gpu,
  externalMemory: data.externalMemory,
  internalMemory: data.internalMemory,
  ram: data.ram,
  primaryCamera: data.primaryCamera,
  secondaryCmera: data.secondaryCmera,
  speaker: data.speaker,
  audioJack: data.audioJack,
  wlan: data.wlan,
  bluetooth: data.bluetooth,
  gps: data.gps,
  nfc: data.nfc,
  radio: data.radio,
  usb: data.usb,
  sensors: data.sensors,
  battery: data.battery,
  colors: data.colors,
  options: data.options,
});
