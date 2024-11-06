//sort by price ascending
const sortedByPrice = autoParts.sort((a, b) => a.price - b.price);
console.log(sortedByPrice);

//sort by price descending
const sortedByPriceDesc = autoParts.sort((a, b) => b.price - a.price);
console.log(sortedByPriceDesc);

//Sort by Alphabetically via category
const sortedByCategory = autoParts.sort((a, b) => a.category.localeCompare(b.category));
console.log(sortedByCategory);