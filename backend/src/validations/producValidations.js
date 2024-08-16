import {body} from 'express-validator'

export const producValidation = [
    body('titulo')
    .isString().withMessage('El titulo debe ser String')
    .notEmpty().withMessage('El titulo no debe estar vacio'),
    body('autor')
    .isString().withMessage('El titulo debe ser String')
    .notEmpty().withMessage('El titulo no debe estar vacio'),
    body('descripcion')
    .isString().withMessage('El titulo debe ser String')
    .notEmpty().withMessage('El titulo no debe estar vacio'),
    body('tipo')
    .isString().withMessage('El titulo debe ser String')
    .notEmpty().withMessage('El titulo no debe estar vacio'),
    body('idioma')
    .isString().withMessage('El titulo debe ser String')
    .notEmpty().withMessage('El titulo no debe estar vacio'),
    body('categoria')
    .isString().withMessage('El titulo debe ser String')
    .notEmpty().withMessage('El titulo no debe estar vacio'),
    body('numeroEdicion')
    .isNumeric().withMessage('El espacio debe ser de caracter numerico')
    .notEmpty().withMessage('El titulo no debe estar vacio'),
    body('precio')
    .isNumeric().withMessage('El titulo debe ser String')
    .notEmpty().withMessage('El titulo no debe estar vacio'),
    body('cantidad')
    .isNumeric().withMessage('El titulo debe ser String')
    .notEmpty().withMessage('El titulo no debe estar vacio'),
    body('imagen')
    .notEmpty().withMessage('El titulo no debe estar vacio')
]
export const producValidUpdate = [
    body('titulo')
    .optional()
    .isString().withMessage('El titulo debe ser String')
    .notEmpty().withMessage('El titulo no debe estar vacio'),
    body('autor')
    .optional()
    .isString().withMessage('El titulo debe ser String')
    .notEmpty().withMessage('El titulo no debe estar vacio'),
    body('descripcion')
    .optional()
    .isString().withMessage('El titulo debe ser String')
    .notEmpty().withMessage('El titulo no debe estar vacio'),
    body('idioma')
    .optional()
    .isString().withMessage('El titulo debe ser String')
    .notEmpty().withMessage('El titulo no debe estar vacio'),
    body('categoria')
    .optional()
    .isString().withMessage('El titulo debe ser String')
    .notEmpty().withMessage('El titulo no debe estar vacio'),
    body('numeroEdicion')
    .optional()
    .isNumeric().withMessage('El espacio debe ser de caracter numerico')
    .notEmpty().withMessage('El titulo no debe estar vacio'),
    body('precio')
    .optional()
    .isNumeric().withMessage('El titulo debe ser String')
    .notEmpty().withMessage('El titulo no debe estar vacio'),
    body('cantidad')
    .optional()
    .isNumeric().withMessage('El titulo debe ser String')
    .notEmpty().withMessage('El titulo no debe estar vacio'),
    body('imagen')
    .optional()
    .notEmpty().withMessage('El titulo no debe estar vacio')
]