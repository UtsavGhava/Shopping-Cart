let chooseProduct = document.getElementById('chooseProduct');
let listProduct = document.getElementById('listProduct');
let listProductValue = listProduct.value;
let quantity = document.getElementById('quantity');
let quntityvalue = quantity.value; 
let add = document.getElementById('add');

let firstParagraph = document.createElement('p');
let firstChild = chooseProduct.appendChild(firstParagraph);

let productDetail = document.getElementById('productDetail');

let secondParagraph = document.createElement('p');
let secondChild = productDetail.appendChild(secondParagraph);

let conform = document.getElementById('conform');

let first = document.getElementById('first');
let previous = document.getElementById('previous');
let next = document.getElementById('next');
let last = document.getElementById('last');

let pageNumber = document.getElementById('pageNumber');
let go = document.getElementById('go');

let fullName = document.getElementById('fullName').value;
let companyName = document.getElementById('companyName').value;
let address = document.getElementById('address').value;
let mobileNumber = document.getElementById('mobileNumber').value;
let emailAddress = document.getElementById('email').value;
let btnContinue = document.getElementById('btnContinue');

var regEmail=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
var regPhone=/^\d{10}$/;   // Javascript reGex for Phone Number validation.
var regName = /\d+$/g;      // Javascript reGex for Name validation


let nameAndFinalPrise = {};
let allDetail;
let nameAndAllDetail = [];
let strForDetail = "";
let id = 1;
let count = -1;
let productNameAndQuintity = {};



// FUNCTION FOR STORE PRODUTS

function makeList(name,prise) {
    return collectionOfProduct[name] = prise;
};

function upperobj(productName, quntity) {
    return productNameAndQuintity[productName] = quntity;
}

function addallDetail(id,choosedProduct,priseToPay,fullName, companyName, address, mobileNumber, emailAddress) {
    return{
        id,
        choosedProduct,
        priseToPay,
        fullName,
        companyName,
        address,
        mobileNumber,
        emailAddress
    }
}

function addNameAndPrise(productName,prise) {
    return nameAndFinalPrise[productName] = prise;
}

function firstButtun(objName){
    for(const key in objName){
        strForDetail+=`${key} : ${objName[key]}\n`
    }
}


// ADD ALL PRODUCT AND PRISE IN ONE OBJECT

let collectionOfProduct = {};

let change = "";

for(let i=1;i<listProduct.length;i++){
    change+=listProduct[i].innerHTML;
    let arr = change.split(' - ');
    let name = arr[0];
    let prise = parseInt(arr[1]);
    makeList(name,prise);
    
    change="";
}




// HAPPEN WHEN USER CLICK ON ADD TO CART




let str;
add.addEventListener('click',()=>{
    quntityvalue = quantity.value;
    listProductValue = listProduct.value;
    if(listProductValue==""){
        alert("Please Select Item");
    }
    else{
        if(quntityvalue.length<=0){
            alert("Please Select Proper Quantity")
        }
        else{
        let productName = listProduct.value;
        let quntity = quantity.value;
        upperobj(productName, quntity);
        str = JSON.stringify(productNameAndQuintity);
        firstParagraph.innerText = str;
        };
    };
});




// FORM DETAILS
// FUNCTION







// function addNameAndAllDeyail(usrName, objectToAdd) {
//     return nameAndAllDetail[usrName] = objectToAdd;
// }



// CLICK ON CONTINUE

btnContinue.addEventListener('click', ()=>{


    let fullName = document.getElementById('fullName').value;
    let companyName = document.getElementById('companyName').value;
    let address = document.getElementById('address').value;
    let mobileNumber = document.getElementById('mobileNumber').value;
    let emailAddress = document.getElementById('email').value;

    if(fullName==""){
        alert("Please Enter Valid First Name");
    }
    else{
        if(companyName==""){
            alert("Please Enter Your Company Name");
        }
        else{
            if(address==""){
                alert("Please Enter Address");
            }
            else{
                if(mobileNumber.length!=10){
                    alert("Please Enter Valid Mobile Number");
                }
                else{
                    if(emailAddress=="" ||regEmail.test(emailAddress)){
                        alert("Please Enter Valid Email Address");
                    }
                    else{
                        let choosedProduct = "";
                        let priseToPay = 0;
                    
                        for (const key1 in collectionOfProduct) {
                            for(const key2 in productNameAndQuintity){
                                if(key1==key2){
                                    choosedProduct += key2 +"  ";
                                    let productName = key2;
                                    let prise = collectionOfProduct[key1]*productNameAndQuintity[key2];
                                    addNameAndPrise(productName,prise);
                                }
                            }
                        };
                    
                        for(const key in nameAndFinalPrise){
                            priseToPay+=nameAndFinalPrise[key];
                        }
                    
                        allDetail = addallDetail(id,choosedProduct,priseToPay,fullName, companyName, address, mobileNumber, emailAddress)
                    
                    
                        for(const key in allDetail){
                            secondParagraph.innerText = `${allDetail.fullName} :\nSelected Items : ${allDetail.choosedProduct} \nTotal Prise : ${allDetail.priseToPay} \nCompany's Name : ${allDetail.companyName} \nAddress : ${allDetail.address}\nMobile Number : ${allDetail.mobileNumber} \nEmail Address : ${allDetail.emailAddress}`
                        }
                    }
                }
            }
        }
    }

    

});


conform.addEventListener('click', ()=>{
    nameAndAllDetail.push(allDetail);
    secondParagraph.innerText = "";
    count++;
    id++;
    console.log(allDetail);
    firstParagraph.innerText = "";
    str = "";
    productNameAndQuintity={};
    document.getElementById('fullName').value="";
    document.getElementById('companyName').value = "";
    document.getElementById('address').value = "";
    document.getElementById('mobileNumber').value = "";
    emailAddress = document.getElementById('email').value = "";
    document.getElementById('listProduct').value = "";
    document.getElementById('quantity').value = "";
    document.getElementById('pageNumber').value = "";
});



first.addEventListener('click', ()=>{

    if(nameAndAllDetail==0){
        alert("You did not add any items");
    }
    else{
    firstButtun(nameAndAllDetail[0]);
    secondParagraph.innerText = strForDetail;
    strForDetail = "";
    }
});



last.addEventListener('click', ()=>{

    if(nameAndAllDetail==0){
        alert("You did not add any items");
    }
    else{
    firstButtun(nameAndAllDetail[nameAndAllDetail.length-1]);
    secondParagraph.innerText = strForDetail;
    strForDetail = "";
    
    }

});




previous.addEventListener('click', ()=>{
    if(count==0){
        alert("You are on first page");
    }
    else{
    count--;
    let index = nameAndAllDetail[count];
    secondParagraph.innerText= `${index.fullName} :\nSelected Items : ${index.choosedProduct} \nTotal Prise : ${index.priseToPay} \nCompany's Name : ${index.companyName} \nAddress : ${index.address}\nMobile Number : ${index.mobileNumber} \nEmail Address : ${index.emailAddress}`;
    }
    console.log(count);
});



next.addEventListener('click', ()=>{
    if(count==nameAndAllDetail.length-1){
        alert("You are on last page");
    }
    else{
    count++;
    let index = nameAndAllDetail[count];
    secondParagraph.innerText= `${index.fullName} :\nSelected Items : ${index.choosedProduct} \nTotal Prise : ${index.priseToPay} \nCompany's Name : ${index.companyName} \nAddress : ${index.address}\nMobile Number : ${index.mobileNumber} \nEmail Address : ${index.emailAddress}`;
    }
    console.log(count);
});





go.addEventListener('click',()=>{
    let pageNumberValue = parseInt(pageNumber.value)-1;
    count = pageNumberValue;

    if(count>=nameAndAllDetail.length){
        alert("Please Enter Valid Page Number")
    }
    else{
    let index = nameAndAllDetail[pageNumberValue];
    secondParagraph.innerText= `${index.fullName} :\nSelected Items : ${index.choosedProduct} \nTotal Prise : ${index.priseToPay} \nCompany's Name : ${index.companyName} \nAddress : ${index.address}\nMobile Number : ${index.mobileNumber} \nEmail Address : ${index.emailAddress}`;
    };
})














// for(let i=0;i<arrayForAdd.length;i++){
//     if(arrayForAdd[i][0]===listProduct.value){
//         delete arrayForAdd[i];
//         smallArray.push(listProduct.value);
//         smallArray.push(quantity.value);
//         arrayForAdd.push(smallArray);
//         addProduct.innerHTML = arrayForAdd;
//         smallArray = [];
//         addProduct.innerHTML = '';
//         break;
//     }
//     else{
//         smallArray.push(listProduct.value);
//         smallArray.push(quantity.value);
//         arrayForAdd.push(smallArray);
//         addProduct.innerHTML = arrayForAdd;
//         smallArray = [];
//         break;
        
//     }
// }



// let array = [];
// let smallArray = [];

// add.addEventListener('click',()=>{

    
    
//     if(listProductValue==0 || quntityvalue==0){
//         alert("Please Select Product And Quantity");
//     }


//     else{

//     if(array==0){
//         smallArray.push(listProductValue);
//         smallArray.push(quntityvalue);
//         array.push(smallArray);
//         smallArray=[];
//         paragraph.innerText = array;
//     }
//     else{
//         for(let i=0;i<array.length;i++){
//             if(array[i][0]!=listProductValue){
//                 smallArray.push(listProductValue);
//                 smallArray.push(quntityvalue);
//                 array.push(smallArray);
//                 smallArray=[];
//                 paragraph.innerText = array;
//                 break;
//             }
//             else{
//                 delete array[i];
//                 smallArray.push(listProductValue);
//                 smallArray.push(quntityvalue);
//                 array[i] = smallArray;
//                 smallArray=[];
//                 paragraph.innerText = array;
//                 break;
//             }
//         }
//     }
//     console.log(array)
// }
// });