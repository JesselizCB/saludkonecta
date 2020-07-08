import { db } from '../main'
import 'firebase/firestore';
import { currentUser } from "../firebase/login";
import moment from "moment";


export const createRegister = (data) => db.collection('colaborador').add({
  idDoctor: currentUser(),
  name: data.name,
  typedoc: data.typeDocument,
  document: data.document,
  edad: data.edad,
  imc: data.imc,
  position: data.position,
  phone: data.phone,
  bussines: data.bussines,
  account: data.account,
  sede: data.sede,
  date: moment(new Date()).format("DD/MM/YYYY"),
  status: data.status,
  antecedente: "",
  hta: "",
  diabetes: "",
  asma: "",
  respiratoria: "",
  cardiovascular: "",
  obesidad: "",
  cancer: "",
  inmunosuprimido: "",
  renal: "",
});

export const createSeguimiento = (data) => {
  console.log(data);
  db.collection('seguimiento').add({
  idColaborador: data.idColaborador,
  idDoctor: currentUser(),
  date: data.fecha,
  dateBeginA: data.dateBeginA,
  dateEndA: data.dateEndA,
  typeContact: data.typeContact,
  status: data.status,
  temperature: data.temperature,
  evolucion: data.evolucion,
  observaciones: (data.observaciones === undefined)?"":data.observaciones,
  pruebas: 0,
});
db.collection('colaborador').doc(data.idColaborador).update({status: data.status});
}
export const createPrueba = (data) => {
  db.collection('prueba').add({
  idDoctor: currentUser(),
  idColaborador: data. idColaborador,
  idSeguimiento: data.idSeguimiento,
  date: data.fecha,
  prueba: data.prueba,
  result: data.result,
});
updateTotalTest(data.idSeguimiento);
}
const updateTotalTest = (id) => {
 db.collection('seguimiento').doc(id).get().then((value) => {
  db.collection('seguimiento').doc(id).update({pruebas: value.data().pruebas + 1 });
 });
};

export const createFactorRiesgo = (data) => db.collection('colaborador').doc(data.idColaborador).update({
  antecedente: (data.antecedente)?"Si":"No",
  hta: (data.hta)?"Si":"No",
  diabetes: (data.diabetes)?"Si":"No",
  asma: (data.asma)?"Si":"No",
  respiratoria: (data.respiratoria)?"Si":"No",
  cardiovascular: (data.cardiovascular)?"Si":"No",
  obesidad: (data.obesidad)?"Si":"No",
  cancer: (data.cancer)?"Si":"No",
  inmunosuprimido: (data.inmunosuprimido)?"Si":"No",
  renal: (data.renal)?"Si":"No",
});

export const getDoctor = (idDoctor) => db.collection('users').doc(idDoctor).get();

export const getRegister = () => db.collection('colaborador').orderBy('date', 'desc');

export const getSeguimiento = (idUser) => db.collection('seguimiento').where("idColaborador", "==", idUser);

export const getPruebas = (idSeg) => db.collection('prueba').where("idSeguimiento", "==", idSeg);

