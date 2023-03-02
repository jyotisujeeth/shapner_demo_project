window.addEventListener("DOMContentLoaded",()=>{
    axios.get('https://crudcrud.com/api/5945e038c6fd402f89bd8d5962dc7b0b/Orders')
        .then((res)=>{
            for(let i=0; i<res.data.length; i++){
                showOrderOnScreen(res.data[i])
            }
        })
  })
  
  function submitOrder(e){
    const price = document.getElementById('price').value
    const product = document.getElementById('product').value
    const category = document.getElementById('product-category').value
    console.log(price, product, category)
  
    let obj={
        price:price,
        product:product,
        category:category
    };
  
    axios.post('https://crudcrud.com/api/5945e038c6fd402f89bd8d5962dc7b0b/Orders', obj)
        .then((res)=>{
            showOrderOnScreen(res.data)
        })
        .catch((err)=>console.log(err))
  }
  
  function showOrderOnScreen(order){
    
    let orderELement = `<li id='${order._id}'>${order.price} - ${order.product} - ${order.category}
    <button onclick=deleteOrder('${order._id}') class="delete-buttons">Delete Product</button>
    </li>`
    let num = order.category == 'Electronic Items' ? '1' : order.category == 'Food Items' ? '2' : '3';
    let parDiv = document.getElementById(`product-${num}-list`)
    parDiv.innerHTML = parDiv.innerHTML + orderELement
  }
  
  function deleteOrder(_id){
    axios.delete(`https://crudcrud.com/api/5945e038c6fd402f89bd8d5962dc7b0b/Orders/${_id}`)
        .then(()=>{
            let orderToDelete = document.getElementById(`${_id}`)
            let par = orderToDelete.parentElement
            par.removeChild(orderToDelete)
        })
        .catch((err)=>console.log(err))
  }
