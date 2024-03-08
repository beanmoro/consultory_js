class Consultory {
    constructor(name, patients){
        this._name = name
        this._patients = patients.map(p => p)
    }

    get name() {
        return this._name;
    }

    set name(value){
        this._name = value;
    }

    get patients(){
        return this._patients;
    }

    set patients(value){
        _patients = value.map(p => p);
    }

    addNewPatient(patient){
        this._patients.push(patient)
    }

    getPatientByRut(rut){
        return this._patients.find( p => { return p.rut == rut});
    }

    getPatientByName(name){
        return this._patients.find(p => { return p.name.toLowerCase() == name.toLowerCase()});
    }

    updatePatient(patient, newPatient){
        let p = this._patients.find(p => {return p == patient})
        p = newPatient
        
    }
    
    showAllPatients(){
        this._patients.map(p => console.log(p.getData()));
    }

}


class Patient {
    constructor(name, age, rut, diagnostic){
        this._name = name;
        this._age = age;
        this._rut = rut;
        this._diagnostic = diagnostic;
    }

    get name() {
        return this._name;
    }

    set name(value){
        this._name = value;
    }

    get age(){
        return this._age;
    }

    set age(value){
        _age = value;
    }

    get rut(){
        return this._rut;
    }

    set rut(value){
        _rut = value;
    }

    get diagnostic(){
        return this._diagnostic;
    }

    set diagnostic(value){
        _diagnostic = value
    }

    getData(){
        return `Paciente: ${this._name}\nEdad: ${this._age}\nRUT: ${this._rut}\nUltimo Diagnostico: ${this._diagnostic}\n`;
    }
}


const randomRange = (from, to) => {
    return Math.floor(Math.random() * (to - from + 1)) + from;
}


function generateRut() {
    // Generar los 8 primeros dígitos aleatorios
    let rut = '';
    for (let i = 0; i < 8; i++) {
        rut += Math.floor(Math.random() * 10);
    }

    // Calcular el dígito verificador
    let sum = 0;
    let multip = 2;
    for (let i = rut.length - 1; i >= 0; i--) {
        sum += parseInt(rut.charAt(i)) * multip;
        multip = multip === 7 ? 2 : multip + 1;
    }
    const verifierDigit = 11 - (sum % 11);

    // Si el dígito verificador es 11, se cambia por 0, y si es 10, se cambia por 'K'
    rut += (verifierDigit === 11) ? '0' : (verifierDigit === 10) ? 'K' : verifierDigit.toString();

    // Formatear el RUT
    rut = rut.replace(/^(\d{1,3})(\d{3})(\d{3})([0-9K])$/, '$1.$2.$3-$4');

    return rut;
}

function generateName() {
    const first_names = ['Juan', 'María', 'Pedro', 'Ana', 'Luis', 'Laura', 'Diego', 'Carolina', 'Javier', 'Gabriela', 'Manuel', 'Sofía', 'Miguel', 'Valentina', 'José', 'Camila', 'Carlos', 'Isabella', 'Andrés', 'Fernanda'];
    const last_names = ['González', 'Rodríguez', 'Gómez', 'Fernández', 'López', 'Díaz', 'Martínez', 'Pérez', 'García', 'Sánchez', 'Romero', 'Álvarez', 'Torres', 'Ruiz', 'Ramírez', 'Flores', 'Benítez', 'Acosta', 'Medina', 'Suárez'];

    const first_name = first_names[Math.floor(Math.random() * first_names.length)];
    const last_name = last_names[Math.floor(Math.random() * last_names.length)];

    return `${first_name} ${last_name}`;
}

function generateDisease() {
    const firstWords = ["Inflamación", "Lesión", "Irritación", "Infección", "Trastorno", "Síndrome", "Fractura", "Esguince", "Tensión", "Malestar"];
    const secondWords = ["respiratoria", "digestiva", "muscular", "articular", "cutánea", "cardíaca", "circulatoria", "neurológica", "endocrina", "emocional"];
    const thirdWords = ["aguda", "crónica", "severa", "moderada", "leve", "complicada", "recurrente", "persistente", "avanzada", "terminal"];

    // Seleccionar aleatoriamente una palabra de cada lista
    const firstWord = firstWords[Math.floor(Math.random() * firstWords.length)];
    const secondWord = secondWords[Math.floor(Math.random() * secondWords.length)];
    const thirdWord = thirdWords[Math.floor(Math.random() * thirdWords.length)];


    return `${firstWord} ${secondWord} ${thirdWord}`;
}


const inputOptionValidation = (msg, from, to) => {
    let input = NaN;

    while(isNaN(input) || input < from || input > to){

        input = parseInt(prompt( `${msg}\nIngrese una opcion (${from}-${to}):`));


        if(isNaN(input) || input < from || input > to){
            alert('ERROR: Ingreso una opcion invalida! Por favor vuelva a ingresar una opcion!')
        }

    }
    return input;
}


const main = ()=>{

    
    const consultory = new Consultory('ChileMedicos', []);
    const patients_number = 10;
    for(let i = 0; i < patients_number; i++){
        let age = randomRange(18, 100)
        let p = new Patient(`${generateName()}`, age, `${generateRut()}`, `${generateDisease()}`)
       consultory.addNewPatient(p);
    }


    let exit = false;
    while(!exit){

        let opt = inputOptionValidation(`Bienvenido al portal del Consultorio ${consultory.name}\nOpciones:\n1.- Consultar paciente por nombre y apellido.\n2.- Consultar paciente por rut.\n3.- Mostrar todos los pacientes del consultorio (consola).\n4.- Salir.`, 1, 4)

        switch(opt){

            case 1:
                let p_name = prompt('Ingrese nombre del paciente: ');
                let p = consultory.getPatientByName(p_name);
                if(p){
                    alert(p.getData())
                }else{
                    alert('ERROR: Paciente no encontrado!')
                }
                break;

            case 2:
                let p_rut = prompt('Ingrese rut del paciente: ');
                let pr = consultory.getPatientByRut(p_rut);
                if(pr){
                    alert(pr.getData())
                }else{
                    alert('ERROR: Paciente no encontrado!')
                }

                break;
            
            case 3:
                consultory.showAllPatients();
                break;

            case 4:
                exit = confirm('Esta seguro de que quiere salir?')
                break;
            
        }
    }
}

document.addEventListener('DOMContentLoaded', ()=>{
    main();
});

