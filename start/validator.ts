import { validator } from '@ioc:Adonis/Core/Validator'

validator.rule('lowercase', (value, _, { mutate }) => {
  mutate(value.toLowerCase())
})
