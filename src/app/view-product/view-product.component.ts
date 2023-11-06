import { Component, OnInit } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {
  
  products: any[] = []; // Assuming the products are an array of objects

  constructor() {}

  ngOnInit(): void {
    // Make an HTTP GET request to your API to fetch the products
    axios.get('http://localhost:1313/products')
      .then((response) => {
        console.log('Response:', response);
        this.products = response.data;

        // Fetch category and manufacturer names for each product
        this.fetchCategoryAndManufacturerNames();
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }

// Inside the fetchCategoryAndManufacturerNames function
fetchCategoryAndManufacturerNames() {
  this.products.forEach((product) => {
    // Check if product.category is not null and is a valid integer
    if (product.category !== null && !isNaN(parseInt(product.category))) {
      // Fetch category name based on category ID
      axios.get(`http://localhost:1313/categories/name/${product.category}`)
        .then((response) => {
          product.category = response.data.name;
        })
        .catch((error) => {
          console.error('Error fetching category name:', error);
        });
    } else {
      // Set category to an empty string if it's null or not a valid integer
      product.category = '';
    }

    // Check if product.manufacturer is not null and is a valid integer
    if (product.manufacturer !== null && !isNaN(parseInt(product.manufacturer))) {
      // Fetch manufacturer name based on manufacturer ID
      axios.get(`http://localhost:1313/manufacturers/${product.manufacturer}`)
        .then((response) => {
          product.manufacturer = response.data.name;
        })
        .catch((error) => {
          console.error('Error fetching manufacturer name:', error);
        });
    } else {
      // Set manufacturer to an empty string if it's null or not a valid integer
      product.manufacturer = '';
    }
  });
}

editItem(item: any) {     // Implement edit logic here    
  console.log('Editing item', item);   
}   
  
deleteItem(item: any) {     // Implement delete logic here    
  console.log('Deleting item', item);   
}

}