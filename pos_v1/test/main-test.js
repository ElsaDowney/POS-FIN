'use strict';

describe('pos', () => {
  let inputs;
  var allItems=loadAllItems();
  var promotion = loadPromotions();

  beforeEach(() => {
    inputs = [
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000001',
      'ITEM000003-2',
      'ITEM000005',
      'ITEM000005',
      'ITEM000005'
    ];
  });

  it('should print correct text', () => {

    spyOn(console, 'log');

    printReceipt(inputs);

    const expectText = `***<没钱赚商店>收据***
名称：雪碧，数量：5瓶，单价：3.00(元)，小计：12.00(元)
名称：荔枝，数量：2斤，单价：15.00(元)，小计：30.00(元)
名称：方便面，数量：3袋，单价：4.50(元)，小计：9.00(元)
----------------------
总计：51.00(元)
节省：7.50(元)
**********************`;

    expect(console.log).toHaveBeenCalledWith(expectText);
  });

  it('buildItems', () => {

    var countItems = buildItems(inputs,allItems);

    const correctItems = [
      {
        item: {
          barcode: 'ITEM000001',
          name: '雪碧',
          unit: '瓶',
          price: 3.00
        },
        count: 5
      },
      {
        item: {
          barcode: 'ITEM000003',
          name: '荔枝',
          unit: '斤',
          price: 15.00
        },
        count: 2
      },
      {
        item: {
          barcode: 'ITEM000005',
          name: '方便面',
          unit: '袋',
          price: 4.50
        },
        count: 3
      }
    ];
    expect(countItems).toEqual(correctItems);
  });

  it('buildCartItems', () => {


    var countItems = buildItems(inputs,allItems);
    var subTotalItems = buildCartItems(countItems,promotion);

    const correctSubTotal = [
      {
        cartItem: {
          item: {
            barcode: 'ITEM000001',
            name: '雪碧',
            unit: '瓶',
            price: 3.00
          },
          count: 5
        },
        subtotal:12,
        saved:3
      },
      {
        cartItem: {
          item: {
            barcode: 'ITEM000003',
            name: '荔枝',
            unit: '斤',
            price: 15.00
          },
          count: 2
        },
        subtotal:30,
        saved:0
      },
      {
        cartItem: {
          item: {
            barcode: 'ITEM000005',
            name: '方便面',
            unit: '袋',
            price: 4.50
          },
          count: 3
        },
        subtotal:9,
        saved:4.5
      }
    ];
    expect(subTotalItems).toEqual(correctSubTotal);
  });

  //new
  it('buildReceiptItems', () => {


    var countItems = buildItems(inputs,allItems);
    var subTotalItems = buildCartItems(countItems,promotion);
    var totalItem = buildReceipt(subTotalItems);

    const correctTotal = {
      receipt:
      [
        {
          cartItem: {
            item: {
              barcode: 'ITEM000001',
              name: '雪碧',
              unit: '瓶',
              price: 3.00
            },
            count: 5
          },
          subtotal: 12,
          saved: 3
        },
        {
          cartItem: {
            item: {
              barcode: 'ITEM000003',
              name: '荔枝',
              unit: '斤',
              price: 15.00
            },
            count: 2
          },
          subtotal:30,
          saved:0
        },
        {
          cartItem: {
            item: {
              barcode: 'ITEM000005',
              name: '方便面',
              unit: '袋',
              price: 4.50
            },
            count: 3
          },
          subtotal:9,
          saved:4.5
        }
      ],
    total:51,
    savedTotal:7.5
  };
    expect(totalItem).toEqual(correctTotal);
  });

});