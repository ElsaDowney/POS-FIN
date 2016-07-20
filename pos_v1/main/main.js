'use strict';
let printReceipt = (inputs) => {

  var allItems = loadAllItems();
  var promotions = loadPromotions();

  let cartItems = buildItems(inputs, allItems);

  let subTotalItems = buildCartItems(cartItems, promotions);

  let ReceiptItems = buildReceipt(subTotalItems);

  let PrintItems = buildPrint(ReceiptItems);

  console.log(PrintItems);

};

let buildPrint = (ReceiptItems) => {
  let info = ReceiptItems.receipt.map(items => {
    let cartItems = items.cartItem;

    return `名称：${cartItems.item.name}，\
数量：${cartItems.count}${cartItems.item.unit}，\
单价：${cartItems.item.price.toFixed(2)}(元)，\
小计：${items.subtotal.toFixed(2)}(元)`;
  }).join('\n');

  return `***<没钱赚商店>收据***
${info}
----------------------
总计：${ReceiptItems.total.toFixed(2)}(元)
节省：${ReceiptItems.savedTotal.toFixed(2)}(元)
**********************`;
};

let buildReceipt = (subtotalItems) => {
  let total = 0;
  let savedTotal = 0;

  for (let item of subtotalItems) {

    total += item.subtotal;
    savedTotal += item.saved;

  }
  return {receipt: subtotalItems, total, savedTotal};
};


let buildItems = (inputs, allItems) => {

  let cartItems = [];
  for (let input of inputs) {

    let splittedInput = input.split('-');
    let barcode = splittedInput[0];
    let count = parseFloat(splittedInput[1] || 1);
    let cartItem = cartItems.find(cartItem => cartItem.item.barcode === barcode);

    if (cartItem) {
      cartItem.count++;
    }
    else {
      let item = allItems.find(item => item.barcode === barcode);
      cartItems.push({item, count});
    }
  }

  return cartItems;
};


let buildCartItems = (cartItems, promotions) => {
  return cartItems.map(cartItem=> {
    let promotionType = getPromotionType(cartItem.item.barcode, promotions);
    let {subtotal, saved} = discount(cartItem, promotionType);
    return {cartItem, subtotal, saved};
  });
};

let getPromotionType = (barcode, promotions) => {

  let promotion = promotions.find(promotion => promotion.barcodes.includes(barcode));

  return promotion ? promotion.type : undefined;
};

let discount = (cartItem, promotionType) => {

  let freeItemCount = 0;

  if (promotionType === 'BUY_TWO_GET_ONE_FREE') {
    freeItemCount = parseInt(cartItem.count / 3);
  }

  let saved = freeItemCount * cartItem.item.price;
  let subtotal = cartItem.count * cartItem.item.price - saved;

  return {saved, subtotal};
};


/*
 function fixed(num){
 let finNumber = num.toFixed(2);
 return finNumber;

 }
 */

/*
 let buildPrint = (ReceiptItems) => {

 let information = '***<没钱赚商店>收据***\n';

 for (let infor of ReceiptItems.receipt) {

 information += `名称：${infor.cartItem.item.name}，\
 数量：${infor.cartItem.count}${infor.cartItem.item.unit}，\
 单价：${infor.cartItem.item.price.toFixed(2)}(元)，\
 小计：${infor.subtotal.toFixed(2)}(元)\n`;
 }

 information += `----------------------
 总计：${ReceiptItems.total.toFixed(2)}(元)
 节省：${ReceiptItems.savedTotal.toFixed(2)}(元)
 **********************`;

 return information;
 };
 */
