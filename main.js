const cnv = document.querySelector('canvas');
const ctx = cnv.getContext('2d');

cnv.style.background = `#fff`;
let looper_let;
let mouseCoors;
let max_histori_int = 50;
let max_circles_on_cnv = 50;

cnv.addEventListener('mousemove',function(e){
    mouseCoors = {
        x:e.clientX - cnv.offsetLeft,
        y:e.clientY - cnv.offsetTop
    }
})
cnv.addEventListener('mousedown',function(){
    // max_histori_int = 150;
    looper_let = setInterval(looper_func,20);
    // LiveCircle();
    console.log(mouseCoors);
    function looper_func(){
        go_To(arrCircle,mouseCoors);
    }
})
window.addEventListener('mouseup',function(){
    clearInterval(looper_let);
    console.log('go off');
    // max_histori_int = 45;
})

let arrCircle = [];
if(cnv && ctx){
    initialize();
}

function initialize(){
    // console.log('boom');
    clearCnv();
    resizeScreen();
    init_circles(max_circles_on_cnv);
    draw_circl();
    setInterval(LiveCircle,30);
    
}
const speed_circl = 30;
const for_defaul_mode = 0.2;
const for_super_mode = 0.8;
function init_circles(n){
    for(let i = 0; i < n; i++){
        arrCircle.push({
            x:Math.random()*cnv.width,
            y:Math.random()*cnv.height,
            vx:1+Math.random()*3,
            vy:1+Math.random()*4,
            histori_way: [],
            size:(2+Math.random())*3,
            color: Math.random() > 0.8 ? '#000000' :
                     Math.random() > 0.7 ? '#FF0000' : 
                        Math.random() > 0.6 ? '#FFFF00' :
                            Math.random() > 0.5 ? '#33DAFF' : '#B833FF'
                            
        })
    }
}

function draw_circl(){
    for(let i = 0 ; i< arrCircle.length;i++){
        ctx.fillStyle = arrCircle[i].color;
        ctx.beginPath();
        ctx.arc(arrCircle[i].x,arrCircle[i].y,arrCircle[i].size,0,Math.PI*2,true);
        ctx.fill();
        ctx.stroke();
    }
}
function LiveCircle(){
    clearCnv();
    
    for(let i = 0; i < arrCircle.length; i++){
        ctx.lineWidth = 5;
        arrCircle[i].x += arrCircle[i].vx;
        arrCircle[i].y += arrCircle[i].vy;
        arrCircle[i].histori_way.push({x1: arrCircle[i].x,y1: arrCircle[i].y});
        if(arrCircle[i].histori_way.length > max_histori_int){
            arrCircle[i].histori_way.shift();
        }
        ctx.strokeStyle = arrCircle[i].color;
        if(i == arrCircle.length - 1){
            ctx.strokeStyle = `rgba(0,0,0,0.2)`;
        }
        ctx.beginPath();
        for(let kk = 0; kk < arrCircle[i].histori_way.length;kk++){
            
            ctx.lineTo(arrCircle[i].histori_way[kk].x1,arrCircle[i].histori_way[kk].y1);
        }
        ctx.stroke();
        
        
        if(arrCircle[i].x > cnv.width){
            arrCircle[i].vx = -Math.random()*speed_circl*for_defaul_mode-Math.random();
        }
        if(arrCircle[i].y > cnv.height){
            arrCircle[i].vy = -Math.random()*speed_circl*for_defaul_mode-Math.random();
        }
        if(arrCircle[i].x < 0){
            arrCircle[i].vx = Math.random()*speed_circl*for_defaul_mode+Math.random();
        }
        
        if(arrCircle[i].y < 0){
            arrCircle[i].vy = Math.random()*speed_circl*for_defaul_mode+Math.random();
        }
    }
    draw_circl();
}
function clearCnv(){
    ctx.beginPath();
    ctx.clearRect(0,0,cnv.width,cnv.height);
    ctx.stroke();
}

function resizeScreen(){
    cnv.width = 1*window.innerWidth;
    cnv.height = 1*window.innerHeight;
    cnv.style.width = `${cnv.width}px`;
    cnv.style.height = `${cnv.height}px`;
}
function go_To(a,b){
    console.log('go on',max_histori_int);
    for(let i = 0; i < a.length; i++){
        let sx,sy;
        if(a[i].x > b.x){
            sx = -Math.random()*speed_circl*for_super_mode-Math.random();
        }
        if(a[i].x < b.x){
            sx = Math.random()*speed_circl*for_super_mode+Math.random();
        }
        if(a[i].y > b.y){
            sy = -Math.random()*speed_circl*for_super_mode-Math.random();
        }
        
        if(a[i].y < b.y){
            sy = Math.random()*speed_circl*for_super_mode+Math.random();
        }
        a[i].vx = sx;
        a[i].vy = sy;
    }
}
window.addEventListener('resize',function(){
    resizeScreen();
})