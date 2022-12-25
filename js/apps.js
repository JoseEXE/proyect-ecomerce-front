$.ajax({
  url: "js/base.json",
  datatype: "json",
  cache: false,

  success: function (data) {
    //Peindre les produits
    var htmlprod = "";
    for (var i = 0; i < data.produit.length; i++) {
      htmlprod += "<div class='col-lg-3 col-md-6 col-sm-6'>";
      htmlprod += "<figure class='card card-product-grid text-center prodprin'>";
      htmlprod += "<img src=" +
        data.produit[i].image +
        " class='card-img-top' alt=" +
        data.produit[i].image +
        "></img>";
      htmlprod += "<div class='card-body'>";
      htmlprod += "<h5 id='titre' class='card-title'>" + data.produit[i].nom + "</h5>";
      htmlprod += "<p id='description' class='card-text'>" +
        data.produit[i].descrption +"</p>";
      htmlprod += "<p id='prix' class='card-text'>prix: " +
        data.produit[i].prix +" €</p>";
      htmlprod += "<a id=" + i +" href='#' class='prod btn text-bg-info'>Ajouter au panier</a>";
      htmlprod += "</div>";
      htmlprod += "</figure>";
      htmlprod += "</div>";
    }
    $(".improd").html(htmlprod);
    //======================================
    var cantite = 0;
    cantiteT = "";
    
    //Préparer et créer le tableau pour les produits sélectionnés 1er fois
    let achat = [];
    cant = 1;
    function miCarrito(product) {
      var vide = "";
      if (achat.length > 0) {
        /// A changer a do while::::::::::::::::::
        for (var i = 0; i < achat.length; i++) {
          if (Number(product) == Number(achat[i].id)) {
            vide = "entra";
            achat[i].cant++;
            //break;
          }
        }
        if (vide !== "entra") {
          achat.push({ id: product, cant: 1 });
          vide = "";
        }
        ///::::::::::::::::::::::::::::::::::::::::
      } else {
        achat.push({ id: product, cant: 1 });
      }
      imprimHtml();
      return achat;
    }
    //=========================

    function limpiare() {
      var charriot = "";
      var totalprod = 0;
      var total = "";
      $(".total").html(total);
      $(".divsm").html(charriot);
    }

    //Modification de tableau produits a acheter
    function modificcantite(product, productVal) {
      prixTprod = 0;
      cantiteTprod = 0;
      for (var i = 0; i < achat.length; i++) {
        if (Number(product) == Number(achat[i].id)) {
          achat[i].cant = productVal;
        }
      }

      $(achat).each(function (index, valor) {
        prixTprod += valor.cant * data.produit[valor.id].prix;
        cantiteTprod += Number(valor.cant);
      });

      total =
        "<div class='col-md-6 col-sm-6'><strong>Total: " +
        prixTprod +
        " € </strong></div>";
      total += "<div class='col-md-6 col-sm-6'>";
      total +=
        "<button class='btn btn-primary valcommande btn-sm' type='button' data-bs-toggle='offcanvas' data-bs-target='#offcanvasExample' aria-controls='offcanvasExample'>Valider la commande</button>";
      total += "</div>";

      $(".cantite").text("");
      $(".cantite").text(cantiteTprod);
      $(".total").html(total);

      if (prixTprod == 0) {
        total = "";
        $(".total").html(total);
        msnAchat();
      }
    }
    //======================================


    //Peindre les actualisations
    function imprimHtml() {
      var charriot = "";
      var totalprod = 0;
      var total = "";
      $(".total").html(total);
      $(".divsm").html(charriot);
      for (i = 0; i < achat.length; i++) {
        charriot += "<li class='divsm list-group-item sup" + achat[i].id + "'>";
        charriot += "<div class='divsm1 card-body row'>";
        charriot +=
          "<div class='col-md-8 col-sm-8'>Désignation : <strong>" +
          data.produit[achat[i].id].nom +
          "</strong> </div>";
        charriot += "<div class='col-md-4 col-sm-4'>";
        charriot +=
          "<button type='button' class='btn btn-primary btn-sm btn-danger supprimer' id=" +
          achat[i].id +
          ">Supprimer</button>";
        charriot += "</div></div>";
        charriot += "<div class='divsm1 card-body'><div> ";
        charriot +=
          "<label for='tentacles'>Quantité :  </label><input type='number' id=" +
          achat[i].id +
          " class='cantiteinput' name='tentacles' min='1' max='10' size='3' value=" +
          achat[i].cant +
          ">";
        charriot += "</div>";
        charriot +=
          "<p class='card-text'>Prix: <strong>" +
          data.produit[achat[i].id].prix +
          "</strong></p>";
        charriot += "</div></li>";
        totalprod += data.produit[achat[i].id].prix * achat[i].cant;
      }
      if (achat.length > 0) {
        total =
          "<div class='col-md-6 col-sm-6'><strong>Total: " +
          totalprod +
          " € </strong></div>";
        total += "<div class='col-md-6 col-sm-6'>";
        total +=
          "<button class='btn btn-primary valcommande btn-sm' type='button' data-bs-toggle='offcanvas' data-bs-target='#offcanvasExample' aria-controls='offcanvasExample'>Valider la commande</button>";
        total += "</div>";
      }
      $(".total").html(total);
      $(".divsm").html(charriot);
    }
    
    //Button Ajouter au panier
    $(".prod").on("click", function () {
      //e.preventDefault();

      let product = Number($(this).prop("id"));
      achat = miCarrito(product);
      cantiteTprod = 0;
    //Para traer la cantidad completa de productos selecctonados
      $(achat).each(function (index, valor) {
        cantiteTprod += Number(valor.cant);
      });
    //Envio el valor visible al publico
      $(".cantite").text(cantiteTprod);
      $(".cantite").show(1000);
    });
    //==========================

    //Button Panier
    $(".btncharriot").on("click", function () {
      imprimHtml();
      //Modification cantite produit button
      $(".cantiteinput").on("click", function () {
        product = Number($(this).prop("id"));
        productVal = Number($(this).prop("value"));
        modificcantite(product, productVal);
      });
       //Modification cantite produit ecrit
      $(".cantiteinput").on("keyup", function () {
        product = Number($(this).prop("id"));
        productVal = Number($(this).prop("value"));
        if ($(this).prop("value") == "" || $(this).prop("value") == null) {
          productVal = 0;
        }
        modificcantite(product, productVal);
      });
        //supprimir produit button
      $(".supprimer").on("click", function () {
        produitDel = $(this).prop("id");
        productVal = 0;
        modificcantite(produitDel, productVal);
        $(achat).each(function (index, valor) {
          if (Number(valor.id) == Number(produitDel)) {
            indexAdelet = index;
          }
        });
        achat.splice(indexAdelet, 1);
        produitDelCach = $(".sup" + produitDel);
        produitDelCach.fadeOut();
        msnAchat();
      });
    });

    function msnAchat() {
      if (achat.length <= 0) {
        $(".panier").html(
          "<img src='/img/chariot.jpg' ><p>Votre panier est tristement vide en ce moment.</p>"
        );
      } else {
        $(".panier").text("Voici la liste de vous produits(vous pouvez augmenter la quantité si vous le souhaitez).");
      }
    }

    $(".btncharriot").on("click", function () {
      msnAchat();
    });

    // Validation Formulaire
    $(".envform").on("click", function () {
      let msnError = " est un champ obligatoire, maximum 25 caractères";
      champs = $(".form-control");
      cont = 0;
      $(champs).each(function (index, val) {
        if (val.value == "" || val.value.length > 25 || val.value.length < 3) {
          $(".error" + val.name).text(val.placeholder + msnError);
          $("#" + val.name).addClass("is-invalid");
        } else {
          $(".error" + val.name).text("");
          $("#" + val.name)
            .removeClass("is-invalid")
            .addClass("is-valid");
        }

        if ($(".error" + val.name).text() !== "") {
          cont++;
        }
      });

      if (cont == 0) {
        $(".toast").toast("show");
        //$('.btn-close').click();
        var htmlrappor1 = "";
        var htmlrappor2 = "";
        $(champs).each(function (index, val) {
          htmlrappor1 +=
            "<div class='col-md-6 col-sm-6 fs-6'><p class='rapportText'>" +
            val.placeholder +
            ": <strong>" +
            val.value +
            "</strong></p>";
          htmlrappor1 += "</div>";
        });

        $("#rapport1").html(htmlrappor1);
        prixTprod = 0;
        $(achat).each(function (index, val) {
          htmlrappor2 +=
            "<div class='col-md-12 col-sm-12 fs-6'><p class='rapportText'><strong>" +
            data.produit[val.id].nom +
            "</strong></p></div>";

          htmlrappor2 +=
            "<div class='col-md-6 col-sm-6 fs-6'><p class='rapportText'>Prix unitaire: <strong>" +
            data.produit[val.id].prix +
            " €</strong></p></div>";
          htmlrappor2 +=
            "<div class='col-md-6 col-sm-6 fs-6'><p class='rapportText'>Quantite: <strong>" +
            val.cant +
            "</strong></p></div><hr>";
          prixTprod += data.produit[val.id].prix * val.cant;
        });

        htmlrappor2 +=
          "<div class='totalrapport col-md-12 col-sm-12 text-primary-emphasis bs-danger-bg-subtle border border-primary-subtle rounded-3'><p class='rapportText '>Total à payer: <strong>" +
          prixTprod +
          " €</strong></p></div>";

        $("#rapport2").html(htmlrappor2);
        console.log(htmlrappor2);

        $(".btn-closex").click();
      }
    });

    $(".form-control").on("keyup", function () {
      let msnError = " est un champ obligatoire, maximum 20 caractères";
      if ($(this).val() == "" || $(this).val().length > 25 || $(this).val().length < 3) {
        $(".error" + $(this).prop("id")).text($(this).prop("placeholder") + msnError);
        $(this).addClass("is-invalid");
      } else {
        $(".error" + $(this).prop("id")).text("");
        $(this).removeClass("is-invalid").addClass("is-valid");
      }
      if ($(this).prop("id") == "Email" && $(this).val().length >= 3) {
        email =
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;
        if (!email.test($(this).val())) {
          $(".error" + $(this).prop("id")).text(
            "L'email doit être compris avec le format: abc@abc.fr/.com"
          );
          $(this).addClass("is-invalid");
        } else {
          $(".error" + $(this).prop("id")).text("");
          $(this).removeClass("is-invalid").addClass("is-valid");
        }
      }

      if ($(this).prop("id") == "Tel") {
        mobile = /^(01|02|03|04|05|06|07|08|09)[0-9]{8}$/;
        if (!mobile.test($(this).val())) {
          $(".error" + $(this).prop("id")).text(
            "Seuls les numéros sont acceptés, 10 chiffres"
          );
          $(this).addClass("is-invalid");
        } else {
          $(".error" + $(this).prop("id")).text("");
          $(this).removeClass("is-invalid").addClass("is-valid");
        }
      }
    });

    $(".finaliser").on("click", function () {
      window.location.replace("index2.html");
    });
  },

  error: function (xhr) {
    console.log(xhr.status);
  },
});
