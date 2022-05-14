<template>
  <div class="product-catalog">
    <div class="product-container mt-5 md:mt-0 md:col-span-2">
      <div class="shadow sm:rounded-md sm:overflow-hidden">
        <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
          <div>
            <label for="price" class="block text-sm font-medium text-gray-700">Product Name</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <input type="text" name="price" v-model="productName" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" placeholder="product name" />
            </div>
          </div>
          <div>
            <label for="price" class="block text-sm font-medium text-gray-700">Price</label>
            <div class="mt-1 relative rounded-md shadow-sm">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span class="text-gray-500 sm:text-sm"> $ </span>
              </div>
              <input type="text" name="price" v-model="productPrice" class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-md" placeholder="0.00" />
            </div>
          </div>
          <button @click="openUploadModal" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Upload files
          </button>
          <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
          <button
            type="button"
            @click="handleProductSubmit"
            className="cursor inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Save
          </button>
        </div>
        </div>
      </div>
    </div>
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
        <h2 className="sr-only">Products</h2>
          <div className="grid grid-cols-1 gap-y-10 sm:grid-cols-2 gap-x-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            <a href="#" v-for= 'product in products' :key= 'product.productName' className="group">
              <div className="w-full aspect-w-1 aspect-h-1 bg-gray-200 rounded-lg overflow-hidden xl:aspect-w-7 xl:aspect-h-8">
                <img :src="product.productImage" alt="Tall slender porcelain bottle with natural clay textured body and cork stopper." className="w-full h-full object-center object-cover group-hover:opacity-75" />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{{product.productName}}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">${{product.productPrice}}</p>
              <button
                type="button"
                className="cursor inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                @click="handleDelete(product.$id)"
              >
                Delete
              </button>
            </a>   
          </div>
      </div>
    </div>

  </div>

</template>

<script>

import {sdk} from '../init';

  export default {
    name: 'App',
    data(){
      return{
        productName: '',
        productPrice: '',
        productImage: '',
        products: []
      }

    },
    methods: {
      openUploadModal: function() {
        window.cloudinary.openUploadWidget(
          { cloud_name: 'amarachi-2812',
            upload_preset: 'xoskczw2'
          },
          (error, result) => {
            if (!error && result && result.event === "success") {
              this.productImage = result.info.url
              console.log('Done uploading..: ', result.info);          
            }
          }).open();

      },
      handleProductSubmit: async function(){
        try {
          await sdk.database.createDocument('627ef1d1e659b7895ade', 'unique()', {
          "productName" : this.productName,
          "productPrice": this.productPrice,
          "productImage": this.productImage
        });
         alert('your job item has been successfully saved')
         this.productName= '',
         this.productPrice= '',
         this.productImage= ''
          this.listProducts()
        } catch (error) {
          console.log(error)
        }

      },
      listProducts: async function(){
        try {
          let response = await sdk.database.listDocuments('627ef1d1e659b7895ade');
          console.log(response, 'response')
          this.products = response.documents
        } catch (error) {
          console.log(error)
          
        }
      },
      handleDelete: async function(documentid){
        try {
          await sdk.database.deleteDocument('627ef1d1e659b7895ade', documentid);
          alert("item have been deleted successfully")
          this.listProducts()
        } catch (error) {
          console.log(error)
        }
      }
    }
  }
</script>


<style>
  .product-container{
    margin-left: 37%;
    width: 30%;
  }
</style>
