console.log("layout.js loaded"),document.getElementById("menubar").onclick=()=>{const e=document.querySelector("#header > div form"),o=document.querySelectorAll("#header > div nav a");checkbox.checked?(o.forEach(((e,c)=>{e.animate({left:[0,`-${300+100*(o.length-c)}%`]},500)})),e.animate({left:[0,"-100%"]},500).onfinish=()=>{checkbox.checked=!1,document.body.style.overflow="auto"}):(checkbox.checked=!0,document.body.style.overflow="hidden",e.animate({left:["-100%",0]},400),o.forEach(((e,o)=>{e.animate({left:["-100%",0]},200+100*o)})))},window.matchMedia("(min-width : 768px)").onchange=e=>{e.matches&&(checkbox.checked=!1,document.body.style.overflow="auto")},window.onNavigate=()=>{checkbox.checked=!1,document.body.style.overflow="auto"},window.onMount=()=>{scan()};