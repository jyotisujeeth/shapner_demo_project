<html>
    <body>
    
    <form onsubmit="saveToLocalStorage(event)">
    <label>Selling Price:</label>
    <input id="sp" type="number" name="sp">
    <label>Product Name:</label>
    <input id="product" type="text" name="product">
    <label for="category">Choose Category:</label>
    <select name="category" id="category">
        <option value="Electronic">Electronic</option>
        <option value="Food">Food</option>
        <option value="Skincare">Skincare</option>
    </select>&nbsp;&nbsp;
    <button>Add Product</button>
    <header>
        <h1>Product Item</h1>
        <h2 >Electronic Items</h2>
        <h2 >Food Items</h2>
        <h2 >Skincare Items</h2>
    </header>
    </form>
    <ul id="ProductDetails"></ul>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.3.3/axios.min.js"></script>
    <script>

        async function saveToLocalStorage(event){
            event.preventDefault();
            const sp=event.target.sp.value;
            const product=event.target.product.value;
            const category=event.target.category.value;
            const obj={
                sp,
                product,
                category
            }
           
            try{ 
            const res= await axios.post("https://crudcrud.com/api/ed531348bee44039a019c92f7c1354be/expenses",obj)
                showNewProductOnScreen(res.data);
            }
            catch(error){
                console.log(error);
            }
        }

        window.addEventListener("DOMContentLoaded",async()=>{
            try{
            const res= await axios.get("https://crudcrud.com/api/ed531348bee44039a019c92f7c1354be/expenses")
                console.log(res);
                for(let i=0;i<res.data.length;i++){
                    showNewProductOnScreen(res.data[i]);
                }
            }
            catch(error){
                console.log(error);
            }
        })
       
        var totalsp=0;
        function showNewProductOnScreen(item){
        const parentNode=document.getElementById('ProductDetails');
           
            const childHTML=`<li id=${item._id}>${item.sp}-${item.product}-${item.category}
                <button onclick=deleteProduct('${item._id}','${item.sp}')>Delete Product</button>
                </li>`
              parentNode.innerHTML=parentNode.innerHTML+childHTML;
                
              var totalspH3=document.getElementById("TotalspH3");
                totalsp+=item.sp++;
                totalspH3.innerHTML=`Total Price Of Products:-Rs ${totalsp}`;
            
            
        }

        //Delete Product
        async function deleteProduct(prodId,sp){
            try{
                const res=await axios.delete(`https://crudcrud.com/api/ed531348bee44039a019c92f7c1354be/expenses/${prodId}`)
            removeProductFromScreen(prodId,sp);
            }
            catch(error){
                console.log(error);
            }
        }

        function removeProductFromScreen(prodId,sp){
            const parentNode=document.getElementById('ProductDetails');
           
            const childNodeToBeDeleted=document.getElementById(prodId,sp);
            
                parentNode.removeChild(childNodeToBeDeleted)
               console.log(sp);
               var totalspH3=document.getElementById("TotalspH3");
               totalsp-=parseInt(sp);
               totalspH3.innerHTML=`Total Price Of Product:-Rs${totalsp}`;
            
        }
    </script>
    <hr>
    <h3 id="TotalspH3">The Total Price Of Products Rs</h3>
    </body>
</html>
