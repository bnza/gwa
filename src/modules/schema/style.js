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
  radius: Joi.number().default(5)
})

export const styleCircleImageSchema = styleImageVectorStyleSchema.append({})

export const styleRegularShapeImageSchema = styleImageVectorStyleSchema.append({
  points: Joi.number()
    .integer()
    .min(3),
  rotation: Joi.number()
    .default(0)
    .min(-360)
    .max(360)
    .unit('degrees')
    .custom(value => value / 180 * Math.PI),
  radius2: Joi.number()
    .integer()
    .min(
      Joi.ref('radius', {
        adjust: value => value + 1
      })
    )
})
export const symbologySchema = Joi.object({
  fill: styleFillSchema.default(),
  stroke: styleStrokeSchema.default(),
  image: Joi.alternatives().conditional('.radius2',
    {
      is: Joi.number(),
      then: styleRegularShapeImageSchema,
      otherwise: styleCircleImageSchema
    }
  )
})

export const styleSchema = Joi.object({
  type: Joi.string().valid('simple', 'categorized', 'graduated').default('simple'),
  symbology: symbologySchema.required()
})
