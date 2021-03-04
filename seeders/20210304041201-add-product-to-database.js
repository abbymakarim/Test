'use strict';
const axios = require('axios');
const { portalSuspended } = require('pg-protocol/dist/messages');
// let products;
// axios.get('https://portal.panelo.co/paneloresto/api/productlist/18')
// .then(response => {
//   products = response.data.products
// })
// .catch(error => {
//   console.log(error)
// })

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    try {
      const products  = await axios.get('https://portal.panelo.co/paneloresto/api/productlist/18')
      let result = products.data.products
      for(let i = 0; i < result.length; i++){
        let kategori = result[i].name
        for(let j = 0; j < result[i].products.length; j++){
          await queryInterface.bulkInsert('Products', [{
            kategori: kategori,
            product: result[i].products[j].title,
            price: result[i].products[j].price.price,
            createdAt: result[i].products[j].created_at,
            updatedAt: result[i].products[j].updated_at
          }], {})
        }
      }
    } catch (error) {
      console.log(error)
    }
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Products', null, {})
  }
};
