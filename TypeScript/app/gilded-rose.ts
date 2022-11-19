import { textSpanIsEmpty } from "typescript";

export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}
const MAXIMUM_QUALITY = 50;
const MINIMUM_QUALITY = 0;

export class GildedRose {
  items: Array<Item>;
  
  constructor(items = [] as Array<Item>) {
    this.items = items;
  }
  updateQualityRefac(){    
    this.items.forEach(item => {           
      switch(item.name){
        case 'Aged Brie': 
          item = this.updateBackstage(item); // Aged Brie is considered as backstage.
        break;
        case 'Backstage passes to a TAFKAL80ETC concert':
            item = this.updateBackstage(item);
        break;
        case 'Sulfuras, Hand of Ragnaros':
          item = this.updateQualitySulfuras(item)  
        break;    
        default:                 
          this.updateQualityForNormalItem(item)
          break;
      }                
    });    
  }
  
  updateBackstage(item: Item){  
    item.sellIn -= 1;  
    if(item.sellIn > 10){
      item.quality = this.increaseQuality(item.quality);
    }
    else if(item.sellIn <= 10){      
      item.quality =(item.quality == 0 ? 1 : item.quality ) * 2
    }else if (item.sellIn <= 5){
      item.quality = (item.quality  == 0 ? 1 : item.quality)  * 3;
    } 
    if (item.sellIn <= 0 ){             
      item.quality = 0;
    }
    if(!this.isLessThanMaximum(item.quality)){
      item.quality = 50;
    }
    return item;
  }
  updateQualitySulfuras(item:Item){
    item.quality = 80;
    return item;
  }

  updateQualityForNormalItem(item:Item){  
    item.sellIn -= 1               
    if(item.name.includes('Conjured')){      
         if(item.sellIn < 0 ){                                        
          item.quality = this.decreaseQuality(item.quality);
          item.quality = this.decreaseQuality(item.quality);
          item.quality = this.decreaseQuality(item.quality);
          item.quality = this.decreaseQuality(item.quality);
         }else {                                        
          item.quality = this.decreaseQuality(item.quality);
          item.quality = this.decreaseQuality(item.quality); 
         }
    }else {
        if(item.sellIn < 0){
          item.quality = this.decreaseQuality(item.quality);
          item.quality = this.decreaseQuality(item.quality);
        } else {
            item.quality = this.decreaseQuality(item.quality);
        }
    }    
    /*if(!this.isOverMinimum(item.quality)){
      item.quality = 0
    }*/
    return item
  }
  isLessThanMaximum(quality:number){
    return quality < MAXIMUM_QUALITY
  }
  isOverMinimum(quality: number){
    return quality > MINIMUM_QUALITY
  }
  increaseQuality(quality:number){
    if(this.isLessThanMaximum(quality)){
        quality  = quality + 1
    }
    return quality;
  }
  decreaseQuality(quality:number):number{    
    if(this.isOverMinimum(quality)){
      quality = quality-1;
    }
    return quality;
  }
}


