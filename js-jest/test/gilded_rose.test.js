const {Shop, Item, ItemNames, ConjuredItem, BasicItem, AgedBrie, Sulfuras, BackstagePass} = require("../src/gilded_rose");

describe("Gilded Rose", function() {
  it("should foo", function() {
    const gildedRose = new Shop([new BasicItem("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe("foo");
  });

  it("should decrease sell in", function() {
    const gildedRose = new Shop([new BasicItem("foo", 1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(0);
  });

  it("should decrease sell in past 0", function() {
    const gildedRose = new Shop([new BasicItem("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(-1);
  });

  it("should decrease quality", function() {
    const gildedRose = new Shop([new BasicItem("foo", 1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("should degrade faster after sell by", function() {
    const gildedRose = new Shop([new BasicItem("foo", 0, 2)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  })

  it("should never have negative quality", function() {
    const gildedRose = new Shop([new BasicItem("foo", 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("should decrease quality after sell by", function() {
    const gildedRose = new Shop([new BasicItem("foo", -1, 3)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(1);
  });

  it("should increase Aged Brie quality", function() {
    const gildedRose = new Shop([new AgedBrie(1, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(1);
  });

  it("should not increase Aged Brie quality when 50", function() {
    const gildedRose = new Shop([new AgedBrie(1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it("should increase Aged Brie quality after sell by", function() {
    const gildedRose = new Shop([new AgedBrie(-1, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(3);
  });


  it("should not increase Aged Brie quality when 50 and past sell by", function() {
    const gildedRose = new Shop([new AgedBrie(-1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it("should not decrease Sulfuras quality", function() {
    const gildedRose = new Shop([new Sulfuras()]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
  });

  it("should not decrease Sulfuras quality past sell by", function() {
    const gildedRose = new Shop([new Sulfuras()]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(80);
  });

  it("should not change Sulfuras sellin", function() {
    const gildedRose = new Shop([new Sulfuras()]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(0);
  });

  it("should increase backstage pass quality by 1 when > 10 days before sell by", function() {
    const gildedRose = new Shop([new Item(ItemNames.BACKSTAGE_PASS, 11, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(2);
  });

  it("should increase backstage pass quality by 2 when <= 10 days before sell by", function() {
    const gildedRose = new Shop([new Item(ItemNames.BACKSTAGE_PASS, 10, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(3);
  });

  it("should increase backstage pass quality by 3 when <= 5 days before sell by", function() {
    const gildedRose = new Shop([new Item(ItemNames.BACKSTAGE_PASS, 5, 1)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(4);
  });

  it("should not increase backstage pass quality when 50", function() {
    const gildedRose = new Shop([new Item(ItemNames.BACKSTAGE_PASS, 1, 50)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it("should not increase backstage pass quality over 50", function() {
    const gildedRose = new Shop([new Item(ItemNames.BACKSTAGE_PASS, 1, 49)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(50);
  });

  it("should set backstage pass quality to 0 past sell by", function() {
    const gildedRose = new Shop([new Item(ItemNames.BACKSTAGE_PASS, -1, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });

  it("should decrease conjured quality at double rate", function() {
    const gildedRose = new Shop([new ConjuredItem("ci", 1, 5)]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(3);
  });
});

describe("ConjuredItem", function() {
  it("should decrease sellIn by 1 and quality by 2", function() {
    const conjuredItem = new ConjuredItem("ci", 1, 5);
    conjuredItem.elapseDay();
    expect(conjuredItem.quality).toBe(3);
    expect(conjuredItem.sellIn).toBe(0);
  });

  it("should never have negative quality", function() {
    const conjuredItem = new ConjuredItem("ci", 1, 0);
    conjuredItem.elapseDay();
    expect(conjuredItem.quality).toBe(0);
  });

  it("should decrease by 4 after sell by", function() {
    const conjuredItem = new ConjuredItem("ci", -1, 5);
    conjuredItem.elapseDay();
    expect(conjuredItem.quality).toBe(1);
  });

});

describe("BasicItem", function() {
  it("should decrease sellIn and quality by 1", function() {
    const basicItem = new BasicItem("ci", 1, 5);
    basicItem.elapseDay();
    expect(basicItem.quality).toBe(4);
    expect(basicItem.sellIn).toBe(0);
  });

  it("should decrease sell in past 0", function() {
    const basicItem = new BasicItem("ci", 0, 5);
    basicItem.elapseDay();
    expect(basicItem.sellIn).toBe(-1);
  });

  it("should decrease by 2 after sell by", function() {
    const basicItem = new BasicItem("ci", -1, 5);
    basicItem.elapseDay();
    expect(basicItem.quality).toBe(3);
  });

  it("should never have negative quality", function() {
    const basicItem = new BasicItem("ci", 1, 0);
    basicItem.elapseDay();
    expect(basicItem.quality).toBe(0);
  });
});

describe("AgedBrie", function() {
  it("should increase Aged Brie quality", function() {
    const agedBrie = new AgedBrie(1, 0);
    agedBrie.elapseDay();
    expect(agedBrie.quality).toBe(1);
  });

  it("should not increase Aged Brie quality over 50", function() {
    const agedBrie = new AgedBrie(1, 50);
    agedBrie.elapseDay();
    expect(agedBrie.quality).toBe(50);
  });

  it("should increase Aged Brie after sellby", function() {
    const agedBrie = new AgedBrie(-1, 1);
    agedBrie.elapseDay();
    expect(agedBrie.quality).toBe(3);
  });

  it("should not increase Aged Brie quality over 50 when past sellby", function() {
    const agedBrie = new AgedBrie(-1, 50);
    agedBrie.elapseDay();
    expect(agedBrie.quality).toBe(50);
  });
});

describe("Sulfuras", function() {
  it("should not change Sulfuras sellin or quality", function() {
    const sulfuras = new Sulfuras();
    sulfuras.elapseDay();
    expect(sulfuras.quality).toBe(80);
    expect(sulfuras.sellIn).toBe(0);
  });
});

describe("Backstage Pass", function() {
  it("should increase backstage pass quality by 1 when > 10 days before sell by", function() {
    const backstage = new BackstagePass(11, 1);
    backstage.elapseDay();
    expect(backstage.quality).toBe(2);
  });

  it("should increase backstage pass quality by 2 when <= 10 days before sell by", function() {
    const backstage = new BackstagePass(10, 1);
    backstage.elapseDay();
    expect(backstage.quality).toBe(3);
  });

  it("should increase backstage pass quality by 3 when <= 5 days before sell by", function() {
    const backstage = new BackstagePass(5, 1);
    backstage.elapseDay();
    expect(backstage.quality).toBe(4);
  });

  it("should not increase backstage pass quality when 50", function() {
    const backstage = new BackstagePass(5, 50);
    backstage.elapseDay();
    expect(backstage.quality).toBe(50);
  });

  it("should not increase backstage pass quality over 50", function() {
    const backstage = new BackstagePass(5, 49);
    backstage.elapseDay();
    expect(backstage.quality).toBe(50);
  });

  it("should set backstage pass quality to 0 past sell by", function() {
    const backstage = new BackstagePass(0, 49);
    backstage.elapseDay();
    expect(backstage.quality).toBe(0);
  });
});
