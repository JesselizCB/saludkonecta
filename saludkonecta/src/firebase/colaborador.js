import { db } from '../main'
import 'firebase/firestore';
import { currentUser } from "../firebase/login";
import moment from "moment";


export const createRegister = (data) => db.collection('colaborador').add({
  idDoctor: currentUser(),
  name: data.name,
  typedoc: data.typeDocument,
  document: data.document,
  phone: data.phone,
  account: data.account,
  sede: data.sede,
  date: moment(new Date()).format("DD/MM/YYYY"),
  tcontact: data.typeContact,
  status: data.status,
});

export const createSeguimiento = (data) => {
  db.collection('seguimiento').add({
  idColaborador: data.idColaborador,
  idDoctor: currentUser(),
  date: moment(new Date()).format("DD/MM/YYYY"),
  typeContact: data.typeContact,
  status: data.status,
  temperature: data.temperature,
  information_1: data.observaciones_1,
  retiro: (data.retiro)?"Si":"No",
  information_2: data.observaciones_2
});
db.collection('colaborador').doc(data.idColaborador).update({status: data.status});
}
export const getDoctor = (idDoctor) => db.collection('users').doc(idDoctor).get();

export const getRegister = () => db.collection('colaborador').orderBy('date', 'desc');

export const getSeguimiento = (idUser) => db.collection('seguimiento').where("idColaborador", "==", idUser);

