const e=["name","number","email","main-text"],t=["name","number","email"];var o=(e,t,o)=>{e.forEach((e=>o.push(t.querySelector(`#${e}`))))},n=e=>{e.splice(0,e.length)},c=e=>{e.forEach((e=>e.value=""))},s=e=>{const t={};return e.forEach((e=>t[e.id]=e.value)),t},l=e=>t=>{t.preventDefault();const o=e||t.target.className,n=document.getElementById(o);n&&n.scrollIntoView({behavior:"smooth"})},r=(e,t)=>{e.forEach((e=>e.addEventListener("click",t)))},a=()=>{const e=window.pageYOffset||document.documentElement.scrollTop,t=window.pageXOffset||document.documentElement.scrollLeft;window.onscroll=function(){window.scrollTo(t,e)}},d=()=>{window.onscroll=function(){}};$(document).ready((function(){$(".projects-cards").owlCarousel({items:5.5,autoWidth:!0,autoplay:!0,loop:!0,rewind:!0,margin:40})})),$(document).ready((function(){$(".case-cards").owlCarousel({items:1,dots:!0,autoplay:!0,dotsContainer:"#dots",dotsEach:!0,rewind:!0})}));const i=$(".case-cards");$("#slide-next-arrow").click((function(){i.trigger("next.owl.carousel")})),i.on("changed.owl.carousel",(function(e){document.getElementById("slide-number").innerHTML=`${e.item.index+1}/${e.item.count}`}));const u=document.getElementById("header"),m=u.offsetTop;window.addEventListener("scroll",(()=>{window.pageYOffset>m?u.classList.add("sticky"):u.classList.remove("sticky")}));const E=document.getElementById("scroll-arrow-info"),g=document.getElementById("nav");E.addEventListener("click",l("services")),g.addEventListener("click",l()),$("#footer-scroll-up").click((function(){return $("html, body").animate({scrollTop:0},"slow"),!1}));const y=document.getElementById("write-to-us"),f=document.getElementById("discuss-case"),v=document.querySelectorAll('button[data-btn="discuss-case"]'),w=document.querySelectorAll('button[data-btn="write-to-us"]'),L=()=>{d(),y.classList.contains("close")||y.classList.add("close"),f.classList.contains("close")||f.classList.add("close")};r([...v,...w],(e=>{const t=e.currentTarget.dataset.btn,o=(()=>{const e=y.querySelector(".overlay"),t=f.querySelector(".overlay");return[e,y.querySelector(".modal-close-ico"),t,f.querySelector(".modal-close-ico")]})();r(o,L),t&&(document.getElementById(t).classList.remove("close"),a()),o.forEach((e=>removeEventListener("click",e)))}));const[b,p,h]=document.querySelectorAll(".modal-submit"),k=[],I=l=>{l.preventDefault();const r=l.currentTarget.parentElement;n(k);const a="footer-form"===r.id?t:e;o(a,r,k);const d=s(k);c(k),console.log(d)};b.addEventListener("click",I),p.addEventListener("click",I),h.addEventListener("click",I);const B=document.getElementById("burger-btn"),T=document.getElementById("burger-btn-close"),q=document.getElementById("menu"),[S,x]=q.getElementsByClassName("nav");x.addEventListener("click",(e=>{d(),e.preventDefault(),q.classList.add("close");const t=e.target.className,o=document.getElementById(t);o&&o.scrollIntoView({behavior:"smooth"})})),B.addEventListener("click",(e=>{a(),"burger-btn"===e.currentTarget.id&&q.classList.remove("close")})),T.addEventListener("click",(e=>{d(),"burger-btn-close"===e.currentTarget.id&&q.classList.add("close")}));