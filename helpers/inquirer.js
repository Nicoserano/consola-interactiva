const inquirer = require('inquirer');
require('colors');

const preguntas=[
    {
        type:'list',
        name: 'opcion',
        message: 'Que desea hacer?',
        choices: [{
            value:'1',
            name: `${'1.'.green}crear tarea`
        },
        {
            value:'2',
            name: `${'2.'.green}Listar tarea`
        },
        {
            value:'3',
            name: `${'3.'.green}Listar tareas completadas`
        },
        {
            value:'4',
            name: `${'4.'.green}listar tarea pendientes`
        },
        {
            value:'5',
            name: `${'5.'.green}completar tarea(s)`
        },
        {
            value:'6',
            name: `${'6.'.green}Borrar tarea`
        },
        {
            value:'0',
            name: `${'0.'.green}salir`
        }
    
        ]
    }
]

const inquirerMenu= async() =>{
    console.clear();
    console.log('========================'.green);
    console.log('  seleccione una opcion '.white);
    console.log('========================\n'.green);

    const {opcion} = await inquirer.prompt(preguntas);
    return opcion;

}
const pausa= async() =>{

    const question={
        type :'input',
        name:'enter',
        message: `Presione ${'Enter'.green} para continuar`
    }
    

    await inquirer.prompt(question);

}

const leerInput = async(message)=>{
    const question =[{
        type:'input',
        name: 'desc',
        message,
        validate(value){
            if(value.length===0){
                return 'por favor ingrese un valor';
            }
            return true;
        }

       


    }];
    const {desc}= await inquirer.prompt(question);
    return desc;
}
const listadoTareas=async(tareas=[])=>{
    const choices= tareas.map((tarea,i)=>{
       const number =i+1;
        return{
            value: tarea.id,
            name: `${number}${tarea.desc}`
        }

    
    });
    choices.unshift({
        value:'0',
        name:'0.'.green+'Cancelar'
    });

    const preguntas =[
        {
            type: 'list',
            name: 'id',
            message:'borrar',choices
        }
    ]
    const {id} = await inquirer.prompt(preguntas);
    return id;

}

const confirmar =async(message)=>{

    const question =[
        {
        type: 'confirm',
        name:'ok',
        message
 }];

    const{ok}= await inquirer.prompt(question);
    return ok

}
const tareasCompletas=async(tareas=[])=>{
    const choices= tareas.map((tarea,i)=>{
       const number =i+1;
        return{
            value: tarea.id,
            name: `${number}${tarea.desc}`,
            checked: (tarea.completadoEn)?true:false
        }

    
    });
   
    const preguntas =[
        {
            type: 'checkbox',
            name: 'ids',
            message:'Selecciones',choices
        }
    ]
    const {ids} = await inquirer.prompt(preguntas);
    return ids;

}

module.exports={
    inquirerMenu,pausa,leerInput,listadoTareas,confirmar,tareasCompletas
}