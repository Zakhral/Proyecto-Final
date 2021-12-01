let productos=[];
//Button to add data
let btnAdd=document.getElementById('btnAdd');
    btnAdd.addEventListener('click',()=>{
        let nombre=document.getElementById('nombre').value;
        let cantidad=document.getElementById('cantidad').value;
        let precio=document.getElementById('precio').value;
        let datos={nombre:nombre,cantidad:cantidad,precio:precio};
        console.log(datos);
        fetch('http://localhost:2403/ventas/producto',{
            method:'POST',
            body:JSON.stringify(datos),
            headers:{
            'Content-Type':'application/json'
        }
        })
            .then(res=>res.json())
            .then(json=>{
                let resul=document.getElementById('resultados');
                    resul.innerHTML=`
                    <p>SE INSERTO EL REGISTRO CON EL ID: ${json.insertId}<P>
                    `;
                    document.getElementById('nombre').value=" ";
                console.log(json)
            });
    });
//DOMLOADED
    document.addEventListener('DOMContentLoaded',()=>{
        fetch('http://localhost:2403/ventas/producto')
            .then(response => response.json())
            .then(json => {
                //console.log(json);
                Inf=JSON.stringify(json);
                let resul=document.getElementById('resultados');
                    let select=document.getElementById("Seleccion");
                    // console.log(json);
                    let lista="";
                    for(let j=0;j<json.length;j++)
                        {
                            lista+="<option value='"+json[j].id+"'>" + json[j].name + json[j].cost+"</option>";
                            select.innerHTML=lista;
                        }
            });
        
    })
//Button to list
    let btnListar=document.getElementById('btnListar');
    btnListar.addEventListener('click',()=>{
        fetch('http://localhost:2403/ventas/producto')
            .then(response => response.json())
            .then(json => {
                //console.log(json);
                Inf=JSON.stringify(json);
                let resul=document.getElementById('resultados');
                
                let informacion=` 
                    <table >
                    <tr>
                        <th>Producto</th>
                        <th>Precio</th>
                    </tr>`;
                for(let i=0;i<json.length;i++)
                    {
                        informacion+=`
                        <tr>
                            <td>${json[i].name}</td>
                            <td align="center">${json[i].cost}</td>
                        </tr>
                        
                        
                        `;
                        
                        resul.innerHTML=informacion+'</table>';
                    }
                });
            })
//button Facturar
    let btnCarrito=document.getElementById('btnCarrito');
    btnCarrito.addEventListener('click',()=>{
        let menu=document.getElementById('Seleccion').value;
        let cantidad=document.getElementById('cant').value;
        fetch(`http://localhost:2403/ventas/producto/${menu}`)
        .then(res=>res.json())
        .then(json=>{
            let costproduct=json[0].cost;
            let multiplicacion=costproduct*cantidad;
            let producto={productoid:`${json[0].id}`,cantidad:cantidad,costo:multiplicacion}
            productos.push(producto);
            console.log('Agregado al carrito',producto);
        })
    });
//Button iva + total
    let btnTotal=document.getElementById('btnTotal');
        btnTotal.addEventListener('click',()=>{
            let suma1=0;
            let ivatotal=0;
            let venta=document.getElementById('venta');
            let iva=document.getElementById('iva');
            let costototal=document.getElementById('monto');
            for(let i=0;i<productos.length;i++){
                suma1+=productos[i].costo;
                ivatotal=suma1*0.16;
            }
            venta.value=suma1;
            iva.value=ivatotal;
            costototal.value=suma1+ivatotal;
        });
//btn invoice
    btnFactura=document.getElementById('btnFactura');
        btnFactura.addEventListener('click',()=>{
            let date=document.getElementById('fecha').value;
            let rfc=document.getElementById('rfc').value;
            let ivat=document.getElementById('iva').value;
            let costt=document.getElementById('monto').value;
            let datosf={RFC_CUSTOMER:rfc,DATE:date,IVA:ivat,TOTALCOST:costt,PRODUCTS:productos}
            fetch('http://localhost:2403/ventas/factura',{
                method:'POST',
                body:JSON.stringify(datosf),
                headers:{
                    'Content-Type':'application/json'
                }
                })
            .then(res=>res.json())
            .then(json=>{
                console.log(datosf)
                console.log(json)

            });
        });