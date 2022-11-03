export function valida(input) {
  const tipoDeInput = input.dataset.tipo;
  if (validadores[tipoDeInput]) {
    validadores[tipoDeInput](input);
  }

  console.log(input.parentElement);
  if (input.validity.valid) {
    input.parentElement.classList.remove("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML = "";
  } else {
    input.parentElement.classList.add("input-container--invalid");
    input.parentElement.querySelector(".input-message-error").innerHTML =
      mostrarMensajeError(tipoDeInput, input);
  }
}

const tipoDeErrores = [
  "valueMissing",
  "typeMissmatch",
  "patternMismatch",
  "customError",
];
const mensajesDeError = {
  nombre: {
    valueMissing: "El campo nombre no pude estar vacio",
  },
  email: {
    valueMissing: "El campo correo no puede estar vacio",
    typeMissmatch: "El correo no es valido",
  },
  password: {
    valueMissing: "El campo contrasena no puede estar vacio",
    patternMismatch:
      "Al menos 6 caracteres, máximo 12, debe contener una letra minúscula, una letra mayúscula, un número y no puede contener caracteres especiales.",
  },
  nacimiento: {
    valueMissing: "El campo fecha no puede estar vacio",
    customError: "Debes tener almenos 18 anos de edad",
  },
  direccion: {
    valueMissing: "Este campo  no puede estar vacio",
    patternMismatch: "El ciudad tiene que contener entre 10 a 40 caracteres",
  },
  ciudad: {
    valueMissing: "Este campo  no puede estar vacio",
    patternMismatch: "El ciudad tiene que contener entre 4 a 30 caracteres",
  },
  estado: {
    valueMissing: "Este campo  no puede estar vacio",
    patternMismatch: "El estado tiene que contener entre 4 a 30 caracteres",
  },
};
const validadores = {
  nacimiento: (input) => validarNacimiento(input),
};

function mostrarMensajeError(tipoDeInput, input) {
  let mensaje = "";
  tipoDeErrores.forEach((error) => {
    if (input.validity[error]) {
      console.log(tipoDeInput, error);
      console.log(input.validity[error]);
      console.log(mensajesDeError[tipoDeInput][error]);
      mensaje = mensajesDeError[tipoDeInput][error];
    }
  });
  return mensaje;
}

function validarNacimiento(input) {
  const fechaCliente = new Date(input.value);
  let mensaje = "";
  if (!mayorDeEdad(fechaCliente)) {
    mensaje = "Debes de tener almenos 18 ahnos";
  }

  input.setCustomValidity(mensaje);
}

function mayorDeEdad(fechaCliente) {
  const fechaActual = new Date();
  const difenciasFechas = new Date(
    fechaCliente.getUTCFullYear() + 18,
    fechaCliente.getUTCMonth(),
    fechaCliente.getUTCDate()
  );
  return difenciasFechas <= fechaActual;
}
