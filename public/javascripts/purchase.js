listCars = [];
listCart = [];

function initCars() {
    listCars.push('{ "id":"01", "manu":"Lamborghini", "pic":"images/lambo-aventador.png", "name":"Aventador LP700-4", "price":"419000.00" }');
    listCars.push('{ "id":"02", "manu":"McLaren", "pic":"images/mcl-p1.png", "name":"McLaren P1", "price":"866000.00" }');
    listCars.push('{ "id":"03", "manu":"Maserati", "pic":"images/mas-turismo.png", "name":"Gran Turismo S", "price":"133000.00" }');
    listCars.push('{ "id":"04", "manu":"Ferrari", "pic":"images/fer-laferrari.png", "name":"LaFerrari", "price":"1150000.00" }');
    listCars.push('{ "id":"05", "manu":"Ford", "pic":"images/ford-mustang.png", "name":"Mustang GT", "price":"34000.00" }');
    listCars.push('{ "id":"06", "manu":"Cadillac", "pic":"images/cad-escalade.png", "name":"Escalade ESV", "price":"76000.00" }');
    listCars.push('{ "id":"07", "manu":"Audi", "pic":"images/audi-r8.png", "name":"R8 Coupé V10", "price":"162000.00" }');

    /* initialize chart */
    for (var i = 0; i < listCars.length; i++) {
        listCart.push(0);
    }
}

function rmCart(id, keyWord) {
    listCart[id.replace(keyWord, '')]--;

    /* re-style button */
    var btn = document.getElementById(id);
    btn.className = "btn btn-primary";
    btn.value = "Add to Cart";
    btn.onclick = function() {addCart(this.id, "add");};
}

function addCart(id, keyWord) {
    listCart[id.replace(keyWord, '')]++;

    /* re-style button */
    var btn = document.getElementById(id);
    btn.className = "btn btn-danger";
    btn.value = "Remove";
    btn.onclick = function() {rmCart(this.id, "add");};
}

function formatPrice(str) {
    var lst = str.split(".");
    if (lst.length == 1) {
        lst.push("00");
    }

    //add ','
    var s = lst[0];
    var ns = "";
    for (var i = 0; i < s.length; i++) {
        ns += s[i];
        if ((s.length - i)%3 == 1 && i != s.length - 1) {
            ns += ',';
        }
    }
    lst[0] = ns;

    return lst;
}

function drawTable() {    
    initCars();

    var tbl = document.getElementById('carTbl');
    for (var i = 0; i < listCars.length; i++) {
        var obj = JSON.parse(listCars[i]);
        var row = tbl.insertRow(-1);
        row.setAttribute("class", "car-row");

        //image
        var cell0 = row.insertCell(0);
        cell0.style.width = "30%";
        var t0 = document.createElement("img");
        t0.src = obj.pic;
        cell0.appendChild(t0);

        //description
        var cell1 = row.insertCell(1);
        cell1.style.width = "60%";
        var t1 = document.createElement("span");
        var price = formatPrice(obj.price);
        t1.innerHTML = "<h4 class='name'>"+obj.name+"</br>" +
            "<small>by "+obj.manu+"</small></h4>" +
            "<h3 class='price'>$ "+price[0]+"<small>"+price[1]+"</small></h3>";
        cell1.appendChild(t1);

        //action
        var cell2 = row.insertCell(2);
        cell2.style.width = "10%";
        var t2 = document.createElement("input");
        t2.id = "add" + i;
        t2.type = "button";
        t2.className = "btn btn-primary";
        t2.value = "Add to Cart";
        t2.style.width = "110px";
        t2.onclick = function() {addCart(this.id, "add");};
        cell2.appendChild(t2);
    }

}

function commitPurchase() {
    var total = 0;
    for (var i = 0; i < listCart.length; i++) {
        if (listCart[i] == 0) {
            continue;
        }
        total += parseFloat(JSON.parse(listCars[i]).price) * listCart[i];
    }

    console.log("Total amount: " + total);

    /*
     * Now need to save the chart data properly and redirect to payment service.
     * (Calculating the amount in the .js might not be a good idea)
     */

    // save the selected items as well...
    const selectedRows = $("tr.car-row").filter( (a, o)=>($(o).find("input.btn")[0].value == "Remove") );

    // an array that we'll have to store into Elephant database
    const contents = Array.from(selectedRows).map( (o)=>{
                      var name  = o.querySelector("h4.name").childNodes[0].textContent;
                      var price = o.querySelector("h3.price").childNodes[0].textContent.replace(/[\$ ,]+/g, ""); 
                      var imgName = o.querySelector("td>img").getAttribute("src");
                      return {"name": name, "price": parseInt(price), "pic": imgName};
                    });

    console.log(contents);

    localStorage.setItem("purchase-contents", JSON.stringify(contents) );
    localStorage.setItem("stripe-amount", total);
    window.location = "/pay";

}