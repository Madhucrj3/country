const resultCountries=document.getElementById("resultCountries");
const searchInput=document.getElementById("searchInput");
let filterData=[];
document.getElementById("spinner").classList.remove("d-none");
const getData=async ()=>{
    await fetch("https://apis.ccbp.in/countries-data")
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            console.log(jsonData);
            filterData=jsonData;
            fill(jsonData);
        })
        .catch((error) => {
            console.log(error)
          });
}
const fill=async (data)=>{
    document.getElementById("spinner").classList.add("d-none");
    resultCountries.innerHTML="";
    data.forEach((res,index)=>{
        const div2=document.createElement('div');
        div2.setAttribute('class',"country-card");
        const div3=document.createElement('div');
        div3.setAttribute('class',"secondcontd");
        const div4=document.createElement('div');
        div4.setAttribute('class',"thirdcontd");
        const img=document.createElement('img');
        img.src=res.flag;
        img.setAttribute('class',"country-flag");
        div3.appendChild(img);
        div2.appendChild(div3);
        const h1=document.createElement('h1');
        h1.textContent=res.name;
        h1.setAttribute('class',"country-name");
        const p=document.createElement('p');
        p.append(document.createTextNode(res.population));
        p.setAttribute('class',"country-population");
        div4.appendChild(h1);
        div4.appendChild(p)
        div2.appendChild(div4);
        resultCountries.appendChild(div2);
    })
}
getData();
searchInput.addEventListener('keyup',(e)=>{
    if(searchInput.value==='')
    getData();
    else{
        let res=[];
        document.getElementById("spinner").classList.remove("d-none");
        filterData.forEach((data)=>{
             if(data.name.includes(searchInput.value))
             {
                res.push(data);
             }
             else{
                const currStr=data.population.toString();
                if(currStr.includes(searchInput.value))
                res.push(data);
             }
             
        })
        console.log(res);
        setTimeout(()=>{
            fill(res);
        },100)
    }
})