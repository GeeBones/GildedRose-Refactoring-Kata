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
  constructor(sellIn, quality) {
    super(ItemNames.AGED_BRIE, sellIn, quality)
  }

    getQualityLoss() {
      return -1;
    }

    elapseDay() {
      super.elapseDay()
      this.quality = this.quality > 50 ? 50 : this.quality;
    }
}

class Sulfuras extends BasicItem {
  constructor() {
    super(ItemNames.SULFURAS, 0, 80)
  }

  elapseDay() {}
}

class BackstagePass extends BasicItem {
  constructor(sellIn, quality) {
    super(ItemNames.BACKSTAGE_PASS, sellIn, quality)
  }

  getQualityLoss() {
    return -1;
  }

  getLossRate() {
    if (this.sellIn < 5) {
      return 3;
    } else if (this.sellIn < 10) {
      return 2;
    } else {
      return 1;
    }
  }

  elapseDay() {
    super.elapseDay()
    this.quality = this.quality > 50 ? 50 : this.quality;
    this.quality = this.sellIn < 0 ? 0 : this.quality;
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
    this.items.forEach((item) => {
        item.elapseDay()
    })

    return this.items;
  }

}

module.exports = {
  BasicItem,
  AgedBrie,
  Sulfuras,
  BackstagePass,
  ConjuredItem,
  Shop
}
