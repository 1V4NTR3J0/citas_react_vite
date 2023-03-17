import {useState, useEffect} from 'react'
import Error from './Error';

const Formulario = ({setPacientes, pacientes, paciente, setPaciente}) => {

  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    if(Object.keys(paciente).length > 0){
      const {nombre:nombreP, propietario:propietarioP, email:emailP, fecha:fechaP, sintomas:sintomasP} = paciente;
      setNombre(nombreP);
      setEmail(emailP);
      setFecha(fechaP);
      setPropietario(propietarioP);
      setFecha(fechaP);
      setSintomas(sintomasP);
    }
  }, [paciente]);
  

  const generarId = () => {
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36)
    return fecha + random;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if ([nombre, propietario, email, fecha, sintomas].includes('')) {
      // console.log('Campo vacio')    
      setError(true);  
      return;
    };
    setError(false);

    //objeto del paciente
    const objPaciente = {
      nombre, propietario, email, fecha, sintomas
    }

    if (paciente.id) {
      // editando
      objPaciente.id = paciente.id;
      const pacientesActualizados = pacientes.map(p => p.id === paciente.id ? objPaciente : p);
      setPacientes(pacientesActualizados);
      setPaciente({});      
    }else{
      // nuevo registro
      objPaciente.id = generarId();
      setPacientes([...pacientes, objPaciente]);
    }
    //reiniciar form
    setNombre('');
    setEmail('');
    setFecha('');
    setPropietario('');
    setSintomas('');
  };

  return (
    <div className="md:w-1/2 lg:w-2/5">
      <h2 className="font-black text-3xl text-center">Seguimiento pacientes</h2>

      <p className="text-lg text-center mt-5 mb-10">
        Añade pacientes y {""}{" "}
        <span className="text-indigo-600 font-bold">administralos</span>
      </p>

      <form 
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg py-10 px-5 mb-10 mx-5">
        {error && <Error mensaje={'Todos los campos son obligatorios'}/>}
        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="mascota"
          >
            Nombre Mascota
          </label>
          <input
            type="text"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Nombre de la mascota"
            id="mascota"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="propietario"
          >
            Nombre propietario
          </label>
          <input
            type="text"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Nombre del propietario"
            id="propietario"
            value={propietario}
            onChange={(e) => setPropietario(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Email de contacto"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="alta"
          >
            Alta
          </label>
          <input
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            id="alta"
            value={fecha}
            onChange={(e) => setFecha(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <label
            className="block text-gray-700 uppercase font-bold"
            htmlFor="sintomas"
          >
            Sintomas
          </label>
          <textarea
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Sintomas de la mascota"
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          ></textarea>
        </div>

        <input
          type="submit"
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
          value={paciente.id ? "Editar Paciente": "Agregar paciente"}
        />
      </form>
    </div>
  );
};

export default Formulario;
