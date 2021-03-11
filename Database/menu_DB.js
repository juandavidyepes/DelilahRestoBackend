const database = require('./database');

async function insertProduct(product) {
  await database.query(
    'INSERT INTO products (name, image, price) VALUES (?,?,?)',
    {
      replacements: [product.name, product.image, product.price],
    }
  );
  return { message: 'New product added' };
}

async function getMenu() {
  let data;
  await database
    .query('SELECT * FROM products', {
      type: database.QueryTypes.Select,
    })
    .then((res) => (data = res))
    .catch((err) => console.log(err));
  return data;
}

async function deleteProduct(product) {
  console.log(product.id);
  await database.query('DELETE FROM products WHERE id = ?', {
    replacements: [product.id],
  });
  return { message: 'Product deleted' };
}

async function editProduct(product) {
  console.log(product);
  await database.query('UPDATE products SET price = ? WHERE id = ?', {
    replacements: [product.value, product.id],
  });
  return { message: 'Product updated' };
}

module.exports = { insertProduct, getMenu, deleteProduct, editProduct };
