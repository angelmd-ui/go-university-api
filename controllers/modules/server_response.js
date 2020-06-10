

server_response = (fetch,data)=>{
    
    if(err){
        res.status(500).send({
            message: `Error ${err}`
        })
    }
    if(!service){
        res.status(404).send({
            message:'No existen etiquetas'
        })
    }
    res.json(service)
}