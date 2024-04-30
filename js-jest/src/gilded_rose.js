class Item {
  constructor(name, sellIn, quality){
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class BasicItem extends Item {
  constructor(name, sellIn, quality){
    super(name, sellIn, quality)
  }

  getQualityLoss() {
    return 1;
  }

  getLossRate() {
    return this.sellIn < 0 ? 2 : 1;
  }

  elapseDay() {
    this.sellIn = this.sellIn - 1;
    this.quality = this.quality - this.getLossRate() * this.getQualityLoss();
    this.quality = this.quality < 0 ? 0 : this.quality;
  }
}

class ConjuredItem extends BasicItem {
  constructor(name, sellIn, quality){
    super(name, sellIn, quality)
  }
  
  getQualityLoss() {
    return 2;
  }

  elapseDay() {
    super.elapseDay()
  }
}

class AgedBrie extends BasicItem {
  constructor(sellIn, quality){
    super(ItemNames.AGED_BRIE, sellIn, quality)
  }

    getQualityLoss() {
      return -1;
    }

    getLossRate() {
      return 1;
    }

    elapseDay() {
      super.elapseDay()
      this.quality = this.quality > 50 ? 50 : this.quality;
    }
}

const ItemNames = {
  AGED_BRIE : 'Aged Brie',
  BACKSTAGE_PASS : 'Backstage passes to a TAFKAL80ETC concert',
  SULFURAS : 'Sulfuras, Hand of Ragnaros'
}


class Shop {
  constructor(items=[]){
    this.items = items;
  }
  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      
      const itemName = this.items[i].name;
      let itemQuality = this.items[i].quality;
      let itemSellIn = this.items[i].sellIn

      if (this.items[i] instanceof ConjuredItem
      || this.items[i] instanceof BasicItem
      || this.items[i] instanceof AgedBrie) {
        this.items[i].elapseDay()
      } else {
        if (itemName != ItemNames.AGED_BRIE && itemName != ItemNames.BACKSTAGE_PASS) {
          if (itemQuality > 0) {
            if (itemName != ItemNames.SULFURAS) {
              itemQuality = itemQuality - 1;
            }
          }
        } else {
          if (itemQuality < 50) {
            itemQuality = itemQuality + 1;
            if (itemName == ItemNames.BACKSTAGE_PASS) {
              if (itemSellIn < 11) {
                if (itemQuality < 50) {
                  itemQuality = itemQuality + 1;
                }
              }
              if (itemSellIn < 6) {
                if (itemQuality < 50) {
                  itemQuality = itemQuality + 1;
                }
              }
            }
          }
        }
        if (itemName != ItemNames.SULFURAS) {
          itemSellIn = itemSellIn - 1;
        }
        if (itemSellIn < 0) {
          if (itemName != ItemNames.AGED_BRIE) {
            if (itemName != ItemNames.BACKSTAGE_PASS) {
              if (itemQuality > 0) {
                if (itemName != ItemNames.SULFURAS) {
                  itemQuality = itemQuality - 1;
                }
              }
            } else {
              itemQuality = itemQuality - itemQuality;
            }
          } else {
            if (itemQuality < 50) {
              itemQuality = itemQuality + 1;
            }
          }
        }
        this.items[i].quality = itemQuality;
        this.items[i].sellIn = itemSellIn;
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  BasicItem,
  AgedBrie,
  ConjuredItem,
  Shop,
  ItemNames
}
