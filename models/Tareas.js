const Tarea = require("./tarea");

class Tareas{
    _listado={};

    get listadoArr(){

        const listado =[];
        Object.keys(this._listado).forEach(key =>{
            const tarea=this._listado[key];
            listado.push(tarea);

        });
        return listado;
    }

    constructor(){
        this._listado={};
    }
    cargarTaresFromArray(tareas=[]){

        tareas.forEach( tarea=>{
            this._listado[tarea.id]=tarea;
        })
    }

    crearTarea(desc=''){
        const tarea = new Tarea(desc);
        this._listado[tarea.id] =tarea;
    }
    listadoCompleto(){
        
        this.listadoArr.forEach((tarea,i)=>{
        const number= `${i+1}.`.green;
        const{desc,completadoEn}=tarea;
        const estado =(completadoEn)
                    ?'completada'.green
                    :'pendiente'.red
        console.log(`${number }${desc  }${` :: `.yellow}${  estado}`)



        })
    }
    borrarTarea(id=''){
        if(this._listado[id]){
            delete this._listado[id];
        }
    }
    listarPendientes(completadas=true){
        let number=0;
        this.listadoArr.forEach((tarea)=>{
        const{desc,completadoEn}=tarea;
        const estado =(completadoEn)
                    ?'completada'.green
                    :'pendiente'.red
        if(completadas){
            if(completadoEn){
                number+=1
                console.log(`${number}. ${desc }${' :: '.yellow}${ completadoEn.green}`)

            }
        }else{
            if(!completadoEn){
                number+=1
                console.log(`${number}.${desc }${' :: '.yellow}${ estado}`)

            }

        }



    })

    }

    toggleCompletadas(ids=[]){
        ids.forEach(id =>{

            const tarea = this._listado[id]
            if(!tarea.completadoEn){
                tarea.completadoEn= new Date().toISOString()
            }

        });
        this.listadoArr.forEach(tarea=>{
            if(!ids.includes(tarea.id)){
                this._listado[tarea.id].completadoEn=null;
            }
        })
    }
        
}

module.exports= Tareas;