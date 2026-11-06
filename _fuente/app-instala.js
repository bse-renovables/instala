(function(){
  var API = "https://script.google.com/macros/s/AKfycbwHFD9M5OT0B6RO3enJz9QMTSRl1b4OEPJCiqZ11AOsHBIscfVz_1qAhp2NbDJwckGahg/exec";
  var K = "bse-ref-kL7vQx2mB9";
  var frm = document.getElementById("frm");
  var zona = document.getElementById("zona");

  var v = "";
  try { v = (new URL(location.href)).searchParams.get("v") || ""; } catch(e) { v = ""; }
  if (frm.elements["v"]) frm.elements["v"].value = String(v).trim().toUpperCase();

  function hecho(){
    zona.innerHTML = '<div class="ok"><b>Recibido, gracias</b><span>Te llamamos en breve para concretar el estudio. Si prefieres una hora, dínoslo cuando hablemos.</span></div>';
  }

  frm.addEventListener("submit", function(ev){
    ev.preventDefault();
    var b = frm.querySelector("button");
    b.disabled = true;
    b.textContent = "Enviando…";
    var d = { pg: "CAM", k: K };
    ["n","t","d","vv","f","v"].forEach(function(key){
      d[key] = frm.elements[key] ? frm.elements[key].value : "";
    });
    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(d)
    })
    .then(function(r){ return r.json(); })
    .then(function(j){
      if (j && j.ok) { hecho(); }
      else { throw new Error("respuesta no ok"); }
    })
    .catch(function(){
      b.disabled = false;
      b.textContent = "Quiero mi estudio gratis";
      alert("No se ha podido enviar. Inténtalo de nuevo en un momento.");
    });
  });
})();
