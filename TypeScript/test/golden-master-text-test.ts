import { GildedRose, Item } from '../app/gilded-rose';
const items = [
  new Item("+5 Dexterity Vest", 12, 23), // OK
  new Item("Aged Brie", 13, 0) , // OK
  new Item("Elixir of the Mongoose", 25, 7), // OK
  new Item("Sulfuras, Hand of Ragnaros", 9, 80), //OK
  new Item("Backstage passes to a TAFKAL80ETC concert", 10, 0) , //OK
  //this conjured item does not work properly yet
  new Item("Conjured Mana Cake", 2, 20)
];

const gildedRose = new GildedRose(items);

let days:number = 5;
if (process.argv.length > 2) {
    days = +process.argv[2];
  }

for (let i = 0; i < days; i++) {
  console.log("-------- day " + i + " --------");
  console.log("name, sellIn, quality");
  items.forEach(element => {
    console.log(element.name + ' ' + element.sellIn + ' ' + element.quality);    

  });
  console.log();
  gildedRose.updateQualityRefac()
}
