
import { extend } from 'vee-validate';
import { required, alpha_spaces, min } from "vee-validate/dist/rules";


extend("alpha_spaces", {
  ...alpha_spaces,
  message: "Наличие чисел и цифр недопустимо"
})

extend("required", {
  ...required,
  message: "Пожалуйста, заполните это поле"
})

extend("min", {
  ...min,
  message: "Длина номера телефона меньше ожидаемой"
})
