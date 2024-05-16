import { config } from 'dotenv'
import { z } from 'zod'

// NODE_ENV: diz em qual ambiente a aplicação está rodando.
// O valor é informado automaticamente pelas ferramentas que estão sendo
// utilizadas para executar a aplicação

if (process.env.NODE_ENV === 'test') {
  config({
    path: '.env.test',
  })
} else {
  config()
}

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('production'),
  DATABASE_URL: z.string(), // é um valor obrigatório
  PORT: z.number().default(3333),
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('❌ Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variables.')
}

export const env = _env.data
