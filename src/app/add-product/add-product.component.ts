import { Component, OnInit } from '@angular/core';
// import { ProductServiceService } from '../product-service.service';
// import { Product } from '../product-service.service';
import { ProductServiceService, Product, Category, Manufacturer } from '../product-service.service';
import axios from 'axios';


@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

 
  product = {
    name: '',
    description: '',
    price: 0,
    category: { id: 0, name: '' }, // Initialize as an object with 'id' and 'name'
    manufacturer: { id: 0, name: '' }, // Initialize as an object with 'id' and 'name'
  };

  categories: Category[] = [];
  manufacturers: Manufacturer[] = [];
  products: Product[] = []; // Add products array to store fetched products

  constructor() {}

  ngOnInit() {
    // Make an Axios GET request to fetch Category data
    axios.get('http://localhost:1313/categories/names')
      .then((response) => {
        console.log('Category Response:', response);
        this.categories = response.data;
      })
      .catch((error) => {
        console.error('Error fetching categories:', error);
      });

    // Make an Axios GET request to fetch Manufacturer data
    axios.get('http://localhost:1313/manufacturers/names')
      .then((response) => {
        console.log('Manufacturer Response:', response);
        this.manufacturers = response.data;
      })
      .catch((error) => {
        console.error('Error fetching manufacturers:', error);
      });
  }

  addProduct() {
    // Create an object to send to the API
    const productData = {
      name: this.product.name,
      description: this.product.description,
      price: this.product.price,
      category: this.product.category.id, // Send category ID
      manufacturer: this.product.manufacturer.id, // Send manufacturer ID
    };

    // Make an Axios POST request to add the product
    axios.post('http://localhost:1313/products', productData)
      .then((response) => {
        console.log('Product added successfully:', response);
        // Reset the form or perform any other necessary actions
        this.product = {
          name: '',
          description: '',
          price: 0,
          category: { id: 0, name: '' }, // Reset category to an object with 'id' and 'name'
          manufacturer: { id: 0, name: '' }, // Reset manufacturer to an object with 'id' and 'name'
        };
      })
      .catch((error) => {
        console.error('Error adding product:', error);
      });
  }
}