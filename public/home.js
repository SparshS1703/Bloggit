

var create=document.getElementsByClassName("create")[0];
var cancel=document.getElementsByClassName("cancel")[0];
var input= document.getElementById("blogname");
var title=document.getElementsByClassName("select")[0];
var option=document.getElementsByClassName("option");
var deleteblog=document.getElementsByClassName("dustbin");



if(blog.length==0){
    title.style.height="0px";
window.onload=function(){
    toggle();
}
}

function toggle(){
    document.getElementsByClassName("popup")[0].classList.toggle("active"); 
    document.getElementById("blur").classList.toggle("active");
}
cancel.addEventListener("click",toggle);

input.addEventListener("change",change);
function change(e){
    var blogname=e.target.value;
    if(blogname.length>0)
        rest(blogname);
}
function rest(blogname){
   create.addEventListener("click",function(){
    toggle();
    document.getElementById("blogtitle").innerHTML=blogname;
   });
}

title.addEventListener("click",function(){
    document.getElementsByClassName("options")[0].classList.toggle("drop");
    document.getElementById("angle").classList.toggle("rotate");
});


document.getElementById("blog").addEventListener("click",toggle);
console.log("in=",index);
let options=document.getElementsByClassName("option");
for(let i=0;i<options.length;i++){
    console.log(options[i]);
    
    options[i].addEventListener("click",async function (e){
            
            let index2=e.currentTarget.id;
            const req=new Request("http://localhost:3000/homee",{
                method:"POST",
                headers: {
                    'Content-Type': 'application/json' // Ensures the server treats the body as JSON
                },
                body: JSON.stringify({index:index2}),
            });
            
            const res=await fetch(req);
            console.log(res.status);
            if(res.ok)
            {
                window.location.reload(); 
            }

        });
}
for(let i=0;i<blog.length;i++){
    console.log("blog[",i,"]=",blog[i])
}
console.log("in=",index);
let postboxs=document.getElementsByClassName("postbox");
for(let i=0;i<postboxs.length;i++)
{
    postboxs[i].addEventListener("click",async function (e){
        let index1=e.currentTarget.id;
        console.log(blog[index].post[index1]);
        let p=blog[index].post[index1];
        let title=p.title;
        let content=p.content;
       
        window.location.href=`/newpost?title=${title}&content=${content}&bindex=${index}&pindex=${index1}`;

    })
}


const del=document.getElementsByClassName("del");
for(let i=0;i<del.length;i++){
del[i].addEventListener("click",async (e)=>{
    e.stopPropagation();
    let postIndex = e.currentTarget.closest(".postbox").id;
    let blogIndex = e.currentTarget.closest(".postbox").getAttribute('blog-index');

        console.log("Delete post at index:", postIndex, "from blog at index:", blogIndex);

        const req=new Request("http://localhost:3000/deletepost",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json' // Ensures the server treats the body as JSON
            },
            body: JSON.stringify({pindex: postIndex,
                bindex: blogIndex
            }),
        })
        const res=await fetch(req);
        if(res.ok)
        {
            window.location.reload(); 
        }

   
})
}