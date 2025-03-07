import React, { useState, useMemo, useCallback, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import { ColDef, ColGroupDef } from "ag-grid-community";
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { planningData } from "./planningData";
// Define types''

interface PlanningRow {
  store: string;
  sku: string;
  week: string;
  salesUnits: number;
  salesDollars?: number;
  gmDollars?: number;
  gmPercent?: number;
}

interface Store {
  seqNo:number;
  id: string;
  label: string;
  city: string;
  state: string;
}

interface SKU {
  id: string;
  label: string;
  class: string;
  department: string;
  price: number;
  cost: number;
}

interface Calendar {
  seqNo:number;
  week: string;
  weekLabel: string;
  month: string;
  monthLabel: string;
}

interface PlanningData {
  store: string;
  sku: string;
  week: string;
  salesUnits: number;
}

// Sample Data
const stores: Store[] = [
  { seqNo: 1, id: "ST035", label: "San Francisco Bay Trends", city: "San Francisco", state: "CA" },
  { seqNo: 2, id: "ST046", label: "Phoenix Sunwear", city: "Phoenix", state: "AZ" },
  { seqNo: 3, id: "ST064", label: "Dallas Ranch Supply", city: "Dallas", state: "TX" },
  { seqNo: 4, id: "ST066", label: "Atlanta Outfitters", city: "Atlanta", state: "GA" },
  { seqNo: 5, id: "ST073", label: "Nashville Melody Music Store", city: "Nashville", state: "TN" },
  { seqNo: 6, id: "ST074", label: "New York Empire Eats", city: "New York", state: "NY" },
  { seqNo: 7, id: "ST091", label: "Denver Peaks Outdoor", city: "Denver", state: "CO" },
  { seqNo: 8, id: "ST094", label: "Philadelphia Liberty Market", city: "Philadelphia", state: "PA" },
  { seqNo: 9, id: "ST097", label: "Boston Harbor Books", city: "Boston", state: "MA" },
  { seqNo: 10, id: "ST101", label: "Austin Vibe Co.", city: "Austin", state: "TX" },
  { seqNo: 11, id: "ST131", label: "Los Angeles Luxe", city: "Los Angeles", state: "CA" },
  { seqNo: 12, id: "ST150", label: "Houston Harvest Market", city: "Houston", state: "TX" },
  { seqNo: 13, id: "ST151", label: "Portland Evergreen Goods", city: "Portland", state: "OR" },
  { seqNo: 14, id: "ST156", label: "Chicago Charm Boutique", city: "Chicago", state: "IL" },
  { seqNo: 15, id: "ST163", label: "Las Vegas Neon Treasures", city: "Las Vegas", state: "NV" },
  { seqNo: 16, id: "ST175", label: "Seattle Skyline Goods", city: "Seattle", state: "WA" },
  { seqNo: 17, id: "ST176", label: "Miami Breeze Apparel", city: "Miami", state: "FL" },
  { seqNo: 18, id: "ST177", label: "San Diego Wave Surf Shop", city: "San Diego", state: "CA" },
  { seqNo: 19, id: "ST193", label: "Charlotte Queen’s Closet", city: "Charlotte", state: "NC" },
  { seqNo: 20, id: "ST208", label: "Detroit Motor Gear", city: "Detroit", state: "MI" },
];

const skus: SKU[] = [
  { id: "SK00158", label: "Crew Neck Merino Wool Sweater", class: "Tops", department: "Men's Apparel", price: 114.99, cost: 18.28 },
    { id: "SK00269", label: "Faux Leather Leggings", class: "Jewelry", department: "Footwear", price: 9.99, cost: 8.45 },
    { id: "SK00300", label: "Fleece-Lined Parka", class: "Jewelry", department: "Unisex Accessories", price: 199.99, cost: 17.80 },
    { id: "SK00304", label: "Cotton Polo Shirt", class: "Tops", department: "Women's Apparel", price: 139.99, cost: 10.78 },
    { id: "SK00766", label: "Foldable Travel Hat", class: "Tops", department: "Footwear", price: 44.99, cost: 27.08 },
    { id: "SK00786", label: "Chic Quilted Wallet", class: "Bottoms", department: "Footwear", price: 14.99, cost: 4.02 },
    { id: "SK00960", label: "High-Slit Maxi Dress", class: "Outerwear", department: "Sportswear", price: 74.99, cost: 47.47 },
    { id: "SK01183", label: "Turtleneck Cable Knit Sweater", class: "Footwear", department: "Footwear", price: 49.99, cost: 22.60 },
    { id: "SK01189", label: "Retro-Inspired Sunglasses", class: "Bottoms", department: "Women's Apparel", price: 194.99, cost: 115.63 },
    { id: "SK01193", label: "Stretch Denim Overalls", class: "Bottoms", department: "Unisex Accessories", price: 129.99, cost: 47.06 },
    { id: "SK01249", label: "Adjustable Elastic Headband", class: "Footwear", department: "Women's Apparel", price: 19.99, cost: 1.34 },
    { id: "SK01319", label: "Adjustable Baseball Cap", class: "Jewelry", department: "Men's Apparel", price: 4.99, cost: 2.29 },
    { id: "SK01349", label: "Cotton Polo Shirt", class: "Bottoms", department: "Unisex Accessories", price: 114.99, cost: 60.94 },
    { id: "SK01549", label: "Faux Suede Ankle Boots", class: "Tops", department: "Sportswear", price: 94.99, cost: 71.53 },
    { id: "SK01566", label: "Striped Cotton Socks", class: "Accessories", department: "Sportswear", price: 9.99, cost: 6.91 },
    { id: "SK01642", label: "Performance Compression Tights", class: "Outerwear", department: "Sportswear", price: 54.99, cost: 59.61 },
    { id: "SK01733", label: "Vintage Logo Hoodie", class: "Accessories", department: "Men's Apparel", price: 94.99, cost: 84.45 },
    { id: "SK01896", label: "Floral Chiffon Wrap Dress", class: "Accessories", department: "Unisex Accessories", price: 149.99, cost: 68.55 },
    { id: "SK01927", label: "Asymmetrical Hem Skirt", class: "Jewelry", department: "Sportswear", price: 99.99, cost: 66.89 },
    { id: "SK01950", label: "Slim Fit Pinstripe Suit", class: "Bottoms", department: "Women's Apparel", price: 99.99, cost: 13.30 },
    { id: "SK02029", label: "Chunky Heel Sandals", class: "Jewelry", department: "Unisex Accessories", price: 89.99, cost: 46.70 },
    { id: "SK02429", label: "Suede Fringe Vest", class: "Bottoms", department: "Footwear", price: 184.99, cost: 159.65 },
    { id: "SK02448", label: "Relaxed Fit Cargo Pants", class: "Bottoms", department: "Sportswear", price: 149.99, cost: 7.20 },
    { id: "SK02562", label: "Corduroy A-Line Skirt", class: "Jewelry", department: "Footwear", price: 129.99, cost: 48.62 },
    { id: "SK02642", label: "Formal Dress Shoes", class: "Bottoms", department: "Women's Apparel", price: 164.99, cost: 161.69 },
    { id: "SK02768", label: "Tailored Corduroy Blazer", class: "Accessories", department: "Sportswear", price: 89.99, cost: 62.99 },
    { id: "SK02805", label: "Foldable Travel Hat", class: "Outerwear", department: "Women's Apparel", price: 194.99, cost: 56.16 },
    { id: "SK02904", label: "Asymmetrical Hem Skirt", class: "Tops", department: "Unisex Accessories", price: 89.99, cost: 67.94 },
    { id: "SK03182", label: "Plaid Flannel Shirt", class: "Tops", department: "Unisex Accessories", price: 124.99, cost: 17.50 },
    { id: "SK03289", label: "Oversized Hoodie", class: "Tops", department: "Women's Apparel", price: 159.99, cost: 122.23 },
    { id: "SK03348", label: "Woven Straw Sun Hat", class: "Jewelry", department: "Footwear", price: 164.99, cost: 8.91 },
    { id: "SK03569", label: "Faux Fur Winter Coat", class: "Tops", department: "Men's Apparel", price: 9.99, cost: 7.37 },
    { id: "SK03572", label: "Casual Cotton Romper", class: "Tops", department: "Footwear", price: 119.99, cost: 52.32 },
    { id: "SK03636", label: "Racerback Sports Bra", class: "Footwear", department: "Unisex Accessories", price: 14.99, cost: 8.72 },
  { id: "SK03725", label: "Polarized Sports Sunglasses", class: "Tops", department: "Men's Apparel", price: 79.99, cost: 9.44 },
  { id: "SK03980", label: "Chunky Platform Sneakers", class: "Tops", department: "Unisex Accessories", price: 109.99, cost: 61.70 },
  { id: "SK04282", label: "Slim Fit Chinos", class: "Footwear", department: "Sportswear", price: 114.99, cost: 51.98 },
  { id: "SK04325", label: "Faux Leather Leggings", class: "Tops", department: "Footwear", price: 194.99, cost: 13.06 },
  { id: "SK04707", label: "Water-Resistant Fanny Pack", class: "Tops", department: "Women's Apparel", price: 24.99, cost: 23.64 },
  { id: "SK04815", label: "Performance Compression Tights", class: "Bottoms", department: "Footwear", price: 14.99, cost: 16.29 },
  { id: "SK05097", label: "Cropped Faux Leather Jacket", class: "Jewelry", department: "Sportswear", price: 79.99, cost: 19.52 },
  { id: "SK05194", label: "Breathable Mesh Shorts", class: "Accessories", department: "Footwear", price: 194.99, cost: 28.08 },
  { id: "SK05478", label: "Minimalist Silver Ring", class: "Accessories", department: "Footwear", price: 174.99, cost: 147.34 },
  { id: "SK05715", label: "Ribbed Turtleneck Dress", class: "Bottoms", department: "Footwear", price: 94.99, cost: 22.61 },
  { id: "SK05928", label: "Velvet Slip Dress", class: "Jewelry", department: "Men's Apparel", price: 69.99, cost: 41.64 },
  { id: "SK06290", label: "Waterproof Smartwatch", class: "Bottoms", department: "Men's Apparel", price: 144.99, cost: 53.50 },
  { id: "SK06375", label: "Patterned Cotton Bucket Hat", class: "Outerwear", department: "Sportswear", price: 144.99, cost: 114.40 },
  { id: "SK06559", label: "Diamond Stud Earrings", class: "Outerwear", department: "Men's Apparel", price: 144.99, cost: 146.00 },
  { id: "SK06601", label: "Tassel Fringe Handbag", class: "Outerwear", department: "Unisex Accessories", price: 59.99, cost: 33.29 },
  { id: "SK06651", label: "Tactical Hiking Backpack", class: "Outerwear", department: "Sportswear", price: 49.99, cost: 52.54 },
  { id: "SK06691", label: "Patterned Cotton Bucket Hat", class: "Accessories", department: "Unisex Accessories", price: 9.99, cost: 2.14 },
  { id: "SK06996", label: "Bohemian Beaded Bracelet", class: "Accessories", department: "Unisex Accessories", price: 124.99, cost: 116.12 },
  { id: "SK07054", label: "Mesh Panel Yoga Pants", class: "Accessories", department: "Footwear", price: 184.99, cost: 166.86 },
  { id: "SK07068", label: "Diamond Stud Earrings", class: "Outerwear", department: "Sportswear", price: 14.99, cost: 13.75 },
  { id: "SK07322", label: "Faux Suede Ankle Boots", class: "Tops", department: "Footwear", price: 84.99, cost: 90.43 },
  { id: "SK07369", label: "Water-Resistant Fanny Pack", class: "Outerwear", department: "Unisex Accessories", price: 4.99, cost: 3.73 },
  { id: "SK07447", label: "Plaid Wool Scarf", class: "Tops", department: "Footwear", price: 139.99, cost: 97.57 },
  { id: "SK07484", label: "Cropped Faux Leather Jacket", class: "Accessories", department: "Women's Apparel", price: 179.99, cost: 163.43 },
  { id: "SK07595", label: "Textured Knit Pullover", class: "Tops", department: "Footwear", price: 54.99, cost: 50.43 },
  { id: "SK07767", label: "Boho Style Tassel Earrings", class: "Footwear", department: "Sportswear", price: 194.99, cost: 193.43 },
  { id: "SK07782", label: "Sherpa Lined Hooded Coat", class: "Jewelry", department: "Footwear", price: 174.99, cost: 128.09 },
  { id: "SK07944", label: "Mesh Panel Yoga Pants", class: "Tops", department: "Unisex Accessories", price: 69.99, cost: 45.49 },
  { id: "SK08191", label: "Graphic Print T-Shirt", class: "Jewelry", department: "Men's Apparel", price: 109.99, cost: 53.35 },
  { id: "SK08285", label: "Fitted V-Neck Sweater", class: "Footwear", department: "Men's Apparel", price: 124.99, cost: 110.24 },
  { id: "SK08314", label: "Formal Dress Shoes", class: "Accessories", department: "Footwear", price: 74.99, cost: 8.62 },
  { id: "SK08373", label: "Satin Lace Camisole", class: "Jewelry", department: "Women's Apparel", price: 184.99, cost: 136.15 },
  { id: "SK08443", label: "Slim Fit Chinos", class: "Bottoms", department: "Unisex Accessories", price: 89.99, cost: 61.64 },
  { id: "SK08544", label: "Retro-Inspired Sunglasses", class: "Footwear", department: "Women's Apparel", price: 44.99, cost: 41.12 },
  { id: "SK08557", label: "Formal Velvet Blazer", class: "Bottoms", department: "Sportswear", price: 194.99, cost: 189.14 },
  { id: "SK08783", label: "Striped Cotton Socks", class: "Accessories", department: "Footwear", price: 169.99, cost: 10.54 },
  { id: "SK09245", label: "Yoga Leggings", class: "Bottoms", department: "Unisex Accessories", price: 164.99, cost: 172.58 },
  { id: "SK09312", label: "Formal Dress Shoes", class: "Bottoms", department: "Sportswear", price: 9.99, cost: 1.96 },
  { id: "SK09318", label: "Aviator Sunglasses", class: "Footwear", department: "Sportswear", price: 44.99, cost: 12.37 },
  { id: "SK09414", label: "Perforated Leather Belt", class: "Tops", department: "Footwear", price: 44.99, cost: 4.50 },
  { id: "SK09453", label: "Smart Heated Gloves", class: "Footwear", department: "Unisex Accessories", price: 109.99, cost: 100.53 },
  { id: "SK09469", label: "Silk Embroidered Kimono", class: "Jewelry", department: "Sportswear", price: 109.99, cost: 78.64 },
  { id: "SK09592", label: "Performance Swim Trunks", class: "Tops", department: "Men's Apparel", price: 174.99, cost: 157.84 },
  { id: "SK09659", label: "Tactical Hiking Backpack", class: "Jewelry", department: "Women's Apparel", price: 69.99, cost: 58.16 },
  { id: "SK09728", label: "Thermal Running Gloves", class: "Outerwear", department: "Women's Apparel", price: 49.99, cost: 53.79 },
  { id: "SK09816", label: "Quilted Leather Clutch", class: "Jewelry", department: "Unisex Accessories", price: 134.99, cost: 95.84 },
  { id: "SK10226", label: "Rugged Utility Jacket", class: "Accessories", department: "Unisex Accessories", price: 44.99, cost: 2.43 },
  { id: "SK10286", label: "Tapered Suit Trousers", class: "Bottoms", department: "Men's Apparel", price: 64.99, cost: 53.10 },
  { id: "SK10304", label: "Faux Leather Leggings", class: "Tops", department: "Men's Apparel", price: 139.99, cost: 22.54 },
  { id: "SK10514", label: "Lace-Up Combat Boots", class: "Tops", department: "Sportswear", price: 109.99, cost: 64.89 },
  { id: "SK10565", label: "Athletic Crew Socks", class: "Accessories", department: "Unisex Accessories", price: 174.99, cost: 1.75 },
  { id: "SK10717", label: "Silk Neck Scarf", class: "Outerwear", department: "Footwear", price: 94.99, cost: 49.87 },
  { id: "SK10760", label: "Sherpa Lined Denim Jacket", class: "Outerwear", department: "Women's Apparel", price: 119.99, cost: 28.92 },
  { id: "SK11103", label: "Lace-Up Combat Boots", class: "Outerwear", department: "Men's Apparel", price: 24.99, cost: 24.84 },
  { id: "SK11147", label: "Sporty Zip-Up Hoodie", class: "Footwear", department: "Women's Apparel", price: 184.99, cost: 65.30 },
  { id: "SK11260", label: "Minimalist Gold Necklace", class: "Footwear", department: "Unisex Accessories", price: 104.99, cost: 52.08 },
  { id: "SK11808", label: "Classic Denim Jacket", class: "Jewelry", department: "Women's Apparel", price: 149.99, cost: 144.29 },
  { id: "SK11860", label: "Tassel Fringe Handbag", class: "Accessories", department: "Sportswear", price: 109.99, cost: 3.19 },
  { id: "SK12148", label: "Oversized Cat-Eye Sunglasses", class: "Jewelry", department: "Footwear", price: 159.99, cost: 109.11 },
  { id: "SK12418", label: "Minimalist Leather Watch", class: "Bottoms", department: "Unisex Accessories", price: 49.99, cost: 49.89 },
  { id: "SK12460", label: "Quilted Leather Clutch", class: "Bottoms", department: "Unisex Accessories", price: 4.99, cost: 0.68 },
  { id: "SK12478", label: "Floral Chiffon Wrap Dress", class: "Footwear", department: "Men's Apparel", price: 184.99, cost: 39.59 },
  { id: "SK12670", label: "Graphic Skateboard Tee", class: "Bottoms", department: "Women's Apparel", price: 194.99, cost: 53.43 },
  { id: "SK12760", label: "Minimalist Silver Ring", class: "Tops", department: "Unisex Accessories", price: 9.99, cost: 9.53 },
  { id: "SK12773", label: "Padded Winter Mittens", class: "Tops", department: "Unisex Accessories", price: 154.99, cost: 53.78 },
  { id: "SK12919", label: "Classic Denim Jacket", class: "Jewelry", department: "Footwear", price: 109.99, cost: 89.53 },
  { id: "SK13050", label: "Lace-Up Combat Boots", class: "Tops", department: "Women's Apparel", price: 134.99, cost: 75.59 },
  { id: "SK13226", label: "Cuffed Jogger Pants", class: "Jewelry", department: "Footwear", price: 69.99, cost: 64.95 },
  { id: "SK13248", label: "Oversized Hoodie", class: "Outerwear", department: "Men's Apparel", price: 124.99, cost: 23.25 },
  { id: "SK13498", label: "Unisex Oversized Sweatshirt", class: "Jewelry", department: "Men's Apparel", price: 139.99, cost: 77.13 },
  { id: "SK13532", label: "Puffer Insulated Vest", class: "Tops", department: "Sportswear", price: 14.99, cost: 10.72 },
  { id: "SK13740", label: "Faux Fur Winter Coat", class: "Outerwear", department: "Footwear", price: 14.99, cost: 4.56 },
  { id: "SK13952", label: "Tactical Hiking Backpack", class: "Accessories", department: "Footwear", price: 199.99, cost: 115.79 },
  { id: "SK14045", label: "Stretch Fit Slip-On Sneakers", class: "Accessories", department: "Unisex Accessories", price: 124.99, cost: 54.12 },
  { id: "SK14940", label: "Woven Straw Sun Hat", class: "Footwear", department: "Women's Apparel", price: 99.99, cost: 9.70 },
  { id: "SK14945", label: "Silk Embroidered Kimono", class: "Bottoms", department: "Women's Apparel", price: 74.99, cost: 12.30 },
  { id: "SK14974", label: "Asymmetrical Hem Skirt", class: "Bottoms", department: "Footwear", price: 184.99, cost: 19.98 },
  { id: "SK15217", label: "Wool Fedora Hat", class: "Footwear", department: "Sportswear", price: 99.99, cost: 86.49 },
  { id: "SK15290", label: "Fleece Jogger Sweatpants", class: "Footwear", department: "Sportswear", price: 79.99, cost: 45.67 },
  { id: "SK15291", label: "Cuffed Jogger Pants", class: "Outerwear", department: "Sportswear", price: 114.99, cost: 52.90 },
  { id: "SK15526", label: "Relaxed Fit Cargo Pants", class: "Bottoms", department: "Women's Apparel", price: 199.99, cost: 80.80 },
  { id: "SK15631", label: "Velvet Slip Dress", class: "Tops", department: "Footwear", price: 164.99, cost: 106.75 },
  { id: "SK15722", label: "Cashmere Turtleneck Sweater", class: "Accessories", department: "Men's Apparel", price: 99.99, cost: 91.79 },
  { id: "SK15739", label: "High-Waisted Bikini Set", class: "Outerwear", department: "Sportswear", price: 64.99, cost: 69.34 },
  { id: "SK15761", label: "Minimalist Gold Necklace", class: "Jewelry", department: "Sportswear", price: 74.99, cost: 71.47 },
  { id: "SK16210", label: "Oversized Cat-Eye Sunglasses", class: "Outerwear", department: "Men's Apparel", price: 119.99, cost: 117.83 },
  { id: "SK16364", label: "Minimalist Silver Ring", class: "Outerwear", department: "Women's Apparel", price: 64.99, cost: 49.59 },
  { id: "SK16370", label: "Sherpa Lined Denim Jacket", class: "Jewelry", department: "Men's Apparel", price: 189.99, cost: 28.69 },
  { id: "SK16474", label: "Cropped Faux Leather Jacket", class: "Outerwear", department: "Women's Apparel", price: 39.99, cost: 21.03 },
  { id: "SK16642", label: "Tassel Fringe Handbag", class: "Tops", department: "Men's Apparel", price: 134.99, cost: 20.79 },
  { id: "SK16722", label: "Reflective Running Vest", class: "Jewelry", department: "Sportswear", price: 154.99, cost: 112.21 },
  { id: "SK16745", label: "Classic Denim Jacket", class: "Footwear", department: "Footwear", price: 24.99, cost: 22.29 },
  { id: "SK16750", label: "Faux Leather Leggings", class: "Outerwear", department: "Unisex Accessories", price: 64.99, cost: 43.02 },
  { id: "SK16871", label: "Woven Straw Sun Hat", class: "Bottoms", department: "Sportswear", price: 9.99, cost: 0.80 },
  { id: "SK17623", label: "Silk Embroidered Kimono", class: "Footwear", department: "Footwear", price: 134.99, cost: 48.06 },
  { id: "SK17867", label: "High-Slit Maxi Dress", class: "Tops", department: "Unisex Accessories", price: 9.99, cost: 7.85 },
  { id: "SK18018", label: "Fleece-Lined Parka", class: "Tops", department: "Footwear", price: 59.99, cost: 17.40 },
  { id: "SK18148", label: "Silk Neck Scarf", class: "Bottoms", department: "Men's Apparel", price: 114.99, cost: 120.62 },
  { id: "SK18224", label: "Unisex Oversized Sweatshirt", class: "Accessories", department: "Men's Apparel", price: 134.99, cost: 106.64 },
  { id: "SK18623", label: "Textured Knit Pullover", class: "Jewelry", department: "Men's Apparel", price: 34.99, cost: 33.38 },
  { id: "SK18665", label: "Luxury Silk Tie", class: "Tops", department: "Footwear", price: 54.99, cost: 20.95 },
  { id: "SK18753", label: "Rugged Utility Jacket", class: "Outerwear", department: "Women's Apparel", price: 29.99, cost: 20.69 },
  { id: "SK18791", label: "Retro-Inspired Sunglasses", class: "Jewelry", department: "Unisex Accessories", price: 79.99, cost: 82.55 },
  { id: "SK19521", label: "High-Slit Maxi Dress", class: "Outerwear", department: "Footwear", price: 14.99, cost: 6.49 },
  { id: "SK19547", label: "Boho Style Tassel Earrings", class: "Outerwear", department: "Men's Apparel", price: 104.99, cost: 11.02 },
  { id: "SK19857", label: "Metallic Hoop Earrings", class: "Bottoms", department: "Unisex Accessories", price: 84.99, cost: 35.61 }
];

const calendar: Calendar[] = [
  { seqNo: 1, week: "W01", weekLabel: "Week 01", month: "M01", monthLabel: "Feb" },
  { seqNo: 2, week: "W02", weekLabel: "Week 02", month: "M01", monthLabel: "Feb" },
  { seqNo: 3, week: "W03", weekLabel: "Week 03", month: "M01", monthLabel: "Feb" },
  { seqNo: 4, week: "W04", weekLabel: "Week 04", month: "M01", monthLabel: "Feb" },
  { seqNo: 5, week: "W05", weekLabel: "Week 05", month: "M02", monthLabel: "Mar" },
  { seqNo: 6, week: "W06", weekLabel: "Week 06", month: "M02", monthLabel: "Mar" },
  { seqNo: 7, week: "W07", weekLabel: "Week 07", month: "M02", monthLabel: "Mar" },
  { seqNo: 8, week: "W08", weekLabel: "Week 08", month: "M02", monthLabel: "Mar" },
  { seqNo: 9, week: "W09", weekLabel: "Week 09", month: "M02", monthLabel: "Mar" },
  { seqNo: 10, week: "W10", weekLabel: "Week 10", month: "M03", monthLabel: "Apr" },
  { seqNo: 11, week: "W11", weekLabel: "Week 11", month: "M03", monthLabel: "Apr" },
  { seqNo: 12, week: "W12", weekLabel: "Week 12", month: "M03", monthLabel: "Apr" },
  { seqNo: 13, week: "W13", weekLabel: "Week 13", month: "M03", monthLabel: "Apr" },
  { seqNo: 14, week: "W14", weekLabel: "Week 14", month: "M04", monthLabel: "May" },
  { seqNo: 15, week: "W15", weekLabel: "Week 15", month: "M04", monthLabel: "May" },
  { seqNo: 16, week: "W16", weekLabel: "Week 16", month: "M04", monthLabel: "May" },
  { seqNo: 17, week: "W17", weekLabel: "Week 17", month: "M04", monthLabel: "May" },
  { seqNo: 18, week: "W18", weekLabel: "Week 18", month: "M05", monthLabel: "Jun" },
  { seqNo: 19, week: "W19", weekLabel: "Week 19", month: "M05", monthLabel: "Jun" },
  { seqNo: 20, week: "W20", weekLabel: "Week 20", month: "M05", monthLabel: "Jun" },
  { seqNo: 21, week: "W21", weekLabel: "Week 21", month: "M05", monthLabel: "Jun" },
  { seqNo: 22, week: "W22", weekLabel: "Week 22", month: "M05", monthLabel: "Jun" },
  { seqNo: 23, week: "W23", weekLabel: "Week 23", month: "M06", monthLabel: "Jul" },
  { seqNo: 24, week: "W24", weekLabel: "Week 24", month: "M06", monthLabel: "Jul" },
  { seqNo: 25, week: "W25", weekLabel: "Week 25", month: "M06", monthLabel: "Jul" },
  { seqNo: 26, week: "W26", weekLabel: "Week 26", month: "M06", monthLabel: "Jul" },
  { seqNo: 27, week: "W27", weekLabel: "Week 27", month: "M07", monthLabel: "Aug" },
  { seqNo: 28, week: "W28", weekLabel: "Week 28", month: "M07", monthLabel: "Aug" },
  { seqNo: 29, week: "W29", weekLabel: "Week 29", month: "M07", monthLabel: "Aug" },
  { seqNo: 30, week: "W30", weekLabel: "Week 30", month: "M07", monthLabel: "Aug" },
  { seqNo: 31, week: "W31", weekLabel: "Week 31", month: "M08", monthLabel: "Sep" },
  { seqNo: 32, week: "W32", weekLabel: "Week 32", month: "M08", monthLabel: "Sep" },
  { seqNo: 33, week: "W33", weekLabel: "Week 33", month: "M08", monthLabel: "Sep" },
  { seqNo: 34, week: "W34", weekLabel: "Week 34", month: "M08", monthLabel: "Sep" },
  { seqNo: 35, week: "W35", weekLabel: "Week 35", month: "M08", monthLabel: "Sep" },
  { seqNo: 36, week: "W36", weekLabel: "Week 36", month: "M09", monthLabel: "Oct" },
  { seqNo: 37, week: "W37", weekLabel: "Week 37", month: "M09", monthLabel: "Oct" },
  { seqNo: 38, week: "W38", weekLabel: "Week 38", month: "M09", monthLabel: "Oct" },
  { seqNo: 39, week: "W39", weekLabel: "Week 39", month: "M09", monthLabel: "Oct" },
  { seqNo: 40, week: "W40", weekLabel: "Week 40", month: "M10", monthLabel: "Nov" },
  { seqNo: 41, week: "W41", weekLabel: "Week 41", month: "M10", monthLabel: "Nov" },
  { seqNo: 42, week: "W42", weekLabel: "Week 42", month: "M10", monthLabel: "Nov" },
  { seqNo: 43, week: "W43", weekLabel: "Week 43", month: "M10", monthLabel: "Nov" },
  { seqNo: 44, week: "W44", weekLabel: "Week 44", month: "M11", monthLabel: "Dec" },
  { seqNo: 45, week: "W45", weekLabel: "Week 45", month: "M11", monthLabel: "Dec" },
  { seqNo: 46, week: "W46", weekLabel: "Week 46", month: "M11", monthLabel: "Dec" },
  { seqNo: 47, week: "W47", weekLabel: "Week 47", month: "M11", monthLabel: "Dec" },
  { seqNo: 48, week: "W48", weekLabel: "Week 48", month: "M11", monthLabel: "Dec" },
  { seqNo: 49, week: "W49", weekLabel: "Week 49", month: "M12", monthLabel: "Jan" },
  { seqNo: 50, week: "W50", weekLabel: "Week 50", month: "M12", monthLabel: "Jan" },
  { seqNo: 51, week: "W51", weekLabel: "Week 51", month: "M12", monthLabel: "Jan" },
  { seqNo: 52, week: "W52", weekLabel: "Week 52", month: "M12", monthLabel: "Jan" },
];
ModuleRegistry.registerModules([AllCommunityModule]);

const PlanningGrid: React.FC = () => {
  const [rowData, setRowData] = useState<any[]>([]);

  useEffect(() => {
    const crossJoinedData = stores.flatMap((store: Store) =>
      skus.map((sku: SKU) => ({
        store: store.id,
        sku: sku.id,
        storeLabel: store.label,
        skuLabel: sku.label,
        price: sku.price,
        cost: sku.cost,
      }))
    );

    const enrichedData = crossJoinedData.map((item) => {
      const planningEntries = planningData.filter(
        (p: PlanningData) => p.store === item.store && p.sku === item.sku
      );
      const weeklyData: Record<string, number> = {};
      planningEntries.forEach((entry) => {
        weeklyData[`salesUnits_${entry.week}`] = entry.salesUnits;
      });
      return { ...item, ...weeklyData };
    });

    setRowData(enrichedData);
  }, []);

  const columnDefsMemo = useMemo(() => {
    const weekColumns = calendar.map((week: Calendar) => ({
      headerName: week.weekLabel,
      children: [
        {
          headerName: "Sales Units",
          field: `salesUnits_${week.week}`,
          editable: true,
          valueFormatter: (params: { value?: number }): string =>
            params.value?.toString() ?? "0",
        },
        {
          headerName: "Sales Dollars",
          field: `salesDollars_${week.week}`,
          valueGetter: (params: { data: any }): number =>
            (params.data[`salesUnits_${week.week}`] || 0) * params.data.price,
          valueFormatter: (params: { value: number }): string =>
            `$${params.value.toFixed(2)}`,
        },
        {
          headerName: "GM Dollars",
          field: `gmDollars_${week.week}`,
          valueGetter: (params: { data: any }): number => {
            const salesDollars = params.data[`salesDollars_${week.week}`] || 0;
            const salesUnits = params.data[`salesUnits_${week.week}`] || 0;
            return   salesUnits * params.data.cost - salesDollars;
          },
          valueFormatter: (params: { value: number }): string =>
            `$${params.value.toFixed(2)}`,
        },
        {
          headerName: "GM %",
          field: `gmPercent_${week.week}`,
          valueGetter: (params: { data: any }): number => {
            
            
            const salesUnits = params.data[`salesUnits_${week.week}`] || 0;
            const salesDollars = salesUnits * params.data.price;
            const gmDollars = salesDollars- salesUnits * params.data.cost ;
            
            return salesDollars !== 0 ? (gmDollars / salesDollars) * 100 : 0;
          },
          valueFormatter: (params: { value: number }): string =>
            `${params.value.toFixed(2)}%`,
          cellStyle: (params: { value: number }): React.CSSProperties => {
            if (params.value >= 40) return { backgroundColor: "green", color: "white" };
            if (params.value >= 10) return { backgroundColor: "yellow" };
            if (params.value >= 5) return { backgroundColor: "orange" };
            return { backgroundColor: "red", color: "white" };
          },
        },
      ],
    }));

    return [
      { headerName: "Store", field: "storeLabel" },
      { headerName: "SKU", field: "skuLabel" },
      ...weekColumns,
    ];
  }, []);

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: "100%" }}>
      <AgGridReact
        rowData={rowData}
        columnDefs={columnDefsMemo}
        pagination={true}
        paginationPageSize={100}
        defaultColDef={{ resizable: true, sortable: true }}
      />
    </div>
  );
};

export default PlanningGrid;
