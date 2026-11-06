(function(){
  var LANDING = "https://bse-renovables.github.io/instala/";
  var frm = document.getElementById("frm");
  var pie = document.getElementById("pie");

  var p = {};
  try { p = Object.fromEntries((new URL(location.href)).searchParams); } catch(e) { p = {}; }
  var marca = String(p.v || "").trim().toUpperCase();
  var comercial = String(p.c || "").trim();

  function enlace(){
    return marca ? (LANDING + "?v=" + encodeURIComponent(marca)) : LANDING;
  }

  function mensaje(nombre){
    var pila = String(nombre || "").trim().split(" ")[0];
    var quien = comercial ? (", soy " + comercial + ", de BSE Renovables") : ", te escribo de BSE Renovables";
    return (pila ? ("Hola " + pila) : "Hola") + quien + ".\n\n" +
      "Tenemos una campaña hasta el 31 de diciembre: si instalas placas solares con nosotros, te descontamos 250 € del presupuesto.\n\n" +
      "Antes de nada te hacemos el estudio en tu casa, sin coste y sin compromiso: miramos tu factura y te decimos cuánto bajaría y cuánto costaría.\n\n" +
      "Aquí lo tienes explicado, y si te interesa te llamamos:\n" + enlace();
  }

  var tocado = false;
  frm.elements["m"].value = mensaje("");
  frm.elements["m"].addEventListener("input", function(){ tocado = true; });
  frm.elements["n"].addEventListener("input", function(){
    if (!tocado) frm.elements["m"].value = mensaje(frm.elements["n"].value);
  });

  pie.innerHTML = marca
    ? 'El enlace del mensaje lleva tu marca <span class="marca">' + marca + '</span>, así sabemos que el contacto viene de ti.'
    : 'Este enlace no lleva marca de comercial. Pide el tuyo para que los contactos te cuenten a ti.';

  var cop = document.getElementById("cop");
  cop.addEventListener("click", function(){
    var txt = frm.elements["m"].value;
    var fin = function(ok){
      cop.textContent = ok ? "Copiado · ve a WhatsApp y pega" : "No se ha podido copiar, selecciónalo a mano";
      setTimeout(function(){ cop.textContent = "Copiar el mensaje"; }, 3500);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(txt).then(function(){ fin(true); }).catch(function(){ manual(fin); });
    } else {
      manual(fin);
    }
  });

  function manual(fin){
    try {
      var t = frm.elements["m"];
      t.focus();
      t.setSelectionRange(0, t.value.length);
      fin(document.execCommand("copy"));
    } catch(e) { fin(false); }
  }

  document.getElementById("ir").addEventListener("click", function(){
    window.open("https://wa.me/?text=" + encodeURIComponent(frm.elements["m"].value), "_blank");
  });
})();
