import { useParams, Link, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Header } from "@/components/blinkit/Header";
import { CategoryStrip } from "@/components/blinkit/CategoryStrip";
import { ProductSection } from "@/components/blinkit/ProductSection";
import { BlinkitFooter } from "@/components/blinkit/Footer";
import { Button } from "@/components/ui/button";
import { BottomNav } from "@/components/blinkit/BottomNav";
import { DeliveryBanner } from "@/components/blinkit/DeliveryBanner";

// Dairy & Breakfast Products
import dairyMilk from "@/assets/products/dairy-milk.jpg";
import dairyPaneer from "@/assets/products/dairy-paneer.jpg";
import dairyEggs from "@/assets/products/dairy-eggs.jpg";
import dairyButter from "@/assets/products/dairy-butter.jpg";
import dairyCurd from "@/assets/products/dairy-curd.jpg";
import dairyCheese from "@/assets/products/dairy-cheese.jpg";

// Fruits & Vegetables
import vegTomatoes from "@/assets/products/veg-tomatoes.jpg";
import vegPotatoes from "@/assets/products/veg-potatoes.jpg";
import vegOnions from "@/assets/products/veg-onions.jpg";
import vegCapsicum from "@/assets/products/veg-capsicum.jpg";
import vegCarrots from "@/assets/products/veg-carrots.jpg";
import vegSpinach from "@/assets/products/veg-spinach.jpg";
import fruitBananas from "@/assets/products/fruit-bananas.jpg";
import fruitApples from "@/assets/products/fruit-apples.jpg";
import fruitOranges from "@/assets/products/fruit-oranges.jpg";
import fruitMangoes from "@/assets/products/fruit-mangoes.jpg";
import fruitGrapes from "@/assets/products/fruit-grapes.jpg";
import fruitPomegranate from "@/assets/products/fruit-pomegranate.jpg";

// Snacks & Munchies
import snackMixture from "@/assets/products/snack-mixture.jpg";
import snackChips from "@/assets/products/snack-chips.jpg";
import snackBiscuits from "@/assets/products/snack-biscuits.jpg";

// Cold Drinks & Juices
import drinkJuice from "@/assets/products/drink-juice.jpg";

// Tea, Coffee & More
import drinkTea from "@/assets/products/drink-tea.jpg";

// Bakery & Biscuits
import bakeryBread from "@/assets/products/bakery-bread.jpg";

// Atta, Rice & Dal
import stapleRice from "@/assets/products/staple-rice.jpg";
import stapleAtta from "@/assets/products/staple-atta.jpg";
import stapleDal from "@/assets/products/staple-dal.jpg";

// Dry Fruits & Masala
import dryfruitMix from "@/assets/products/dryfruit-mix.jpg";

// Instant & Frozen
import instantNoodles from "@/assets/products/instant-noodles.jpg";

// Sweet Tooth
import sweetChocolate from "@/assets/products/sweet-chocolate.jpg";

// New Categories
import pharmacyItems from "@/assets/products/pharmacy-items.jpg";
import electricalItems from "@/assets/products/electrical-items.jpg";
import meatChicken from "@/assets/products/meat-chicken.jpg";
import kiranaItems from "@/assets/products/kirana-items.jpg";
import petCare from "@/assets/products/pet-care.jpg";
import babyCare from "@/assets/products/baby-care.jpg";

// Category-specific product data
const categoryProducts: Record<string, Array<{
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  unit: string;
  discount?: number;
}>> = {
  "dairy-breakfast": [
    { id: 1, name: "Fresh Milk", price: 28, originalPrice: 32, image: dairyMilk, unit: "500ml", discount: 12 },
    { id: 2, name: "Fresh Paneer", price: 108, originalPrice: 120, image: dairyPaneer, unit: "200g", discount: 10 },
    { id: 3, name: "Farm Fresh Eggs", price: 76, originalPrice: 90, image: dairyEggs, unit: "12 pcs", discount: 15 },
    { id: 4, name: "Amul Butter", price: 52, originalPrice: 58, image: dairyButter, unit: "100g", discount: 10 },
    { id: 5, name: "Fresh Curd", price: 32, originalPrice: 38, image: dairyCurd, unit: "400g", discount: 15 },
    { id: 6, name: "Cheese Slices", price: 85, originalPrice: 95, image: dairyCheese, unit: "10 slices", discount: 10 },
    { id: 101, name: "Toned Milk", price: 24, originalPrice: 28, image: dairyMilk, unit: "500ml", discount: 14 },
    { id: 102, name: "Double Toned Milk", price: 22, originalPrice: 26, image: dairyMilk, unit: "500ml", discount: 15 },
    { id: 103, name: "Full Cream Milk", price: 34, originalPrice: 38, image: dairyMilk, unit: "500ml", discount: 10 },
    { id: 104, name: "Malai Paneer", price: 135, originalPrice: 150, image: dairyPaneer, unit: "250g", discount: 10 },
    { id: 105, name: "Cottage Cheese", price: 95, originalPrice: 110, image: dairyCheese, unit: "200g", discount: 14 },
    { id: 106, name: "Greek Yogurt", price: 65, originalPrice: 75, image: dairyCurd, unit: "200g", discount: 13 },
  ],
  "fruits-vegetables": [
    { id: 7, name: "Fresh Tomatoes", price: 26, originalPrice: 32, image: vegTomatoes, unit: "500g", discount: 18 },
    { id: 8, name: "Fresh Potatoes", price: 27, originalPrice: 32, image: vegPotatoes, unit: "1 kg", discount: 15 },
    { id: 9, name: "Red Onions", price: 36, originalPrice: 42, image: vegOnions, unit: "1 kg", discount: 14 },
    { id: 10, name: "Green Capsicum", price: 32, originalPrice: 38, image: vegCapsicum, unit: "250g", discount: 16 },
    { id: 11, name: "Fresh Carrots", price: 40, originalPrice: 48, image: vegCarrots, unit: "500g", discount: 16 },
    { id: 12, name: "Organic Spinach", price: 32, originalPrice: 38, image: vegSpinach, unit: "250g", discount: 16 },
    { id: 13, name: "Fresh Bananas", price: 40, image: fruitBananas, unit: "1 dozen" },
    { id: 14, name: "Red Apples", price: 108, originalPrice: 130, image: fruitApples, unit: "4 pcs", discount: 17 },
    { id: 15, name: "Sweet Oranges", price: 72, originalPrice: 85, image: fruitOranges, unit: "1 kg", discount: 15 },
    { id: 16, name: "Alphonso Mangoes", price: 135, originalPrice: 160, image: fruitMangoes, unit: "2 pcs", discount: 16 },
    { id: 17, name: "Fresh Grapes", price: 81, originalPrice: 100, image: fruitGrapes, unit: "500g", discount: 19 },
    { id: 18, name: "Pomegranate", price: 63, originalPrice: 75, image: fruitPomegranate, unit: "1 pc", discount: 16 },
  ],
  "snacks-munchies": [
    { id: 19, name: "Haldiram Mixture", price: 45, originalPrice: 55, image: snackMixture, unit: "200g", discount: 18 },
    { id: 20, name: "Classic Chips", price: 20, originalPrice: 25, image: snackChips, unit: "100g", discount: 20 },
    { id: 21, name: "Cream Biscuits", price: 25, originalPrice: 30, image: snackBiscuits, unit: "Pack of 4", discount: 17 },
    { id: 22, name: "Masala Mixture", price: 50, originalPrice: 60, image: snackMixture, unit: "250g", discount: 17 },
    { id: 23, name: "Salted Chips", price: 30, originalPrice: 35, image: snackChips, unit: "150g", discount: 14 },
    { id: 24, name: "Parle-G Biscuits", price: 15, image: snackBiscuits, unit: "Pack" },
    { id: 201, name: "Peri Peri Chips", price: 35, originalPrice: 42, image: snackChips, unit: "150g", discount: 17 },
    { id: 202, name: "Monaco Biscuits", price: 30, originalPrice: 35, image: snackBiscuits, unit: "Pack", discount: 14 },
    { id: 203, name: "Bhujia Sev", price: 55, originalPrice: 65, image: snackMixture, unit: "300g", discount: 15 },
    { id: 204, name: "Chivda Mix", price: 48, originalPrice: 58, image: snackMixture, unit: "250g", discount: 17 },
    { id: 205, name: "Nachos", price: 65, originalPrice: 80, image: snackChips, unit: "200g", discount: 19 },
    { id: 206, name: "Hide & Seek", price: 40, originalPrice: 48, image: snackBiscuits, unit: "Pack", discount: 17 },
  ],
  "cold-drinks-juices": [
    { id: 25, name: "Fresh Orange Juice", price: 65, originalPrice: 80, image: drinkJuice, unit: "500ml", discount: 19 },
    { id: 26, name: "Mixed Fruit Juice", price: 55, originalPrice: 65, image: drinkJuice, unit: "500ml", discount: 15 },
    { id: 27, name: "Apple Juice", price: 70, originalPrice: 85, image: drinkJuice, unit: "500ml", discount: 18 },
    { id: 28, name: "Mango Juice", price: 50, originalPrice: 60, image: drinkJuice, unit: "500ml", discount: 17 },
    { id: 29, name: "Pomegranate Juice", price: 85, originalPrice: 100, image: drinkJuice, unit: "500ml", discount: 15 },
    { id: 30, name: "Coconut Water", price: 35, originalPrice: 40, image: drinkJuice, unit: "300ml", discount: 12 },
    { id: 301, name: "Guava Juice", price: 45, originalPrice: 55, image: drinkJuice, unit: "500ml", discount: 18 },
    { id: 302, name: "Grape Juice", price: 60, originalPrice: 72, image: drinkJuice, unit: "500ml", discount: 17 },
    { id: 303, name: "Litchi Juice", price: 55, originalPrice: 65, image: drinkJuice, unit: "500ml", discount: 15 },
    { id: 304, name: "Pineapple Juice", price: 58, originalPrice: 70, image: drinkJuice, unit: "500ml", discount: 17 },
    { id: 305, name: "Buttermilk", price: 25, originalPrice: 30, image: drinkJuice, unit: "300ml", discount: 17 },
    { id: 306, name: "Lassi", price: 35, originalPrice: 42, image: drinkJuice, unit: "300ml", discount: 17 },
  ],
  "instant-frozen": [
    { id: 31, name: "Maggi Noodles", price: 14, image: instantNoodles, unit: "Pack" },
    { id: 32, name: "Cup Noodles", price: 45, originalPrice: 55, image: instantNoodles, unit: "1 cup", discount: 18 },
    { id: 33, name: "Pasta Pack", price: 55, originalPrice: 65, image: instantNoodles, unit: "200g", discount: 15 },
    { id: 34, name: "Instant Soup", price: 35, originalPrice: 40, image: instantNoodles, unit: "Pack", discount: 12 },
    { id: 35, name: "Ready to Eat Poha", price: 45, originalPrice: 55, image: instantNoodles, unit: "Pack", discount: 18 },
    { id: 36, name: "Frozen Parathas", price: 85, originalPrice: 100, image: bakeryBread, unit: "5 pcs", discount: 15 },
    { id: 401, name: "Hakka Noodles", price: 50, originalPrice: 60, image: instantNoodles, unit: "Pack", discount: 17 },
    { id: 402, name: "Instant Upma", price: 40, originalPrice: 48, image: instantNoodles, unit: "Pack", discount: 17 },
    { id: 403, name: "Frozen Peas", price: 55, originalPrice: 65, image: vegSpinach, unit: "500g", discount: 15 },
    { id: 404, name: "Frozen Corn", price: 60, originalPrice: 72, image: vegSpinach, unit: "500g", discount: 17 },
    { id: 405, name: "Frozen Samosa", price: 75, originalPrice: 90, image: instantNoodles, unit: "10 pcs", discount: 17 },
    { id: 406, name: "Instant Idli Mix", price: 45, originalPrice: 55, image: instantNoodles, unit: "200g", discount: 18 },
  ],
  "tea-coffee": [
    { id: 37, name: "Masala Chai Powder", price: 120, originalPrice: 140, image: drinkTea, unit: "250g", discount: 14 },
    { id: 38, name: "Green Tea", price: 180, originalPrice: 220, image: drinkTea, unit: "100 bags", discount: 18 },
    { id: 39, name: "Filter Coffee", price: 150, originalPrice: 175, image: drinkTea, unit: "200g", discount: 14 },
    { id: 40, name: "Instant Coffee", price: 250, originalPrice: 300, image: drinkTea, unit: "100g", discount: 17 },
    { id: 41, name: "Darjeeling Tea", price: 200, originalPrice: 240, image: drinkTea, unit: "100g", discount: 17 },
    { id: 42, name: "Assam Tea", price: 160, originalPrice: 190, image: drinkTea, unit: "250g", discount: 16 },
    { id: 501, name: "Chamomile Tea", price: 220, originalPrice: 260, image: drinkTea, unit: "50 bags", discount: 15 },
    { id: 502, name: "Earl Grey Tea", price: 190, originalPrice: 225, image: drinkTea, unit: "100g", discount: 16 },
    { id: 503, name: "Espresso Coffee", price: 280, originalPrice: 330, image: drinkTea, unit: "100g", discount: 15 },
    { id: 504, name: "Cardamom Tea", price: 145, originalPrice: 170, image: drinkTea, unit: "200g", discount: 15 },
    { id: 505, name: "Ginger Tea", price: 135, originalPrice: 160, image: drinkTea, unit: "200g", discount: 16 },
    { id: 506, name: "Cold Brew Coffee", price: 320, originalPrice: 380, image: drinkTea, unit: "200g", discount: 16 },
  ],
  "bakery-biscuits": [
    { id: 43, name: "Fresh Bread", price: 40, originalPrice: 45, image: bakeryBread, unit: "400g", discount: 11 },
    { id: 44, name: "Whole Wheat Bread", price: 50, originalPrice: 58, image: bakeryBread, unit: "400g", discount: 14 },
    { id: 45, name: "Butter Cookies", price: 120, originalPrice: 140, image: snackBiscuits, unit: "300g", discount: 14 },
    { id: 46, name: "Marie Biscuits", price: 35, originalPrice: 42, image: snackBiscuits, unit: "Pack", discount: 17 },
    { id: 47, name: "Pav Buns", price: 20, originalPrice: 25, image: bakeryBread, unit: "4 pcs", discount: 20 },
    { id: 48, name: "Croissant", price: 60, originalPrice: 75, image: bakeryBread, unit: "2 pcs", discount: 20 },
    { id: 601, name: "Garlic Bread", price: 75, originalPrice: 90, image: bakeryBread, unit: "200g", discount: 17 },
    { id: 602, name: "Multigrain Bread", price: 65, originalPrice: 78, image: bakeryBread, unit: "400g", discount: 17 },
    { id: 603, name: "Milk Rusk", price: 45, originalPrice: 55, image: snackBiscuits, unit: "300g", discount: 18 },
    { id: 604, name: "Fruit Cake", price: 180, originalPrice: 220, image: bakeryBread, unit: "500g", discount: 18 },
    { id: 605, name: "Burger Buns", price: 35, originalPrice: 42, image: bakeryBread, unit: "4 pcs", discount: 17 },
    { id: 606, name: "Choco Chip Cookies", price: 85, originalPrice: 100, image: snackBiscuits, unit: "200g", discount: 15 },
  ],
  "sweet-tooth": [
    { id: 49, name: "Dairy Milk", price: 40, originalPrice: 45, image: sweetChocolate, unit: "50g", discount: 11 },
    { id: 50, name: "Dark Chocolate", price: 120, originalPrice: 140, image: sweetChocolate, unit: "100g", discount: 14 },
    { id: 51, name: "KitKat", price: 25, originalPrice: 30, image: sweetChocolate, unit: "Pack", discount: 17 },
    { id: 52, name: "Gulab Jamun", price: 150, originalPrice: 180, image: sweetChocolate, unit: "1 kg", discount: 17 },
    { id: 53, name: "Rasgulla", price: 120, originalPrice: 145, image: sweetChocolate, unit: "500g", discount: 17 },
    { id: 54, name: "Soan Papdi", price: 80, originalPrice: 95, image: sweetChocolate, unit: "250g", discount: 16 },
    { id: 701, name: "Snickers", price: 45, originalPrice: 55, image: sweetChocolate, unit: "50g", discount: 18 },
    { id: 702, name: "Ferrero Rocher", price: 280, originalPrice: 340, image: sweetChocolate, unit: "8 pcs", discount: 18 },
    { id: 703, name: "Kaju Katli", price: 420, originalPrice: 500, image: sweetChocolate, unit: "250g", discount: 16 },
    { id: 704, name: "Jalebi", price: 75, originalPrice: 90, image: sweetChocolate, unit: "250g", discount: 17 },
    { id: 705, name: "Ladoo", price: 180, originalPrice: 220, image: sweetChocolate, unit: "500g", discount: 18 },
    { id: 706, name: "Barfi", price: 200, originalPrice: 240, image: sweetChocolate, unit: "250g", discount: 17 },
  ],
  "atta-rice-dal": [
    { id: 55, name: "Basmati Rice", price: 180, originalPrice: 210, image: stapleRice, unit: "1 kg", discount: 14 },
    { id: 56, name: "Whole Wheat Atta", price: 55, originalPrice: 65, image: stapleAtta, unit: "1 kg", discount: 15 },
    { id: 57, name: "Toor Dal", price: 140, originalPrice: 165, image: stapleDal, unit: "1 kg", discount: 15 },
    { id: 58, name: "Moong Dal", price: 150, originalPrice: 175, image: stapleDal, unit: "1 kg", discount: 14 },
    { id: 59, name: "Chana Dal", price: 90, originalPrice: 108, image: stapleDal, unit: "1 kg", discount: 17 },
    { id: 60, name: "Multigrain Atta", price: 75, originalPrice: 88, image: stapleAtta, unit: "1 kg", discount: 15 },
    { id: 801, name: "Brown Rice", price: 120, originalPrice: 145, image: stapleRice, unit: "1 kg", discount: 17 },
    { id: 802, name: "Masoor Dal", price: 110, originalPrice: 130, image: stapleDal, unit: "1 kg", discount: 15 },
    { id: 803, name: "Urad Dal", price: 145, originalPrice: 170, image: stapleDal, unit: "1 kg", discount: 15 },
    { id: 804, name: "Sona Masoori Rice", price: 95, originalPrice: 115, image: stapleRice, unit: "1 kg", discount: 17 },
    { id: 805, name: "Besan", price: 65, originalPrice: 78, image: stapleAtta, unit: "500g", discount: 17 },
    { id: 806, name: "Suji/Rava", price: 45, originalPrice: 55, image: stapleAtta, unit: "500g", discount: 18 },
  ],
  "dryfruits-masala": [
    { id: 61, name: "Mixed Dry Fruits", price: 450, originalPrice: 520, image: dryfruitMix, unit: "500g", discount: 13 },
    { id: 62, name: "Almonds", price: 350, originalPrice: 400, image: dryfruitMix, unit: "250g", discount: 12 },
    { id: 63, name: "Cashews", price: 400, originalPrice: 460, image: dryfruitMix, unit: "250g", discount: 13 },
    { id: 64, name: "Raisins", price: 120, originalPrice: 140, image: dryfruitMix, unit: "200g", discount: 14 },
    { id: 65, name: "Garam Masala", price: 75, originalPrice: 90, image: dryfruitMix, unit: "100g", discount: 17 },
    { id: 66, name: "Kitchen King", price: 55, originalPrice: 65, image: dryfruitMix, unit: "100g", discount: 15 },
    { id: 901, name: "Walnuts", price: 380, originalPrice: 440, image: dryfruitMix, unit: "200g", discount: 14 },
    { id: 902, name: "Pistachios", price: 420, originalPrice: 490, image: dryfruitMix, unit: "200g", discount: 14 },
    { id: 903, name: "Turmeric Powder", price: 45, originalPrice: 55, image: dryfruitMix, unit: "100g", discount: 18 },
    { id: 904, name: "Red Chilli Powder", price: 55, originalPrice: 65, image: dryfruitMix, unit: "100g", discount: 15 },
    { id: 905, name: "Coriander Powder", price: 40, originalPrice: 48, image: dryfruitMix, unit: "100g", discount: 17 },
    { id: 906, name: "Cumin Seeds", price: 85, originalPrice: 100, image: dryfruitMix, unit: "100g", discount: 15 },
  ],
  "pharmacy": [
    { id: 1001, name: "Crocin Pain Relief", price: 35, originalPrice: 42, image: pharmacyItems, unit: "15 tablets", discount: 17 },
    { id: 1002, name: "Dettol Antiseptic", price: 85, originalPrice: 100, image: pharmacyItems, unit: "125ml", discount: 15 },
    { id: 1003, name: "Vitamin C Tablets", price: 180, originalPrice: 220, image: pharmacyItems, unit: "60 tablets", discount: 18 },
    { id: 1004, name: "Band-Aid Box", price: 45, originalPrice: 55, image: pharmacyItems, unit: "20 strips", discount: 18 },
    { id: 1005, name: "Digene Antacid", price: 55, originalPrice: 65, image: pharmacyItems, unit: "15 tablets", discount: 15 },
    { id: 1006, name: "Vicks VapoRub", price: 95, originalPrice: 115, image: pharmacyItems, unit: "50g", discount: 17 },
    { id: 1007, name: "ORS Sachets", price: 25, originalPrice: 30, image: pharmacyItems, unit: "5 sachets", discount: 17 },
    { id: 1008, name: "Cotton Wool", price: 40, originalPrice: 48, image: pharmacyItems, unit: "50g", discount: 17 },
    { id: 1009, name: "Hand Sanitizer", price: 75, originalPrice: 90, image: pharmacyItems, unit: "200ml", discount: 17 },
    { id: 1010, name: "Face Mask N95", price: 120, originalPrice: 150, image: pharmacyItems, unit: "5 pcs", discount: 20 },
    { id: 1011, name: "Multivitamin", price: 250, originalPrice: 300, image: pharmacyItems, unit: "30 capsules", discount: 17 },
    { id: 1012, name: "First Aid Kit", price: 350, originalPrice: 420, image: pharmacyItems, unit: "1 kit", discount: 17 },
  ],
  "electrical": [
    { id: 1101, name: "LED Bulb 9W", price: 85, originalPrice: 100, image: electricalItems, unit: "1 pc", discount: 15 },
    { id: 1102, name: "Extension Board", price: 350, originalPrice: 420, image: electricalItems, unit: "4 socket", discount: 17 },
    { id: 1103, name: "Wire Cutter", price: 180, originalPrice: 220, image: electricalItems, unit: "1 pc", discount: 18 },
    { id: 1104, name: "Electrical Tape", price: 25, originalPrice: 30, image: electricalItems, unit: "1 roll", discount: 17 },
    { id: 1105, name: "Switch Board", price: 120, originalPrice: 145, image: electricalItems, unit: "4 module", discount: 17 },
    { id: 1106, name: "Ceiling Fan", price: 1450, originalPrice: 1800, image: electricalItems, unit: "1 pc", discount: 19 },
    { id: 1107, name: "USB Charger", price: 250, originalPrice: 300, image: electricalItems, unit: "1 pc", discount: 17 },
    { id: 1108, name: "LED Strip Light", price: 320, originalPrice: 400, image: electricalItems, unit: "5 meter", discount: 20 },
    { id: 1109, name: "Screwdriver Set", price: 280, originalPrice: 350, image: electricalItems, unit: "6 pcs", discount: 20 },
    { id: 1110, name: "Electric Tester", price: 45, originalPrice: 55, image: electricalItems, unit: "1 pc", discount: 18 },
    { id: 1111, name: "MCB Switch", price: 180, originalPrice: 220, image: electricalItems, unit: "16A", discount: 18 },
    { id: 1112, name: "Tube Light", price: 250, originalPrice: 300, image: electricalItems, unit: "20W", discount: 17 },
  ],
  "meat-chicken": [
    { id: 1201, name: "Chicken Breast", price: 280, originalPrice: 340, image: meatChicken, unit: "500g", discount: 18 },
    { id: 1202, name: "Mutton Curry Cut", price: 650, originalPrice: 780, image: meatChicken, unit: "500g", discount: 17 },
    { id: 1203, name: "Chicken Drumsticks", price: 220, originalPrice: 260, image: meatChicken, unit: "500g", discount: 15 },
    { id: 1204, name: "Fish Rohu", price: 320, originalPrice: 380, image: meatChicken, unit: "500g", discount: 16 },
    { id: 1205, name: "Chicken Wings", price: 180, originalPrice: 220, image: meatChicken, unit: "500g", discount: 18 },
    { id: 1206, name: "Prawns Medium", price: 450, originalPrice: 550, image: meatChicken, unit: "250g", discount: 18 },
    { id: 1207, name: "Chicken Mince", price: 240, originalPrice: 290, image: meatChicken, unit: "500g", discount: 17 },
    { id: 1208, name: "Lamb Chops", price: 720, originalPrice: 880, image: meatChicken, unit: "500g", discount: 18 },
    { id: 1209, name: "Chicken Liver", price: 120, originalPrice: 145, image: meatChicken, unit: "250g", discount: 17 },
    { id: 1210, name: "Surmai Fish", price: 550, originalPrice: 650, image: meatChicken, unit: "500g", discount: 15 },
    { id: 1211, name: "Whole Chicken", price: 380, originalPrice: 450, image: meatChicken, unit: "1 kg", discount: 16 },
    { id: 1212, name: "Chicken Keema", price: 260, originalPrice: 310, image: meatChicken, unit: "500g", discount: 16 },
  ],
  "kirana": [
    { id: 1301, name: "Salt Iodized", price: 20, originalPrice: 25, image: kiranaItems, unit: "1 kg", discount: 20 },
    { id: 1302, name: "Sugar", price: 48, originalPrice: 55, image: kiranaItems, unit: "1 kg", discount: 13 },
    { id: 1303, name: "Cooking Oil", price: 180, originalPrice: 210, image: kiranaItems, unit: "1 ltr", discount: 14 },
    { id: 1304, name: "Besan", price: 65, originalPrice: 78, image: kiranaItems, unit: "500g", discount: 17 },
    { id: 1305, name: "Poha Flakes", price: 45, originalPrice: 55, image: kiranaItems, unit: "500g", discount: 18 },
    { id: 1306, name: "Jaggery", price: 85, originalPrice: 100, image: kiranaItems, unit: "500g", discount: 15 },
    { id: 1307, name: "Mustard Oil", price: 165, originalPrice: 195, image: kiranaItems, unit: "1 ltr", discount: 15 },
    { id: 1308, name: "Ghee Desi", price: 550, originalPrice: 650, image: kiranaItems, unit: "500g", discount: 15 },
    { id: 1309, name: "Pickle Mango", price: 95, originalPrice: 115, image: kiranaItems, unit: "400g", discount: 17 },
    { id: 1310, name: "Papad", price: 55, originalPrice: 65, image: kiranaItems, unit: "200g", discount: 15 },
    { id: 1311, name: "Vermicelli", price: 35, originalPrice: 42, image: kiranaItems, unit: "200g", discount: 17 },
    { id: 1312, name: "Tamarind Paste", price: 65, originalPrice: 78, image: kiranaItems, unit: "200g", discount: 17 },
  ],
  "pet-care": [
    { id: 1401, name: "Dog Food Pedigree", price: 450, originalPrice: 520, image: petCare, unit: "3 kg", discount: 13 },
    { id: 1402, name: "Cat Food Whiskas", price: 380, originalPrice: 450, image: petCare, unit: "1.2 kg", discount: 16 },
    { id: 1403, name: "Dog Treats", price: 180, originalPrice: 220, image: petCare, unit: "200g", discount: 18 },
    { id: 1404, name: "Pet Shampoo", price: 250, originalPrice: 300, image: petCare, unit: "250ml", discount: 17 },
    { id: 1405, name: "Dog Leash", price: 320, originalPrice: 400, image: petCare, unit: "1 pc", discount: 20 },
    { id: 1406, name: "Cat Litter", price: 420, originalPrice: 500, image: petCare, unit: "5 kg", discount: 16 },
    { id: 1407, name: "Pet Bowl Set", price: 280, originalPrice: 350, image: petCare, unit: "2 pcs", discount: 20 },
    { id: 1408, name: "Dog Toy Ball", price: 120, originalPrice: 150, image: petCare, unit: "1 pc", discount: 20 },
    { id: 1409, name: "Flea Collar", price: 350, originalPrice: 420, image: petCare, unit: "1 pc", discount: 17 },
    { id: 1410, name: "Fish Food", price: 85, originalPrice: 100, image: petCare, unit: "100g", discount: 15 },
    { id: 1411, name: "Pet Comb", price: 150, originalPrice: 180, image: petCare, unit: "1 pc", discount: 17 },
    { id: 1412, name: "Bird Seeds", price: 120, originalPrice: 145, image: petCare, unit: "500g", discount: 17 },
  ],
  "baby-care": [
    { id: 1501, name: "Pampers Diapers", price: 650, originalPrice: 780, image: babyCare, unit: "40 pcs", discount: 17 },
    { id: 1502, name: "Baby Powder Johnson", price: 180, originalPrice: 220, image: babyCare, unit: "200g", discount: 18 },
    { id: 1503, name: "Baby Oil", price: 220, originalPrice: 260, image: babyCare, unit: "200ml", discount: 15 },
    { id: 1504, name: "Baby Wipes", price: 150, originalPrice: 180, image: babyCare, unit: "72 pcs", discount: 17 },
    { id: 1505, name: "Cerelac Stage 1", price: 280, originalPrice: 340, image: babyCare, unit: "300g", discount: 18 },
    { id: 1506, name: "Feeding Bottle", price: 250, originalPrice: 300, image: babyCare, unit: "250ml", discount: 17 },
    { id: 1507, name: "Baby Lotion", price: 195, originalPrice: 230, image: babyCare, unit: "200ml", discount: 15 },
    { id: 1508, name: "Baby Soap", price: 85, originalPrice: 100, image: babyCare, unit: "100g", discount: 15 },
    { id: 1509, name: "Diaper Rash Cream", price: 165, originalPrice: 200, image: babyCare, unit: "50g", discount: 17 },
    { id: 1510, name: "Baby Shampoo", price: 175, originalPrice: 210, image: babyCare, unit: "200ml", discount: 17 },
    { id: 1511, name: "Sippy Cup", price: 220, originalPrice: 270, image: babyCare, unit: "1 pc", discount: 18 },
    { id: 1512, name: "Teether Ring", price: 120, originalPrice: 145, image: babyCare, unit: "1 pc", discount: 17 },
  ],
};

const categoryInfo: Record<string, { title: string; emoji: string; description: string }> = {
  "dairy-breakfast": { title: "Dairy & Breakfast", emoji: "🥛", description: "Fresh milk, paneer, eggs, butter, curd, and more" },
  "fruits-vegetables": { title: "Fruits & Vegetables", emoji: "🥬", description: "Farm fresh vegetables and seasonal fruits" },
  "snacks-munchies": { title: "Snacks & Munchies", emoji: "🍿", description: "Chips, biscuits, namkeen, and party snacks" },
  "cold-drinks-juices": { title: "Cold Drinks & Juices", emoji: "🧃", description: "Refreshing juices, soft drinks, and beverages" },
  "instant-frozen": { title: "Instant & Frozen", emoji: "🍜", description: "Quick meals, frozen foods, and ready to eat items" },
  "tea-coffee": { title: "Tea, Coffee & More", emoji: "☕", description: "Premium teas, coffees, and hot beverages" },
  "bakery-biscuits": { title: "Bakery & Biscuits", emoji: "🍪", description: "Fresh breads, cookies, and bakery items" },
  "sweet-tooth": { title: "Sweet Tooth", emoji: "🍫", description: "Chocolates, sweets, and desserts" },
  "atta-rice-dal": { title: "Atta, Rice & Dal", emoji: "🍚", description: "Daily staples - atta, rice, and pulses" },
  "dryfruits-masala": { title: "Dry Fruits & Masala", emoji: "🥜", description: "Premium dry fruits and cooking spices" },
  "pharmacy": { title: "Pharmacy", emoji: "💊", description: "Medicines, health supplements, and first aid" },
  "electrical": { title: "Electrical Services", emoji: "⚡", description: "Electricians, repairs, and electrical supplies nearby" },
  "meat-chicken": { title: "Meat & Chicken", emoji: "🍗", description: "Fresh meat, chicken, and seafood from local shops" },
  "kirana": { title: "Kirana Store", emoji: "🏪", description: "Local grocery stores and daily essentials" },
  "pet-care": { title: "Pet Care", emoji: "🐾", description: "Pet food, accessories, and pet care products" },
  "baby-care": { title: "Baby Care", emoji: "👶", description: "Diapers, baby food, and infant care essentials" },
};

const Category = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const navigate = useNavigate();
  
  const category = categoryId ? categoryInfo[categoryId] : null;
  const products = categoryId ? categoryProducts[categoryId] || [] : [];

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Category not found</h1>
          <Button onClick={() => navigate("/shop")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Shop
          </Button>
        </div>
        <BlinkitFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-16 md:pb-0">
      <DeliveryBanner />
      <Header />
      <CategoryStrip selectedCategory={categoryId} />
      
      {/* Back Button & Category Header */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto py-3">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate("/shop")}
            className="mb-2 h-8 w-8"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          
          <div className="flex items-center gap-2">
            <span className="text-2xl">{category.emoji}</span>
            <div>
              <h1 className="text-lg font-bold text-foreground">{category.title}</h1>
              <p className="text-xs text-muted-foreground">{category.description}</p>
            </div>
          </div>
        </div>
      </div>
      
      <main className="py-4">
        <ProductSection 
          title={`${category.emoji} All ${category.title}`} 
          products={products} 
        />
      </main>
      
      <BlinkitFooter />
      <BottomNav />
    </div>
  );
};

export default Category;
