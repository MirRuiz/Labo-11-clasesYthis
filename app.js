const reservas = [
   {
    tipoHabitacion: "standard",
    pax: 1,
    noches: 3,
  }, 
  {
    tipoHabitacion: "standard",
    pax: 1,
    noches: 4,
  },
  {
    tipoHabitacion: "suite",
    pax: 2,
    noches: 1,
  },
];
//**************CASO 1 ***********/
console.log("***CASO 1 ***")
class ReservasHotel{
    constructor(){
        this._reservas = [];
        this._subtotal = 0;
        this._total = 0;
       
    }
    suplementoPersonaAdicional(personas){
        return (personas > 1 ?( personas - 1) * 40 : 0);
    }
    calcularPrecioHabitacion(tipoHabitacion){
        if(tipoHabitacion === "standard"){
            return 100;
        }
        else{
            return 150;
        }
        }
    calculaSubtotal(){
        this._subtotal = reservas.reduce((acc,{tipoHabitacion,pax,noches})=> 
        acc + (this.calcularPrecioHabitacion(tipoHabitacion) * noches) + this.suplementoPersonaAdicional(pax), 0)                                                       
    }

    calcularTotal(){
        this._total = (this._subtotal * 1.21).toFixed(2);

    }

    get subtotal(){
        return this._subtotal;
    }
    get total(){
        return this._total;
    }

    set reservas(reservas){
        this._reservas = reservas;
        this.calculaSubtotal();
        this.calcularTotal();
    }

}
const reserHotel = new ReservasHotel();
reserHotel.reservas = reservas;
console.log("El subtotal es: ", reserHotel.subtotal)
console.log("El total: " , reserHotel.total)
 
//*****************CASO 2 ***************/
console.log("***CASO 2 ***")
class ReservasConTourOperador extends ReservasHotel{
    constructor(){
        super();
        this.precioHabitacion = 100;
        this.descuento = 0.85;// => 15%
    }
   calculaSubtotal(){
        this._subtotal = reservas.reduce((acc, {noches,pax}) => 
        acc + (this.precioHabitacion * noches) + this.suplementoPersonaAdicional(pax), 0)
    };

    calcularTotal(){
        this._total = ((this._subtotal  * 1.21)* this.descuento).toFixed(2)
    }

}
const tourOperador = new ReservasConTourOperador();
tourOperador.reservas = reservas;
console.log("Subtotal con tour operador :", tourOperador.subtotal);
console.log("Total con tour operador: ", tourOperador.total);

//////*********DESAFIO***********//////
console.log("***DESAFIO***")
 class Bookings{
    constructor(){
        this._reservas = [];
        this._subtotal = 0;
        this._total = 0;
        this._preciosTipoHabitacion = {
            standard : 100,
            suite : 150, 
        }    
      
    }
    suplementoPersonaAdicional(personas){
        return (personas > 1 ?( personas - 1) * 40 : 0);
    }

    calculaSubtotal(){
       let precio ;
        this._subtotal = reservas.reduce((acc,{pax,noches,tipoHabitacion}) =>{
     tipoHabitacion === "standard"
       ? (precio = this._preciosTipoHabitacion.standard)
       : (precio = this._preciosTipoHabitacion.suite);
       return acc =acc +(precio * noches) +this.suplementoPersonaAdicional(pax)
       } ,0) 
         
    }
    calcularTotal(){
      this._total = (this._subtotal * 1.21).toFixed(2)
    }
    
    set reservas(reservas){
        this._reservas = reservas;
    }
    get subtotal(){
        return this._subtotal;
    }
    get total(){
      return this._total
    }
} 
const bookingHotel = new Bookings();
bookingHotel.calculaSubtotal();
bookingHotel.calcularTotal();
bookingHotel.reservas = reservas;

class Particular extends Bookings{
  constructor(){
    super();
  }
 
  }
  const desafioParticular = new Particular();
  desafioParticular.reservas= reservas;
  desafioParticular.calculaSubtotal();
  desafioParticular.calcularTotal()
  console.log("El subtotal particular es: ",desafioParticular.subtotal);
  console.log("El total particular(desafio)es:",desafioParticular.total);

  class TourOperador extends Bookings{
    constructor(){
      super();
      this._preciosTipoHabitacion = {
        standard: 100,
        suite: 100,
      };
      this.descuento = 0.85 //==>15%
    }
    
    calcularTotal(){
      this._total = ((this._subtotal* 1.21) * this.descuento).toFixed(2)
    }
  }
  
  const desafioTourOperador = new TourOperador();
  desafioTourOperador.reservas = reservas;
  desafioTourOperador.calculaSubtotal();
  desafioTourOperador.calcularTotal();
  console.log("El subtotal tour operador es: ",desafioTourOperador.subtotal);
  console.log("El total tour operador es: ", desafioTourOperador.total)


 
//********EJERCICIO ADICIONAL *******/
console.log("***EJERCICIO ADICIONAL ***")
 const bookings = [
  {
    tipoHabitacion: "standard",
    desayuno: false,
    pax: 1,
    noches: 3,
  },
  {
    tipoHabitacion: "standard",
    desayuno: false,
    pax: 1,
    noches: 4,
  },
  {
    tipoHabitacion: "suite",
    desayuno: true,
    pax: 2,
    noches: 1,
  },
];

class BookingsHotel {
  constructor() {
    this._bookings = [];
    this._subtotal = 0;
    this._total =0;
  }
  calcularDesayuno(desayuno,pax,noches) {
    return desayuno === true ? 15 * pax * noches : 0;
  }

  suplementoPersonaAdicional(personas) {
    return personas > 1 ? (personas - 1) * 40 : 0;
  }
  calcularPrecioHabitacion(tipoHabitacion) {
    return tipoHabitacion === "standard"? 100 : 150;
  }
  calcularSubtotal() {
    this._subtotal = bookings.reduce((acc, {tipoHabitacion,pax,noches,desayuno}) =>
    acc + (this.calcularPrecioHabitacion(tipoHabitacion) * noches) + this.suplementoPersonaAdicional(pax) + this.calcularDesayuno(desayuno,pax,noches) ,0);
  }
  calcularTotal(){
    this._total = (this._subtotal * 1.21).toFixed(2)
  }
  set bookings(bookings){
    this._bookings = bookings;
    this.calcularSubtotal();
    this.calcularTotal();
  }
  get subtotal(){
    return this._subtotal;
  }
  get total(){
    return this._total;
  }
}
const vacaciones = new BookingsHotel();
vacaciones.bookings = bookings;
console.log("Subtotal particular: ", vacaciones.subtotal);
console.log("Total particular : ", vacaciones.total);

class BookingsTourOperador extends BookingsHotel{
  constructor(){
    super()
    this.precioHabitacion = 100;
    this.descuento = 0.85;
  }
  calcularSubtotal(){
    this._subtotal = bookings.reduce((acc,{noches,pax,desayuno})=>
    acc + (this.precioHabitacion * noches) + this.suplementoPersonaAdicional(pax) + this.calcularDesayuno(desayuno,pax,noches),0)
  }
  calcularTotal(){
    this._total =( this._subtotal * 1.21 * this.descuento).toFixed(2)
  }

} 
const vacation = new BookingsTourOperador();
vacation.bookings = bookings;
/* vacation.calcularSubtotal();
vacation.calcularTotal() */
console.log("Subtotal tour operador: ", vacation.subtotal);
console.log("Total tour operador: ", vacation.total)

