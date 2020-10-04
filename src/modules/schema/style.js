import Joi from 'joi'
import { opacitySchema } from '@/modules/schema/common'

const colorSchema = Joi.string()
  .regex(/^([0-9A-F]{3}|[0-9A-F]{6})$/i)
  .custom(color => (color.charAt(0) === '#' ? color : `#${color}`))

export const styleFillSchema = Joi.object({
  color: colorSchema.default('#FFF'),
  opacity: opacitySchema.default(0.4)
})

export const styleStrokeSchema = Joi.object({
  color: colorSchema.default('#3399CC'),
  width: Joi.number().default(1.25)
})

export const styleImageStyleSchema = Joi.object({})

export const styleImageVectorStyleSchema = styleImageStyleSchema.append({
  stroke: styleStrokeSchema.default(),
  fill: styleFillSchema.default(),
  radius: Joi.number().default(5)
})

export const styleCircleImageSchema = styleImageVectorStyleSchema.append({})

export const styleRegularShapeImageSchema = styleImageVectorStyleSchema.append({
  points: Joi.number()
    .integer()
    .min(3)
    .default(4),
  radius1: Joi.number()
    .integer()
    .default(7),
  radius2: Joi.number().integer()
})

export const styleSchema = Joi.object({
  fill: styleFillSchema.default(),
  stroke: styleStrokeSchema.default(),
  image: Joi.object()
    .valid(styleCircleImageSchema, styleRegularShapeImageSchema)
    .default(parent => {
      return {
        fill: parent.fill,
        stroke: parent.stroke,
        radius: 5
      }
    })
})
