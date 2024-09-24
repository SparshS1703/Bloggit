console.log("hello");
const save=document.getElementsByClassName("save")[0];
const create=document.getElementsByClassName("create")[0];
console.log(title);
console.log(content);
console.log(bindex);
console.log(pindex);

let titlenew=document.getElementsByClassName("title")[0];
let contentnew=document.getElementsByClassName("content")[0];

titlenew.addEventListener("change",(e)=>{
    title=e.target.value;
})
contentnew.addEventListener("change",(e)=>{
    content=e.target.value;
})

save.addEventListener("click",async function(e){
    e.preventDefault();
    const req=new Request("/savepost",{
        method:"POST",
        headers: {
            'Content-Type': 'application/json' // Ensures the server treats the body as JSON
        },
        body: JSON.stringify({title: title,
            content: content,
            bindex: bindex,
            pindex: pindex
        }),
    });
    const res=await fetch(req);
    console.log("abc",res.status);
    if(res.ok)
        {
            window.location.href="/homee"; 
        }
    

})


const help=document.getElementsByClassName("help")[0];
const account=document.getElementsByClassName("account")[0];