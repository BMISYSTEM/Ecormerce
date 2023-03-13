let url_controller = '../controllers/index.php';
let url_controller_mercado = '../controllers/mercadoPago.php';
let accion_search = "";


const init = () => {

    $("#search_data").prop("disabled", true);
    $(".model").hide();
    $(".product").hide();
    $(".articles").hide();
    $("#li_model").hide();
    $("#li_product_line").hide();
    $("#viewsArticles").hide();

    get_marks(); //get list de mark  
    get_list_publications("promo_public");
    get_list_publications("info_article");
    get_list_new_models(); //Listar publi

    $("#btn_code").on("click", () => {
        $("#search_data").prop("disabled", false);
        set_props_input("Codigo", "search_code");
        $("#accion_search").val(1);
    });



    $("#btn_model").on("click", () => {
        $("#search_data").prop("disabled", false);
        set_props_input("Modelo", "search_model");
        $("#accion_search").val(2);
    });

    /**
    This code is a jQuery event
    handler that listens for a keyup 
    event on the element with the id of 
    "input_search". When a keyup event is triggered, 
    the code will log the value of the element to the 
    */
    $("#input_search").keyup(function () {
        get_name_list_article($(this).val());
    });




    $("#btn_search").on("click", () => {
        let search = $("#input_search").val();
        $("#value_search_id").val(search);
        get_articles_data();
    });


//condiccion de articulos si no hay muestra mensaje 
    //view modal of articles
    $("#btn-cart").on("click", () => {

        
        // let carr = localStorage.getItem("Items_Carro")
        if (localStorage.getItem("Items_Carro") !== null) {
            // imhtml();
            
            $("#modal_cart").modal("show");
            // set_cart_article(2);

        } else {
            $("#modal_cart").modal("show");
            // $("#list_articles_cart").html("<h3>No hay articulo seleccionados</h3>");

        }
    });
    if (localStorage.getItem("Items_Carro") !== null) {
        local_carr();
        imhtml();
    }else{
        let alproduc = [];
        gurdar_local_carr(alproduc);
        local_carr();
        imhtml();
    }
    
    
}

/**
 * It gets the data from the database and then it creates a list of items with the data from the
 * database.
 */

const get_marks = () => {
    let accion = "get_marks";
    $.post(url_controller, { accion: accion }, (rps) => {
        let data = JSON.parse(rps);
        if (data.length > 0) {
            let li = "";
            data.forEach((element, index) => {

                li += `<li class="menu-item">
                                <a href="javascript:void(0);" class="menu-link" onclick="get_element_data(${element.id_mark},'${element.name_mark}' )">
                                    <div data-i18n="Without menu" data-id_mark="${element.id_mark}" >${element.name_mark} </div>
                                </a>
                       </li>
                      `;
            });

            $("#mark_list").html(li);
        }
    });
}

/**
 * It gets a list of models from the database and displays them in a dropdown menu.
 */
const get_model = (id_mark) => {
    let accion = "get_model";
    view_loading("model", true);
    setTimeout(() => {
        $.post(url_controller, { accion: accion, id_mark: id_mark }, (rps) => {
            let data = JSON.parse(rps);
            if (data.length > 0) {
                view_loading("model", false);
                $("#li_model").show();

                let li = "";
                data.forEach((element, index) => {
                    li += `<li class="menu-item">
                                    <a href="javascript:void(0);" class="menu-link" onclick="get_element_model(${element.id_model},'${element.name_model}' )">
                                        <div data-i18n="Without menu"  >${element.name_model} </div>
                                    </a>
                           </li>
                          `;
                });

                $("#model_list").html(li);

            }

        });
    }, 1000);
}


/**
 * It gets a list of product lines from the database and displays them in a dropdown menu.
 */

const get_line_product = (id_model) => {
    let accion = "get_line_product";
    view_loading("product", true);
    setTimeout(() => {
        $.post(url_controller, { accion: accion, id_model: id_model }, (rps) => {
            let data = JSON.parse(rps);
            if (data.length > 0) {
                view_loading("product", false);
                $("#li_product_line").show();

                let li = "";
                data.forEach((element, index) => {

                    li += `<li class="menu-item">
                                   <a href="javascript:void(0);" class="menu-link" onclick="get_element_product_line(${element.id_product_line},'${element.name_product_line}' )">
                                       <div data-i18n="Without menu"  >${element.name_product_line} </div>
                                   </a>
                          </li>
                         `;
                });

                $("#product_line_list").html(li);

            }

        });

    }, 1000);
}



/**
 * It takes two arguments, an id and a name, and then it sets the html of the element with the id
 * "mark_element" to a span with the class "badge bg-secondary" and the text of the name argument.
 * @param id_mark - the id of the element
 * @param name_mark - The name of the mark
 */
const get_element_data = (id_mark, name_mark) => {

    $("#mark_element").html(`<span class="badge bg-secondary">` + name_mark + `</span>`);
    $("#id_mark").val(id_mark);
    $(".li_element").removeClass("open");
    $("#li_model").hide();
    $("#li_model").hide();
    $("#li_product_line").hide();
    $("#viewsArticles").html("");

    if ($("#id_mark").val() > 0) {
        get_model($("#id_mark").val());
    }

}

/**
 * It takes two parameters, id_model and name_model, and then it does some stuff with them.
 * @param id_model - the id of the model
 * @param name_model - The name of the model
 */
const get_element_model = (id_model, name_model) => {

    $("#model_element").html(`<span class="badge bg-secondary">` + name_model + `</span>`);
    $("#id_model").val(id_model);
    $(".li_element").removeClass("open");
    $("#li_product_line").hide();

    if ($("#id_model").val() > 0) {
        get_line_product($("#id_model").val());
    }

}

/**
 * It takes two parameters, id_product_line and name_product_line, and then it sets the html of the
 * element with the id product_line_element to a span with the class badge bg-secondary and the text of
 * the name_product_line parameter. 
 * 
 * It then sets the value of the element with the id id_product_line to the value of the
 * id_product_line parameter. 
 * 
 * It then removes the class open from all elements with the class li_element. 
 * 
 * If the value of the element with the id id_product_line is greater than 0, it calls the function
 * get_line_product. 
 * 
 * I hope this helps.
 * @param id_product_line - the id of the product line
 * @param name_product_line - is the name of the product line
 */

const get_element_product_line = (id_product_line, name_product_line) => {

    $("#product_line_element").html(`<span class="badge bg-secondary">` + name_product_line + `</span>`);
    $("#id_product_line").val(id_product_line);
    $(".li_element").removeClass("open");
    $("#viewsArticles").html("");
    $("#viewsArticles").hide();
    $("#value_search_id").val("");
    if ($("#id_product_line").val() > 0) {
        get_articles_data();
    }

}

/**
 * It sends a form to a php file, and the php file returns a json object.
 */
const get_articles_data = () => {

    let form = document.getElementById('form_index');
    let data_post = new FormData(form);

    let accion = "get_articles_data";
    data_post.append("accion", accion);
    view_loading("articles", true);

    setTimeout(() => {
        $.ajax({
            url: url_controller,
            type: "POST",
            data: data_post,
            processData: false,  // tell jQuery not to process the data
            contentType: false,  // tell jQuery not to set contentType
            success: (rps) => {
                view_loading("articles", false);
                const data = JSON.parse(rps);
                if (data.length > 0) {

                    set_data_local("data_artciles", rps);
                    $("#viewsArticles").show();
                    let row = "";
                    var card = "";
                    let precie_formater = new Intl.NumberFormat('CLP', {})
                    //[{"id_article":4,"product_line_id":2,"model_id":3,"mark_id":4,"year_article":"2023-01-12","position_article":"Derecho Izuquierdo ","detail_article":"Direcion Hidraulica","reference_article":"OEM: 53010-SR3-101","code_article":"1234","info_article":"Direcion Hidraulica","status_article":" ","images_article":"1673579951_867869745.jpg","price_article":"800000"}]
                    data.forEach((element, index) => {
                        let article_string = JSON.stringify(element);
                        card += `<div class="col-md-4">
                                        <div class="card">
                                        <div class="card-body">
                                            <div class="d-flex justify-content-between flex-sm-row flex-column gap-3">
                                            <div class="d-flex flex-sm-column flex-row align-items-start justify-content-between">
                                                <div class="card-title" style="width:170px">
                                                <h5 class="text-nowrap mb-2">${element.info_article}</h5>
                                                <span class="badge bg-label-warning rounded-pill">${element.year_article}</span>
                                                <div class="text-center demo-inline-spacing">
                                                    <button class="btn btn-success mt-3 " id="" onclick="set_cart_article(${element.id_article})" ><i class="bi bi-cart-check"></i></button>
                                                    <button class="btn btn-primary  mt-3" id=""  onclick="view_datail_articles(${element.id_article})"><i class="bi bi-list-columns"></i> </button>
                                                </div>
                                                </div>
                                                <div class="mt-sm-auto">
                                                <small class="text-success text-nowrap fw-semibold"
                                                    >${element.code_article}</small
                                                >
                                                <h3 class="mb-0">$.${precie_formater.format(element.price_article)}</h3>
                                                </div>
                                            </div>
                                            <div id="" >
                                                    <img src="../../ag/assets/img/articles/${element.images_article}" width="100%" data-action="zoom">
                                            </div>
                                            
                                            </div>
                                        </div>
                                        </div>
                         </div>`;

                    });

                }
                row = '<div class="row">' + card + '</div>';
                $("#viewsArticles").html(row);
            }
        });

    }, 1000);
}
/**
 * If the flang parameter is true, show the element with the class name that is passed in as the
 * class_load parameter. Otherwise, hide the element with the class name that is passed in as the
 * class_load parameter.
 * @param class_load - The class of the loading element
 * @param flang - true or false
 */
const view_loading = (class_load, flang) => {

    if (flang == true) {

        $("." + class_load).show();

    } else {

        $("." + class_load).hide();

    }
}

/**
 * If the localStorage item exists, remove it. If it doesn't exist, set it.
 * @param name_data - The name of the data you want to store.
 * @param data - The data you want to store in the local storage.
 */
const set_data_local = (name_data, data) => {

    localStorage.removeItem(name_data);
    localStorage.setItem(name_data, data);

}

/**
 * get_data_local is a function that takes two parameters, id_article and name_local, both of which are optional. 
 * The function parses the localStorage item with the given name_local and filters it to find the article with the given id_article. 
 * If an article is found, it is returned as an array. Otherwise, an empty array is returned.*/

const get_data_local = (id_artile = 0, name_local = "") => {

    let list = JSON.parse(localStorage.getItem(name_local));
    const article = list.filter(article => article.id_article == id_artile);
    return article[0];
}

// This function retrieves the number of items in a list stored in localStorage.
// It takes an optional parameter 'name_local' which is the name of the list.
// If no list is found, it will return 0.

const get_data_count_local = (name_local = "") => {

    let list = JSON.parse(localStorage.getItem(name_local));
    console.log(typeof list);
    return (list) ? list : 0;
}


//This function removes data from local storage. It takes two parameters:
// name_local (a string that is the name of the local storage item) and id_article
// (the id of the article to be removed). It parses the local storage item, then iterates 
//through it to find the element with a matching id_article. If found, it removes that element from the list and sets the new list back into local storage. Finally, it calls set_cart_article with a value of 0.
const remove_data_local = (name_local = "", id_article) => {

    let list_data = JSON.parse(localStorage.getItem(name_local));

    list_data.forEach((element, index) => {

        if (element.id_article == id_article) {
            list_data.splice(index);
        }

    })
    localStorage.removeItem(name_local);

    localStorage.setItem(JSON.stringify(name_local, list_data));
    set_cart_article(0);
}

/**
 * It takes an id_article, looks up the corresponding article in localStorage, and then displays the
 * article's information in a modal.
 * @param id_article - id of the article
 */
const view_datail_articles = (id_article) => {

    let data = localStorage.getItem("data_artciles");
    let data_json = JSON.parse(data);

    let resp = data_json.filter(element => element.id_article == id_article);

    $("#img_article").attr("src", "../../ag/assets/img/articles/" + resp[0].images_article);
    $("#informacion_article").text(resp[0].info_article);
    $("#reference_article").text(resp[0].reference_article);
    $("#position_article").text(resp[0].position_article);
    $("#modal_viewe_article_detail").modal("show");
    let precie_formater = new Intl.NumberFormat('CLP', {})
    $("#price_article").text("$ " + precie_formater.format((resp[0].price_article)));
    $("#botones").html(`<button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                            Close
                        </button>
                        <button type="button" class="btn btn-info" onclick="set_cart_article(${id_article})">
                            <i class="bi bi-cart-check"></i>
                        </button>
                        <button type="button" class="btn btn-success"><i class="bi bi-cart-check"></i> Comprar</button>`);
}
/**
 * The function set_props_input takes two arguments, name_attr and name_prop, and sets the placeholder
 * attribute of the input element with the class input_search to the value of name_attr and the id
 * attribute of the input element with the class input_search to the value of name_prop.
 * @param name_attr - The placeholder text
 * @param name_prop - the name of the property that will be used to search for the data.
 */

const set_props_input = (name_attr, vale_data) => {

    $(".input_search").attr("placeholder", name_attr);
    $(".input_search").attr("data-search", vale_data);
    $("#options_articles").html("");
    $(".input_search").val("");

}

/**
 * It takes a value from an input, and then sends it to a php file, which then returns a list of
 * options to be displayed in a select.
 * </code>
 * @param vale_input - is the value of the input
 */
const get_name_list_article = (vale_input) => {


    let accion = "get_name_list_article";

    if (accion != "" && vale_input.length == 3) {

        $.post(url_controller, { vale_input: vale_input, accion: accion }, (resp) => {
            let data = JSON.parse(resp);
            data.forEach(element => $("#options_articles").html(`<option value="${element.detail_article}"></option>`));
        });

    }

}

/**
 * It takes an array of objects, and for each object in the array, it creates a string of HTML, and
 * then appends that string to the DOM.
 * @param local_publications - promo_public, info_article
 */
const get_list_publications = (local_publications) => {

    let accion = "get_list_publications";
    $.post(url_controller, { accion: accion, local_publications: local_publications }, (rps) => {

        // [{"id_publication":1,"title_publication":"Oferta","description_publication":"Esto es la descripcion de la oferta","date_publication":"2023-01-15 18:55:27.158472","location_publication":"promo_public","img_publication":"1673826927.jfif"}]

        let data = JSON.parse(rps);
        // console.log(data);
        data.forEach((element, index) => {
            let dom = "";
            if (element.location_publication === "promo_public") {
                dom += ` <div class="col-md-12 mb-3">
                                <div class="card h-100">
                                <img class="card-img-top" src="../../ag/assets/img/publications/${element.img_publication}">
                                <div class="card-body">
                                    <h3 class="card-title">${element.title_publication}</h3>
                                    <p class="card-text">
                                        ${element.description_publication}
                                    </p>
                                    <span class="badge bg-label-success">${moment(element.date_publication).format("LLL")}</span>
                                </div>
                                </div>
                            </div>`;

            } else if (element.location_publication == "info_article") {

                dom += `<div class="card mb-3">
                            <div class="row g-0">
                                <div class="col-md-4">
                                <img class="card-img card-img-left" src="../../ag/assets/img/publications/${element.img_publication}" alt="Card image">
                                </div>
                                <div class="col-md-8">
                                <div class="card-body">
                                    <h3 class="card-title">${element.title_publication}</h3>
                                    <p class="card-text">
                                       ${element.description_publication}
                                    </p>
                                    <span class="badge bg-label-success">${moment(element.date_publication).format("LLL")}</span>
                                </div>
                                </div>
                            </div>
                            </div>`;
            }
            $("#" + element.location_publication).html(dom);

        });
    });

}

/**
 * It takes a JSON array of objects, and creates a button for each object in the array.
 */
const get_list_new_models = () => {
    let accion = "get_list_new_models";

    $.post(url_controller, { accion: accion }, (rps) => {
        //[{"id_model":4,"name_model":"Integra","description_model":" esto es una prueba ","status_model":"1","mark_id":4}]
        // console.log(rps);
        let data = JSON.parse(rps);
        let btn = "";
        data.forEach((element, index) => {
            btn += `<div class="col-md-4 pt-2">
                         <button type="button" class="btn btn-outline-info btn-xl" onclick="list_articles_models(${element.id_model})">${element.name_model}</button>
                      </div>`;
        });

        $("#new_models").html(btn);

    });


}

/**
 * If the value of the id_model input is greater than 0, then get the articles data.
 */
const list_articles_models = id_model => {
    $("#id_model").val(id_model);
    $("#value_search_id").val("");
    if ($("#id_model").val() > 0) {
        get_articles_data();
    }
}
//guarda en el local store el arreglo en formato Json
const gurdar_local_carr = ($arreglo) =>{
    let carJson = JSON.stringify($arreglo);
    localStorage.setItem("Items_Carro",carJson);
}
//asigna los valores almacenados en Json en el local estore al arreglo
const local_carr = () =>{
    let local_car = localStorage.getItem("Items_Carro");
    let local_car_Json = JSON.parse(local_car);
    if(local_car_Json.length !== 0){
        alproduc = [...local_car_Json];
    }
}
//id de articulos guardados
let id = "";
//agrega articulos al carro de compra y lo renderiza
let alproduc = [];
const set_cart_article = (id_article) => {
    //consulta el local estore
    local_carr();
    let data = localStorage.getItem("data_artciles");
    let data_json = JSON.parse(data);
    let resp = data_json.filter(element => element.id_article == id_article);
    //se crear un objecto iteral
    const infoProduc = { 
        cantidad: 1,
        title:resp[0].reference_article,
        precio:resp[0].price_article,
        id:resp[0].id_article,
    }
    //recorro en busquedad del id si existe la variable devuelve true
    const existencia = alproduc.some(product =>product.id === infoProduc.id);
    if (existencia) {
        //se busca el id en el objecto y se le aumenta la cantidad 
        const product = alproduc.map(product => {
            if (product.id === infoProduc.id) {
                product.cantidad++;
                return product
            }else{
                return product
            }
        })
        //se exparse el arreglo
        alproduc = [...product]
    }else{
        alproduc = [...alproduc,infoProduc]    
    }
    //guarda el arreglo en el locaL estore
    gurdar_local_carr(alproduc);
    imhtml(); 

    //envia por metodo pos cada uno de los productos que se agrege al carro
    let accion = "objectos_carr";
    console.log(data_json);
    $.post(url_controller_mercado, { accion: accion,
        id: alproduc[0].id,
        title : alproduc[0].title,
        quantity : alproduc[0].cantidad,
        unit_price : alproduc[0].precio,
        jason:data_json },
        (rps) => {
        // id = JSON.parse(rps);
        // localStorage.setItem("Id_carr",id);
        
    });
}
//genera el htm del carro con cada una de las filas segun productos esten almacenados
const imhtml = () => {
     //variables se inicializan vacias y en cero para no duplicar datos
     let card = "";
     let valorTotal = 0;
     let numProd = 0;
     
    let div_carr =` <h5 class="modal-title" id="">Carro de Compras</h5>
                        <table class="table">
                        <thead>
                            <tr>
                            <th scope="col">Id</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Cantidad</th>
                            <th scope="col">$ valor</th>
                            <th scope="col"></th>
                            </tr>
                            </thead>
                            <tbody id="table-body">

                            </tbody>
                            </table>
                        <div class="modal-body" id="list_articles_cart">
                            <p>Valor total</p>
                            <div id="precioT"></div>
                        </div>
                        `
                        
    if(alproduc.length !== 0){
        //se recorre el arreglo y se concatena el HTML de las filas
        alproduc.forEach(product => {
            card += `<tr>
                        <th scope="row">${product.id}</th>
                        <td>${product.title}</td>
                        <td>${product.cantidad}</td>
                        <td>${product.precio}</td>
                        <td>   <div class="btn-group" role="group">
                                    <button type="button" class="btn btn-primary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                    :
                                    </button>
                                    <ul class="dropdown-menu">
                                    <li><a class="dropdown-item" href="#" Onclick="deletes(${product.id})">Eliminar</a></li>
                                    <li><a class="dropdown-item" href="#">Ir a pagar</a></li>
                                    </ul>
                                </div>
                        </td>
                    </tr>`
            //multiplica el precio unitario por la cantidad
            valorTotal = valorTotal + parseInt(product.cantidad * product.precio)
            //suma la cantidad de productos
            numProd = numProd + product.cantidad
        })
        
            $("#modal_compras").html(div_carr);
            //imprime el html en el id table-body
            $("#table-body").html(card);
            //imprime el html en el id precioT
            $("#precioT").html(`<p>${valorTotal}</p>`)
            //imprime el html en el id count_product
            $('#count_product').text(numProd);
            // pagarTodo(numProd);
     }else{
        $("#modal_compras").html(`<h2>No hay productos agregados al carro</h2>`);
        $('#count_product').text(numProd);
     }
    //  pagarTodo();
    }
/**
 * permite eliminar las filas del carrito de compras
 * @param {*} $producto 
 */
function deletes($producto){
    alproduc = alproduc.filter(product=> product.id !== $producto);
    imhtml();
    gurdar_local_carr(alproduc);
}
// function pagarTodo(){
//         $("#acciones").html(` 
//         <div class="cho-container" id="enviar_arreglo" Onclick="enviarArr()"></div>
//         <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
//             close
//         </button>`)
// }
//enviar arreglo en formato Json
const enviarArr = () =>{
    
}
//constante de mercado pago
const mp = new MercadoPago('TEST-a194d62e-4b7a-444a-94cd-ce3b2be7e791', {
    locale: 'es-CO'
  });
  mp.checkout({
    preference: {
      id:localStorage.getItem("Id_carr")
    },
    render: {
      container: '.cho-container',
      label: 'Pagar',
    }
  });
init();
