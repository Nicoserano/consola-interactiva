const {guardarArc, leerDb} = require('./helpers/guardarArchivo');
const { inquirerMenu, tareasCompletas,pausa, leerInput,listadoTareas, confirmar } = require('./helpers/inquirer');
const Tareas = require('./models/Tareas');


require('colors');








const main = async()=>{
    

    let opt = '';
    const tareas = new Tareas();
    const tareasDb = leerDb();
    if(tareasDb){
        tareas.cargarTaresFromArray(tareasDb);
    }
    
    do{
        // imprimir menu
        opt = await inquirerMenu();
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion: ')
                tareas.crearTarea(desc);
                break;
        
            case '2':
                tareas.listadoCompleto();
                break;
            case '3':
                tareas.listarPendientes(true);
                break;
            case '4':
                tareas.listarPendientes(false);
                break;
            case '5':
                const ids=await tareasCompletas(tareas.listadoArr);
                tareas.toggleCompletadas(ids)
                break;
            case '6':
                const id = await listadoTareas(tareas.listadoArr);
                if (id!=0){const ok = await confirmar('¿Estas seguro?')
                if (ok){
                    tareas.borrarTarea(id);

                }}
                
                break;
                
        }
        guardarArc(tareas.listadoArr);



        await pausa();

    }while(opt != '0');

    
}


main();